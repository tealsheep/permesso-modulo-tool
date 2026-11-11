# 居留填表助手（permesso-helper）需求说明书

- 版本：v1 · 2026-11-05
- 依据：`docs/DECISIONS.md` D1–D34（本文与决策冲突时以决策为准，并更新本文）
- 官方资料：`official/`（来源见 `official/SOURCES.md`）；调研：`docs/research/`

---

## 1. 产品概述

一个免费、开源、纯前端的网页工具。帮助在意大利的中文用户准备邮局居留申请 kit（MOD. 209）：

1. 用户回答问题，工具生成一份**参考件**（PDF，也可转成图片）。参考件和官方表格外观一致，格子里已经填好内容。
2. 用户照着参考件，用黑色笔把内容**手写抄到**邮局领取的纸质 kit 上。

参考件不用于提交（D5）。工具只做填写辅助，不提供法律建议。

### 1.1 不做的事
- 不生成用于提交的打印表格，不做扫描级精度的套打（D5）。
- 不建服务器、账号，不做访问统计或追踪（D8、D29）。
- 不处理必须去 Questura 办的申请，只给提示（D31）。
- 不为 Sportello Unico 代填的首次申请生成参考件，只给提示（D32）。

---

## 2. 用户流程

1. **选择申请**：工具用中文问题确定申请类型（codice motivo）和办理方式（rilascio / rinnovo / aggiornamento / duplicato / conversione）。
   - 属于 Questura 类型 → 显示"请直接预约 Questura"，结束。
   - 属于 Sportello Unico 代填 → 显示"表格由 Sportello Unico 填写，不需要自己填"，结束。
2. **选择资料**：选择或新建申请人资料。勾选这次带谁一起办（配偶、子女）（D15）。
3. **回答问题**：按表格栏目顺序分页提问（D13，暂定）。每题中文为主，附表格上的意大利文原词（D3）。根据申请类型跳过不相关的栏目。
4. **自动检查**：输入时即时检查（见第 6 节）。
5. **生成参考件**：生成 PDF，可在手机上逐页查看（图片），也可下载 PDF。
6. **保存**：资料自动存在浏览器里；可以导出成文件，下次导入（D8）。

---

## 3. 范围

### 3.1 申请类型（D30–D32）

覆盖官方 codice motivi 表（`official/2026-11-05_Informativa_Generale.pdf` 附表 2；网页版 https://www.portaleimmigrazione.it/ITA/tabellauffpostali.html）里所有走邮局 kit 的类型。

每种类型在 `data/application-types.json` 中描述（格式见 5.4），包括：
- 需要哪些表：只要 Modulo 1 / Modulo 1 + 2 / 有收入时加 Modulo 2
- 哪些办理方式由 Sportello Unico 代填
- 费用规则
- 材料清单

各类型要填哪些表，调研结果见 `docs/research/official-facts.md` 第 2 节。

### 3.2 开发顺序（D33）

| 阶段 | 内容 |
|---|---|
| P0 | 搭建项目、数据格式、生成引擎、PDF 渲染，先用一个假数据样例跑通 |
| P1 | 4 种类型做通整套流程：工作续签（16）、自雇续签（15）、首次转长居（09）、更新长居卡（03） |
| P2 | 逐个加入其余 kit 类型 |
| P3 | 用户验证（D10），然后发布并开源（D16） |

架构从 P0 起按"所有类型"设计，加类型时主要是加数据，而不是改代码。

---

## 4. 参考件（输出）

一份 PDF，按顺序包含：

1. **封面页**（工具自制，中文）
   - 顶部是**填写须知**提示框（D19）：用黑色笔，大写字母，一格一个字，写在格子里，写错不涂改而是换新表；Modulo 1 第 1 页底部「FIRMA」签名、「DATA」写交表当天日期；€16 印花税票贴在 Modulo 1 第 1 页**上方中间的「MARCA DA BOLLO」方框**里（右上角「Codice Istanza」是邮局贴条码的位置，不要贴、不要写）；信封不封口。
   - 本次申请摘要：申请类型；需要哪些表；要交的钱（缴费单金额 + 邮局窗口 €30 邮寄费）；带哪些家属。
   - 依据的表格下载日期（D17）；"以当地 Questura 要求为准"的声明。
2. **Modulo 1**：官方 PDF 原页面，叠加填好的内容。
3. **Modulo 2**（如需要）：官方 PDF 禁止修改，按 `data/forms/modulo2-layout.json` 在空白页上**重画**，再叠加内容。不放国徽（D35）。
4. **缴费单（bollettino TD 674）**：以缴费单图片为底图，叠加金额、大写金额、缴款人、地址、CAP、城市（D22）。三联的内容要完全一致。
5. **材料清单页**（工具自制）：意大利文原名 + 中文翻译（D11），注明"常见材料，以当地 Questura 要求为准"（D18）。

