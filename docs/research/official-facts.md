# Permesso di soggiorno 邮政 kit（Modulo 1 / Modulo 2）官方事实调研

- 调研日期（所有"查看日期"均为此日）：**2026-11-05**
- 方法：优先抓取 portaleimmigrazione.it（Ministero dell'Interno + Poste Italiane + ANCI + Patronati 联合门户）的 HTML 页面原文；poste.it、questure.poliziadistato.it、prefettura.interno.gov.it 作为补充官方来源。二手来源均标注【二手】。
- **按要求未下载任何 PDF**：PDF 只记录 URL，并用 HTTP HEAD 读取了 `Content-Length` / `Last-Modified` 元数据。因此 PDF 内部内容（字段编号、代码表正文、Istruzioni 原文）**未经本人核对**，见文末"不确定 / 需实测"。
- 标记约定：【官方】= 上述政府 / Poste 域名；【二手】= 律师事务所、资讯网站、大学指南等；⚠ = 可能过时或存在矛盾。

---

## 1. Modulo 1、Modulo 2、填写说明及代码表的官方 PDF 在哪里？

### 1.1 portaleimmigrazione.it "Documentazione" 页面
页面：https://www.portaleimmigrazione.it/ITA/documentazione.html 【官方】（查看 2026-11-05）

该页 JS 中定义的 PDF 链接如下（全部 HTTP 200，`Last-Modified: Sat, 26 Jul 2025 13:05:58/59 GMT`——所有文件时间戳相同，更可能是**网站整体重新部署的时间，而非文件内容修订日期**）：

| 文件 | URL | 大小 (bytes) | 页面上是否可见 |
|---|---|---|---|
| Modulo 1 | https://www.portaleimmigrazione.it/media/documentazione/Modulo_1.pdf | 3 834 372 | ⚠ **否**（HTML 中被 `<!-- -->` 注释掉） |
| Modulo 2 | https://www.portaleimmigrazione.it/media/documentazione/Modulo_2.pdf | 726 027 | ⚠ **否**（被注释掉） |
| Modulo Multilingue（MOD. 209 多语言版） | https://www.portaleimmigrazione.it/media/documentazione/MOD_209_Multilingue.pdf | 1 206 882 | **是**（目前唯一可见的链接） |
| Informazioni generali（"Informativa Generale"，推测即 kit 内的说明 / Istruzioni） | https://www.portaleimmigrazione.it/media/documentazione/Informativa_Generale.pdf | 2 485 318 | 否（被注释掉） |
| Procedure di regolarizzazione e documentazione da presentare | https://www.portaleimmigrazione.it/media/documentazione/Tipologie_Richiesta.pdf | 1 296 112 | 否 |
| Fac-simile domanda Rilascio Carta di Soggiorno | https://www.portaleimmigrazione.it/media/documentazione/Richiesta_Carta_Soggiorno_Stranieri.pdf | 1 803 223 | 否 |
| Fac-simile domanda Rilascio Permesso di Soggiorno | https://www.portaleimmigrazione.it/media/documentazione/Richiesta_Rilascio_Permesso_Soggiorno_Stranieri.pdf | 1 335 125 | 否 |
| Fac-simile domanda Rinnovo Permesso di Soggiorno | https://www.portaleimmigrazione.it/media/documentazione/Richiesta_Rinnovo_Permesso_Soggiorno_Stranieri.pdf | 1 804 281 | 否 |
| Privacy policy | https://www.portaleimmigrazione.it/media/documentazione/Privacy.pdf | 461 007 | 否 |

要点：
- 页面自我描述为下载"**fac-simili** della documentazione relativa alle istanze"（首页 Modulistica 卡片原文："effettuare il download dei fac-simili"），即官方把这些 PDF 定位为**样本**，不是可直接提交的表格（是否可打印提交见第 3 节）。
- 页面语言下拉框只有 `ITA`；`/ENG/documentazione.html` 返回 404（查看 2026-11-05）。
- 门户 HTML 页面（如 `nuovaProcedura.html`）里提到的代码表（"tabella Codici Sigle Province"、"Codici Motivi…"、"Codici di Stato"等）在网页上**没有单独发布**，原文中留着编辑占位符"(inserire tabella)"、"(inserire link con tabella)"。代码表应在 kit 纸质 Istruzioni 中，PDF 版可能在 `Informativa_Generale.pdf` 或 `MOD_209_Multilingue.pdf` 中（**未核实**）。
- 网页上唯一以 HTML 形式发布的代码表：**"codice motivi"表**（见 1.2）。

### 1.2 HTML 形式的表格页面【官方】（查看 2026-11-05）
- 邮局可办理的类型及代码（"codice motivi (ultimo aggiornamento: 30 maggio 2024)"）：https://www.portaleimmigrazione.it/ITA/tabellauffpostali.html
- 必须去 Questura 办理的类型（"Tabella 2B"）：https://www.portaleimmigrazione.it/ITA/tabellaMotiviTipologie.html
- 费用表：https://www.portaleimmigrazione.it/ITA/tabelleCosti.html
- 填写说明（网页版，含逐项提示 a., b., c.…）：https://www.portaleimmigrazione.it/ITA/nuovaProcedura.html
- 各类型所需材料（每类一页），入口：https://www.portaleimmigrazione.it/ITA/percittadiniextracomunitari.html（页面"Ultimo aggiornamento: 04/11/2024"；各子页多为"22/07/2024"）

### 1.3 其他官方 PDF（仅记录 URL，未下载）
- Questura（statics/29）"documenti da inserire nel kit postale per le principali tipologie"：https://questure.poliziadistato.it/statics/29/documenti-da-inserire-nel-kit-postale-per-le-principali-tipologie-di-permesso-di-soggiorno.pdf（HEAD 200，32 356 bytes）【官方-地方 Questura】
- Questura（statics/15）"permessi di soggiorno da chiedere tramite invio di kit postale"：https://questure.poliziadistato.it/statics/15/permessi-di-soggiorno-da-chiedere-tramite-invio-di-kit-postale.pdf【官方-地方 Questura】
- Questura di Treviso，PSUE 说明（2024 年 5 月）：https://questure.poliziadistato.it/statics/12/8_permesso_soggiorno_ue_-soggiornanti_-lungo_periodo_maggio_24.pdf【官方-地方 Questura】
- Poste "Rete Sportello Amico" 邮局清单：https://www.media.poste.it/874e8567-8617-4e1a-85f5-804f51d91a57/file/RETE-SPORTELLO-AMICO（来源：poste.it 指南页）【官方】

