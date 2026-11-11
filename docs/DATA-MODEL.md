# 数据模型：申请人资料与填写规则

- 版本：v1 · 2026-11-05 · 维护者：Claude
- 用途：Codex 的问卷 / 存储（`src/ui`、`src/storage`）产出这里定义的**申请资料**；Claude 的规则数据（`data/mapping/`、`data/fees.json`、`data/materials/`）按这里的**路径**读取。两边只通过这份约定对接。
- 改动这份文件 = 改接口：请在 `docs/HANDOFF.md` 里写明，双方都确认后再改。

---

## 1. 申请资料（Application）

一次申请生成一份参考件。JSON 结构如下，路径用点号和下标表示，例如 `person.surname`、`childrenUnder14[2].birthDate`。

- 所有字符串存用户原样输入，**不要**预先转大写或去重音；转换由引擎统一做（见第 3 节）。
- 日期一律 ISO `YYYY-MM-DD`。
- 代码一律用代码表里的 `code`（如国家 `CHN`、省份 `MI`、申请类型 `16`）。
- 可选字段不填就省略或为 `null`；引擎遇到缺值时留空，不报错（必填检查是问卷的事）。

```jsonc
{
  "application": {
    "code": "16",                  // 申请类型（data/codes/motivi.json）
    "operation": "rinnovo",        // rilascio | rinnovo | aggiornamento | duplicato | conversione
    "expectedDurationMonths": 24,  // 预计批准期限（算 contributo 用），由问卷按 4.2 推出
    "aggiornamentoReasons": [],    // 仅 aggiornamento：domicilio | stato-civile | figli-nati-italia | figli-ingresso | passaporto | anagrafica | foto
    "art27Letter": null,           // P2 C2（D49）：仅 17。a | b | c | d | e | f | i | m | n | o | p | q | r | r-bis
    "submissionTotalSheets": null  // 可选：表格 + 复印件总页数（M1-025）。用户复印完再填，多数情况留空让用户手写
  },
  "questura": { "city": "MILANO", "province": "MI" },

  "person": {
    "surname": "", "givenNames": "",
    "sex": "F",                    // F | M
    "birthDate": "1990-01-31",
    "birthCountry": "CHN", "citizenship": "CHN", "birthCity": "",
    "maritalStatus": "A",          // A 未婚 | B 已婚
    "codiceFiscale": "",
    "refugee": false
  },
  "document": {                    // 身份证件（第 4 节）
    "kind": "passport",            // passport | other
    "otherCode": null,             // kind=other 时：data/codes/documenti.json
    "otherName": null,             // kind=other 且代码表没有时的名称（M1-043）
    "number": "", "validUntil": "2030-01-01",
    "issuerCode": null             // kind=other 时：data/codes/autorita.json
  },
  "currentPermit": {               // 现有居留（续签 / 更新 / 转长居时）
    "number": "", "typeCode": "16", "validUntil": "2026-12-31"
  },
  "address": {                     // 第 7 节：在意大利的住址；也用于第 1 节住所省 / 市
    "province": "MI", "comune": "", "street": "",
    "civic": { "numero": "", "lettera": "" },
    "scala": "", "interno": "", "cap": "",
    "email": "", "phoneFixed": { "prefisso": "", "numero": "" }, "phoneMobile": { "prefisso": "", "numero": "" }
  },
  "mailToDifferent": false,        // 问卷辅助项：false 与住址相同；true 使用其他地址
  "mailTo": null,                  // 第 8 节答案；切回相同地址时草稿保留，输出投影置空
                                   // { presso, province, comune, street, civic{numero,lettera}, scala, interno, cap }

  "housing": {                     // 第 9 节：只在申请长居卡（09 rilascio）时用
    "idoneita": { "date": "", "issuer": "comune", "province": "", "comuneOrAsl": "" },  // issuer: comune | asl
    "pastResidences": [ { "province": "", "comune": "", "street": "" } ],   // 过去六年，最多 4 条
    "currentResidence": { "province": "", "comune": "", "street": "" }
  },
  "relatedApplication": { "spouse": null, "parent": null },  // M1-113~118：本申请是否和配偶 / 父母的申请关联（true/false/null）
  "dependents": {                  // 第 10 节：只在 09 rilascio（及以后的家庭转换）时用
    "cohabitingCount": null, "spouse": false, "children": false, "childrenCount": null,
    "other": false, "otherRelation": ""
  },
  "spouse": null,                  // 第 11 节：{ surname, givenNames, sex, birthDate, birthCountry, citizenship, birthCity }
  "childrenUnder14": [],           // 第 12 节：最多 5 个，结构同 spouse

  "work": {                        // Modulo 2
    "type": "subordinato",         // subordinato | autonomo | altro
    "contract": "indeterminato",   // indeterminato | determinato | stagionale | altro（仅 subordinato）
    "contractMonths": null, "contractDays": null, "contractOther": "",
    "autonomoForm": null,          // titolare | socio | libero | altro（仅 autonomo）
    "jobTitle": "",
    "hiredThisYear": false,        // 今年才入职（材料：最近工资单）。不写进表格
    "contrattoSoggiornoStatus": null   // 仅 subordinato：none 没有 / 不清楚 | same-employer 入境时在 Sportello Unico 签过、现在仍是同一雇主 | changed 签过、后来换了雇主或改了合同
                                       // （v1 的 contractChangedSinceEntry 已废弃，由此字段取代，见 2026-11-06 交接）
  },
  "employer": {                    // Modulo 2 第 2 节（subordinato）
    "kind": "giuridica",           // giuridica | fisica
    "name": "", "codiceFiscale": "", "partitaIva": "", "inps": "",
    "permitNumber": "", "surname": "", "givenNames": "", "birthDate": ""   // kind=fisica
  },
  "contrattoSoggiorno": null,      // Modulo 2 第 3 节，只在 contrattoSoggiornoStatus = same-employer 时填写（mode 固定 sottoscritto）；
                                   // inviato（挂号信寄出）只适用于 2011-11-15 以前换雇主的旧情况，问卷不再提供。格式：
                                   // { "mode": "sottoscritto", "province": "", "date": "" }
                                   // { "mode": "inviato", "province": "", "raccomandata": { "numero": "", "controllo": "" }, "date": "" }
  "business": {                    // Modulo 2 第 4 节（autonomo）
    "name": "", "codiceFiscale": "", "partitaIva": "", "inps": "",
    "cciaaProvince": "", "cciaaNumber": "", "cciaaDate": "", "albo": "", "alboDate": ""
  },
  "income": {                      // Modulo 2 第 5 节
    "annualCents": null,           // 年收入（整数分）
    "lastTaxYear": null,           // 最近一次报税年份
    "taxForm": null,               // unico-pf | unico-sp | unico-sc | unico-enc | cud
    "bustaPaga": false, "bollettinoInps": false,
    "monthlyCents": null,
    "autonomoStartedThisYear": false
  },
  "family": {                      // 材料条件用
    "childrenEnteredWithFamilyVisa": false,  // 09：随行子女是凭家庭团聚签证入境的（免交亲属关系证明）
    "sponsorPermitValidUntil": "",           // P2：13 家庭续签。担保家属的居留到期日，只用来推算 expectedDurationMonths（见 4.2）
    "sponsorKind": null                      // P2 B：10 转为家庭居留。straniero | italiano-ue | rifugiato，只决定材料清单
  },
  // ---- P2 A 批新增（2026-11-06，D45）----
  "visa": {                        // Modulo 1 第 5 节。只在 24 / 31 / 21 rilascio（凭签证入境后第一次申请）时填写
    "entryDate": "", "border": "", "number": "", "type": "",
    "entries": null,               // single | multiple
    "notes": "", "durationDays": null, // durationDays：整数
    "validFrom": "", "validUntil": ""
  },
  "employmentCentre": {            // Modulo 2 第 6 节：在 centro per l'impiego 登记。05 等待就业、30 毕业后找工作
    "registrationDate": "", "province": "", "city": "", "circoscrizione": ""
  },
  "study": {                       // 24 / 31
    "working": null                // 有打工收入：true 时问卷显示工作和收入两步，生成 Modulo 2
  }
}
```

