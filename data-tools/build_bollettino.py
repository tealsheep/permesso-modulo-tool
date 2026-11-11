"""生成 data/forms/bollettino.json：kit 缴费单 TD 674 的字段坐标。

维护者：Claude。底图是用户提供的图片 official/2026-11-05_bollettino_TD674_user_sample.jpg（1024×315 像素）。
用法：python -I data-tools/build_bollettino.py official/2026-11-05_bollettino_TD674_user_sample.jpg data/forms/bollettino.json

坐标单位：图片像素，原点在图片左下角（与 PDF 一样 y 向上）。渲染时把图片放进一个
1024×315 的页面（1 像素 = 1 单位），再按坐标画字；需要更大尺寸时整体等比缩放即可。

格子边缘在 JPEG 里是很淡的灰粉色，所以在每个已知区域里按"暗像素比例"找横边和竖边。
三联（左：Attestazione，中：Ricevuta di versamento，右：Ricevuta di accredito）内容必须完全一致。
"""
import json
import sys

import pymupdf

SOURCE = "official/2026-11-05_bollettino_TD674_user_sample.jpg"
VERIFIED_ON = "2026-11-05"

# 格子区域（图片像素，左上原点；人工圈定大致范围，精确边缘由下面的检测得到）
BOX_REGIONS = {
    "R-euro": (868, 20, 1012, 44), "R-eseg1": (698, 153, 1003, 175), "R-eseg2": (698, 171, 1003, 193),
    "R-resid": (698, 197, 1003, 219), "R-cap": (698, 223, 772, 245), "R-loc": (778, 223, 1003, 245),
    "L-euro": (108, 43, 254, 67), "M-euro": (362, 43, 508, 67),
}
# 手写横线：(起点 x, 终点 x, 线所在 y)。y 由暗像素行检测得到（67 / 90 / 128 / 144），
# 起止 x 对照放大图确定（横线左边是印刷标签，不能用检测范围）
LINES = {
    "R-lettere": (663, 999, 67),
    "L-lettere": (46, 249, 90), "L-eseguito": (47, 249, 128), "L-resid": (47, 249, 144),
    "M-lettere": (300, 502, 90), "M-eseguito": (301, 502, 128), "M-resid": (301, 502, 144),
}
LINE_TEXT_HEIGHT = 11  # 横线上方用来写字的高度


class Image:
    def __init__(self, path):
        self.pm = pymupdf.Pixmap(path)
        self.w, self.h, self.s = self.pm.width, self.pm.height, self.pm.samples

    def dark(self, x, y):
        i = (y * self.w + x) * 3
        return (self.s[i] + self.s[i + 1] + self.s[i + 2]) / 3 < 232


def peaks(vals, thr):
    out, run = [], []
    for i, v in enumerate(vals):
        if v >= thr:
            run.append(i)
        elif run:
            out.append(sum(run) / len(run))
            run = []
    if run:
        out.append(sum(run) / len(run))
    return out


def detect(img, region):
    x0, y0, x1, y1 = region
    rows = [sum(img.dark(x, y) for x in range(x0, x1)) / (x1 - x0) for y in range(y0, y1)]
    hs = [y0 + e for e in peaks(rows, 0.45)]
    top, bot = hs[0], hs[1]  # 第三条（如有）是下方的 IBAN 行
    yt, yb = int(top) + 2, int(bot) - 1
    cols = [sum(img.dark(x, y) for y in range(yt, yb)) / (yb - yt) for x in range(x0, x1)]
    vs = [x0 + e for e in peaks(cols, 0.6)]
    return top, bot, vs


def runs_from_edges(vs, max_pitch=15):
    """相邻格子共用竖边：把间距接近格宽的竖边串成一段段连续格子。"""
    runs, cur = [], [vs[0]]
    for v in vs[1:]:
        if 11 < v - cur[-1] < max_pitch:
            cur.append(v)
        else:
            if len(cur) > 1:
                runs.append(cur)
            cur = [v]
    if len(cur) > 1:
        runs.append(cur)
    return runs