### 1.4 poste.it
- https://www.poste.it/prodotti/guida-rilascio-e-rinnovo-permesso-di-soggiorno.html（及 https://www.poste.it/guida-rilascio-e-rinnovo-permesso-di-soggiorno）【官方】（查看 2026-11-05）：**不提供** Modulo 1/2 下载；kit 只能在邮局领取（每人一份，需出示身份证件和/或现有 permesso）。

---

## 2. 哪些申请类型需要 Modulo 1 + Modulo 2？哪些只需 Modulo 1？

### 2.1 总原则【官方】
- `nuovaProcedura.html`（查看 2026-11-05）：kit "è composto da modulo 1 e modulo 2, istruzioni per la compilazione, bollettino e busta di spedizione"；填写顺序要求在填 Modulo 1 第 2 节之前，先"aver compilato il Modulo 2 **qualora si percepisca un reddito**"。
- 即：**Modulo 1 人人必填；Modulo 2 用于申报收入/工作数据**，某些类型强制，某些类型"有收入时"填写。
- Modulo 2 中的字段提示（同页）："Da compilare solo in caso di lavoro subordinato"、"Indicare la categoria professionale"、"Deve essere compilato solo dagli stranieri assunti nell'anno in corso – allegare fotocopia delle ultime buste paga"、"Compilare solo per attività autonoma iniziata nell'anno in corso"。

### 2.2 按 codice motivo 列表（来源：portaleimmigrazione.it 各类型子页，"Devi presentare: Istanza compilata e sottoscritta dall'interessato (…)"一句；查看 2026-11-05；子页更新日期多为 22/07/2024）【官方】

**必须 Modulo 1 + Modulo 2：**

| 代码 | 类型 | 页面 |
|---|---|---|
| 05 | Attesa occupazione | attesaOccupazione.html |
| 09 | Permesso di soggiorno UE per soggiornanti di lungo periodo（申请人本人） | permessosoggUELungoPeriodo.html |
| 15 | Lavoro autonomo | lavoroautonomo.html |
| 16 | Lavoro subordinato | lavoroSubordinato.html |
| 17 | Lavoro casi particolari art. 27 TUI | casiparticolariprevisti.html（总页未写模块，推定同 16，**未逐子页核实**） |
| 18 | Lavoro subordinato stagionale | lavoroSubordinatoStagionale.html |
| 21 | Residenza elettiva | soggResidenzaElettiva.html（"Moduli 1 e 2"） |
| 27 | Ricercatore (art. 27 ter TUI) | soggRicercatore27.html |
| 28 | Ricercatore – Ricerca lavoro / imprenditorialità | soggRicercatoreRicercaLavoro.html |
| 29 | Ricercatore – Mobilità | soggRicercatoreMobilita27.html |
| 30 | Studente – Ricerca lavoro / imprenditorialità (art. 39 bis.1) | soggStudenteRicercaLavoro.html |

**Modulo 1，有收入时再加 Modulo 2：**

| 代码 | 类型 | 原文要点 |
|---|---|---|
| 07 | Asilo rinnovo | "Modulo 1 e Modulo 2 qualora in possesso di reddito" |
| 23 | Status apolidia rinnovo | 同上 |
| 09 | PSUE 由同住家属申请（soggUEFamiliareConvivente.html） | "Modulo 1, o anche modulo 2 se in possesso di redditi propri" |
| 24 / 31 / 32 / 33 | Studio art. 39、Studente、Alunno、Tirocinante | 写 "(Modulo 1)"，但续签时 "Lo studente lavoratore può dimostrare il reddito tramite compilazione del modulo 2" |

**只需 Modulo 1：**

| 代码 | 类型 |
|---|---|
| 02 | Affidamento |
| 03 / 04 | Aggiornamento carta / permesso（换住址、婚姻状况、加入子女、换护照等——"è sufficiente la compilazione del modulo 1, quale autocertificazione"） |
| 06 | Attesa acquisto cittadinanza |
| 10 | Conversione in motivi familiari |
| 11 / 12 | Duplicato carta / permesso |
| 13 | Famiglia |
| 14 | Famiglia minore (14–18 岁) |
| 19 | Missione |
| 20 | Motivi religiosi |
| 34 | Familiare cittadino italiano |
| 35 | Carta di soggiorno elettronica familiare cittadino UE |

### 2.3 首次签发由 Sportello Unico（SUI）代填的情形【官方】
- 16、18（lavoro subordinato / stagionale）："Per il rilascio … i moduli 1 e 2 sono compilati presso lo Sportello Unico Immigrazione all'atto della sottoscrizione del contratto di soggiorno"。
- 13、14（famiglia，凭 nulla osta 家庭团聚入境）：首次签发 "il Modulo 1 è compilato presso lo Sportello Unico Immigrazione"。
- 15（lavoro autonomo）、27、29（ricercatore）首次签发同样由 SUI 填写模块 1+2。
- 2025 年 9 月起的新流程（DL 145/2024，L. 187/2024 修订 art. 22 c. 6 TUI）：SUI 通过 **PEC** 把 Modulo 1 和 2（Modello 209）发给雇主，同时可在 Portale ALI 预留区下载；雇主交给工人去邮局。来源：Prefettura della Spezia https://prefettura.interno.gov.it/it/prefetture/spezia/decreto-flussi-2025-contratto-soggiorno-sottoscritto-digitale（发布 2025-09-12，更新 2025-09-15；查看 2026-11-05）【官方】。
- **对工具的含义**：这些"首次签发"场景下申请人不应自行填写，工具应提示用户走 SUI 流程。