### 1.1 家属一起办（D23）
- `childrenUnder14`：写进主申请人的 Modulo 1 第 12 节。
- 配偶、年满 14 岁的子女：问卷为每人生成**另一份完整的申请资料**（各自的 `person`、`document` 等，`relatedApplication.spouse/parent = true`），各出一份参考件。

---

### 1.2 本机人员与申请内关系（D54，Codex 实现同步）

人员资料没有全局 `role`。本机保存 `members: { id, updatedAt?, data }[]`，一人可有多份申请；草稿另含 `profileId` 指向该人员。

关系元数据放在草稿层，**不属于 Application，不传入表格映射**：

```jsonc
"relations": [
  { "personId": "fictional-child", "relation": "child", "purpose": "section", "childIndex": 0 },
  { "personId": "fictional-spouse", "relation": "spouse", "purpose": "own-application", "draftId": "fictional-other-application" }
]
```

- `section` 只记录一次明确确认，实际表格使用申请内 `spouse` / `childrenUnder14` 的复制快照。配偶位置由 profile 的 dependents 节控制；子女须未满 14 岁。同一申请的这些位置不能重复选择一人或选择申请人本人。
- `own-application` 必须有 `draftId`；为配偶另建时双方 `relatedApplication.spouse = true`，为年满 14 岁子女另建时子女申请 `relatedApplication.parent = true`。
- 新申请不继承上一份的关系。编辑人员资料可明确选择同步到进行中的申请；已生成申请不自动改动。删除某人只删除其资料及其申请，其他申请的复制快照保留，悬空关联移除。
- 旧备份读取前移除全局 role；已有配偶/子女快照原样保留，不按旧角色推断新关系。缺少 mailToDifferent 时由是否存在 mailTo 推导。30/28 的历史 rilascio 升级为 conversione，并清除旧生成标记和完成步骤。