def boxes(edges, top, bot, img_h):
    n = len(edges) - 1
    pitch = (edges[-1] - edges[0]) / n
    # 相邻格子共用竖边，格内宽度 = 间距 − 1 像素边线
    return {"x": round(edges[0] + 0.5, 2), "y": round(img_h - bot + 0.5, 2), "w": round(pitch - 1, 2),
            "h": round(bot - top - 1, 2),
            "count": n, "pitch": round(pitch, 3)}


def area(name, img_h):
    x0, x1, y = LINES[name]
    return {"x": x0, "y": img_h - y + 1, "w": x1 - x0, "h": LINE_TEXT_HEIGHT}


def build(path):
    img = Image(path)
    H = img.h
    det = {k: detect(img, r) for k, r in BOX_REGIONS.items()}

    def single(name, expect):
        top, bot, vs = det[name]
        rs = runs_from_edges(vs)
        assert [len(r) - 1 for r in rs] == expect, (name, [len(r) - 1 for r in rs])
        return [boxes(r, top, bot, H) for r in rs]

    euro = {p: single(f"{p}-euro", [8, 2]) for p in "LMR"}
    copies = {"L": "1", "M": "2", "R": "3"}
    part_zh = {"1": "左联", "2": "中联", "3": "右联"}
    f = []
    for p, c in copies.items():
        f.append({"id": f"B-importo-{c}", "page": 1, "section": f"PARTE {c}", "labelIt": "DI EURO",
                  "labelZh": f"金额（数字）· {part_zh[c]}", "kind": "parts",
                  "parts": [{"name": "euro", "boxes": euro[p][0]}, {"name": "centesimi", "boxes": euro[p][1]}]})
        f.append({"id": f"B-lettere-{c}", "page": 1, "section": f"PARTE {c}", "labelIt": "IMPORTO IN LETTERE",
                  "labelZh": f"金额（意大利文大写）· {part_zh[c]}", "kind": "freetext", "area": area(f"{p}-lettere", H)})
    for p, c in (("L", "1"), ("M", "2")):
        f.append({"id": f"B-eseguito-{c}", "page": 1, "section": f"PARTE {c}", "labelIt": "ESEGUITO DA",
                  "labelZh": f"缴款人姓名 · {part_zh[c]}", "kind": "freetext", "area": area(f"{p}-eseguito", H)})
        f.append({"id": f"B-residente-{c}", "page": 1, "section": f"PARTE {c}", "labelIt": "RESIDENTE IN VIA",
                  "labelZh": f"缴款人地址 · {part_zh[c]}", "kind": "freetext", "area": area(f"{p}-resid", H)})
    e1, e2 = single("R-eseg1", [22])[0], single("R-eseg2", [22])[0]
    f.append({"id": "B-eseguito-3", "page": 1, "section": "PARTE 3", "labelIt": "ESEGUITO DA",
              "labelZh": "缴款人姓名 · 右联", "kind": "boxes", "boxes": e1, "moreRows": [e2]})
    f.append({"id": "B-residente-3", "page": 1, "section": "PARTE 3", "labelIt": "RESIDENTE IN VIA - PIAZZA",
              "labelZh": "缴款人地址 · 右联", "kind": "boxes", "boxes": single("R-resid", [22])[0]})
    f.append({"id": "B-cap-3", "page": 1, "section": "PARTE 3", "labelIt": "CAP",
              "labelZh": "邮编 · 右联", "kind": "boxes", "boxes": single("R-cap", [5])[0]})
    f.append({"id": "B-localita-3", "page": 1, "section": "PARTE 3", "labelIt": "LOCALITA'",
              "labelZh": "城市 · 右联", "kind": "boxes", "boxes": single("R-loc", [16])[0]})
    return {"form": "bollettino", "source": SOURCE, "version": 1, "verifiedOn": VERIFIED_ON,
            "pageSize": {"width": img.w, "height": img.h, "unit": "image-px"}, "fields": f}


if __name__ == "__main__":
    data = build(sys.argv[1])
    with open(sys.argv[2], "w", encoding="utf-8", newline="\n") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
        fh.write("\n")
    print(f"bollettino: {len(data['fields'])} fields")