### 2.4 必须去 Questura 的类型（不用邮政 kit）【官方】
`percittadiniextracomunitari.html` "Presso Questure" 标签页（查看 2026-11-05）：cure mediche、asilo politico（首次）、assistenza minori art. 31、carta di recesso Brexit、casi speciali、famiglia ex art. 19、familiari cittadini UE、giustizia、integrazione minore、intrasocietari ICT art. 27 quinquies、investitori、minore età、nomadi digitali、permesso scaduto da oltre 60 giorni、protezione temporanea、start up innovativa、status apolide（首次）、vacanze lavoro。
- ⚠ 注意：同一页面同时把"familiari cittadini U.E."列在 Questura、又把代码 34/35 列在邮局，地方 Questura 做法不一。Questura di Monza e della Brianza 公告：**自 2026-05-01 起**家属（familiare di cittadino italiano "statico"、carta di soggiorno familiare UE/italiano "mobile"）的签发/续签"dovranno essere presentate esclusivamente tramite il kit postale"，不再用 Prenotafacile。https://questure.poliziadistato.it/it/MonzaedellaBrianza/articolo/223169fb06c797bb7644594598（发布 2026-05-06；查看 2026-11-05）【官方-地方】

### 2.5 【二手】常见误说
- permessidisoggiorno.com（2025-11-29）称 Modulo 2 只用于"motivi di lavoro o familiari"——**与官方不符**（官方 famiglia 13 只需 Modulo 1）。https://permessidisoggiorno.com/permesso-di-soggiorno-come-compilare-correttamente-il-kit-postale/
- infoimmigrazione.com（更新 2026-01-19）称 Modulo 2 用于"motivi di lavoro"——不完整。https://www.infoimmigrazione.com/kit-postale-permesso-di-soggiorno/

---

## 3. 能否电脑填写后打印？还是必须手写（stampatello、黑笔）？光学识别相关要求？

### 3.1 官方明确的内容【官方】
- `nuovaProcedura.html`（查看 2026-11-05），"Come compilare il kit 'MOD. 209 - Modulo 1 e Modulo 2'"："**Importante: Scrivere in stampatello, con penna nera e rigorosamente all'interno degli appositi spazi.**"
- 官方承认的电子填写途径**只有一条**：免费去 **Patronato 或 Comune abilitato**，由其通过专用门户电子填写，"ti consegnerà la copia cartacea dell'istanza compilata con la busta prevista"（同页）；FAQ：Comune 的操作员"rilascerà al cittadino straniero un modulo, **stampato elettronicamente** al termine della procedura di compilazione"。https://www.portaleimmigrazione.it/ITA/faqAttivitaComuni.html（查看 2026-11-05）
- 首次签发 lavoro subordinato：SUI 通过 PEC/ALI 发出 Modulo 1、2，由雇主/工人打印后去邮局（见 2.3）。说明**系统生成并打印的模块是被接受的**，但这是官方系统生成，不是申请人自己用电脑填。
- 门户把可下载 PDF 称为"fac-simili"，且 Modulo 1/2 的下载按钮目前被隐藏（见 1.1）。

### 3.2 官方没有说明的内容
- 在所有查看过的官方页面中，**没有找到**任何关于以下内容的说明：申请人自己在电脑上填写下载的 PDF 再打印提交是否被接受；打印比例（100% / "实际大小"）；对齐 / 边距；"lettura ottica"（光学识别）。
- 【二手】搜索"lettura ottica" + kit 没有找到可靠来源。permessodisoggiorno.org（2020-05-06）提到 Comune/Patronato 使用的软件叫 **ELI2**（经 portaleimmigrazione.it 访问）：https://permessodisoggiorno.org/rilascio-e-rinnovo-permesso-di-soggiorno-due-modi-di-compilare-il-kit/
- 【二手】大学指南、律师网站一致只说"stampatello + penna nera + 在格子内，不要涂改"。

### 3.3 对工具设计的结论（推断，非官方）
- 最安全的定位："**填写辅助 / 预览 / 抄写指引**"——工具生成逐格内容，用户用黑笔大写字母抄到邮局领取的原始黄色 kit 上。
- "电脑打印覆盖原始 kit"或"打印下载的 fac-simile 后提交"属于**未经官方确认**的做法，需实测（见文末）。

---

## 4. 哪些字段使用代码？代码表在哪里？

### 4.1 官方网页说明中提到的代码表（`nuovaProcedura.html` 逐项提示，查看 2026-11-05）【官方】
| 字段内容 | 引用的代码表（原文名称） |
|---|---|
| 省份（Provincia） | "tabella Codici Sigle Province" |
| 申请的 permesso 类型 / 动机 | "tabella Codici Motivi di Richiesta Permesso/Carta di Soggiorno" |
| 国籍 / 出生国 | "tabella Codici di Stato" |
| 证件类型（非护照时） | "tabella Documenti Equipollenti al Passaporto"（各类型子页称"tabella n. 4"） |
| 签发机关（非护照证件） | "tabella Autorità che rilasciano Documenti Equivalenti al Passaporto" |
| 婚姻状况 | 字母：**A** = Stato Libero，**B** = Coniugato/a |
| 性别 | 字母：**F** = Femmina，**M** = Maschio |
| 申请类型（rilascio / rinnovo / …） | "Barrare la tipologia di interesse (es. X)" |

其他非代码规则（同页）：
- 姓名等"Riportare il dato come scritto sul passaporto"。
- 第 2 节（Sezione 2）最后填写：总页数（模块 + 复印件）、Modulo 1 **第 12 节**申报的子女总数。
- 签证数据只在首次申请时填写；"Se uguale al precedente non compilare"（住址等）；可选手机号用于 Questura 通知；可指定代收挂号信的个人或机构名称。
- 部分小节只在申请 Carta di Soggiorno 或"conversione … a famiglia"时填写。
- 必须签名，否则邮局不受理。

