"""生成 P1 业务规则数据：application-types、fees、materials、mapping。

维护者：Claude。用法：python -I data-tools/build_rules.py data
格式约定见 docs/DATA-MODEL.md。材料来源见每条的 basis：
  official = portaleimmigrazione.it 该类型页面（2024-07-22 版，2026-11-05 核对）
  kit      = 所有 kit 申请的通用要求（nuovaProcedura.html）
  decision = 用户决策（D 编号）
  common   = 实务中常被要求、官方页面未列出，标"以当地 Questura 为准"
"""
import json
import os
import sys

V = {"version": 1, "verifiedOn": "2026-11-05"}
P1 = ["16", "15", "09", "03"]
P2A = ["04", "12", "11", "13", "14", "24", "31", "30", "05"]   # P2 A 批（D45；调研见 docs/research/p2-batch-a.md）
P2B = ["10", "18", "21", "06", "02"]   # P2 B 批（D47；17 移到 C 批；调研见 docs/research/p2-batch-b.md）
P2C1 = ["32", "33", "19", "20", "27", "28", "29", "23", "07"]   # P2 C1（D48；34 / 35 暂不做，17 在 C2；见 docs/research/p2-batch-c.md）
P2C2 = ["17"]   # P2 C2（D49：只做续签，14 个子类，L 不做；见 docs/research/p2-batch-c.md §4）
ALL = P1 + P2A + P2B + P2C1 + P2C2
CARTA = ["09", "03", "11"]     # 长居卡（carta di soggiorno）类：M1-015；其余为居留许可：M1-014
WITH_M2 = ["16", "15", "09", "30", "05", "18", "21", "27", "28", "29"]
M2_IF_INCOME = ["24", "31", "32", "33", "23", "07"]    # 有收入时才加 Modulo 2（学生打工；07 / 23 有收入的）
STUDY = ["24", "31", "32", "33"]
CENTRO_IMPIEGO = ["05", "30", "28"]  # Modulo 2 第 6 节：在 centro per l'impiego 登记
# 17：按第 27 条子类决定要不要 Modulo 2（moduli "1+2-when" + modulo2When，D49）
ART27_LETTERS = ["a", "b", "c", "d", "e", "f", "i", "m", "n", "o", "p", "q", "r", "r-bis"]
ART27_M2 = ["a", "b", "c", "d", "e", "o", "p", "r"]   # 官方续签写 Modulo 1 e 2 的子类；其余只要 Modulo 1
VISA_FIRST = STUDY + ["21", "19", "20"]    # 第一次申请时填 Modulo 1 第 5 节签证（凭签证入境后的首次签发）