### 1.3 问卷适用范围与输出投影（D53–D54）

`projectApplication` 从当前 `stepsFor` 显示字段构建输出副本，统一供表格、费用和材料使用。隐藏的答案仍保存在原草稿里，切回来能继续填写；隐藏答案不进入输出。进度和必填检查同样只看显示字段。

- Questura 使用一个组合选择，写入正式意大利文城市名；表头省份由 questure 表派生，旧的不匹配省份不会进入输出。未知旧城市保留在草稿中，须重新选择。
- mailToDifferent 为 true 时，省、Comune、街道、CAP 必填；为 false 时，输出第 8 节为空，草稿中的其他地址仍保留。

| 当前工作分支 | 今年才入职 | 工资单 / INPS / 月收入 | 自雇今年开始 | 报税表选项 |
|---|---|---|---|---|
| 雇佣 | 必填 | 今年才入职为 true 才显示，选填 | 隐藏 | CU、个人报税 |
| 自雇 | 隐藏 | 隐藏 | 必填 | 个人、合伙企业、资合公司 |
| 其他 | 必填 | 今年才入职为 true 才显示，选填 | 隐藏 | 所有现有选项 |
| 仅收入 profile | 隐藏 | 保留当前选填行为 | 隐藏 | 所有现有选项 |

表中为 D54 目前批准的问卷行为；仅收入第 60–62 栏和报税表选项的官方依据仍见 OPEN_QUESTIONS。旧的不适用报税表答案保留并报错，不自动换成其他选项。完整字段分支和全部映射目标由 `npm run rules:build` 生成至 FIELD-RULES.md，一致性测试防止表格落后于代码。

---

## 2. 条件（`when` / `condition`）

在 Codex 现有条件（`applicationCodes, operations, minDurationMonths, maxDurationMonths, minor, hasIncome`，全部取 AND）之上，**新增两个键**：

