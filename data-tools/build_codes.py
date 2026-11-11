"""生成 data/codes/*.json：Modulo 1/2 使用的 5 张代码表。

维护者：Claude。来源：official/2026-11-05_Informativa_Generale.pdf 附表 1–5
（附表 2 另与 portaleimmigrazione.it/ITA/tabellauffpostali.html 2024-05-30 版核对，见 MOTIVI 注释）。
需要先用 pdftotext 导出文本：
  pdftotext -enc UTF-8 -layout official/2026-11-05_Informativa_Generale.pdf <tmp>/inf.txt
  python -I data-tools/build_codes.py <tmp>/inf.txt data/codes
"""
import json
import os
import re
import sys

VERIFIED_ON = "2026-11-05"

# ---- 附表 2：申请类型代码 ----
# 第 4 项（可选）是来源说明，写进 note，不要混进给用户看的 nameZh
# PDF（Ed.10/20）有 25 Tirocinio formazione professionale，没有 34/35；
# 官网网页版（2024-05-30）去掉了 25，增加了 34/35。以较新的网页版为准，25 保留并标注。
MOTIVI = [
    ("02", "Affidamento", "寄养 / 监护托付"),
    ("03", "Aggiornamento carta di soggiorno (cambio domicilio, stato civile, inserimento figli, cambio passaporto, aggiornamento foto)",
     "更新居留卡（长居）：换住址、婚姻状况、加子女、换护照、更新照片"),
    ("04", "Aggiornamento permesso di soggiorno (cambio domicilio, stato civile, inserimento figli, cambio passaporto)",
     "更新居留许可：换住址、婚姻状况、加子女、换护照"),
    ("05", "Attesa occupazione", "等待就业"),
    ("06", "Attesa acquisto cittadinanza", "等待入籍"),
    ("07", "Asilo rinnovo", "庇护续签"),
    ("09", "Permesso di soggiorno UE per soggiornanti di lungo periodo", "欧盟长期居留"),
    ("10", "Conversione permesso di soggiorno", "居留转换"),
    ("11", "Duplicato Carta di soggiorno", "补发居留卡（长居）"),
    ("12", "Duplicato Permesso di soggiorno", "补发居留许可"),
    ("13", "Famiglia", "家庭"),
    ("14", "Famiglia minore", "家庭（未成年人 14–18 岁）"),
    ("15", "Lavoro Autonomo", "自雇工作"),
    ("16", "Lavoro Subordinato", "雇佣工作"),
    ("17", "Lavoro casi particolari previsti art.27 Testo Unico Immigrazione", "特殊工作类别（移民法第 27 条）"),
    ("18", "Lavoro subordinato-stagionale", "季节性雇佣工作"),
    ("19", "Missione", "公务派遣"),
    ("20", "Motivi Religiosi", "宗教事由"),
    ("21", "Residenza elettiva", "选择性居留"),
    ("23", "Status apolidia rinnovo", "无国籍身份续签"),
    ("24", "Motivi di Studio (art.39 TUI)", "学习（移民法第 39 条）"),
    ("25", "Tirocinio formazione professionale", "职业培训实习", "仅见于说明书 PDF（Ed.10/20），官网 2024 版已删除"),
    ("27", "Ricercatore (art. 27 ter TUI)", "研究人员（第 27 条之三）"),
    ("28", "Ricercatore - Ricerca lavoro (art.27 ter TUI)", "研究人员：找工作 / 创业"),
    ("29", "Ricercatore - Mobilità (art.27 ter TUI)", "研究人员：流动"),
    ("30", "Studente - Ricerca lavoro (art.39 bis.1 TUI)", "学生：毕业后找工作 / 创业"),
    ("31", "Studente (art.39 bis TUI)", "学生（第 39 条之二）"),
    ("32", "Alunno (art.39 bis TUI)", "中小学生（第 39 条之二）"),
    ("33", "Tirocinante (art.39 bis TUI)", "实习生（第 39 条之二）"),
    ("34", "Familiare cittadino italiano", "意大利公民家属", "仅见于官网 2024 版"),
    ("35", "Carta di soggiorno elettronica familiare cittadino UE", "欧盟公民家属电子居留卡", "仅见于官网 2024 版"),
]