### 4.2 代码表的位置
- **"codice motivi"**：唯一在网页上以 HTML 发布的表 → https://www.portaleimmigrazione.it/ITA/tabellauffpostali.html（"ultimo aggiornamento: 30 maggio 2024"）。代码：02 affidamento、03 aggiornamento carta、04 aggiornamento permesso、05 attesa occupazione、06 attesa acquisto cittadinanza、07 asilo rinnovo、09 PSUE、10 conversione、11 duplicato carta、12 duplicato permesso、13 famiglia、14 famiglia minore、15 lavoro autonomo、16 lavoro subordinato、17 lavoro casi particolari art. 27、18 stagionale、19 missione、20 motivi religiosi、21 residenza elettiva、23 status apolidia rinnovo、24 studio art. 39、27 ricercatore、28 ricercatore ricerca lavoro、29 ricercatore mobilità、30 studente ricerca lavoro、31 studente、32 alunno、33 tirocinante、34 familiare cittadino italiano、35 carta soggiorno familiare cittadino UE。（缺 01、08、22、25、26——推测为已废止或 Questura 专属，**未核实**。）
- 其余表（省份、国家、证件、机关）：官方网页未发布；在 kit 纸质 Istruzioni 中。【二手】stranieriditalia.com（2022-10-17）列出 Istruzioni 中有 5 张表：1 省份、2 申请动机、3 国家代码、4 护照等同证件、5 签发机关。https://stranieriditalia.com/kit-permesso-di-soggiorno.html
- 认可的身份证件列表（文字列表，无代码）：PASSAPORTO ORDINARIO、TITOLO VIAGGIO APOLIDI、TITOLO VIAGGIO RIFUGIATI、TITOLO DI VIAGGIO PER STRANIERI、LASCIAPASSARE DELLE NAZIONI UNITE、DOCUMENTO INDIVIDUALE QUARTIER GENERALE NATO、DOCUMENTO DI VIAGGIO UNMIK、LIBRETTO DI NAVIGAZIONE PER I MARITTIMI、DOCUMENTO DI NAVIGAZIONE AEREA、DICHIARAZIONE CONSOLARE。https://www.portaleimmigrazione.it/ITA/faqdocumentiIstanze.html（更新 04/11/2024；查看 2026-11-05）【官方】
- 潜在的机读来源（**未调用，需评估**）：门户"Compila Dati Ricevuta"功能的 JS（https://www.portaleimmigrazione.it/js/apiGETcompilazione.js）调用 `https://www.portaleimmigrazione.it/ImmigrazioneNET/KitService.asmx/` 下的 `GetElencoStati`、`GetElencoTipiDocumento`、`getElencoTipiAutorit…`、`GetElencoTipiPermesso`、`GetElencoTipiRinnovo`、`GetProvince`、`GetComuneByProvincia`（POST JSON）。这些可能就是与 kit 代码一致的官方列表，但接口未公开文档化，使用条款不明。

---

## 5. 当前费用

### 5.1 官方费用表【官方】
来源：https://www.portaleimmigrazione.it/ITA/tabelleCosti.html（查看 2026-11-05；页面无更新日期）；与 poste.it 指南页一致。

| 项目 | 金额 | 支付方式 |
|---|---|---|
| Marca da bollo | **€16,00** | 烟草店等购买，贴在申请表上 |
| Produzione del PSE（电子卡制作费） | **€30,46** | bollettino，c/c postale **n. 67422402**，户名 Ministero dell'Economia e delle Finanze，causale "importo per il rilascio del permesso di soggiorno elettronico" |
| Contributo：>3 个月 且 ≤1 年 | **€40,00** | 与 30,46 合并在同一张 bollettino → **€70,46** |
| Contributo：>1 年 且 ≤2 年 | **€50,00** | → **€80,46** |
| Contributo：PSUE 长期居留、dirigenti、lavoratori specializzati | **€100,00** | → **€130,46** |
| Aggiornamento / Conversione / Duplicato | 无 contributo | 只付 **€30,46** |
| 未满 18 岁 | 无 contributo | 只付 €30,46；<14 岁子女加入父母申请时，每个子女一张 €30,46 + 父母一张 €30,46 |
| Poste 寄送费（"Costo spedizione"） | **€30,00** | 在邮局受理时支付 |

- 收据一份放入申请袋，另一份在 Questura 按指纹时出示（`nuovaProcedura.html`）。
- ⚠ 官方费用表本身有笔误："30.36€ + 40.00€ = 70.46€"、"80.46€ (30.36€ + 50.00€ = 70.46€)"——应为 30,46，总额 70,46 / 80,46。工具应按 30,46 计算。

### 5.2 法律依据与历史【官方-地方 + 二手】
- 现行 contributo 依据：MEF/Interno 联合 **DM 5 maggio 2017**（GU n. 131 dell'8 giugno 2017），2017-06-09 起生效；Ministero dell'Interno circolare prot. 0018780 del 9 giugno 2017。免缴：未成年人、art. 29 c.1 lett. b 的子女、art. 36 医疗入境者及陪同、庇护/补充保护/人道保护申请人、有效 permesso 的更新/转换/补发。来源：Questura di Venezia https://questure.poliziadistato.it/it/Venezia/articolo/1080596c884d7a9e4257072626（发布 2017-07-17，修改 2019-06-24；查看 2026-11-05）【官方-地方，⚠ 页面较旧】
- 历史判决【二手】：旧 contributo（€80 / €100 / €200，DM 6 ottobre 2011）因欧盟法院 2015 年判决（CGUE C-309/14）后 TAR Lazio / **Consiglio di Stato 2016-10-26** 判决而失效，之后 2017 年降为 40/50/100。（来源为搜索结果摘要：piemonteimmigrazione.it、edotto.com，未逐篇核对）
- 2025–2026：搜索中**未发现**新的金额变更或新判决（查看 2026-11-05）。