| 键 | 含义 |
|---|---|
| `equals` | `{ "<路径>": 值 }`。资料里该路径的值等于这个值；值是数组时表示"等于其中任一个"；路径是数组（如 `application.aggiornamentoReasons`）时表示"包含其中任一个"。 |
| `present` | `["<路径>", ...]`。这些路径都有值（非 null、非空字符串、非空数组、非 false）。 |

---

## 3. 填写规则（`data/mapping/<form>.json`）

```jsonc
{ "form": "modulo1", "version": 1, "verifiedOn": "2026-11-05",
  "rules": [
    { "field": "M1-003", "value": { "path": "person.surname" } },
    { "field": "M1-009", "value": { "const": "X" }, "when": { "operations": ["rinnovo"] } }
  ] }
```

- 同一字段可以有多条规则：按顺序取**第一条条件成立**的。没有规则成立 → 留空。
- 没有出现在规则里的字段一律留空（例如签名日期 M1-028 留给用户手写）。

### 3.1 `value` 的写法

| 写法 | 结果 |
|---|---|
| `{ "path": "x.y" }` | 取资料里的值。日期字段自动拆成 gg / mm / aaaa；`choice` 字段取 `true → "SI"`、`false → "NO"` |
| `{ "const": "X" }` | 固定值 |
| `{ "parts": { "<分组名>": <value>, ... } }` | `parts` 字段，每组一个 value |
| `{ "computed": "<名称>" }` | 引擎计算，名称见 3.2 |
| `{ "join": [<value>, ...], "sep": " " }` | 把几个值用分隔符连起来，空值跳过 |

### 3.2 `computed` 名称（引擎实现）

| 名称 | 结果 |
|---|---|
| `children.count` | `childrenUnder14` 的人数，两位数补零（`02`） |
| `modules.count` | 这份申请填了几份表：只有 Modulo 1 → `01`，加 Modulo 2 → `02` |
| `fee.euro` / `fee.cents` | 本张缴费单金额的欧元部分 / 分（两位补零） |
| `fee.words` | 本张缴费单金额的意大利文大写，如 `OTTANTA/46` |
| `income.annual.euro` / `income.annual.cents` | `income.annualCents` 拆开 |
| `income.monthly.euro` / `income.monthly.cents` | `income.monthlyCents` 拆开 |

### 3.3 引擎统一做的转换
- 格子字段（boxes / parts / date）：转大写；去重音（À→A、È→E……）；`’` 和 `'` 变成空格；超出格数时报警告并截断（D14）。
- `freetext`：转大写、去重音，不截断。
- 金额的 `euro` 分组**靠右**对齐（80,46 → 8 格里最后两格写 8、0）；`cents` / `centesimi` 两位补零。其余字段一律靠左。
- 数字值（如同住人数）转成字符串时，按格数左补零：2 格写 `02`。

---

## 3A. 问卷文案（`data/questions.json`）

问卷的**结构和分支**（步骤、分节、何时出现哪个字段、必填）由代码决定（`src/ui/questionnaire.ts`）；**文字和默认值**由这份数据提供。

```jsonc
{
  "fields": {
    "person.birthCity": { "label": "出生地", "hint": "输入框下方的灰字", "help": "点 (?) 显示的说明" },
    "childrenUnder14[].birthCity": { ... }   // 针对子女的覆盖
  },
  "sections": { "姓名与出生资料": "该分节 (?) 的说明" },
  "defaults": [
    { "path": "currentPermit.typeCode", "value": { "fromPath": "application.code" }, "when": { "operations": ["rinnovo"] } },
    { "path": "person.birthCountry", "value": { "const": "CHN" } }
  ]
}
```

- **字段的可选键**（2026-11-06 新增）：
  - `paper`：替换输入框上方那行"Modulo · 第 N 栏 · 意大利文"。用于不写进表格的辅助问题，如 `"不写进表格 · 决定要带哪些材料"`。
  - `options`：`[{ "value": "...", "label": "...", "hint": "..." }]`，替换代码里的选项文字；`hint` 显示在选项下方。