# ---- 附表 4：护照以外的证件（PDF 第 9 页表格，已对照页面图像核对顺序） ----
DOCUMENTI = [
    ("01", "TITOLO DI VIAGGIO PER APOLIDI", "无国籍人旅行证"),
    ("02", "DOCUMENTO DI VIAGGIO PER RIFUGIATI", "难民旅行证"),
    ("03", "TITOLO DI VIAGGIO PER STRANIERI", "外国人旅行证"),
    ("04", "LIBRETTO DI NAVIGAZIONE PER I MARITTIMI", "海员证"),
    ("05", "DOCUMENTO DI NAVIGAZIONE AEREA", "航空机组证件"),
    ("06", "LASCIAPASSARE DELLE NAZIONI UNITE", "联合国通行证"),
    ("07", "DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO", "北约总部签发的证件"),
    ("08", "DOCUMENTO DI VIAGGIO UNMIK", "UNMIK 旅行证件"),
    ("09", "CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E.", "欧盟国家公民身份证"),
]

# ---- 附表 5：签发机关 ----
AUTORITA = [
    ("01", "GOVERNO", "政府"),
    ("02", "RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO", "本国驻外使领馆（意大利以外）"),
    ("03", "RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA", "本国驻意大利使领馆"),
    ("04", "RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO", "本国驻梵蒂冈使领馆"),
    ("05", "ONU – LASCIAPASSARE PROPRI DIRIGENTI", "联合国（官员通行证）"),
    ("06", "QUESTURA", "警察局（Questura）"),
]