### 5.3 ⚠ 矛盾 / 可能过时
- €50 档的上限：Questura di Venezia 与 portaleimmigrazione 写"fino a **due** anni"；Regione Toscana 页面写"fino a **tre** anni"（https://www2.immigrazione.regione.toscana.it/?q=contributorilasciorinnovopds，2017 年）。
- DL 20/2023（L. 50/2023）把 lavoro subordinato a tempo indeterminato / autonomo / ricongiungimento 的**续签**最长期限提高到 **3 年**（【二手】ANCI 解读、arlettipartners.com）。portaleimmigrazione `nuovaProcedura.html` 仍写"superiore a due anni"为上限——**已过时**。3 年期 permesso 适用哪一档 contributo，官方页面未说明。
- 【二手】infoimmigrazione.com（标注更新 2026-01-19）仍写 "€27,50" 和 "€80–200"——这是 2017 年以前的数字，**已过时**，不可采用。

---

## 6. 常见情形的典型附件（allegati）

**所有类型的通用材料**【官方】（`nuovaProcedura.html`；poste.it 指南）：
- 已填写并签名的申请表（Modulo 1，按需 Modulo 2），贴 €16 marca da bollo；
- 有效护照（或等同证件）原件——在邮局窗口出示以核对身份，且必须是填表时使用的那份证件；
- 护照 **A4 复印件**：个人资料页 + 签证 / 入境章页（各类型子页写"Fotocopia di tutto il passaporto"，即整本护照）；
- bollettino 付款收据；
- 本类型要求的其他文件的 A4 复印件；
- 续签 / 更新 / 转换时：现有 permesso 的复印件；
- 交件时信封保持**打开**；Questura 预约时带 4 张白底证件照（35×45 mm）。

### 6.1 Rinnovo per lavoro subordinato（代码 16；Modulo 1 + 2）
【官方】https://www.portaleimmigrazione.it/ITA/lavoroSubordinato.html（更新 22/07/2024）：
- 整本护照复印件；
- **contratto di soggiorno per lavoro subordinato** 复印件（双方签字），以及寄给主管 Sportello Unico Immigrazione 的挂号信回执——如果合同与入境时签的合同相比**没有变化**，则不需要；
- Modulo 2 提示：当年新雇用者需附上最近几期 buste paga 复印件。
【二手】律师网站（avvocatofrancescolombardini.it，更新 2026-04-24）实践中常要求：codice fiscale、UNILAV（劳动关系强制通报）、劳动合同、buste paga、CU 或 dichiarazione dei redditi、住址/住房文件。https://www.avvocatofrancescolombardini.it/rinnovo-permesso-di-soggiorno/

### 6.2 Rinnovo per studio（代码 24 = 大学类 art. 39；代码 31 = Studente art. 39 bis）
【官方】https://www.portaleimmigrazione.it/ITA/soggMotiviStudio39.html（更新 22/07/2024）——代码 24，Modulo 1：
- 证明在 permesso 有效期内拥有足够经济来源的文件复印件（学生兼职者可通过 Modulo 2 证明收入）；
- 在意大利有效、覆盖 permesso 期限的疾病 / 意外**保险单**复印件；
- 证明**第 1 次续签至少通过 1 门考试、之后每次续签至少 2 门**的证明复印件（不可抗力除外）。
- 备注：每周最多兼职 20 小时、每年最多 1 040 小时；超过多年制课程期限后最多再续 3 年。
代码 31（https://www.portaleimmigrazione.it/ITA/soggStudente.html）：课程 / 实习协议继续进行的证明 + 经济来源证明 + 保险。

### 6.3 Primo rilascio per motivi familiari（代码 13 / 14；只需 Modulo 1）
【官方】https://www.portaleimmigrazione.it/ITA/soggFamiglia.html（更新 22/07/2024）：
- 凭 nulla osta（ricongiungimento familiare）入境者：**首次签发时 Modulo 1 由签发 nulla osta 的 Sportello Unico Immigrazione 填写**；
- 整本护照复印件（含家庭团聚签证）；
- 续签时：由申请家庭团聚的家属出具"provvedere al sostentamento"（承担生活费）声明。
- 其他途径（"coesione familiare"、"conversione da altro motivo a famiglia"——代码 10）：https://www.portaleimmigrazione.it/ITA/conversionePermessoSoggFamiliari.html
- 意大利公民 / 欧盟公民家属（代码 34 / 35）：证明亲属关系的户籍文件 + 首次签发时家属的 dichiarazione dei redditi 等（familiareCittIta.html、cartaSoggFamiliareCitt.html）。

### 6.4 Permesso UE per soggiornanti di lungo periodo（代码 09；Modulo 1 + 2；contributo €100）
【官方】https://www.portaleimmigrazione.it/ITA/permessosoggUELungoPeriodo.html（更新 22/07/2024）：
- 整本护照复印件；
- 上一年度 **dichiarazione dei redditi 或 CUD** 复印件（无需报税者如家政人员：可用 buste paga、INPS 缴费记录）；
- **Certificato del casellario giudiziario** 和 **certificato dei carichi pendenti**；
- 涉及未成年子女时：子女身份的户籍证明（国外出具者需翻译 + 认证 + 意大利使领馆核验；凭家庭团聚签证入境者免）；
- **certificato di idoneità alloggiativa**（art. 29 c.3 lett. a）复印件；
- 收入下限：单身者不低于年度 assegno sociale；同住家属各自填写 Modulo 1（有个人收入者加 Modulo 2）。
- ⚠ 官方页面**未提到**意大利语考试（A2）。【二手】Assolombarda 页面说明需 A2 意大利语水平（国际保护受益人免除语言考试和住房证明）。https://www.assolombarda.it/servizi/lavoro-e-previdenza/progetto-stranieri/sezioni/il-permesso-di-soggiorno/permesso-ue-per-soggiornanti-di-lungo-periodo — 此要求见 art. 9 c. 2-bis TUI 及 DM 4 giugno 2010（未在本次调研中直接打开法规原文核对）。

---

## 7. 2026 年末是否有官方的纸质 kit 线上替代方案？

