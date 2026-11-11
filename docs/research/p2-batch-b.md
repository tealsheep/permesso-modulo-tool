# P2 B 批调研：官方要求（2026-11-06，Claude）

来源：portaleimmigrazione.it 各类型子页（10 标"Ultimo aggiornamento 04/11/2024"，其余标"22/07/2024"；查看 2026-11-06），以及官方费用表 tabelleCosti.html。

标记：【官方】= 官方门户原文要点；【二手】= 非官方来源。

B 批原计划 6 种（P2-PLAN）。用户决定把 17 移到 C 批（D47），这批做 10、18、21、06、02。

## 1. 费用：转换（conversione）不收 contributo

【官方】tabelleCosti.html 的"例子"表：

> Per richieste di: 1 Aggiornamento 2 Conversione 3 Duplicato | 30.46 € | non previsto | Un bollettino da 30.46€

- 二手（money.it 等）写法一致：转换有效居留不交 contributo。
- 对数据的含义：`fees.json` 加一条 `conversione-senza-contributo`（`operations: ["conversione"]`，优先级 50）。这样不管哪种 `contributo-per-durata` 类型选了"转换"，都只付 €30,46。
- 同一张表还写了：高管和高技能人员（第 27 条 a 款，属于 17）交 €100，和长居一样。C 批做 17 时要用。

## 2. 各类型要求

### 10 转为家庭居留（conversione in motivi familiari）· 只要 Modulo 1 · 转换，不收 contributo，付 €30,46
【官方】conversionePermessoSoggFamiliari.html（第 30 条）。
- 附件：
  - 整本护照复印件；
  - 证明亲属关系的户籍文件；
  - 要团聚的外国家属的报税单复印件；
  - 住房适宜证明（idoneità alloggiativa，按全家人数算）。
- 谁能申请：
  - 用别的居留合法住满 1 年、在意大利和意大利 / 欧盟公民或合法居留外国人结婚的；
  - 符合家庭团聚条件的合法居留外国人家属。
  - 家属是外国人的，要在原居留**到期前的最后一年内**申请。
- 收入：1 个家属要达到 assegno sociale 年额，2–3 个为 2 倍，4 个以上为 3 倍；同住家属的收入可以合并计算。
- 家属是**被承认的难民**，或是**意大利 / 欧盟公民**的：只要亲属关系证明。
- 户籍文件来自国外的要翻译、认证并经使领馆核验；已在意大利户籍登记的，填 Modulo 1 就算自我声明。
- 期限：和家属的居留一样长，跟家属一起续签。但转换不收 contributo，期限不影响费用，这次不用问。
- 对数据的含义：
  - 新问题 `family.sponsorKind`（外国人 / 意大利或欧盟公民 / 难民）；
  - 家属是外国人时，才列报税单、住房适宜证明和家属居留复印件。

### 18 季节性工作续签（lavoro subordinato stagionale）· Modulo 1 + 2 · contributo 按期限
【官方】lavoroSubordinatoStagionale.html（第 24 条）。
- 首次签发：Modulo 1、2 由 Sportello Unico 在签居留合同时填写，**本工具只提示，不生成**。
- 续签附件：
  - 整本护照复印件；
  - 季节工居留合同复印件；
  - 寄合同给 Sportello Unico 的挂号信回执。
- 季节工授权 20 天到 9 个月。
- **多年期季节工居留（pluriennale）去 Questura 办，不走邮局。**
- 费用：期限最长 9 个月，所以 3 个月以内只交 €30,46，4–9 个月为 €70,46。期限按合同月数算，和 16 的季节工合同相同。
- 挂号信回执：和 16 一样，这是 2011 年以前的写法，现在由 UNILAV 代替（见 `official-facts.md` §8）。材料清单列"合同 / UNILAV"，并注明有回执就一并附上。

### 21 选择性居留（residenza elettiva）· Modulo 1 + 2 · contributo 按期限
【官方】soggResidenzaElettiva.html。
- 附件：
  - 整本护照复印件；
  - 证明有充足经济来源的文件：房产，或其他合法的**非工作**来源，或意大利（或意大利当局认可的）养老金、年金。
- 不能工作。【二手】首次签发 1 年；续签各来源写法不一（1 年或 1–2 年）。问卷问预计期限，默认 12 个月。
- 首次签发：凭选择性居留签证入境后，在邮局交 kit，填 Modulo 1 第 5 节签证，和学生首次签发一样。
- 对数据的含义：Modulo 2 只填收入部分（第 5 节），不填工作、雇主那几节。收入必填。

### 06 等待入籍（attesa acquisto cittadinanza）· 只要 Modulo 1 · contributo 按期限
【官方】attesaAcquistoCittadinanza.html（第 92/91 号法；DPR 394/99 第 11 条）。
- 附件：
  - 整本护照复印件；
  - 已经开始办理入籍（申请或认定意大利国籍）的证明复印件。
- 【二手】infoimmigrazione：期限 1 年，可以续到入籍程序结束。问卷问预计期限，默认 12 个月。
- 没找到 06 免 contributo 的依据，按期限收。
- 待确认：从别的居留第一次转到 06 时，Modulo 1 勾"签发"还是"转换"？勾"转换"就不收 contributo。目前按 rilascio 做，写进了 OPEN_QUESTIONS。

### 02 寄养 / 监护托付（affidamento）· 只要 Modulo 1 · 未成年免 contributo，付 €30,46 · **免印花税票**
【官方】affidamento.html（第 31 条）。
- 邮局只受理续签、转换、更新、补发；**首次签发去 Questura**。
- **免印花税（Esente imposta di bollo）**：不用贴 €16 印花税票。
- 签名：孩子未满 14 岁，由受托照顾的人（affidatario）签；14–18 岁，孩子和 affidatario 都签。
- 附件：整本护照复印件；寄养 / 监护托付决定书（decreto di affidamento）复印件。
- 对数据的含义：
  - 新增类型字段 `stampExempt: true`。材料清单不列印花税票。
  - Codex 需要处理的地方：参考件须知里的 €16 说明、第 1 页印花税票框的红框标记、缴费汇总，都按这个字段去掉。

## 3. 17 为什么移到 C 批

casiparticolariprevisti.html 列了 15 个子类：A 高管 / 高技能人员 … R bis 护士。各子类差别很大：
- 有的只要 Modulo 1，有的要 1 + 2（**此处分组有误，以 `p2-batch-c.md` §4 为准**）；
- 有的续签要延长后的 nulla osta（M、N、O）；
- B、C 首次签发还可以走自雇签证；
- 费用档位也不同：A 按 €100，其余按期限。

要逐个子类建数据，工作量约等于 B 批其余五种之和，中国用户又少。用户决定移到 C 批（D47）。

## 4. 还要确认的

1. 06 第一次办（从别的居留转过来）勾"签发"还是"转换"？关系到要不要交 contributo。
2. 21 续签批 1 年还是 2 年？关系到 €40 还是 €50 档。
3. 18 续签的挂号信回执：和 16 一样按"UNILAV 代替"处理，发布前可以问 Questura 或 CAF。
