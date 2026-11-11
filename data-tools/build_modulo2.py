"""生成 data/forms/modulo2.json。逻辑见 formbuild.py。

维护者：Claude。用法：python -I data-tools/build_modulo2.py official/2026-11-05_Modulo_2.pdf data/forms/modulo2.json
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))  # -I 模式下需要手动加入脚本目录
from formbuild import FormConfig, build, questore_header, write

# 本表很多标签重名（ALTRO、CODICE FISCALE、IN DATA……），中文标签全部按编号写
LABEL_ZH_BY_N = {
    4: "雇佣工作", 5: "自雇工作", 6: "其他工作类型",
    8: "无固定期限合同", 9: "固定期限合同", 10: "季节性合同", 11: "合同期限（月）",
    12: "其他合同类型（说明）", 13: "合同期限（天）",
    15: "个体业主（titolare）", 16: "合伙人（socio）", 17: "自由职业者（libero professionista）", 18: "其他自雇形式",
    19: "工作职务",
    21: "雇主是公司 / 法人", 22: "雇主公司名称", 23: "雇主公司税号", 24: "或雇主公司增值税号（Partita IVA）",
    25: "雇主 INPS 编号（matricola）", 26: "雇主是个人", 27: "雇主（个人）的居留号码（如有）",
    28: "雇主（个人）姓", 29: "雇主（个人）名", 30: "雇主（个人）出生日期",
    31: "雇主（个人）税号", 32: "或雇主（个人）增值税号",
    34: "在 Sportello Unico 签订了居留合同", 35: "签订地所在省（缩写）", 36: "签订日期",
    37: "居留合同已寄给 Sportello Unico", 38: "寄往的省（缩写）", 39: "挂号信号码", 40: "寄出日期",
    42: "自雇企业名称", 43: "企业税号", 44: "增值税号（Partita IVA）", 45: "INPS 编号（matricola）",
    46: "商会（C.C.I.A.A.）注册所在省", 47: "商会注册号", 48: "商会注册日期",
    49: "职业名册 / 登记簿（如律师、医生、摊贩）", 50: "职业名册登记日期",
    52: "年收入", 53: "年收入金额（欧元）", 54: "最近一次报税的年份",
    55: "个人报税表（Modello Unico persone fisiche）", 56: "合伙企业报税表（società di persone）",
    57: "公司报税表（società di capitale）", 58: "非营利机构报税表（enti non commerciali）",
    59: "CUD（现称 CU）", 60: "工资单（busta paga）", 61: "INPS 缴费单（bollettino INPS）",
    62: "月收入金额（欧元）", 63: "今年开始的自雇工作",
    65: "职业介绍中心（Centro per l'impiego）登记日期", 66: "登记所在省（缩写）", 67: "登记所在城市",
    68: "片区（circoscrizione）",
}

CONFIG = FormConfig(
    form="modulo2", prefix="M2-", source="official/2026-11-05_Modulo_2.pdf", verified_on="2026-11-05",
    label_zh={}, label_zh_by_n=LABEL_ZH_BY_N,
    checkbox={4, 5, 6, 8, 9, 10, 15, 16, 17, 18, 21, 26, 34, 37, 52, 55, 56, 57, 58, 59, 60, 61, 63},
    dates={30, 36, 40, 48, 50, 65},
    parts={39: ["numero", "controllo"], 53: ["euro", "centesimi"], 62: ["euro", "centesimi"]},
    code_table={35: "provinces", 38: "provinces", 46: "provinces", 66: "provinces"},
    no_boxes_ok={1, 2, 3, 7, 14, 20, 33, 41, 51, 64},
    header=lambda doc: questore_header(doc, "M2-"),
)

if __name__ == "__main__":
    write(build(sys.argv[1], CONFIG), sys.argv[2])