**结论：没有完全线上的提交方式；有三种官方"半线上"辅助。**【官方】

1. **"Compila Dati Ricevuta"（solo per kit compilati manualmente）**——portaleimmigrazione.it 新增功能：https://www.portaleimmigrazione.it/ITA/compilazioneRicevuta.html（查看 2026-11-05）
   - 用途：**纸质 kit 已手写填好之后**，在线登记部分数据（6 步：验证身份、个人资料、证件、联系方式、密码、GDPR），以加快邮局受理、减少检查时间、避免填错 assicurata 寄件收据，并通过短信接收 Questura 预约通知。
   - 登记有效 **15 天**，过期自动删除；同一手机号 15 天内只能登记一次；必须年满 14 岁。
   - 它**不能替代** Modulo 1/2：原文"Ricorda che comunque … la tua istanza deve essere presentata insieme a tutta la documentazione prevista"。
2. **Patronato / Comune abilitato 电子填写**（免费），打印纸质件 + 信封，再去邮局提交（见 3.1）。可在"Ricerca Uffici"中查找：https://www.portaleimmigrazione.it/ITA/ricercastrutture.html
3. **SUI 通过 PEC / Portale ALI** 发出预填好的 Modulo 1、2（仅限首次签发 lavoro subordinato 等 SUI 流程，2025-09 起）。
- 其他相关：Poste 可通过 poste.it / App 预约邮局时段（poste.it 指南）；进度查询用收据上的 Codice Assicurata + Codice Ologramma（https://www.portaleimmigrazione.it/ITA/accedi.html）；**Prenota Facile**（https://prenotafacile.poliziadistato.it/，SPID/CIE 登录）只适用于部分在 Questura 办理的类型，各地不同——它不是 kit 的线上版。
- 【二手】portalemigranti.it（2026-04-30）、律师网站一致称 2026 年续签仍以邮政 kit 为主，不能完全线上提交。
- ⚠ 正在变化的法规：**D.Lgs. 16 aprile 2026, n. 83**（实施 Direttiva (UE) 2024/1233 "permesso unico"，GU n. 115 del 20 maggio 2026；生效日期各来源不一：2026-05-22 或 2026-06-04）【二手：certifico.com、geps.it、stranieriinitalia.it】。它是否会改变 kit / Modulo 1-2 的格式或渠道，截至 2026-11-05 未在官方门户看到任何说明。

---

## 不确定 / 需实测

1. **PDF 内容未核对**（按要求未下载）：Modulo_1.pdf、Modulo_2.pdf 的字段编号、格子数、小节编号（如"Sezione 12 子女"），以及 `Informativa_Generale.pdf` / `MOD_209_Multilingue.pdf` 里是否包含代码表全文，都需要下载后核对。也需要确认网上 PDF 与邮局实际发放的 kit 是否同一版本。
2. **Modulo 1/2 下载链接在 documentazione 页面被注释掉**（文件仍可访问）。原因不明：可能官方不希望用户自行打印。需关注是否下线。
3. **电脑填写 / 自行打印能否被邮局接受**：官方没有说法。需要实测：(a) 拿打印好的 fac-simile 去 Sportello Amico；(b) 把内容打印到原始 kit 纸上；并问邮局或热线 800.200.309。打印比例、对齐、OCR / 光学识别要求完全没有官方资料。
4. kit 原件上是否有唯一条码 / 序列号（会使自行打印的副本无效）：未找到资料，需查看实物 kit。
5. **代码表**：除"codice motivi"外，省份 / 国家 / 证件 / 机关代码表没有官方网页版本。KitService.asmx 列表接口可能是机读来源，但没有文档，使用许可不明，未调用。
6. codice motivi 缺 01、08、22、25、26：含义未知。
7. ~~代码 17 各子页是否都要求 Modulo 1+2~~：已逐页核对，见 `p2-batch-c.md` §4（2026-11-07）。
8. €50 档 contributo 上限是 2 年还是 3 年（Toscana vs Venezia / 门户）；3 年期续签（DL 20/2023）适用哪档：未找到官方说明。
9. PSUE：官方门户未提 A2 意大利语证书；casellario / carichi pendenti 是否仍要求原件（自 DPR 445/2000 起可自我声明的问题）：各 Questura 做法可能不同，需要按当地 Questura 核实。
10. 门户各子页更新于 2024-07 / 2024-11，费用页无日期；`nuovaProcedura.html` 关于"最长 2 年"的说法已被 DL 20/2023 修改——门户其他内容也可能有未更新部分。
11. ~~D.Lgs. 83/2026 对 kit 的影响~~：不影响 kit、表格和费用，见 §9（2026-11-07）。
12. 2025 年 9 月 Poste 官方信封缺货（可用普通 A4 信封按 PEC 样式代替）——【二手】ItaliaOggi 2025-09-03 + Prefettura La Spezia；是否已恢复供应：未确认（可能已过时）。
13. "Compila Dati Ricevuta"的上线日期：页面无日期（首页提到"nuova sezione"），未确认。

---

## 主要来源清单（全部查看于 2026-11-05）

官方：
- https://www.portaleimmigrazione.it/ITA/index.html
- https://www.portaleimmigrazione.it/ITA/documentazione.html
- https://www.portaleimmigrazione.it/ITA/nuovaProcedura.html
- https://www.portaleimmigrazione.it/ITA/tabellauffpostali.html
- https://www.portaleimmigrazione.it/ITA/tabellaMotiviTipologie.html
- https://www.portaleimmigrazione.it/ITA/tabelleCosti.html
- https://www.portaleimmigrazione.it/ITA/percittadiniextracomunitari.html 以及各类型子页（lavoroSubordinato、soggMotiviStudio39、soggStudente、soggFamiglia、permessosoggUELungoPeriodo、soggUEFamiliareConvivente、AsiloRinnovo、soggStatusApolidiaRinnovo、aggiornamentoCarteSoggiorno 等 .html）
- https://www.portaleimmigrazione.it/ITA/compilazioneRicevuta.html、/ITA/registrati.html、/ITA/accedi.html
- https://www.portaleimmigrazione.it/ITA/faqAttivitaComuni.html、/ITA/faqServizioAssistenza.html、/ITA/faqdocumentiIstanze.html
- https://www.poste.it/prodotti/guida-rilascio-e-rinnovo-permesso-di-soggiorno.html
- https://prefettura.interno.gov.it/it/prefetture/spezia/decreto-flussi-2025-contratto-soggiorno-sottoscritto-digitale
- https://questure.poliziadistato.it/it/Venezia/articolo/1080596c884d7a9e4257072626
- https://questure.poliziadistato.it/it/MonzaedellaBrianza/articolo/223169fb06c797bb7644594598