- **`groups`**（2026-11-06 新增）：把几个路径合成一栏显示，key 是公共前缀：
  ```jsonc
  "groups": { "address.phoneMobile": { "label": "手机号（选填）", "hint": "...", "help": "...",
                                       "parts": ["prefisso", "numero"] } }
  ```
  同一栏里左右排列各个 part（按纸质表比例，前窄后宽），标签用 group 的 `label`，各 part 的 `fields` 文案作为无障碍名称和占位提示。
- **字段查找顺序**：完整路径（下标换成 `[]`，如 `childrenUnder14[0].x` → `childrenUnder14[].x`）→ 把 `spouse.` / `childrenUnder14[].` 换成 `person.` 后再查。找不到时沿用代码里的默认文字。
- `hint` 为空字符串表示不显示提示；`help` 为空表示这一项不显示 (?)。
- **分节查找**：按分节标题完全匹配；标题以数字结尾的（如"过去六年住址 2"）去掉末尾数字和空格再查。
- **defaults**：字段**为空时**才预填，用户可以改；`when` 用第 2 节的条件写法；同一路径取第一条条件成立的。`value` 是 `{ "const": 值 }` 或 `{ "fromPath": "另一路径" }`（源路径为空就不预填）。路径里的 `[]` 表示对每个子女都适用。

## 4. 问卷需要推出的值

### 4.1 `application.code` / `operation`（P1）
| 用户情况 | code | operation |
|---|---|---|
| 工作居留续签 | 16 | rinnovo |
| 自雇居留续签 | 15 | rinnovo |
| 首次申请长居 | 09 | rilascio |
| 已有长居卡，更新信息 / 照片 | 03 | aggiornamento |
| 更新居留许可（换住址、换护照、加子女、照片） | 04 | aggiornamento |
| 补发居留许可 / 补发长居卡 | 12 / 11 | duplicato |
| 家庭居留续签 / 14–18 岁未成年人家庭居留续签 | 13 / 14 | rinnovo（第一次签发由 Sportello Unico 填，只提示） |
| 大学学习：第一次申请 / 续签 | 24 | rilascio / rinnovo |
| 高中、职业培训、实习学生：第一次申请 / 续签 | 31 | rilascio / rinnovo |
| 毕业后找工作 / 创业 | 30 | conversione（D55） |
| 失业后等待就业 | 05 | rinnovo |
| 别的居留转为家庭居留 | 10 | conversione |
| 季节性工作续签 | 18 | rinnovo（第一次签发由 Sportello Unico 填，只提示） |
| 选择性居留：第一次申请 / 续签 | 21 | rilascio / rinnovo |
| 等待入籍：第一次办 / 续签 | 06 | rilascio（待确认，见 OPEN_QUESTIONS）/ rinnovo |
| 寄养 / 监护托付续签 | 02 | rinnovo（第一次签发去 Questura） |
| 未成年学生 / 职业培训和实习（第 39 条之二）：第一次申请 / 续签 | 32 / 33 | rilascio / rinnovo |
| 公务派遣 / 宗教事由：第一次申请 / 续签 | 19 / 20 | rilascio / rinnovo |
| 研究人员续签 / 研究人员流动续签 | 27 / 29 | rinnovo（第一次签发由 Sportello Unico 填，只提示） |
| 研究人员研究结束后找工作 / 创业 | 28 | conversione（D55） |
| 无国籍身份续签 / 庇护续签 | 23 / 07 | rinnovo |

**P2 A 批的问卷差异**（Codex 实现；文案已在 `data/questions.json`）：
- 04：和 03 一样问 `application.aggiornamentoReasons`。
- 11 / 12：不加新问题。报失或报盗证明只出现在材料清单里。
- 13：问 `family.sponsorPermitValidUntil`（分节"担保家属"）。
- 14：不加新问题。未成年人自动免 contributo。
- 24 / 31：
  - rilascio 时问 `visa.*`（分节"签证信息"），不问现有居留；
  - 都问 `study.working`（分节"学习与打工"）；
  - `true` 时显示工作情况（`work.type` 三个选项都可选）和收入两步，引擎按收入生成 Modulo 2（`moduli = 1+2-if-income`）。