**家属**（D23）：
- 未满 14 岁的子女写进主申请人 Modulo 1 的第 12 节。
- 配偶和年满 14 岁的子女，每人另生成一份完整参考件（第 2–5 部分）。

**不加水印**（D21）。

### 4.1 渲染要求
- 用 pdf-lib 在官方 PDF 的页面上按坐标画文字（官方 PDF 没有可用的表单字段）。
- 表格内容用等宽的拉丁字体，大写，每个字符居中落在对应格子里。只要求肉眼看起来准确（D7）。
- 封面页和材料清单页含中文，需要嵌入中文字体。只嵌入用到的字（子集化），控制文件大小。
- 用 pdf.js 把每页渲染成图片，供手机查看（D12）。

---

## 5. 数据（由 Claude 维护，代码只读取，D34）

所有数据放在 `data/` 下，JSON 格式。每个文件带 `version` 和 `verifiedOn`（核实日期）。

### 5.1 字段数据：`data/forms/modulo1.json`、`modulo2.json`、`bollettino.json`

字段 ID 用官方 PDF 上印的编号：Modulo 1 为 1–173，Modulo 2 为 1–68，例如 `M1-031` 就是 Modulo 1 的第 31 项 CODICE FISCALE。缴费单字段用 `B-` 加名称，例如 `B-importo`。

```jsonc
{
  "form": "modulo1",
  "source": "official/2026-11-05_Modulo_1.pdf",
  "version": 1,
  "verifiedOn": "2026-11-05",
  "fields": [
    {
      "id": "M1-031",
      "page": 2,                       // 从 1 开始
      "section": "SEZIONE 3 - DATI ANAGRAFICI",
      "labelIt": "CODICE FISCALE (OVE IN POSSESSO)",
      "labelZh": "税号（如有）",
      "kind": "boxes",                 // boxes | checkbox | date | freetext
      "boxes": { "x": 0, "y": 0, "w": 0, "h": 0, "count": 16, "pitch": 0 },
      // date 类型：分 gg / mm / aaaa 三组 boxes
      // checkbox 类型：一个格子的位置，填 "X"
      "charset": "A-Z0-9",
      "codeTable": null                // 例如 "provinces" | "motivi" | "stati" | "documenti" | "autorita"
    }
  ]
}
```

坐标单位是 PDF point，原点在页面左下角（与 pdf-lib 一致）。

### 5.2 代码表：`data/codes/`

来自 `official/2026-11-05_Informativa_Generale.pdf` 附表 1–5：

| 文件 | 内容 |
|---|---|
| `provinces.json` | 附表 1：省份缩写 |
| `motivi.json` | 附表 2：申请类型代码 |
| `stati.json` | 附表 3：国家代码（附中文国名） |
| `documenti.json` | 附表 4：护照以外的证件代码 |
| `autorita.json` | 附表 5：证件签发机关代码 |

性别（F/M）和婚姻状况（A 未婚、B 已婚）是固定字母，写在引擎里。

### 5.3 费用：`data/fees.json`

- 卡费 €30,46，每份申请都要交。
- contributo：€40（>3 个月 ≤1 年）、€50（>1 年 ≤2 年）、€100（长居等）。
- 免 contributo：未成年人；aggiornamento、conversione、duplicato；以及官方列出的其他免缴情形。
- 跟父母一起办的未满 14 岁子女：每个孩子另交一张 €30,46 的缴费单。
- 邮局窗口另交 €30 邮寄费，不在缴费单上。
- P1 的 4 种类型按 D26 的金额。用户无法确定期限时，按 D26 的规则选择，旁注"如不确定，请在邮局窗口确认"。

规则用数据描述：申请类型 + 办理方式 + 预期期限 + 是否未成年 → 金额。

### 5.4 申请类型：`data/application-types.json`

```jsonc
{
  "code": "16",
  "nameIt": "Lavoro subordinato",
  "nameZh": "雇佣工作",
  "channel": "kit",                     // kit | questura
  "operations": ["rinnovo"],            // 本工具支持的办理方式
  "sportelloUnicoFills": ["rilascio"],  // 这些办理方式只提示不生成
  "moduli": "1+2",                      // "1" | "1+2" | "1+2-if-income" | "1+2-when"
  "materials": "data/materials/16.json",
  "feeRule": "contributo-by-duration"
}
```