# ---- 附表 3：国家代码的中文名 ----
STATI_ZH = {
    "AFG": "阿富汗", "ALB": "阿尔巴尼亚", "DZA": "阿尔及利亚", "AND": "安道尔", "AGO": "安哥拉",
    "AIA": "安圭拉", "ATG": "安提瓜和巴布达", "XXX": "无国籍", "SAU": "沙特阿拉伯", "ARG": "阿根廷",
    "ARM": "亚美尼亚", "AUS": "澳大利亚", "AUT": "奥地利", "AZE": "阿塞拜疆", "BHS": "巴哈马",
    "BHR": "巴林", "BGD": "孟加拉国", "BRB": "巴巴多斯", "BEL": "比利时", "BLZ": "伯利兹",
    "BEN": "贝宁", "BMU": "百慕大", "BTN": "不丹", "BLR": "白俄罗斯", "BOL": "玻利维亚",
    "BIH": "波斯尼亚和黑塞哥维那", "BWA": "博茨瓦纳", "BRA": "巴西", "BRN": "文莱", "BGR": "保加利亚",
    "BFA": "布基纳法索", "BDI": "布隆迪", "KHM": "柬埔寨", "CMR": "喀麦隆", "CAN": "加拿大",
    "CPV": "佛得角", "CYM": "开曼群岛", "CAF": "中非", "CXR": "圣诞岛", "TCD": "乍得",
    "CHL": "智利", "CHN": "中国", "CYP": "塞浦路斯", "VAT": "梵蒂冈", "CCK": "科科斯群岛",
    "COL": "哥伦比亚", "COM": "科摩罗", "COG": "刚果（布）", "PRK": "朝鲜", "KOR": "韩国",
    "CIV": "科特迪瓦", "CRI": "哥斯达黎加", "HRV": "克罗地亚", "CUB": "古巴", "DNK": "丹麦",
    "DMA": "多米尼克", "ECU": "厄瓜多尔", "EGY": "埃及", "SLV": "萨尔瓦多", "ARE": "阿联酋",
    "ERI": "厄立特里亚", "EST": "爱沙尼亚", "ETH": "埃塞俄比亚", "XXA": "前苏联", "FRO": "法罗群岛",
    "FJI": "斐济", "PHL": "菲律宾", "FIN": "芬兰", "FRA": "法国", "GAB": "加蓬",
    "GMB": "冈比亚", "GEO": "格鲁吉亚", "DEU": "德国", "GHA": "加纳", "JAM": "牙买加",
    "JPN": "日本", "DJI": "吉布提", "JOR": "约旦", "GRC": "希腊", "GRD": "格林纳达",
    "GRL": "格陵兰", "GLP": "瓜德罗普", "GUM": "关岛", "GTM": "危地马拉", "GUF": "法属圭亚那",
    "GIN": "几内亚", "GNB": "几内亚比绍", "GNQ": "赤道几内亚", "GUY": "圭亚那", "HTI": "海地",
    "HND": "洪都拉斯", "HKG": "中国香港", "IND": "印度", "IDN": "印度尼西亚", "IRN": "伊朗",
    "IRQ": "伊拉克", "IRL": "爱尔兰", "ISL": "冰岛", "VIR": "美属维尔京群岛", "ISR": "以色列",
    "ITA": "意大利", "KAZ": "哈萨克斯坦", "KEN": "肯尼亚", "KGZ": "吉尔吉斯斯坦", "KIR": "基里巴斯",
    "KOS": "科索沃", "KWT": "科威特", "REU": "留尼汪", "LAO": "老挝", "LSO": "莱索托",
    "LVA": "拉脱维亚", "LBN": "黎巴嫩", "LBR": "利比里亚", "LBY": "利比亚", "LIE": "列支敦士登",
    "LTU": "立陶宛", "LUX": "卢森堡", "MAC": "中国澳门", "MDG": "马达加斯加", "MWI": "马拉维",
    "MYS": "马来西亚", "MDV": "马尔代夫", "MLI": "马里", "MLT": "马耳他", "FLK": "马尔维纳斯群岛（福克兰群岛）",
    "MAR": "摩洛哥", "MHL": "马绍尔群岛", "MTQ": "马提尼克", "MRT": "毛里塔尼亚", "MUS": "毛里求斯",
    "MYT": "马约特", "MEX": "墨西哥", "FSM": "密克罗尼西亚联邦", "MDA": "摩尔多瓦", "MCO": "摩纳哥",
    "MNG": "蒙古", "MNE": "黑山", "MSR": "蒙特塞拉特", "MOZ": "莫桑比克", "MMR": "缅甸",
    "NAM": "纳米比亚", "NRU": "瑙鲁", "NPL": "尼泊尔", "NIC": "尼加拉瓜", "NER": "尼日尔",
    "NGA": "尼日利亚", "NFK": "诺福克岛", "NOR": "挪威", "NCL": "新喀里多尼亚", "NZL": "新西兰",
    "OMN": "阿曼", "NLD": "荷兰", "PAK": "巴基斯坦", "PLW": "帕劳", "PSE": "巴勒斯坦",
    "PAN": "巴拿马", "PNG": "巴布亚新几内亚", "PRY": "巴拉圭", "PER": "秘鲁", "PCN": "皮特凯恩群岛",
    "PYF": "法属波利尼西亚", "POL": "波兰", "PRT": "葡萄牙", "PRI": "波多黎各", "QAT": "卡塔尔",
    "GBR": "英国", "CZE": "捷克", "COD": "刚果（金）", "MKD": "北马其顿", "DOM": "多米尼加共和国",
    "SVK": "斯洛伐克", "ROU": "罗马尼亚", "RWA": "卢旺达", "RUS": "俄罗斯", "KNA": "圣基茨和尼维斯",
    "ESH": "西撒哈拉", "LCA": "圣卢西亚", "SPM": "圣皮埃尔和密克隆", "VCT": "圣文森特和格林纳丁斯",
    "SLB": "所罗门群岛", "WSM": "萨摩亚", "ASM": "美属萨摩亚", "SMR": "圣马力诺", "SHN": "圣赫勒拿",
    "STP": "圣多美和普林西比", "SYC": "塞舌尔", "SEN": "塞内加尔", "SRB": "塞尔维亚", "SLE": "塞拉利昂",
    "SGP": "新加坡", "SYR": "叙利亚", "SVN": "斯洛文尼亚", "SOM": "索马里", "ESP": "西班牙",
    "LKA": "斯里兰卡", "USA": "美国", "ZAF": "南非", "SSD": "南苏丹", "SDN": "苏丹",
    "SUR": "苏里南", "SWE": "瑞典", "CHE": "瑞士", "SWZ": "斯威士兰（埃斯瓦蒂尼）", "TJK": "塔吉克斯坦",
    "TWN": "中国台湾", "TZA": "坦桑尼亚", "THA": "泰国", "TLS": "东帝汶", "TGO": "多哥",
    "TKL": "托克劳", "TON": "汤加", "TTO": "特立尼达和多巴哥", "TUN": "突尼斯", "TUR": "土耳其",
    "TKM": "土库曼斯坦", "TCA": "特克斯和凯科斯群岛", "TUV": "图瓦卢", "UKR": "乌克兰", "UGA": "乌干达",
    "HUN": "匈牙利", "URY": "乌拉圭", "UZB": "乌兹别克斯坦", "VUT": "瓦努阿图", "VEN": "委内瑞拉",
    "VGB": "英属维尔京群岛", "VNM": "越南", "WLF": "瓦利斯和富图纳", "YEM": "也门", "ZMB": "赞比亚",
    "ZWE": "津巴布韦",
}