- 30 / 05：
  - 问 `employmentCentre.*`（分节"职业介绍中心登记"），不显示工作情况那一步；
  - 收入一步选填（例如 NASpI）；
  - 30 的"现有居留"填学习居留（作为 "di riferimento"）。
- 默认值：
  - 24 / 31 / 05 的 `expectedDurationMonths` 默认 12（30 从 D55 起按转换办，不问期限）；
  - 11 的现有居留类型默认 09；
  - 05 不沿用"续签默认同一种"，因为原来多半是 16 / 15。

**P2 B 批的问卷差异**（D47；Codex 按 `profile` 实现，文案已在 `data/questions.json`）：
- 10：问 `family.sponsorKind`（分节"要团聚的家属"）。"现有居留"填现在那张别的类型的居留，不预填类型。家属是外国人时，材料多列报税单、住房适宜证明和家属居留。
- 18：工作类型固定"雇佣"、合同固定"季节工"（defaults 已预填），其余和 16 一样。
- 21：rilascio 时问签证、不问现有居留；收入一步必填，不显示工作和雇主；问预计期限（分节"居留期限"）。
- 06：问预计期限（分节"居留期限"）。rilascio 时"现有居留"填别的类型的居留；rinnovo 时类型默认 06。
- 02：不加新问题。不用印花税票（`stampExempt`）。
- 每种类型的 `noteZh` 显示在"申请信息"一步开头。

**P2 C1 的问卷差异**（D48；全部用现有 `profile` 键，没有新问题）：
- 32 / 33：和 31 相同（`workStep: student`，首次填签证）。
- 19 / 20：首次填签证、不问现有居留；问预计期限（分节"居留期限"）。
- 27 / 29：和 16 类似的"工作与收入"一步，工作类型三种都可选；问预计期限。
- 28：和 30 相同（职业介绍中心登记、收入选填）。
- 23 / 07：收入一步选填，填了收入才生成 Modulo 2（`moduli = 1+2-if-income`）。07 的难民身份默认"是"。

**P2 C2 的问卷差异**（D49）：
- 17：先问 `application.art27Letter`（分节"特殊工作类别"），再问预计期限（默认 12）。
- 选 A、B、C、D、E、O、P、R：显示"工作与收入"一步，工作类型固定"雇佣"，生成 Modulo 2（`moduli = 1+2-when`）。
- 选 F、I、M、N、Q、R bis：不显示工作和收入，只生成 Modulo 1。
- 现有居留类型默认 17（续签默认同一种）。

### 4.2 `application.expectedDurationMonths`（D26）
| 情况 | 月数 |
|---|---|
| 16 rinnovo，`work.contract = determinato` | `work.contractMonths`，最多 12 |
| 16 rinnovo，`indeterminato` | 24 |
| 15 rinnovo | 24 |
| 09、03 | 不需要（费用规则按类型定） |
| 04、11、12 | 不需要（`senza-contributo`） |
| 13 | 从今天到 `family.sponsorPermitValidUntil` 的月数（向上取整）；没填就留空，费用显示"待补全资料" |
| 14 | 不需要：未成年免缴 |
| 24、31、05 | 默认 12（questions.json defaults），用户可改 |
| 30、28 | 不需要：转换不收 contributo（D55） |
| 18 rinnovo | 同 16 的季节工合同：`work.contractMonths`，最多 12（季节工最长 9 个月） |
| 21、06 | 默认 12，用户可改 |
| 17 | 默认 12，用户可改（A 类可到 5 年，I 类最长 2 年） |
| 10 | 不需要：转换不收 contributo（`conversione-senza-contributo`） |
| 02 | 不需要：只有未成年人，免缴 |
| 32、33、19、20、27、29、23 | 默认 12，用户可改 |
| 07 | 不需要：庇护免 contributo（`senza-contributo`） |

从 P2 B 批起，每种类型怎么推算期限写在 `application-types.json` 的 `profile.duration`（SPEC §5.4），上表是对照说明。
