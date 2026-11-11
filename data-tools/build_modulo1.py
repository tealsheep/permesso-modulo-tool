"""生成 data/forms/modulo1.json：从官方 PDF 的红色格子提取坐标，并按印刷编号对应字段。

维护者：Claude。需要 PyMuPDF（pip install pymupdf），不是网站运行时依赖。
用法：python -I data-tools/build_modulo1.py official/2026-11-05_Modulo_1.pdf data/forms/modulo1.json

坐标约定（与 src/data/schemas.ts 一致）：PDF point，原点在页面左下角；
boxes.x / boxes.y 是第一个格子的左下角。
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))  # -I 模式下需要手动加入脚本目录
from formbuild import FormConfig, build, questore_header, write

SOURCE = "official/2026-11-05_Modulo_1.pdf"
VERIFIED_ON = "2026-11-05"

# ---- 字段分类（按官方编号，人工核对页面图像后确定） ----
CHECKBOX = {8, 9, 10, 11, 12, 14, 15, 17, 23, 24, 40, 41, 52, 53, 59, 60, 61, 63, 64,
            88, 91, 114, 115, 117, 118, 122, 123, 125}
DATES = {20, 28, 34, 45, 48, 56, 57, 87, 132, 140, 148, 155, 163, 170}
CHOICE = {37: ["SI", "NO"]}  # 一个编号下两个勾选框
PARTS = {69: ["numero", "lettera"], 81: ["numero", "lettera"],
         74: ["prefisso", "numero"], 75: ["prefisso", "numero"]}
CODE_TABLE = {
    **{n: "provinces" for n in (5, 66, 78, 89, 92, 96, 99, 102, 105, 109)},
    16: "motivi", 19: "motivi",
    **{n: "stati" for n in (35, 36, 133, 134, 141, 142, 149, 150, 156, 157, 164, 165, 171, 172)},
    42: "documenti", 46: "autorita",
}
# 编号印在格子左边、但自动匹配会出错的格子：(页, 近似 x0, 近似 y0 顶部坐标) -> 编号
OVERRIDES = {(1, 79, 760): 28}
# 没有格子的编号（小节标题、说明、签名框），不生成字段
NO_BOXES_OK = {1, 2, 7, 13, 21, 27, 29, 30, 39, 47, 58, 62, 65, 76, 85, 86, 94, 95, 108, 112, 113,
               116, 119, 121, 127, 128, 136, 144, 159}

LABEL_ZH = {
    "COGNOME": "姓（与护照一致）", "NOME": "名（与护照一致）",
    "PROVINCIA DI DOMICILIO": "住所所在省（缩写）", "COMUNE DI DOMICILIO": "住所所在市镇",
    "RILASCIO": "首次签发", "RINNOVO": "续签", "AGGIORNAMENTO": "更新", "DUPLICATO": "补发",
    "CONVERSIONE": "转换", "PERMESSO DI SOGGIORNO": "居留许可", "CARTA DI SOGGIORNO": "居留卡（长居）",
    "CODICE TIPOLOGIA PERMESSO": "申请的居留类型代码",
    "AGGIORNAMENTO FOTO CARTA SOGGIORNO STRANIERI": "更新居留卡照片",
    "NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI": "现有居留许可 / 居留卡号码",
    "CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO": "现有居留的类型代码",
    "DATA DI SCADENZA DEL PERMESSO": "现有居留到期日",
    "INDICARE QUALI MODULI SONO STATI COMPILATI": "填写了几份表格",
    "MODULO 1": "Modulo 1", "MODULO 2": "Modulo 2",
    "INDICARE IL NUMERO TOTALE DI FOGLI": "总页数（表格 + 复印件）",
    "INDICARE IL NUMERO DICHIARATO DI FIGLI A CARICO": "申报的受抚养子女人数",
    "DATA": "填表日期",
    "CODICE FISCALE (OVE IN POSSESSO)": "税号（如有）", "STATO CIVILE": "婚姻状况（A 未婚 / B 已婚）",
    "SESSO": "性别（F 女 / M 男）", "NATO/A IL": "出生日期", "CODICE STATO NASCITA": "出生国代码",
    "CODICE STATO CITTADINANZA": "国籍代码", "RIFUGIATO": "是否难民",
    "CITTA' DI NASCITA": "出生城市",
    "PASSAPORTO": "护照", "O ALTRO TIPO DI DOCUMENTO": "或其他证件",
    "SPECIFICARE ALTRO TIPO DI DOCUMENTO": "其他证件类型代码", "ALTRO": "其他",
    "NUMERO": "号码", "VALIDO SINO AL": "有效期至", "RILASCIATO DA": "签发机关代码",
    "DATA DI INGRESSO IN ITALIA": "入境意大利日期", "FRONTIERA": "入境口岸",
    "NUMERO VISTO": "签证号码", "TIPO VISTO": "签证类型", "INGRESSO SINGOLO": "单次入境",
    "INGRESSO MULTIPLO": "多次入境", "ANNOTAZIONI / MOTIVO DEL VISTO DI INGRESSO": "签证备注 / 入境事由",
    "DURATA DEL VISTO": "签证天数", "VALIDO DAL": "签证有效期自", "SINO AL": "签证有效期至",
    "TITOLO DI VIAGGIO PER STRANIERO": "外国人旅行证", "TITOLO DI VIAGGIO PER APOLIDE": "无国籍人旅行证",
    "DOCUMENTO DI VIAGGIO PER RIFUGIATO": "难民旅行证", "1 ANNO": "1 年", "2 ANNI": "2 年",
    "PROVINCIA": "省（缩写）", "COMUNE": "市镇", "INDIRIZZO": "地址（街道）",
    "NUMERO CIVICO": "门牌号", "SCALA": "楼梯", "INTERNO": "室号", "CAP": "邮编",
    "INDIRIZZO E-MAIL (FACOLTATIVO)": "电子邮箱（选填）",
    "TELEFONO FISSO IN ITALIA (FACOLTATIVO)": "意大利固定电话（选填）",
    "TELEFONO CELLULARE IN ITALIA (FACOLTATIVO)": "意大利手机（选填）",
    "PRESSO": "收件人（转交）",
    "RILASCIATA IN DATA": "住房证明签发日期", "DAL COMUNE": "由市政府签发", "O DA ASL": "或由 ASL 签发",
    "ASL": "ASL 名称",
    "DI AVER SOGGIORNATO NEGLI ULTIMI SEI ANNI IN:": "过去六年居住地：省（缩写）",
    "ATTUALMENTE DI RISIEDERE IN:": "目前居住地：省（缩写）",
    "SI": "是", "NO": "否",
    "NUMERO PERSONE CONVIVENTI": "同住人数", "CONIUGE": "配偶", "FIGLI": "子女",
    "SPECIFICARE RAPPORTO DI PARENTELA": "说明亲属关系",
}
# 同名标签在不同位置含义不同时，按编号覆盖
LABEL_ZH_BY_N = {
    16: "申请的居留类型代码", 18: "现有居留许可 / 居留卡号码",
    43: "其他证件名称", 44: "证件号码", 124: "子女人数", 125: "其他亲属",
    114: "配偶的申请：是", 115: "配偶的申请：否", 117: "父母的申请：是", 118: "父母的申请：否",
    122: "配偶", 123: "子女",
    **{n: f"过去六年居住地 {i}：省（缩写）" for i, n in enumerate((96, 99, 102, 105), 1)},
    **{n: f"过去六年居住地 {i}：市镇" for i, n in enumerate((97, 100, 103, 106), 1)},
    **{n: f"过去六年居住地 {i}：地址" for i, n in enumerate((98, 101, 104, 107), 1)},
    109: "目前居住地：省（缩写）", 110: "目前居住地：市镇", 111: "目前居住地：地址",
}


# PDF 文字层字距异常、提取出来带多余空格的标签，按编号写死
# 75：字距异常；16、18：标签在 PDF 上折成两行，提取只拿到第一行
LABEL_IT_BY_N = {
    16: "CODICE TIPOLOGIA PERMESSO / CARTA DI SOGGIORNO IN RICHIESTA",
    18: "NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO",
    75: "TELEFONO CELLULARE IN ITALIA (FACOLTATIVO)",
}

CONFIG = FormConfig(
    form="modulo1", prefix="M1-", source=SOURCE, verified_on=VERIFIED_ON,
    label_zh=LABEL_ZH, label_zh_by_n=LABEL_ZH_BY_N, label_it_by_n=LABEL_IT_BY_N,
    checkbox=CHECKBOX, dates=DATES, choice=CHOICE, parts=PARTS, code_table=CODE_TABLE,
    overrides=OVERRIDES, no_boxes_ok=NO_BOXES_OK,
    header=lambda doc: questore_header(doc, "M1-"),
)

if __name__ == "__main__":
    write(build(sys.argv[1], CONFIG), sys.argv[2])
