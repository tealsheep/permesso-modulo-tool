"""Modulo 1 / Modulo 2 共用的字段数据生成逻辑。

维护者：Claude。需要 PyMuPDF（pip install pymupdf），不是网站运行时依赖。
坐标约定（与 src/data/schemas.ts 一致）：PDF point，原点在页面左下角；boxes.x / boxes.y 是第一个格子的左下角。
"""
import collections
import json
import re
from dataclasses import dataclass, field

import pymupdf


@dataclass
class FormConfig:
    form: str                      # "modulo1" | "modulo2"
    prefix: str                    # "M1-" | "M2-"
    source: str
    verified_on: str
    label_zh: dict
    checkbox: set = field(default_factory=set)
    dates: set = field(default_factory=set)
    choice: dict = field(default_factory=dict)       # 编号 -> [选项值, ...]（从左到右）
    parts: dict = field(default_factory=dict)        # 编号 -> [分组名, ...]（从左到右）
    code_table: dict = field(default_factory=dict)
    overrides: dict = field(default_factory=dict)    # (页, x0, y0 顶部坐标) -> 编号
    no_boxes_ok: set = field(default_factory=set)
    label_zh_by_n: dict = field(default_factory=dict)
    label_it_by_n: dict = field(default_factory=dict)
    header: object = None          # 函数 (doc) -> [字段]


def is_red(c):
    return bool(c) and c[0] > 0.8 and c[1] < 0.5


def norm(t: str) -> str:
    t = t.replace("’", "'").replace("´", "'")
    t = re.sub(r"\((?:[a-z],?)+\)\s*$", "", t).strip()  # 去掉末尾的脚注字母 (a) (c,y)
    return re.sub(r"\s+", " ", t).strip()


def box_rects(page):
    """页面上所有红色描边的单个格子（13×19 左右）。一个 path 里可能画了多个格子，逐个拆开。"""
    rects = []
    for d in page.get_drawings():
        if not is_red(d.get("color")):
            continue
        cands = [it[1].rect for it in d["items"] if it[0] == "qu"] + [it[1] for it in d["items"] if it[0] == "re"]
        if not cands:
            cands = [d["rect"]]
        for r in cands:
            if 10 < r.width < 16 and 15 < r.height < 22 and \
                    not any(abs(r.x0 - u.x0) < 0.5 and abs(r.y0 - u.y0) < 0.5 for u in rects):
                rects.append(r)
    return rects


def runs_of(rects):
    rects = sorted(rects, key=lambda r: (r.y0, r.x0))
    rows = []
    for r in rects:
        for row in rows:
            if abs(row[0].y0 - r.y0) < 2:
                row.append(r)
                break
        else:
            rows.append([r])
    runs = []
    for row in rows:
        row.sort(key=lambda r: r.x0)
        cur = [row[0]]
        for r in row[1:]:
            if r.x0 - cur[-1].x1 < 6:
                cur.append(r)
            else:
                runs.append(cur)
                cur = [r]
        runs.append(cur)
    return runs


def labels_of(page):
    out = []
    for b in page.get_text("dict")["blocks"]:
        for line in b.get("lines", []):
            t = "".join(s["text"] for s in line["spans"]).strip()
            m = re.match(r"^(?:\d\)\s*)?(\d{1,3})\s*\.\s*(.*)", t)
            if m:
                out.append((int(m.group(1)), norm(m.group(2)), pymupdf.Rect(line["bbox"])))
    return out


def assign(doc, cfg, header_rects=()):
    out = {}
    for pno, page in enumerate(doc):
        pg, h = pno + 1, page.rect.height
        labels = labels_of(page)
        for n, t, bb in labels:
            out.setdefault(n, {"page": pg, "h": h, "label": cfg.label_it_by_n.get(n, t), "runs": []})
        rects = [r for r in box_rects(page)
                 if not any(abs(r.x0 - hr.x0) < 1 and abs(r.y0 - hr.y0) < 1 for p, hr in header_rects if p == pg)]
        for run in runs_of(rects):
            x0, y0 = run[0].x0, min(r.y0 for r in run)
            key = next((v for (p, x, y), v in cfg.overrides.items()
                        if p == pg and abs(x - x0) < 3 and abs(y - y0) < 3), None)
            if key is None:
                cy = (y0 + max(r.y1 for r in run)) / 2
                same = [L for L in labels if L[2].y0 - 5 <= cy <= L[2].y1 + 5 and L[2].x0 < x0]
                if same:
                    key = max(same, key=lambda L: L[2].x0)[0]
                else:
                    above = [L for L in labels if L[2].y1 <= y0 + 2 and L[2].x0 <= x0 + 60]
                    if not above:
                        raise SystemExit(f"无法对应的格子：第 {pg} 页 ({x0:.0f},{y0:.0f})")
                    key = max(above, key=lambda L: (L[2].y1, -abs(L[2].x0 - x0)))[0]
            out[key]["runs"].append(run)
    return out


def boxes(run, h):
    first = run[0]
    pitch = (run[-1].x0 - first.x0) / (len(run) - 1) if len(run) > 1 else first.width
    return {"x": round(first.x0, 2), "y": round(h - first.y1, 2), "w": round(first.width, 2),
            "h": round(first.height, 2), "count": len(run), "pitch": round(pitch, 3)}


def rect_of(run, h):
    b = boxes(run, h)
    return {k: b[k] for k in ("x", "y", "w", "h")}