def dump(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
        fh.write("\n")
    print(path)


# ---------------- 申请类型 ----------------
# group：选申请页的分组（UI-DESIGN §3.3）。rinnovo 续签 / rilascio 第一次申请 / aggiornamento 更新、补发、转换
# alsoInGroups（可选，D46）：同时显示在其他分组；从那个分组点进去时，办理方式取该分组对应的 operation
STUDENT_39BIS_NOTE = ("31、32、33 三类官方要求相同，按你的签证或现有居留上写的类型选："
                      "Studente 选 31（成年人读高中、IFTS / ITS 等课程），Alunno 选 32（未成年学生），"
                      "Tirocinante 选 33（职业培训、实习）。")
TYPES = [
    {"code": "16", "nameIt": "Lavoro subordinato", "nameZh": "雇佣工作", "titleZh": "工作居留续签", "group": "rinnovo", "channel": "kit",
     "operations": ["rinnovo"], "sportelloUnicoFills": ["rilascio"], "moduli": "1+2",
     "materials": "data/materials/16.json", "feeRule": "contributo-per-durata",
     "profile": {"workStep": "work", "workTypes": ["subordinato"], "duration": {"source": "contract"}}},
    {"code": "15", "nameIt": "Lavoro autonomo", "nameZh": "自雇工作", "titleZh": "自雇居留续签", "group": "rinnovo", "channel": "kit",
     "operations": ["rinnovo"], "sportelloUnicoFills": ["rilascio"], "moduli": "1+2",
     "materials": "data/materials/15.json", "feeRule": "contributo-per-durata",
     "profile": {"workStep": "work", "workTypes": ["autonomo"], "duration": {"source": "fixed", "months": 24}}},
    {"code": "09", "nameIt": "Permesso di soggiorno UE per soggiornanti di lungo periodo", "nameZh": "欧盟长期居留", "titleZh": "首次申请长居",
     "group": "rilascio", "channel": "kit", "operations": ["rilascio"], "sportelloUnicoFills": [], "moduli": "1+2",
     "materials": "data/materials/09.json", "feeRule": "lungo-periodo",
     "profile": {"workStep": "work", "sections": ["idoneita", "currentResidence", "pastResidences", "dependents"]}},
    {"code": "03", "nameIt": "Aggiornamento carta di soggiorno", "nameZh": "更新长居卡", "group": "aggiornamento", "channel": "kit",
     "operations": ["aggiornamento"], "sportelloUnicoFills": [], "moduli": "1",
     "materials": "data/materials/03.json", "feeRule": "senza-contributo",
     "profile": {"sections": ["aggiornamentoReasons"]}},
    # ---- P2 A 批 ----
    {"code": "04", "nameIt": "Aggiornamento permesso di soggiorno", "nameZh": "更新居留许可", "group": "aggiornamento", "channel": "kit",
     "operations": ["aggiornamento"], "sportelloUnicoFills": [], "moduli": "1",
     "materials": "data/materials/04.json", "feeRule": "senza-contributo",
     "profile": {"sections": ["aggiornamentoReasons"]}},
    {"code": "12", "nameIt": "Duplicato permesso di soggiorno", "nameZh": "补发居留许可", "group": "aggiornamento", "channel": "kit",
     "operations": ["duplicato"], "sportelloUnicoFills": [], "moduli": "1",
     "materials": "data/materials/12.json", "feeRule": "senza-contributo",
     "profile": {}},
    {"code": "11", "nameIt": "Duplicato carta di soggiorno", "nameZh": "补发长居卡", "group": "aggiornamento", "channel": "kit",
     "operations": ["duplicato"], "sportelloUnicoFills": [], "moduli": "1",
     "materials": "data/materials/11.json", "feeRule": "senza-contributo",
     "profile": {}},
    {"code": "13", "nameIt": "Famiglia", "nameZh": "家庭", "titleZh": "家庭居留续签", "group": "rinnovo", "channel": "kit",
     "operations": ["rinnovo"], "sportelloUnicoFills": ["rilascio"], "moduli": "1",
     "materials": "data/materials/13.json", "feeRule": "contributo-per-durata",
     "profile": {"sections": ["sponsor"], "duration": {"source": "sponsor"}, "operationChooser": True}},
    {"code": "14", "nameIt": "Famiglia minore", "nameZh": "家庭（14–18 岁未成年人）", "titleZh": "未成年人家庭居留续签", "group": "rinnovo", "channel": "kit",
     "operations": ["rinnovo"], "sportelloUnicoFills": ["rilascio"], "moduli": "1",
     "materials": "data/materials/14.json", "feeRule": "contributo-per-durata",
     "profile": {"operationChooser": True}},
    {"code": "24", "nameIt": "Motivi di studio (art. 39 TUI)", "nameZh": "学习（大学）", "group": "rinnovo", "channel": "kit",
     "operations": ["rilascio", "rinnovo"], "sportelloUnicoFills": [], "moduli": "1+2-if-income",
     "materials": "data/materials/24.json", "feeRule": "contributo-per-durata",
     "profile": {"noCurrentPermitFor": ["rilascio"], "visaFor": ["rilascio"], "workStep": "student",
                 "duration": {"source": "question"}},
     "alsoInGroups": ["rilascio"]},
    {"code": "31", "nameIt": "Studente (art. 39 bis TUI)", "nameZh": "学生（成年人读高中、技术培训课程）", "group": "rinnovo", "channel": "kit",
     "operations": ["rilascio", "rinnovo"], "sportelloUnicoFills": [], "moduli": "1+2-if-income",
     "materials": "data/materials/31.json", "feeRule": "contributo-per-durata",
     "noteZh": STUDENT_39BIS_NOTE,
     "profile": {"noCurrentPermitFor": ["rilascio"], "visaFor": ["rilascio"], "workStep": "student",
                 "duration": {"source": "question"}},
     "alsoInGroups": ["rilascio"]},
    # 30：从学习居留转换（D55）。Questura di Treviso 官方指南写"CONVERSIONE … in permesso di soggiorno per ricerca lavoro"
    #（research/official-facts.md §10.2）。转换不收 contributo，只付 €30,46，所以不问期限。分组仍放"第一次申请"，方便找。
    {"code": "30", "nameIt": "Studente - Ricerca lavoro / imprenditorialità (art. 39 bis.1 TUI)", "nameZh": "毕业后找工作 / 创业",
     "group": "rilascio", "channel": "kit", "operations": ["conversione"], "sportelloUnicoFills": [], "moduli": "1+2",
     "materials": "data/materials/30.json", "feeRule": "contributo-per-durata",
     "profile": {"workStep": "income-optional", "sections": ["employmentCentre"]}},
    {"code": "05", "nameIt": "Attesa occupazione", "nameZh": "等待就业（失业后）", "group": "rinnovo", "channel": "kit",
     "operations": ["rinnovo"], "sportelloUnicoFills": [], "moduli": "1+2",
     "materials": "data/materials/05.json", "feeRule": "contributo-per-durata",
     "profile": {"workStep": "income-optional", "sections": ["employmentCentre"], "duration": {"source": "question"}}},
    # ---- P2 B 批（官方页面见 docs/research/p2-batch-b.md；D47） ----
    # 10：只办"转换"。官方费用表：conversione 不收 contributo，只付 €30,46（见 FEES 的 conversione-senza-contributo）
    {"code": "10", "nameIt": "Conversione in permesso per motivi familiari", "nameZh": "转为家庭居留", "group": "aggiornamento",
     "channel": "kit", "operations": ["conversione"], "sportelloUnicoFills": [], "moduli": "1",
     "materials": "data/materials/10.json", "feeRule": "contributo-per-durata",
     "profile": {"sections": ["sponsorKind"]},
     "noteZh": "适用于已在意大利合法居留、要把现有居留转为家庭居留的人，例如在意大利结婚的。"
               "要团聚的家属是外国人的，要在你现有居留到期前的最后一年内申请。"},
    # 18：首次签发由 Sportello Unico 填；多年期季节工居留要直接去 Questura
    {"code": "18", "nameIt": "Lavoro subordinato stagionale", "nameZh": "季节性工作", "titleZh": "季节性工作续签", "group": "rinnovo",
     "channel": "kit", "operations": ["rinnovo"], "sportelloUnicoFills": ["rilascio"], "moduli": "1+2",
     "materials": "data/materials/18.json", "feeRule": "contributo-per-durata",
     "profile": {"workStep": "work", "workTypes": ["subordinato"], "contracts": ["stagionale"], "duration": {"source": "contract"}},
     "noteZh": "季节工授权最长 9 个月。多年期季节工居留（pluriennale）不走邮局，要直接去 Questura 移民局办。"},
    {"code": "21", "nameIt": "Residenza elettiva", "nameZh": "选择性居留", "group": "rinnovo", "channel": "kit",
     "operations": ["rilascio", "rinnovo"], "sportelloUnicoFills": [], "moduli": "1+2",
     "materials": "data/materials/21.json", "feeRule": "contributo-per-durata", "alsoInGroups": ["rilascio"],
     "profile": {"noCurrentPermitFor": ["rilascio"], "visaFor": ["rilascio"], "workStep": "income",
                 "duration": {"source": "question"}},
     "noteZh": "选择性居留不能工作。收入要来自房产、养老金等工作以外的合法来源，写在 Modulo 2 的收入部分。"},
    # 06：第一次办（现有居留是别的类型）按 rilascio；办过 06 的按 rinnovo（OPEN_QUESTIONS：第一次办是否应勾 conversione）
    {"code": "06", "nameIt": "Attesa acquisto cittadinanza", "nameZh": "等待入籍", "group": "rinnovo", "channel": "kit",
     "operations": ["rilascio", "rinnovo"], "sportelloUnicoFills": [], "moduli": "1",
     "materials": "data/materials/06.json", "feeRule": "contributo-per-durata", "alsoInGroups": ["rilascio"],
     "profile": {"duration": {"source": "question"}},
     "noteZh": "已经申请意大利国籍、在等待结果的人办这一类。第一次办的，“现有居留”填你现在那张别的类型的居留。"},
    # 02：首次签发去 Questura；免印花税票；只有未成年人，contributo 按未成年免
    {"code": "02", "nameIt": "Affidamento", "nameZh": "寄养 / 监护托付", "titleZh": "寄养居留续签", "group": "rinnovo",
     "channel": "kit", "operations": ["rinnovo"], "sportelloUnicoFills": [], "moduli": "1",
     "materials": "data/materials/02.json", "feeRule": "contributo-per-durata", "stampExempt": True,
     "profile": {},
     "noteZh": "表格以孩子的名义填写。孩子未满 14 岁的，由受托照顾孩子的人（affidatario）签名；14–18 岁的，孩子和 affidatario 都要签名。"
               "这一类不用贴 €16 印花税票。第一次签发要去 Questura 办。"},
    # ---- P2 C1（官方页面见 docs/research/p2-batch-c.md；D48） ----
    # 32 / 33：和 31 同一套官方说明（第 39 条之二），只是人群不同
    {"code": "32", "nameIt": "Alunno (art. 39 bis TUI)", "nameZh": "未成年学生（第 39 条之二）", "group": "rinnovo", "channel": "kit",
     "operations": ["rilascio", "rinnovo"], "sportelloUnicoFills": [], "moduli": "1+2-if-income",
     "materials": "data/materials/32.json", "feeRule": "contributo-per-durata", "alsoInGroups": ["rilascio"],
     "profile": {"noCurrentPermitFor": ["rilascio"], "visaFor": ["rilascio"], "workStep": "student", "duration": {"source": "question"}},
     "noteZh": STUDENT_39BIS_NOTE},
    {"code": "33", "nameIt": "Tirocinante (art. 39 bis TUI)", "nameZh": "职业培训 / 实习生（第 39 条之二）", "group": "rinnovo", "channel": "kit",
     "operations": ["rilascio", "rinnovo"], "sportelloUnicoFills": [], "moduli": "1+2-if-income",
     "materials": "data/materials/33.json", "feeRule": "contributo-per-durata", "alsoInGroups": ["rilascio"],
     "profile": {"noCurrentPermitFor": ["rilascio"], "visaFor": ["rilascio"], "workStep": "student", "duration": {"source": "question"}},
     "noteZh": STUDENT_39BIS_NOTE},
    {"code": "19", "nameIt": "Missione", "nameZh": "公务派遣", "group": "rinnovo", "channel": "kit",
     "operations": ["rilascio", "rinnovo"], "sportelloUnicoFills": [], "moduli": "1",
     "materials": "data/materials/19.json", "feeRule": "contributo-per-durata", "alsoInGroups": ["rilascio"],
     "profile": {"noCurrentPermitFor": ["rilascio"], "visaFor": ["rilascio"], "duration": {"source": "question"}},
     "noteZh": "受政府机关、公立或私立机构、国际组织派遣来意大利执行任务的人办这一类。续签要附派遣单位出具的任务仍在进行的声明。"},
    {"code": "20", "nameIt": "Motivi religiosi", "nameZh": "宗教事由", "group": "rinnovo", "channel": "kit",
     "operations": ["rilascio", "rinnovo"], "sportelloUnicoFills": [], "moduli": "1",
     "materials": "data/materials/20.json", "feeRule": "contributo-per-durata", "alsoInGroups": ["rilascio"],
     "profile": {"noCurrentPermitFor": ["rilascio"], "visaFor": ["rilascio"], "duration": {"source": "question"}}},
    # 27 / 29：首次签发由 Sportello Unico 填；只做续签
    {"code": "27", "nameIt": "Ricercatore (art. 27 ter TUI)", "nameZh": "研究人员（第 27 条之三）", "group": "rinnovo", "channel": "kit",
     "operations": ["rinnovo"], "sportelloUnicoFills": ["rilascio"], "moduli": "1+2",
     "materials": "data/materials/27.json", "feeRule": "contributo-per-durata",
     "profile": {"workStep": "work", "duration": {"source": "question"}},
     "noteZh": "研究项目延期时才能续签，期限和延期的时间一样长，要附续签后的接待协议（convenzione di accoglienza）。"},
    # 28：研究结束后找工作 / 创业，和 30 同样的结构：从 27 转换（D55，同一份 Treviso 指南 F 节），只付 €30,46
    {"code": "28", "nameIt": "Ricercatore - Ricerca lavoro / imprenditorialità (art. 27 ter TUI)", "nameZh": "研究人员：找工作 / 创业",
     "group": "rilascio", "channel": "kit", "operations": ["conversione"], "sportelloUnicoFills": [], "moduli": "1+2",
     "materials": "data/materials/28.json", "feeRule": "contributo-per-durata",
     "profile": {"workStep": "income-optional", "sections": ["employmentCentre"]},
     "noteZh": "研究工作结束后找工作或创业的人办这一类。“现有居留”填你的研究人员居留。"},
    {"code": "29", "nameIt": "Ricercatore - Mobilità (art. 27 ter TUI)", "nameZh": "研究人员：流动", "group": "rinnovo", "channel": "kit",
     "operations": ["rinnovo"], "sportelloUnicoFills": ["rilascio"], "moduli": "1+2",
     "materials": "data/materials/29.json", "feeRule": "contributo-per-durata",
     "profile": {"workStep": "work", "duration": {"source": "question"}},
     "noteZh": "持其他欧盟国家研究人员居留、来意大利做研究的人办这一类。"},
    {"code": "23", "nameIt": "Status apolidia rinnovo", "nameZh": "无国籍身份续签", "group": "rinnovo", "channel": "kit",
     "operations": ["rinnovo"], "sportelloUnicoFills": [], "moduli": "1+2-if-income",
     "materials": "data/materials/23.json", "feeRule": "contributo-per-durata",
     "profile": {"workStep": "income-optional", "duration": {"source": "question"}},
     "noteZh": "已申请认定无国籍身份、在等待结果的人续签用。有收入的，填收入一步，会另生成 Modulo 2。"},
    # 07：DM 6 ottobre 2011 第 3 条：庇护免 contributo（只付 €30,46）
    {"code": "07", "nameIt": "Asilo rinnovo", "nameZh": "庇护续签", "titleZh": "庇护居留续签", "group": "rinnovo", "channel": "kit",
     "operations": ["rinnovo"], "sportelloUnicoFills": [], "moduli": "1+2-if-income",
     "materials": "data/materials/07.json", "feeRule": "senza-contributo",
     "profile": {"workStep": "income-optional"},
     "noteZh": "有收入的，填收入一步，会另生成 Modulo 2。本工具不支持同时续办旅行证件（Modulo 1 第 6 节）；要一起办的，请先问 Questura。"},
    # 17：第 27 条特殊工作（D49）。首次签发由 Sportello Unico 在签居留合同时填，只做续签；
    # 子类存在 application.art27Letter，决定 Modulo 2、€100 档（A）和材料。L 页面没写续签，不收。
    {"code": "17", "nameIt": "Lavoro subordinato - casi particolari (art. 27 TUI)",
     "nameZh": "特殊工作（第 27 条：高管、教授、翻译、艺人、运动员、护士等）", "titleZh": "特殊工作居留续签",
     "group": "rinnovo", "channel": "kit",
     "operations": ["rinnovo"], "sportelloUnicoFills": ["rilascio"], "moduli": "1+2-when",
     "modulo2When": {"equals": {"application.art27Letter": ART27_M2}},
     "materials": "data/materials/17.json", "feeRule": "contributo-per-durata",
     "profile": {"workStep": "work", "workTypes": ["subordinato"], "sections": ["art27Letter"], "duration": {"source": "question"}},
     "noteZh": "凭第 27 条特别名额（不占 Decreto Flussi 配额）来工作的人续签用。"
               "先选你的类别，要不要 Modulo 2、要附什么材料都按类别定。"
               "第一次签发由 Sportello Unico 在签居留合同时代填；打工度假（vacanze lavoro）直接去 Questura 办，不走邮局。"},
]

# ---------------- 费用（D26、D34；整数分） ----------------
FEES = {**V, "cardCents": 3046, "postageCents": 3000, "stampCents": 1600, "rules": [
    {"id": "durata-minore", "feeRule": "contributo-per-durata", "priority": 100, "when": {"minor": True}, "contributionCents": 0},
    {"id": "durata-fino-1-anno", "feeRule": "contributo-per-durata", "priority": 10,
     "when": {"minDurationMonths": 4, "maxDurationMonths": 12}, "contributionCents": 4000},
    {"id": "durata-oltre-1-anno", "feeRule": "contributo-per-durata", "priority": 10,
     "when": {"minDurationMonths": 13}, "contributionCents": 5000},
    # DM 5 maggio 2017：40 € 档是"superiore a tre mesi e inferiore o pari a un anno"，3 个月及以下不交 contributo
    # （official-facts §5.1；2026-11-06 Codex 发现 13 推算出 1–3 个月时缺档）
    {"id": "durata-fino-3-mesi", "feeRule": "contributo-per-durata", "priority": 10,
     "when": {"maxDurationMonths": 3}, "contributionCents": 0},
    {"id": "lungo-periodo-minore", "feeRule": "lungo-periodo", "priority": 100, "when": {"minor": True}, "contributionCents": 0},
    {"id": "lungo-periodo", "feeRule": "lungo-periodo", "priority": 10, "when": {}, "contributionCents": 10000},
    {"id": "senza-contributo", "feeRule": "senza-contributo", "priority": 10, "when": {}, "contributionCents": 0},
    # 官方费用表（tabelleCosti.html）：aggiornamento / conversione / duplicato 都"non previsto"contributo，只付 €30,46。
    # 按办理方式判断，优先于期限档位；未成年规则（100）仍在它之上，结果一样是 0。
    {"id": "conversione-senza-contributo", "feeRule": "contributo-per-durata", "priority": 50,
     "when": {"operations": ["conversione"]}, "contributionCents": 0},
    # 同一张费用表：dirigenti / personale altamente specializzato（第 27 条第 1 款 a 项，17 的 A 类）交 €100，和长居一样
    # （p2-batch-b.md §1）。17 只做续签，不和上面的转换规则冲突；未成年规则仍在它之上。
    {"id": "art27-dirigenti", "feeRule": "contributo-per-durata", "priority": 60,
     "when": {"applicationCodes": ["17"], "equals": {"application.art27Letter": "a"}}, "contributionCents": 10000},
]}

# ---------------- 材料（D11 名称 + 中文；D18 以当地 Questura 为准） ----------------
def item(it, zh, basis, condition=None):
    d = {"nameIt": it, "nameZh": zh, "basis": basis}
    if condition:
        d["condition"] = condition
    return d


def common(moduli, renewal=True, stamp=True, student=True):
    """renewal：True 总是列出现有居留复印件；False 不列；也可传一个条件（如只在续签时列）。
    stamp：False 时不列 €16 印花税票（02 寄养免印花税）。"""
    if moduli == "1+2-if-income":
        out = [
            item("Istanza compilata e sottoscritta (Modulo 1)", "填好并签名的申请表（Modulo 1）", "official"),
            item("Modulo 2 compilato e sottoscritto (per lo studente lavoratore)", "有工作收入的：另附填好并签名的 Modulo 2",
                 "official", {"hasIncome": True}) if student else
            item("Modulo 2 compilato e sottoscritto (se in possesso di reddito)", "有收入的：另附填好并签名的 Modulo 2",
                 "official", {"hasIncome": True}),
        ]
    else:
        out = [
            item("Istanza compilata e sottoscritta (Modulo 1 e 2)" if moduli == "1+2" else "Istanza compilata e sottoscritta (Modulo 1)",
                 "填好并签名的申请表（Modulo 1 和 2）" if moduli == "1+2" else "填好并签名的申请表（Modulo 1）", "official"),
        ]
    if stamp:
        out.append(item("Marca da bollo da 16,00 euro", "16 欧元印花税票（贴在 Modulo 1 第 1 页）", "kit"))
    out.append(item("Fotocopia di tutto il passaporto o di altro documento equipollente", "整本护照（或同等证件）的复印件", "official"))
    if renewal:
        out.append(item("Fotocopia del permesso / carta di soggiorno da rinnovare o aggiornare",
                        "要续签 / 更新的居留许可或居留卡复印件", "kit", None if renewal is True else renewal))
    out.append(item("Ricevuta del bollettino postale", "缴费单收据（邮局付款后放入信封）", "kit"))
    out.append(item("4 fototessere (da portare in Questura)", "4 张证件照（去 Questura 按指纹时带上）", "common"))
    return out


MATERIALS = {
    "16": common("1+2") + [
        # 官网页面写的"居留合同 + 挂号信回执"是 2011 年以前的做法：2011-11-15 起换雇主时由 UNILAV 代替
        # （劳动部 2011-11-28 第 4773 号通知），所以不再列出；仍是入境时那位雇主的，也属于"合同没有变化"，官方不要求附。
        item("Fotocopia delle ultime buste paga", "最近几个月的工资单复印件", "official",
             {"equals": {"work.hiredThisYear": True}}),
        item("Contratto di lavoro / comunicazione obbligatoria (UNILAV)",
             "劳动合同 / 雇佣登记（UNILAV）。换过雇主的，新雇主的 UNILAV 代替居留合同", "common"),
        item("Certificazione Unica (CU) o dichiarazione dei redditi dell'anno precedente", "上一年度 CU 或报税单", "common"),
        item("Contratto di locazione o dichiarazione di ospitalità", "租房合同或住宿证明（ospitalità）", "common"),
    ],
    "15": common("1+2") + [
        item("Fotocopia dell'autorizzazione, licenza, iscrizione ad albo o registro, o della dichiarazione prevista per l'attività svolta",
             "从事该行业所需的许可、执照、职业名册登记或开业申报的复印件", "official"),
        item("Fotocopia dell'iscrizione alla CCIAA", "商会（CCIAA）注册证明复印件", "official"),
        item("Fotocopia della dichiarazione dei redditi", "报税单复印件（收入不得低于 assegno sociale 年额）", "official"),
        item("Dichiarazione del Presidente della società sulle mansioni del socio, con fotocopia del documento d'identità del dichiarante",
             "公司董事长出具的合伙人工作职责声明，附声明人身份证件复印件", "official", {"equals": {"work.autonomoForm": "socio"}}),
        item("Fotocopia del libro soci (frontespizio e pagina con l'iscrizione del socio)",
             "股东名册复印件（封面页 + 本人登记页）", "official", {"equals": {"work.autonomoForm": "socio"}}),
        item("Contratto di locazione o dichiarazione di ospitalità", "租房合同或住宿证明（ospitalità）", "common"),
    ],
    "09": common("1+2") + [
        item("Fotocopia della dichiarazione dei redditi o del modello CUD dell'anno precedente",
             "上一年度报税单或 CUD 复印件（收入不得低于 assegno sociale 年额）", "official"),
        item("Certificato del casellario giudiziario", "无犯罪记录证明（casellario giudiziario）", "official"),
        item("Certificato delle iscrizioni relative ai procedimenti penali in corso (carichi pendenti)",
             "未决刑事案件证明（carichi pendenti）", "official"),
        item("Certificato di conoscenza della lingua italiana livello A2 (o documento di esenzione)",
             "意大利语 A2 证书（或免考证明）", "decision"),
        item("Fotocopia del certificato di idoneità alloggiativa", "住房适宜证明（idoneità alloggiativa）复印件", "official"),
        item("Fotocopia della certificazione anagrafica attestante lo stato di figlio minore (tradotta, legalizzata e validata se rilasciata all'estero)",
             "证明未成年子女身份的户籍文件复印件（国外开具的需翻译、认证并经意大利使领馆核验；子女凭家庭团聚签证入境的免交）",
             "official", {"present": ["childrenUnder14"]}),
        # 不用 equals false 判断"非家庭团聚入境"：用户没回答时条件不成立，材料会漏掉。宁可多列、在中文里注明免交情形。
    ],
    "03": common("1") + [
        item("Fotocopia del nuovo passaporto o documento equipollente", "新护照（或同等证件）复印件", "official",
             {"equals": {"application.aggiornamentoReasons": ["passaporto"]}}),
        item("Fotocopia del passaporto con cui il minore ha fatto ingresso in Italia", "子女入境意大利时所用护照的复印件", "official",
             {"equals": {"application.aggiornamentoReasons": ["figli-ingresso"]}}),
        item("Dichiarazione della Rappresentanza diplomatica / consolare che le nuove generalità si riferiscono alla stessa persona",
             "本国使领馆出具的新旧身份信息属于同一人的证明", "official",
             {"equals": {"application.aggiornamentoReasons": ["anagrafica"]}}),
    ],
}

# ---- P2 A 批（官方页面 2024-07-22 版，2026-11-06 核对；见 docs/research/p2-batch-a.md） ----
MATERIALS["04"] = common("1") + MATERIALS["03"][len(common("1")):]   # 和 03 同一页官方说明，附件相同
DENUNCIA = item("Fotocopia della denuncia di furto o smarrimento presentata alle Forze di Polizia",
                "向警察局（Polizia / Carabinieri）报失或报盗的 denuncia 复印件", "official")
MATERIALS["12"] = common("1", renewal=False) + [DENUNCIA]
MATERIALS["11"] = common("1", renewal=False) + [DENUNCIA]
FAMILY_COMMON = [
    item("Fotocopia del permesso / carta di soggiorno del familiare", "担保你的家属的居留许可 / 居留卡复印件", "common"),
    item("Certificato di stato di famiglia (o autocertificazione)", "家庭状况证明（stato di famiglia，或自我声明）", "common"),
    item("Contratto di locazione o dichiarazione di ospitalità", "租房合同或住宿证明（ospitalità）", "common"),
]
MATERIALS["13"] = common("1") + [
    item("Dichiarazione del familiare di provvedere al sostentamento del componente il suo nucleo familiare",
         "担保家属的声明：表示负担你的生活费用", "official"),
    item("Certificazione Unica (CU) o dichiarazione dei redditi del familiare", "担保家属的 CU 或报税单（证明收入）", "common"),
] + FAMILY_COMMON
MATERIALS["14"] = common("1") + FAMILY_COMMON + [
    item("Certificato di iscrizione scolastica", "在读证明（学校开具）", "common"),
]
INSURANCE = item("Fotocopia della polizza assicurativa (malattia e infortuni) valida in Italia per la durata del permesso",
                 "在意大利有效、覆盖整个居留期的医疗和意外保险单复印件", "official")
MEANS = item("Documentazione attestante la disponibilità di mezzi economici sufficienti per la durata del permesso",
             "证明居留期内有足够生活费用的文件（如银行存款证明、奖学金证明）", "official")
first, renew = {"operations": ["rilascio"]}, {"operations": ["rinnovo"]}
MATERIALS["24"] = common("1+2-if-income", renewal=renew) + [
    item("Fotocopia della certificazione del corso di studio vistata dalla Rappresentanza diplomatica italiana",
         "经意大利使领馆签发签证时盖章的录取 / 课程证明复印件", "official", first),
    INSURANCE,
    {**MEANS, "condition": renew},
    item("Certificazione degli esami sostenuti (almeno 1 esame al primo rinnovo, almeno 2 per i rinnovi successivi)",
         "考试成绩证明：第 1 次续签至少通过 1 门，之后每次至少 2 门（不可抗力除外）", "official", renew),
    item("Certificato di iscrizione all'anno accademico in corso", "本学年注册证明（iscrizione）", "common", renew),
]
MATERIALS["31"] = common("1+2-if-income", renewal=renew) + [
    item("Fotocopia della certificazione del corso o della convenzione di tirocinio vistata dalla Rappresentanza diplomatica italiana",
         "经意大利使领馆盖章的课程证明或实习协议复印件", "official", first),
    item("Certificazione della prosecuzione del corso o della convenzione di tirocinio",
         "课程仍在进行（或实习协议仍有效）的证明", "official", renew),
    INSURANCE,
    {**MEANS, "condition": renew},
]
DID = item("Certificazione della dichiarazione resa al centro per l'impiego (DID)",
           "在职业介绍中心（centro per l'impiego）登记的证明（DID）", "official")
MATERIALS["30"] = common("1+2") + [
    item("Documentazione attestante il conseguimento del titolo di studio (o, se non ancora disponibile, da presentare entro 60 giorni)",
         "学位 / 文凭证明（还没拿到的，可在申请后 60 天内补交）", "official"),
    MEANS, INSURANCE, DID,
]
MATERIALS["05"] = common("1+2") + [
    item("Certificazione della dichiarazione resa al centro per l'impiego, o comunicazione INPS di misura di sostegno al reddito (es. NASpI)",
         "职业介绍中心（centro per l'impiego）的登记证明，或 INPS 发放失业补助（如 NASpI）的通知", "official"),
    item("Lettera di licenziamento / dimissioni o comunicazione di cessazione del rapporto di lavoro",
         "解雇信 / 辞职信或劳动关系终止通知", "common"),
    item("Contratto di locazione o dichiarazione di ospitalità", "租房合同或住宿证明（ospitalità）", "common"),
]

# ---- P2 B 批（官方页面，2026-11-06 核对；见 docs/research/p2-batch-b.md） ----
HOUSING = item("Contratto di locazione o dichiarazione di ospitalità", "租房合同或住宿证明（ospitalità）", "common")
foreign = {"equals": {"family.sponsorKind": "straniero"}}
MATERIALS["10"] = common("1") + [
    item("Documentazione anagrafica comprovante il legame familiare (tradotta, legalizzata e validata se rilasciata all'estero)",
         "证明亲属关系的户籍文件（如结婚证、出生证明）。国外开具的要翻译、认证并经意大利使领馆核验；已在意大利户籍登记的，Modulo 1 本身就算自我声明",
         "official"),
    item("Fotocopia della dichiarazione dei redditi del familiare straniero con il quale si chiede la coesione",
         "要团聚的那位外国家属的报税单复印件（收入要达到 assegno sociale 年额标准，家属越多要求越高）", "official", foreign),
    item("Certificato di idoneità alloggiativa (art. 29, comma 3, lett. a, D.Lgs. 286/98) rapportato al nucleo familiare",
         "住房适宜证明（idoneità alloggiativa），面积要够全家人住", "official", foreign),
    item("Fotocopia del permesso / carta di soggiorno del familiare", "要团聚的那位家属的居留许可 / 居留卡复印件", "common", foreign),
]
MATERIALS["18"] = common("1+2") + [
    # 官网写"居留合同 + 挂号信回执"，和 16 一样是 2011 年以前的写法（见 16 的说明），改列合同 / UNILAV
    item("Contratto di soggiorno per lavoro subordinato stagionale / comunicazione obbligatoria (UNILAV)",
         "季节工居留合同 / 雇佣登记（UNILAV）复印件。官网还写了寄合同的挂号信回执，有的话一并附上", "official"),
    item("Fotocopia delle ultime buste paga", "最近几个月的工资单复印件", "common"),
    HOUSING,
]
MATERIALS["21"] = common("1+2", renewal={"operations": ["rinnovo"]}) + [
    item("Documentazione attestante ampie risorse economiche autonome (proprietà immobiliari, pensioni o vitalizi, altre fonti lecite diverse dal lavoro)",
         "证明有充足的、非工作来源经济能力的文件：房产、养老金或年金、其他合法来源（工作收入不算）", "official"),
    item("Fotocopia del visto d'ingresso per residenza elettiva", "选择性居留签证页的复印件", "common", {"operations": ["rilascio"]}),
    item("Polizza assicurativa sanitaria o iscrizione volontaria al Servizio Sanitario Nazionale",
         "医疗保险单，或自愿加入意大利国家医疗服务（SSN）的证明", "common"),
    HOUSING,
]
MATERIALS["06"] = common("1") + [
    item("Fotocopia della documentazione attestante l'avvio del procedimento di concessione o riconoscimento della cittadinanza italiana",
         "已经开始办理入籍（申请或认定意大利国籍）的证明复印件，例如入籍申请的受理回执", "official"),
]
MATERIALS["02"] = common("1", stamp=False) + [
    item("Fotocopia del decreto di affidamento", "寄养 / 监护托付决定书（decreto di affidamento）复印件", "official"),
    item("Documento d'identità dell'affidatario", "受托照顾孩子的人（affidatario）的身份证件复印件", "common"),
]

# ---- P2 C1（官方页面，2026-11-06 核对；见 docs/research/p2-batch-c.md） ----
MATERIALS["32"] = [dict(x) for x in MATERIALS["31"]]   # 同一页官方说明
MATERIALS["33"] = [dict(x) for x in MATERIALS["31"]]
MATERIALS["19"] = common("1", renewal=renew) + [
    item("Dichiarazione della Pubblica Amministrazione / Ente pubblico o privato / Organizzazione internazionale che attesti l'attualità dell'incarico",
         "派遣单位（政府机关、公立或私立机构、国际组织）出具的任务仍在进行的声明", "official", renew),
    item("Fotocopia del visto d'ingresso per missione", "公务派遣签证页的复印件", "common", first),
]
MATERIALS["20"] = common("1", renewal=renew) + [
    item("Dichiarazione del responsabile della Comunità religiosa in Italia (natura dell'incarico, onere di vitto e alloggio), vistata dalla Curia vescovile o da equivalente Autorità religiosa",
         "在意大利的宗教团体负责人出具的声明：说明担任的职务，并承担食宿费用；要经主教公署（Curia vescovile）或同等宗教机构签章", "official"),
    INSURANCE,
]
MATERIALS["27"] = common("1+2") + [
    item("Fotocopia della convenzione di accoglienza rinnovata con l'Istituto di ricerca", "和研究机构续签的接待协议（convenzione di accoglienza）复印件", "official"),
]
MATERIALS["28"] = common("1+2") + [
    item("Documentazione attestante il completamento dell'attività di ricerca, rilasciata dall'Istituto di ricerca", "研究机构出具的研究工作已完成的证明", "official"),
    MEANS, INSURANCE, DID,
]
MATERIALS["29"] = common("1+2") + [
    item("Fotocopia del permesso di soggiorno per ricerca rilasciato dall'altro Stato membro dell'UE", "其他欧盟国家签发的研究人员居留复印件", "official"),
    item("Fotocopia della convenzione di accoglienza con l'istituto di ricerca del primo Stato membro", "和第一个欧盟国家研究机构签的接待协议复印件", "official"),
    item("Documentazione su risorse economiche e assicurazione sanitaria (se non risultano dalla convenzione di accoglienza)",
         "生活费用和医疗保险证明（接待协议里没写明的才需要）", "official"),
]
MATERIALS["23"] = common("1+2-if-income", student=False) + [
    item("Copia dell'istanza di riconoscimento dello status di apolidia", "申请认定无国籍身份的申请书复印件", "official"),
]
MATERIALS["07"] = [x for x in common("1+2-if-income", student=False)
                   if not x["nameIt"].startswith("Fotocopia di tutto il passaporto")] + [
    item("Fotocopia di tutto il documento di viaggio (se in possesso)", "整本旅行证件的复印件（有的话）", "official"),
]

# 17：按子类（application.art27Letter）列材料（官方各子类页，2026-11-07 查看）
def art27(*letters):
    return {"equals": {"application.art27Letter": list(letters)}}


MATERIALS["17"] = [
    item("Istanza compilata e sottoscritta (Modulo 1)", "填好并签名的申请表（Modulo 1）", "official"),
    item("Modulo 2 compilato e sottoscritto", "另附填好并签名的 Modulo 2（你的类别要求）", "official", art27(*ART27_M2)),
] + common("1")[1:] + [
    item("Fotocopia del contratto di soggiorno e ricevuta della raccomandata di invio allo Sportello Unico (se è stata modificata una clausola)",
         "居留合同条款改过的：附新居留合同复印件和寄给 Sportello Unico 的挂号信回执；没改过的不用附", "official",
         art27("a", "b", "c", "d", "e", "i", "p", "r-bis")),
    item("Copia del nulla osta al lavoro prorogato, del contratto di soggiorno e della ricevuta di ritorno della raccomandata",
         "延期后的工作许可（nulla osta prorogato）复印件、居留合同复印件、寄合同挂号信的回执", "official", art27("m", "n", "o")),
    item("Documentazione attestante la frequenza al corso di formazione (rilasciata dall'ente accreditato)",
         "上职业培训课程的：认证培训机构出具的出勤证明", "official", art27("f")),
    item("Fotocopia del contratto di soggiorno e ricevuta della raccomandata (addestramento con trasferimento temporaneo o distacco)",
         "被所属机构派来受训（trasferimento / distacco）的：居留合同复印件和寄给 Sportello Unico 的挂号信回执", "official", art27("f")),
    item("Nota di accredito del Ministero degli Affari Esteri con l'incarico svolto",
         "外交部的记者注册证明（nota di accredito），上面写明所任职务", "official", art27("q")),
    item("Documentazione attestante l'incarico svolto presso l'ente di ricerca",
         "在研究机构任职的证明文件复印件", "official", art27("r")),
    item("Ultime buste paga", "最近几个月的工资单复印件", "common", art27("a", "b", "c", "d", "e", "i", "m", "n", "o", "p", "r-bis")),
]


# ---------------- 填写规则 ----------------
def r(field, value, **when):
    d = {"field": field, "value": value}
    if when:
        d["when"] = when
    return d


p = lambda path: {"path": path}
X = {"const": "X"}
c = lambda name: {"computed": name}


def eq(**kw):
    return {"equals": {k.replace("__", "."): v for k, v in kw.items()}}


def person_block(prefix_nums, base):
    """配偶 / 子女的 7 个字段：姓、名、性别、出生日期、出生国、国籍、出生城市。"""
    keys = ["surname", "givenNames", "sex", "birthDate", "birthCountry", "citizenship", "birthCity"]
    return [r(f"M1-{n:03d}", p(f"{base}.{k}"), present=[base]) for n, k in zip(prefix_nums, keys)]


def header(prefix):
    return [r(f"{prefix}H01", p("questura.city")), r(f"{prefix}H02", p("questura.province"))]


def modulo1_rules():
    R = header("M1-") + [
        r("M1-003", p("person.surname")), r("M1-004", p("person.givenNames")),
        r("M1-005", p("address.province")), r("M1-006", p("address.comune")),
        r("M1-008", X, operations=["rilascio"]), r("M1-009", X, operations=["rinnovo"]),
        r("M1-010", X, operations=["aggiornamento"]), r("M1-011", X, operations=["duplicato"]),
        r("M1-012", X, operations=["conversione"]),
        r("M1-014", X, applicationCodes=[x for x in ALL if x not in CARTA]),
        r("M1-015", X, applicationCodes=CARTA),
        r("M1-016", p("application.code")),
        {"field": "M1-017", "value": X, "when": {"equals": {"application.aggiornamentoReasons": ["foto"]}}},
        r("M1-018", p("currentPermit.number")), r("M1-019", p("currentPermit.typeCode")),
        r("M1-020", p("currentPermit.validUntil")),
        r("M1-023", X), r("M1-024", X, applicationCodes=WITH_M2),
        r("M1-024", X, applicationCodes=M2_IF_INCOME, hasIncome=True),
        {"field": "M1-024", "value": X, "when": {"applicationCodes": ["17"], "equals": {"application.art27Letter": ART27_M2}}},
        r("M1-025", p("application.submissionTotalSheets")),
        r("M1-026", c("children.count"), present=["childrenUnder14"]),
        # 第 3 节
        r("M1-031", p("person.codiceFiscale")), r("M1-032", p("person.maritalStatus")), r("M1-033", p("person.sex")),
        r("M1-034", p("person.birthDate")), r("M1-035", p("person.birthCountry")), r("M1-036", p("person.citizenship")),
        r("M1-037", p("person.refugee")), r("M1-038", p("person.birthCity")),
        # 第 4 节
        {"field": "M1-040", "value": X, **{"when": eq(document__kind="passport")}},
        {"field": "M1-041", "value": X, **{"when": eq(document__kind="other")}},
        r("M1-042", p("document.otherCode")), r("M1-043", p("document.otherName")),
        r("M1-044", p("document.number")), r("M1-045", p("document.validUntil")), r("M1-046", p("document.issuerCode")),
        # 第 7 节
        r("M1-066", p("address.province")), r("M1-067", p("address.comune")), r("M1-068", p("address.street")),
        r("M1-069", {"parts": {"numero": p("address.civic.numero"), "lettera": p("address.civic.lettera")}}),
        r("M1-070", p("address.scala")), r("M1-071", p("address.interno")), r("M1-072", p("address.cap")),
        r("M1-073", p("address.email")),
        r("M1-074", {"parts": {"prefisso": p("address.phoneFixed.prefisso"), "numero": p("address.phoneFixed.numero")}}),
        r("M1-075", {"parts": {"prefisso": p("address.phoneMobile.prefisso"), "numero": p("address.phoneMobile.numero")}}),
    ]
    # 第 5 节签证：说明书注 n"仅首次申请居留时填写"。目前是学生（24 / 31 / 32 / 33）、选择性居留（21）、
    # 公务派遣（19）、宗教事由（20）的首次签发
    visa = {"applicationCodes": VISA_FIRST, "operations": ["rilascio"]}
    R += [{"field": f"M1-{n:03d}", "value": p(f"visa.{k}"), "when": visa}
          for n, k in ((48, "entryDate"), (49, "border"), (50, "number"), (51, "type"))]
    R += [{"field": "M1-052", "value": X, "when": {**visa, **eq(visa__entries="single")}},
          {"field": "M1-053", "value": X, "when": {**visa, **eq(visa__entries="multiple")}}]
    R += [{"field": f"M1-{n:03d}", "value": p(f"visa.{k}"), "when": visa}
          for n, k in ((54, "notes"), (55, "durationDays"), (56, "validFrom"), (57, "validUntil"))]
    # 第 8 节：和第 7 节不同时才填
    for n, k in zip(range(77, 85), ["presso", "province", "comune", "street", "civic", "scala", "interno", "cap"]):
        v = {"parts": {"numero": p("mailTo.civic.numero"), "lettera": p("mailTo.civic.lettera")}} if k == "civic" else p(f"mailTo.{k}")
        R.append(r(f"M1-{n:03d}", v, present=["mailTo"]))
    # 第 9、10、11 节：仅首次申请长居卡（说明书注 s / t）
    carta = {"applicationCodes": ["09"], "operations": ["rilascio"]}
    R += [
        {"field": "M1-087", "value": p("housing.idoneita.date"), "when": carta},
        {"field": "M1-088", "value": X, "when": {**carta, **eq(housing__idoneita__issuer="comune")}},
        {"field": "M1-089", "value": p("housing.idoneita.province"), "when": {**carta, **eq(housing__idoneita__issuer="comune")}},
        {"field": "M1-090", "value": p("housing.idoneita.comuneOrAsl"), "when": {**carta, **eq(housing__idoneita__issuer="comune")}},
        {"field": "M1-091", "value": X, "when": {**carta, **eq(housing__idoneita__issuer="asl")}},
        {"field": "M1-092", "value": p("housing.idoneita.province"), "when": {**carta, **eq(housing__idoneita__issuer="asl")}},
        {"field": "M1-093", "value": p("housing.idoneita.comuneOrAsl"), "when": {**carta, **eq(housing__idoneita__issuer="asl")}},
    ]
    for i, (pv, cm, st) in enumerate([(96, 97, 98), (99, 100, 101), (102, 103, 104), (105, 106, 107)]):
        base = f"housing.pastResidences[{i}]"
        for n, k in ((pv, "province"), (cm, "comune"), (st, "street")):
            R.append({"field": f"M1-{n:03d}", "value": p(f"{base}.{k}"), "when": {**carta, "present": [base]}})
    for n, k in ((109, "province"), (110, "comune"), (111, "street")):
        R.append({"field": f"M1-{n:03d}", "value": p(f"housing.currentResidence.{k}"), "when": carta})
    R += [
        {"field": "M1-114", "value": X, "when": eq(relatedApplication__spouse=True)},
        {"field": "M1-115", "value": X, "when": eq(relatedApplication__spouse=False)},
        {"field": "M1-117", "value": X, "when": eq(relatedApplication__parent=True)},
        {"field": "M1-118", "value": X, "when": eq(relatedApplication__parent=False)},
        {"field": "M1-120", "value": p("dependents.cohabitingCount"), "when": carta},
        {"field": "M1-122", "value": X, "when": {**carta, **eq(dependents__spouse=True)}},
        {"field": "M1-123", "value": X, "when": {**carta, **eq(dependents__children=True)}},
        {"field": "M1-124", "value": p("dependents.childrenCount"), "when": {**carta, **eq(dependents__children=True)}},
        {"field": "M1-125", "value": X, "when": {**carta, **eq(dependents__other=True)}},
        {"field": "M1-126", "value": p("dependents.otherRelation"), "when": {**carta, **eq(dependents__other=True)}},
    ]
    for rule in person_block(range(129, 136), "spouse"):
        rule["when"] = {**carta, "present": ["spouse"]}
        R.append(rule)
    # 第 12 节：未满 14 岁子女，最多 5 人（第 6 页 1 人，第 7、8 页各 2 人）
    for i, start in enumerate([137, 145, 152, 160, 167]):
        R += person_block(range(start, start + 7), f"childrenUnder14[{i}]")
    return R


def modulo2_rules():
    sub, aut = eq(work__type="subordinato"), eq(work__type="autonomo")
    R = header("M2-") + [
        {"field": "M2-004", "value": X, "when": sub}, {"field": "M2-005", "value": X, "when": aut},
        {"field": "M2-006", "value": X, "when": eq(work__type="altro")},
        {"field": "M2-008", "value": X, "when": {**sub, "equals": {"work.type": "subordinato", "work.contract": "indeterminato"}}},
        {"field": "M2-009", "value": X, "when": {"equals": {"work.type": "subordinato", "work.contract": "determinato"}}},
        {"field": "M2-010", "value": X, "when": {"equals": {"work.type": "subordinato", "work.contract": "stagionale"}}},
        {"field": "M2-011", "value": p("work.contractMonths"),
         "when": {"equals": {"work.type": "subordinato", "work.contract": ["determinato", "stagionale"]}}},
        {"field": "M2-012", "value": p("work.contractOther"), "when": {"equals": {"work.type": "subordinato", "work.contract": "altro"}}},
        {"field": "M2-013", "value": p("work.contractDays"), "when": sub},
        {"field": "M2-015", "value": X, "when": {"equals": {"work.type": "autonomo", "work.autonomoForm": "titolare"}}},
        {"field": "M2-016", "value": X, "when": {"equals": {"work.type": "autonomo", "work.autonomoForm": "socio"}}},
        {"field": "M2-017", "value": X, "when": {"equals": {"work.type": "autonomo", "work.autonomoForm": "libero"}}},
        {"field": "M2-018", "value": X, "when": {"equals": {"work.type": "autonomo", "work.autonomoForm": "altro"}}},
        r("M2-019", p("work.jobTitle")),
    ]
    giur = {"equals": {"work.type": "subordinato", "employer.kind": "giuridica"}}
    fis = {"equals": {"work.type": "subordinato", "employer.kind": "fisica"}}
    R += [{"field": "M2-021", "value": X, "when": giur}]
    R += [{"field": f"M2-{n:03d}", "value": p(f"employer.{k}"), "when": giur}
          for n, k in ((22, "name"), (23, "codiceFiscale"), (24, "partitaIva"), (25, "inps"))]
    R += [{"field": "M2-026", "value": X, "when": fis}]
    R += [{"field": f"M2-{n:03d}", "value": p(f"employer.{k}"), "when": fis}
          for n, k in ((27, "permitNumber"), (28, "surname"), (29, "givenNames"), (30, "birthDate"),
                       (31, "codiceFiscale"), (32, "partitaIva"))]
    # 第 3 节只在"现在仍是入境时签居留合同的那位雇主"时填（work.contrattoSoggiornoStatus = same-employer）
    sott = {"equals": {"work.type": "subordinato", "work.contrattoSoggiornoStatus": "same-employer",
                       "contrattoSoggiorno.mode": "sottoscritto"}}
    inv = {"equals": {"work.type": "subordinato", "contrattoSoggiorno.mode": "inviato"}}
    R += [
        {"field": "M2-034", "value": X, "when": sott},
        {"field": "M2-035", "value": p("contrattoSoggiorno.province"), "when": sott},
        {"field": "M2-036", "value": p("contrattoSoggiorno.date"), "when": sott},
        {"field": "M2-037", "value": X, "when": inv},
        {"field": "M2-038", "value": p("contrattoSoggiorno.province"), "when": inv},
        {"field": "M2-039", "value": {"parts": {"numero": p("contrattoSoggiorno.raccomandata.numero"),
                                                "controllo": p("contrattoSoggiorno.raccomandata.controllo")}}, "when": inv},
        {"field": "M2-040", "value": p("contrattoSoggiorno.date"), "when": inv},
    ]
    R += [{"field": f"M2-{n:03d}", "value": p(f"business.{k}"), "when": aut}
          for n, k in ((42, "name"), (43, "codiceFiscale"), (44, "partitaIva"), (45, "inps"), (46, "cciaaProvince"),
                       (47, "cciaaNumber"), (48, "cciaaDate"), (49, "albo"), (50, "alboDate"))]
    R += [
        {"field": "M2-052", "value": X, "when": {"present": ["income.annualCents"]}},
        {"field": "M2-053", "value": {"parts": {"euro": c("income.annual.euro"), "centesimi": c("income.annual.cents")}},
         "when": {"present": ["income.annualCents"]}},
        r("M2-054", p("income.lastTaxYear")),
        {"field": "M2-055", "value": X, "when": eq(income__taxForm="unico-pf")},
        {"field": "M2-056", "value": X, "when": eq(income__taxForm="unico-sp")},
        {"field": "M2-057", "value": X, "when": eq(income__taxForm="unico-sc")},
        {"field": "M2-058", "value": X, "when": eq(income__taxForm="unico-enc")},
        {"field": "M2-059", "value": X, "when": eq(income__taxForm="cud")},
        {"field": "M2-060", "value": X, "when": eq(income__bustaPaga=True)},
        {"field": "M2-061", "value": X, "when": eq(income__bollettinoInps=True)},
        {"field": "M2-062", "value": {"parts": {"euro": c("income.monthly.euro"), "centesimi": c("income.monthly.cents")}},
         "when": {"present": ["income.monthlyCents"]}},
        {"field": "M2-063", "value": X, "when": {"equals": {"work.type": "autonomo", "income.autonomoStartedThisYear": True}}},
    ]
    # 第 6 节：在 centro per l'impiego 登记（05 等待就业、30 毕业后找工作）
    ci = {"applicationCodes": CENTRO_IMPIEGO}
    R += [{"field": f"M2-{n:03d}", "value": p(f"employmentCentre.{k}"), "when": ci}
          for n, k in ((65, "registrationDate"), (66, "province"), (67, "city"), (68, "circoscrizione"))]
    return R


def bollettino_rules():
    name = {"join": [p("person.surname"), p("person.givenNames")], "sep": " "}
    street = {"join": [p("address.street"), p("address.civic.numero"), p("address.civic.lettera")], "sep": " "}
    R = []
    for k in ("1", "2", "3"):
        R += [r(f"B-importo-{k}", {"parts": {"euro": c("fee.euro"), "centesimi": c("fee.cents")}}),
              r(f"B-lettere-{k}", c("fee.words")),
              r(f"B-eseguito-{k}", name), r(f"B-residente-{k}", street)]
    R += [r("B-cap-3", p("address.cap")), r("B-localita-3", p("address.comune"))]
    return R


def check_lists():
    """代码列表必须和各类型的 moduli 一致，否则会漏勾 M1-024（C1 时 28 漏过一次）。"""
    by = lambda m: sorted(t["code"] for t in TYPES if t["moduli"] == m)
    for name, lst, moduli in (("WITH_M2", WITH_M2, "1+2"), ("M2_IF_INCOME", M2_IF_INCOME, "1+2-if-income")):
        if sorted(lst) != by(moduli):
            sys.exit(f"{name} 和 moduli={moduli} 的类型不一致：{sorted(lst)} vs {by(moduli)}")
    for t in TYPES:
        if (t["moduli"] == "1+2-when") != ("modulo2When" in t):
            sys.exit(f"{t['code']}：moduli=1+2-when 必须且只能和 modulo2When 一起用")
    missing = [c for c in ALL if c not in MATERIALS]
    if missing:
        sys.exit(f"缺材料清单：{missing}")


def main(out):
    check_lists()
    dump(f"{out}/application-types.json", {**V, "types": TYPES})
    dump(f"{out}/fees.json", FEES)
    for code, items in MATERIALS.items():
        dump(f"{out}/materials/{code}.json", {**V, "applicationCode": code, "items": items})
    for form, rules in (("modulo1", modulo1_rules()), ("modulo2", modulo2_rules()), ("bollettino", bollettino_rules())):
        ids = [x["field"] for x in rules]
        dump(f"{out}/mapping/{form}.json", {"form": form, **V, "rules": rules})
        print(f"  {form}: {len(rules)} rules, {len(set(ids))} fields")


if __name__ == "__main__":
    main(sys.argv[1])