- `group`：选申请页的主分组，取值 `rinnovo` | `rilascio` | `aggiornamento`。
- `alsoInGroups`（可选，D46）：同时显示在这些分组。从某一组点进去时，`operation` 默认取该组对应的办理方式（rinnovo → rinnovo，rilascio → rilascio），但只能取 `operations` 里有的。例如 24：`"group": "rinnovo", "alsoInGroups": ["rilascio"]`。
- `titleZh`（可选，D47）：列表和标题上显示的中文名，例如 16 显示"工作居留续签"。没有就用 `nameZh`。
- `noteZh`（可选，D47）：这一类的特别提醒，显示在问卷"申请信息"一步的开头。例如 18 写"多年期季节工居留要去 Questura"。
- `moduli = "1+2-when"` 和 `modulo2When`（D49）：资料满足 `modulo2When`（条件格式同 DATA-MODEL §5，`equals` 等）时才生成 Modulo 2，并勾 M1-024。
  - 两者必须一起出现。
  - 这种类型的 `profile.workStep` 只在要 Modulo 2 时生效：不要 Modulo 2 时不显示"工作与收入"一步，生成时也不需要那些资料。
  - 目前只有 17：`{"equals": {"application.art27Letter": ["a","b","c","d","e","o","p","r"]}}`。
- `stampExempt`（可选，D47）：`true` 时这一类免 €16 印花税票。材料清单、参考件须知、第 1 页印花税票框的标记和费用汇总里都不出现印花税票。目前只有 02。
- `profile`（D47）：这一类的问卷和推算方式，代替原来写死在代码里的类型特例。所有键都可选：

| 键 | 取值 | 含义 | 例子 |
|---|---|---|---|
| `noCurrentPermitFor` | operation 数组 | 这些办理方式不问"现有居留"，生成时清空 `currentPermit` | 24、31、21：`["rilascio"]` |
| `visaFor` | operation 数组 | 这些办理方式问"签证信息"（`visa.*`，Modulo 1 第 5 节） | 24、31、21：`["rilascio"]` |
| `workStep` | `work` / `student` / `income` / `income-optional` / 不写 | `work`：显示"工作与收入"一步。`student`：问 `study.working`，有打工才显示工作和收入，且 `study.working = false` 时视为没有收入。`income`：只显示收入一步，必填，不显示工作、雇主，生成时清空 `work` / `employer` / `business` / `contrattoSoggiorno`。`income-optional`：同 `income`，但收入选填。不写：没有工作和收入一步 | 16 `work`；24 `student`；21 `income`；05 `income-optional` |
| `workTypes` | `work.type` 取值数组 | 工作类型只给这些选项 | 16、18：`["subordinato"]`；15：`["autonomo"]` |
| `contracts` | `work.contract` 取值数组 | 合同类型只给这些选项 | 18：`["stagionale"]` |
| `duration` | 见下 | `expectedDurationMonths` 怎么来 | |
| `sections` | 分节键数组 | 额外显示的分节（见下表） | 13：`["sponsor"]` |
| `operationChooser` | `true` | 只有一种办理方式也先弹出"办理方式"选择（让用户看到"第一次签发由 Sportello Unico 填"的提示） | 13、14 |

`duration.source` 的取值：
- `contract`：按工作合同推算（DATA-MODEL §4.2 的 16 规则），合同为"其他"时再问期限。用于 16、18。
- `fixed`：固定为 `duration.months`，不问。用于 15（24 个月）。
- `sponsor`：从今天到 `family.sponsorPermitValidUntil` 的月数，向上取整。用于 13。
- `question`：直接问 `application.expectedDurationMonths`，默认值在 `questions.json` 的 defaults 里。放在已有的相关分节（如"学习与打工""职业介绍中心登记"），没有相关分节的放进新分节"居留期限"。
- 不写：不需要期限（费用不按期限算，或未成年 / 转换已免）。

`sections` 的分节键：

| 键 | 分节 | 所在步骤 | 字段 |
|---|---|---|---|
| `aggiornamentoReasons` | 更新原因 | 申请信息 | `application.aggiornamentoReasons` |
| `sponsor` | 担保家属 | 申请信息 | `family.sponsorPermitValidUntil` |
| `sponsorKind` | 要团聚的家属 | 申请信息 | `family.sponsorKind` |
| `employmentCentre` | 职业介绍中心登记 | 申请信息 | `employmentCentre.*` |
| `idoneita` | 住房适宜证明 | 住址 | `housing.idoneita.*` |
| `currentResidence` | 目前登记住址 | 住址 | `housing.currentResidence.*` |
| `pastResidences` | 过去六年住址（含"＋"按钮） | 住址 | `housing.pastResidences[]` |
| `dependents` | 同住受抚养家属 | 家属与提交 | `dependents.*` |
| `art27Letter` | 特殊工作类别（D49） | 申请信息，放在"居留期限"之前 | `application.art27Letter` |

