"""从官方 PDF 提取版式数据（文字、线条、格子），供网站在空白页上重画表格（D35）。

维护者：Claude。用法：
  python -I data-tools/build_layout.py official/2026-11-05_Modulo_2.pdf data/forms/modulo2-layout.json modulo2

只读取页面上的文字和矢量路径，不修改、不复制原文件。图片（国徽）不提取。
坐标：PDF 用户空间，单位 point，原点在页面左下角（与字段数据一致）。
"""
import json
import sys

import pymupdf

VERIFIED_ON = "2026-11-05"


def hexcolor(c):
    if c is None:
        return None
    if isinstance(c, int):
        return f"#{c:06x}"
    return "#" + "".join(f"{round(v * 255):02x}" for v in c[:3])


def font_kind(name):
    n = name.lower()
    narrow = "narrow" in n
    bold = "bold" in n
    return ("narrow-" if narrow else "") + ("bold" if bold else "regular")


def page_layout(page, pno):
    inv = ~page.transformation_matrix  # 页面坐标 -> PDF 用户空间
    W, H = page.mediabox.width, page.mediabox.height

    def P(pt):
        q = pymupdf.Point(pt) * inv
        return [round(q.x, 2), round(q.y, 2)]

    texts = []
    for b in page.get_text("dict")["blocks"]:
        for line in b.get("lines", []):
            if tuple(line["dir"]) != (1.0, 0.0):
                raise SystemExit(f"第 {pno} 页有非水平文字，需要另行处理：{line}")
            for s in line["spans"]:
                if not s["text"].strip():
                    continue
                x, y = P(s["origin"])
                texts.append({"text": s["text"], "x": x, "y": y, "size": round(s["size"], 2),
                              "font": font_kind(s["font"]), "color": hexcolor(s["color"]),
                              "width": round(s["bbox"][2] - s["bbox"][0], 2)})
    paths = []
    for d in page.get_drawings():
        items = []
        for it in d["items"]:
            if it[0] == "l":
                items.append(["l", *P(it[1]), *P(it[2])])
            elif it[0] == "c":
                items.append(["c", *P(it[1]), *P(it[2]), *P(it[3]), *P(it[4])])
            elif it[0] == "qu":
                q = it[1]
                items.append(["qu", *P(q.ul), *P(q.ur), *P(q.lr), *P(q.ll)])
            elif it[0] == "re":
                r = it[1]
                items.append(["qu", *P(r.tl), *P(r.tr), *P(r.br), *P(r.bl)])
            else:
                raise SystemExit(f"未处理的路径类型 {it[0]}")
        typ = d["type"]
        paths.append({
            "stroke": hexcolor(d.get("color")) if "s" in typ else None,
            "fill": hexcolor(d.get("fill")) if "f" in typ else None,
            "lineWidth": round(d.get("width") or 0, 3) if "s" in typ else 0,
            "dashes": d.get("dashes") if d.get("dashes") not in (None, "[] 0", "[] 0.0") else None,
            "closePath": bool(d.get("closePath")),
            "evenOdd": bool(d.get("even_odd")),
            "items": items,
        })
    omitted = [{"what": "image", "bbox": [*P(pymupdf.Point(r.x0, r.y1)), *P(pymupdf.Point(r.x1, r.y0))]}
               for im in page.get_images(full=True) for r in [page.get_image_bbox(im)]]
    return {"page": pno, "width": round(W, 2), "height": round(H, 2), "texts": texts, "paths": paths,
            "omitted": omitted}


def main(pdf_path, out_path, form):
    doc = pymupdf.open(pdf_path)
    data = {
        "form": f"{form}-layout", "version": 1, "verifiedOn": VERIFIED_ON,
        "basedOn": pdf_path.replace("\\", "/"),
        "note": "重画用版式数据（D35）。字体：narrow-* 原为 Arial Narrow，regular/bold 原为 Arial；"
                "width 是原文字宽度，渲染时请把替代字体按这个宽度水平缩放。omitted 里的图片（国徽）不重画。",
        "pages": [page_layout(p, i + 1) for i, p in enumerate(doc)],
    }
    with open(out_path, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
        fh.write("\n")
    for p in data["pages"]:
        print(f"page {p['page']}: {len(p['texts'])} texts, {len(p['paths'])} paths, omitted {len(p['omitted'])}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3])