def build(pdf_path, cfg: FormConfig):
    doc = pymupdf.open(pdf_path)
    header, header_rects = (cfg.header(doc) if cfg.header else ([], []))
    assigned = assign(doc, cfg, header_rects)
    fields, section = list(header), ""
    for n in sorted(assigned):
        a = assigned[n]
        if a["label"].startswith("SEZIONE"):
            section = a["label"]
        runs = sorted(a["runs"], key=lambda r: (round(r[0].y0), r[0].x0))
        if not runs:
            if n not in cfg.no_boxes_ok:
                raise SystemExit(f"编号 {n} 没有格子：{a['label']}")
            continue
        if n in cfg.no_boxes_ok:
            raise SystemExit(f"编号 {n} 在 no_boxes_ok 里，但找到了格子：{a['label']}")
        h = a["h"]
        f = {"id": f"{cfg.prefix}{n:03d}", "page": a["page"], "section": section or "INTESTAZIONE",
             "labelIt": a["label"], "labelZh": cfg.label_zh_by_n.get(n) or cfg.label_zh.get(a["label"]) or ""}
        if not f["labelZh"]:
            raise SystemExit(f"编号 {n} 缺中文标签：{a['label']}")
        by_x = sorted(runs, key=lambda r: r[0].x0)
        if n in cfg.checkbox:
            assert len(runs) == 1 and len(runs[0]) == 1, (n, [len(r) for r in runs])
            f.update(kind="checkbox", box=rect_of(runs[0], h))
        elif n in cfg.dates:
            assert [len(r) for r in by_x] == [2, 2, 4], (n, [len(r) for r in by_x])
            d, m, y = by_x
            f.update(kind="date", groups={"day": boxes(d, h), "month": boxes(m, h), "year": boxes(y, h)})
        elif n in cfg.choice:
            assert len(by_x) == len(cfg.choice[n]) and all(len(r) == 1 for r in by_x), n
            f.update(kind="choice", options=[{"value": v, "box": rect_of(r, h)} for v, r in zip(cfg.choice[n], by_x)])
        elif n in cfg.parts:
            assert len(by_x) == len(cfg.parts[n]), (n, [len(r) for r in by_x])
            f.update(kind="parts", parts=[{"name": v, "boxes": boxes(r, h)} for v, r in zip(cfg.parts[n], by_x)])
        else:
            f.update(kind="boxes", boxes=boxes(runs[0], h))
            if len(runs) > 1:
                f["moreRows"] = [boxes(r, h) for r in runs[1:]]
        if n in cfg.code_table:
            f["codeTable"] = cfg.code_table[n]
        fields.append(f)
    return {"form": cfg.form, "source": cfg.source, "version": 1, "verifiedOn": cfg.verified_on, "fields": fields}


def questore_header(doc, prefix):
    """第 1 页抬头：'Al Signor Questore di' 横线 + 两格 Questura 省份缩写。没有印刷编号，ID 用 H01 / H02。"""
    page = doc[0]
    h = page.rect.height
    line_x0 = line_bb = None
    for b in page.get_text("rawdict")["blocks"]:
        for line in b.get("lines", []):
            chars = [c for s in line["spans"] for c in s["chars"]]
            if "Questore" in "".join(c["c"] for c in chars):
                line_bb = pymupdf.Rect(line["bbox"])
                line_x0 = next(c["bbox"][0] for c in chars if c["c"] == "_")
    assert line_bb is not None, "找不到 Questore 横线"
    sigla = next(L for L in [pymupdf.Rect(l["bbox"]) for b in page.get_text("dict")["blocks"]
                             for l in b.get("lines", []) if "Sigla" in "".join(s["text"] for s in l["spans"])])
    # 抬头格子画法因表而异（Modulo 1 是红色填充轮廓），取 Sigla 文字右边、同一高度的两个格子
    cands = []
    for d in page.get_drawings():
        if not (is_red(d.get("color")) or is_red(d.get("fill"))):
            continue
        rs = [it[1].rect for it in d["items"] if it[0] == "qu"] + [it[1] for it in d["items"] if it[0] == "re"] or [d["rect"]]
        for r in rs:
            if 10 < r.width < 16 and 15 < r.height < 22 and r.x0 > sigla.x1 and r.y0 < sigla.y1 + 2 and r.y1 > sigla.y0 - 12 \
                    and not any(abs(r.x0 - c.x0) < 0.5 for c in cands):
                cands.append(r)
    cands.sort(key=lambda r: r.x0)
    assert len(cands) == 2, f"抬头省份格子数量不对：{len(cands)}"
    fields = [
        {"id": f"{prefix}H01", "page": 1, "section": "INTESTAZIONE", "labelIt": "AL SIGNOR QUESTORE DI",
         "labelZh": "受理的 Questura 所在城市", "kind": "freetext",
         "area": {"x": round(line_x0, 2), "y": round(h - line_bb.y1, 2),
                  "w": round(line_bb.x1 - line_x0, 2), "h": round(line_bb.height, 2)}},
        {"id": f"{prefix}H02", "page": 1, "section": "INTESTAZIONE", "labelIt": "SIGLA PROVINCIA",
         "labelZh": "受理的 Questura 所在省（缩写）", "kind": "boxes", "boxes": boxes(cands, h),
         "codeTable": "provinces"},
    ]
    return fields, [(1, r) for r in cands]


def write(data, out_path):
    with open(out_path, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
        fh.write("\n")
    kinds = collections.Counter(f["kind"] for f in data["fields"])
    print(f"{data['form']}: {len(data['fields'])} fields", dict(kinds))