### 5.5 材料清单：`data/materials/<code>.json`

按类型和办理方式列出材料：`nameIt`、`nameZh`，可附 `condition`，例如"仅当年新入职"。只列名称，不附说明（D11）。首次转长居包括 A2 意大利语证书（D24）。

---

## 6. 输入检查（D14）

| 检查 | 规则 |
|---|---|
| 税号 | 16 位格式、校验位；与姓、名、出生日期、性别是否一致（要考虑 omocodia 替换字符）。不一致时警告，不阻止 |
| 姓名 | 与护照一致的拉丁字母，自动转大写；出现汉字或格子不支持的字符时提示 |
| 日期 | 合法日期，统一输出 gg / mm / aaaa |
| 证件有效期 | 护照或现有居留已过期时警告；现有居留过期超过 60 天时提示"需去 Questura"（D31） |
| 字数 | 超出格子数时提醒，并显示会被截断成什么样 |
| 代码 | 只能从代码表里选，不能手填 |

---

## 7. 架构

```
src/
  data/        读取 data/ 下的 JSON，带类型定义（只读）
  engine/      纯函数：申请人资料 + 申请选择 → 每个字段的值
               包括：选表、选栏目、选代码、算费用、出材料清单、数字转意大利文大写金额
  render/      pdf-lib 叠加文字、封面页和材料页、pdf.js 转图片
  ui/          问卷、资料管理、预览（React）
  storage/     浏览器本地存储、导出导入
```

- **engine 和 ui 完全分开**（D13 暂定）：engine 不依赖 React 和浏览器，输入是普通 JSON，以后可以换输入方式。
- 页面加载完成后不发起任何网络请求，所有资源随网站一起发布（D8、D29）。

### 7.1 资料文件格式
- 导出格式：`{ "format": "permesso-helper-profile", "version": 1, "profiles": [...] }`
- 导入时校验格式和版本，旧版本做迁移。
- 页面上要有"清除本机所有数据"按钮。

### 7.2 测试
- engine：用明显虚构的申请人数据（如 ROSSI MARIO 这类），对每种类型写单元测试，断言每个字段的值。规则逐条对照官方说明（D10）。
- 税号校验、意大利文大写金额：单独测试。
- render：生成 PDF 后检查文字是否落在格子范围内（坐标测试），并保留截图用于人工比对。
- 测试和仓库里不得出现真实个人信息（AGENTS.md）。

---

## 8. 非功能要求

- 以手机查看为主，电脑上也要正常。（这是第二轮 Q8 的建议，用户没有明确表态，实现前可再确认。）
- 界面中文为主，附意大利文原词（D3）。
- 静态托管：GitHub Pages 或 Cloudflare Pages，发布时再定（D12）。
- 开源，发布时公开到 GitHub（D16）。许可证发布时再定。

---

## 9. 分工和第一批任务（D4、D28）

### Claude（数据）
1. `data/forms/modulo1.json`：Modulo 1 全部 173 项的坐标。
2. `data/forms/modulo2.json`：Modulo 2 全部 68 项的坐标。
3. `data/forms/bollettino.json`：缴费单字段坐标。
4. `data/codes/*`：5 张代码表。
5. P1 四种类型的 `application-types`、`fees`、`materials` 数据，以及每种类型要填哪些字段。

### Codex（代码）
1. 搭建 Vite + React + TypeScript 项目，配置测试（Vitest）和代码检查。
2. 定义第 5 节数据的 TypeScript 类型，加载时做校验。
3. engine 框架和税号校验、意大利文大写金额两个工具函数。
4. render：先拿手写的 2–3 个字段测试数据，在 Modulo 1 第 1 页上叠加文字，确认坐标系和字体没问题。

Codex 可以在 Claude 做字段数据的同时完成第 1–4 项。字段数据完成后，Claude 在 `docs/HANDOFF.md` 里通知。

---

## 10. 已知风险和未决问题

见 `docs/OPEN_QUESTIONS.md`。和实现直接相关的：

- 实物 kit 的 Modulo 2 每页右上角有"Codice Istanza / 条码"位置，说明邮局发的表格和网上 PDF 不完全一样。版式是否一致，由用户在发布前验证时留意（D25）。
- 缴费单底图只有 1024×315，不够清晰时要找更好的图源。
- 3 年期续签的 contributo 档位官方没说明，按 D26 处理。
- D.Lgs. 83/2026（permesso unico）：已复查，不影响 kit、表格和费用（`research/official-facts.md` §9）。