def section(txt, start, end):
    i = txt.index(start)
    return txt[i:txt.index(end, i)]


def parse_provinces(txt):
    body = section(txt, "CODICI SIGLE PROVINCE", "Tabella allegata n. 1")
    out = []
    for line in body.splitlines():
        for m in re.finditer(r"([A-Z][A-Z' ]*?[A-Z])\s{2,}([A-Z]{2})(?=\s{2,}|\s*$)", line):
            out.append((m.group(2), m.group(1).strip()))
    return out


def parse_stati(txt):
    body = section(txt, "CODICI STATO", "ALLEGATA n. 4")
    out = []
    for line in body.splitlines():
        if any(k in line for k in ("Nome Stato", "CODICE STATO", "CODICI STATO", "TABELLA")):
            continue
        for m in re.finditer(r"([A-Z][A-Z'().\- ]*?[A-Z')])\s{2,}([A-Z](?: ?[A-Z]){2})(?=\s{2,}|\s*$)", line):
            name, code = m.group(1).strip(), m.group(2).replace(" ", "")
            if sum(len(t) == 1 for t in name.split(" ")) >= 2:  # PDF 字距导致的 "BOL I V I A"
                name = name.replace(" ", "")
            out.append((code, name))
    return out


def table(name, entries, note=None):
    t = {"version": 1, "verifiedOn": VERIFIED_ON, "table": name,
         "source": "official/2026-11-05_Informativa_Generale.pdf"}
    if note:
        t["note"] = note
    t["entries"] = entries
    return t


def main(txt_path, out_dir):
    txt = open(txt_path, encoding="utf-8").read()
    provinces = parse_provinces(txt)
    stati = parse_stati(txt)
    assert len(provinces) == 105, len(provinces)
    assert len(stati) == 230, len(stati)
    missing = [c for c, _ in stati if c not in STATI_ZH]
    assert not missing, f"缺中文国名：{missing}"
    tables = {
        "provinces": table("provinces", [{"code": c, "nameIt": n} for c, n in sorted(provinces, key=lambda p: p[1])],
                           note="官方附表 1（Ed.10/20）共 105 个省，不含 2010 年后新设或恢复的省份"
                                "（如 BT Barletta-Andria-Trani、SU Sud Sardegna）。见 docs/OPEN_QUESTIONS.md。"),
        "motivi": table("motivi", [{"code": m[0], "nameIt": m[1], "nameZh": m[2], **({"note": m[3]} if len(m) > 3 else {})}
                                   for m in MOTIVI],
                        note="以 portaleimmigrazione.it/ITA/tabellauffpostali.html（2024-05-30）为准；"
                             "25 仅见于 PDF，34/35 仅见于网页。"),
        "stati": table("stati", [{"code": c, "nameIt": n, "nameZh": STATI_ZH[c]}
                                 for c, n in sorted(stati, key=lambda p: p[1])]),
        "documenti": table("documenti", [{"code": c, "nameIt": it, "nameZh": zh} for c, it, zh in DOCUMENTI]),
        "autorita": table("autorita", [{"code": c, "nameIt": it, "nameZh": zh} for c, it, zh in AUTORITA]),
    }
    os.makedirs(out_dir, exist_ok=True)
    for name, t in tables.items():
        with open(os.path.join(out_dir, f"{name}.json"), "w", encoding="utf-8", newline="\n") as fh:
            json.dump(t, fh, ensure_ascii=False, indent=2)
            fh.write("\n")
        print(name, len(t["entries"]))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