二手：
- https://www2.immigrazione.regione.toscana.it/?q=contributorilasciorinnovopds（地区政府信息页，非国家主管机关）
- https://www.infoimmigrazione.com/kit-postale-permesso-di-soggiorno/
- https://permessidisoggiorno.com/permesso-di-soggiorno-come-compilare-correttamente-il-kit-postale/
- https://permessodisoggiorno.org/rilascio-e-rinnovo-permesso-di-soggiorno-due-modi-di-compilare-il-kit/
- https://stranieriditalia.com/kit-permesso-di-soggiorno.html
- https://www.italiaoggi.it/diritto-e-fisco/lavoro-e-previdenza/permessi-di-soggiorno-come-fare-la-richiesta-e-la-questione-della-busta-fai-da-te-yd7ncoiq
- https://www.avvocatofrancescolombardini.it/rinnovo-permesso-di-soggiorno/
- https://www.assolombarda.it/servizi/lavoro-e-previdenza/progetto-stranieri/sezioni/il-permesso-di-soggiorno/permesso-ue-per-soggiornanti-di-lungo-periodo
- https://www.portalemigranti.it/2026/04/30/permesso-di-soggiorno-ritardi-fino-a-90-giorni-nuova-carta-elettronica-e-come-controllare-lo-stato-della-pratica-online/
- https://www.certifico.com/news/decreto-legislativo-16-aprile-2026-n-83 、https://www.geps.it/permesso-unico-di-soggiorno-e-lavoro-dal-22-maggio-2026-cambia-la-procedura-le-novita-del-d-lgs-n-83-2026-12352/

## 8. 补充核实（2026-11-06，Claude）

### 8.1 730 在 Modulo 2 打哪一栏
- 【官方】`official/2026-11-05_MOD_209_Multilingue.pdf` 第 5 节：
  - 第 54 栏 "ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI"（英文版 "LAST YEAR INCOME TAX RETURN SUBMITTED"）；
  - 第 55–58 栏为 MODELLO UNICO 的四种（个人 / 合伙 / 资合公司 / 非商业机构）；
  - 第 59 栏 CUD；第 60 栏工资单；第 61 栏 INPS 缴费单。
  - 全文没有出现 730。
- 【地方官方·二手转述】弗留利大区 welcomeoffice.fvg.it 的英文填表指南，据搜索摘要：写上最近一次报税年份，在 55–58 中勾所交报税表的种类；没在意大利报过税的，跳到 59（CU）。原 PDF 链接 2026-11-06 打开是 404，没能看原文。
- 其他填表指南（immigrazione.biz、italiavita.ru 等）都只列栏名，不提 730。
- **结论**：730 是个人报税表，归第 55 栏是最合理的推断，维持现状。没有官方逐字依据，问卷里保留"不确定问 CAF"的提示。

### 8.2 居留合同（modello Q）是否还要寄
- 【地方官方】艾米利亚-罗马涅大区劳动局 "Assunzione lavoratori stranieri"（2025-02-26 更新）："È venuto meno l'obbligo del datore di lavoro di inviare allo sportello Unico per l'Immigrazione il contratto di soggiorno"，改为 "si considera assolto tramite l'invio telematico al centro per l'impiego del modello Unificato Lav"。https://www.agenzialavoro.emr.it/imprese/altre-informazioni-utili/assunzione-lavoratori-stranieri
- 【二手】2025-09-02 内政部 Portale Servizi / ALI 发布操作说明：居留合同和 Accordo di integrazione 改为数字签名后上传 ALI，由 Sportello Unico 发 Modulo 1/2（quotidianopiu.it、edotto.com、ANCE 第 491/25 号通函）。适用对象只限凭 Decreto Flussi 首次入境的工人，与续签无关。
- **结论**：续签（16）时，换雇主由 UNILAV 代替居留合同，不寄 modello Q；同一雇主沿用原合同（Modulo 2 第 34 栏）。维持现在的问卷和材料清单。

## 9. D.Lgs. 83/2026（permesso unico）复查（2026-11-07，Claude）

【官方】全文：GU n.115 del 20-5-2026（Gazzetta Ufficiale "atto completo" 打印件，经 fiscoetasse.com 转载）。适用：第 4 条"si applicano a decorrere dal 22 maggio 2026"。

只有第 1 条修改 TUI：
- **第 4-bis 条**：加强对外国工人的信息告知（所需文件、程序保障）。
- **第 5 条第 4 款**："sessanta giorni"改为"novanta giorni"，是续签申请提前的天数。
- **第 5 条第 8.1 款**：permesso unico 卡面信息按欧盟条例 1030/2002 标注。
- **新增第 8.1-bis 款**：permesso unico 在申请完整后 30 天内签发。
- **第 5 条第 8.2 款**：调整不适用 permesso unico 的人群。新增宗教事由、入籍、无国籍、选择性居留等；第 27 条只列 a、h、i、i-bis、q-bis 项和 r 项的互惠生。这只决定发哪种卡，不改 kit。
- **第 5 条第 9、9-bis 款**：审批期限 60 天改为 90 天；等待期间可以继续居留和工作的期限也改为 90 天。
- **第 22 条**：雇主要及时告知工人 nulla osta 进展。

结论：
- 没有提到 kit、Modulo、邮局或 contributo；第 3 条"senza nuovi o maggiori oneri"。本工具的表格、费用和流程不用改。
- 第 13 条（居留过期超过 60 天）没有修改，所以问卷里"过期超过 60 天要去 Questura"的提示不受影响。
- 问卷里原来没写申请提前天数。用户决定在到期日提示里补上"到期前 90 天申请"（D50）。

## 10. 待解决问题上网核实（2026-11-07，Claude）

主要来源是 **Questura di Treviso 的三份办理指南**（官方，2024-05-16，questure.poliziadistato.it）。这是一个 Questura 的做法，其他 Questura 可能不同。
- 首次签发：https://questure.poliziadistato.it/statics/03/3_rilascio_ps_elettronici__kit_-postale_maggio_24.pdf
- 续签 / 更新 / 补发：https://questure.poliziadistato.it/statics/36/4_rinnovo_aggiornamento_ps_eletttronici_kit_postale_maggio_24.pdf
- 学生、实习生、研究人员：https://questure.poliziadistato.it/statics/49/12-_-rilascio_rinnovo_conversione_studenti_ricercatori_tirocinanti_maggio_2024.pdf
- 长居：https://questure.poliziadistato.it/statics/12/8_permesso_soggiorno_ue_-soggiornanti_-lungo_periodo_maggio_24.pdf

### 10.1 3 年期居留缴哪一档【Questura 官方】
- 续签指南里，雇佣（G）、自雇（L）、家庭（M）、意大利公民二代以内亲属（T）都写："€ 50,00 per permessi di soggiorno di durata superiore ad 1 anno o pari a 3 anni"。
- 即 3 年期按 €50 档，缴费单 €80,46。和现在 `fees.json` 一致（超过 12 个月一律 €50，没有上限），**不用改**。
- 同一份指南里其他类型（学习、研究、无国籍、选择性居留等）只写到"pari a 2 anni"。

### 10.2 30 / 28 找工作居留：签发还是转换【Questura 官方，与现有做法不同】
- 学生指南 F 节标题："CONVERSIONE DEL PERMESSO DI SOGGIORNO PER MOTIVI DI STUDIO O RICERCA SCIENTIFICA IN PERMESSO DI SOGGIORNO PER RICERCA LAVORO DEGLI STUDENTI E DEI RICERCATORI (artt.27-ter, comma 9-bis, e 39-bis.1)"，用邮局 kit 办。
- F 节只列四项材料：生活来源、医保、学位证明、DID 或创业计划。**没有写缴费单金额**，别的各节都写了。
- 现在按 rilascio 做，收 €40 contributo（缴费单 €70,46）。如果改为 conversione，按官方费用表只付 €30,46。
- 结论：Treviso 按"转换"办。用户决定照此修改（D55，2026-11-07）：30 / 28 只办转换，缴费单 €30,46，不问期限。

### 10.3 06 等待入籍【Questura 官方，部分回答】
- 首次签发指南 F 节"ATTESA CITTADINANZA (art.11, comma 1, lett. c), D.P.R. 394/99)"收 contributo（"€ 40,00 … e € 50,00 …"），按 rilascio。
- 但这一节写的是凭申根入境章、在 Comune 办血统入籍的人，不是从别的居留转过来的人。从别的居留转过来勾哪一项，仍没有找到说明。
- 续签指南 F 节：续签收 €40（"durata inferiore o pari 1 anno"）。

### 10.4 21 选择性居留的期限【Questura 官方，没有定论】
- 首次（N 节）和续签（P.1、P.2 节）都写"€ 40,00 … ≤ 1 anno e € 50,00 … > 1 anno o pari a 2 anni"，两档都可能。
- 另一份不知名 Questura 的清单（statics/29，2024-03-19）写选择性居留缴费单 **€ 80,46**，即按 1–2 年收。
- 二手资料多写首次 1 年、续签每年。结论不变：问用户预计期限，默认 12 个月。

### 10.5 长居要不要 A2【Questura 官方，已确认】
- 长居指南 A 节："attestazione di conoscenza della lingua italiana non inferiore al livello L2 A2 o documentazione comprovante l'esenzione dal test"。
- 可以用：认可机构的 A2 及以上证书；意大利初中、高中毕业证或大学学位；大学在读注册；或参加内政部的语言考试（testitaliano.interno.it）。
- 免考：年龄或疾病导致学习受限（公立医院法医证明）；第 27 条第 1 款 a、c、d、q 项入境的人；国际保护持有人（不含其家属）。
- 和 D24、`materials/09.json` 一致。
- 同住家属申请长居（B 节）也要 A2，另附"家属负担其生活"的声明和家属的收入材料。没有写 Modulo 2 是否只在本人有收入时填。

### 10.6 第 22–24 栏怎么填【大学指南，二手】
- LUISS 大学的填表指南："22. If you are only filling out Form 1, write '0 1'"；"23. Cross this item"；"24. Cross this item only if you are also filling out Form 2"。
- 和现在的映射一致：第 22 栏写表的份数（01 / 02），第 23 栏总是勾，第 24 栏有 Modulo 2 时勾。
- https://www.luiss.it/sites/default/files/media-documents/How%20to%20Fill%20In%20the%20Yellow%20Kit.pdf

### 10.7 18 季节工续签【Questura 官方】
- Treviso 续签 H 节只要求"copia comunicazione nuovo rapporto di lavoro stagionale (Unilav/Unisom)"，没有挂号信回执。支持现在的做法。
- 另一份清单（statics/29）写季节工"nulla osta (sia al rilascio che al rinnovo)"，续签也要 nulla osta。各地不一，可在材料清单加"有的话一并附上"。

### 10.8 没查到的
- 住址在 BT、SU 的人表上写什么：只确认了 ISO 代码 IT-BT、IT-SU，没有找到表格说明。
- 31 / 32 / 33 按人群分：没有找到官方说明。
- 10 转为家庭居留是否填第 10、11 节；第 60–62 栏是否适用于只有收入的类型：没有找到填表说明。
