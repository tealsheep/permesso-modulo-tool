# 调研：permesso di soggiorno kit postale 中的 bollettino postale

调研日期：2026-11-05。只记录了 URL，没有另外下载任何文件。WebFetch 工具会自动缓存 PDF，我只在本地读取了这些缓存，用来提取文字和查看图片。

来源分级：
- **[官方]** 指 poste.it / business.poste.it / questure.poliziadistato.it
- **[二手]** 指大学国际处的指南、新闻网站、博客

---

## 1. bollettino 型号；kit 里是否附带

**结论：型号是 TD 674（"Premarcato Non Fatturatore"）。整张单子是红色的预印 bollettino：账号、intestazione（户名）、causale、TD 编号和 codeline 都已经印好，金额留空。**

- 二手来源 Ca' Foscari 指南（PDF 创建于 2021-05-13）里有一张这个 bollettino 的完整扫描。我查看了图片，确认以下内容：
  - 右侧 "Ricevuta di Accredito" 部分印有 `TD 674`。
  - 底部 codeline 是 `000067422402<  674>`。
  - 左侧两联印有 "MINISTERO DELL'ECONOMIA E DELLE FINANZE"，并带有 "PSE" 水印。
  - URL：https://www.unive.it/pag/fileadmin/user_upload/ateneo/internazionale/documenti/destinazione_cafoscari/soggiorno/stay-permit_how-to-fill-in-the-kit.pdf （第 14 页 "Come compilare il «Bollettino» per il pagamento"）
- 官方的 Poste 技术手册给出了 TD 型号的定义。手册原文："Nel TD674 l'importo viene compilato manualmente dall'utente pagatore"。另外三种：
  - TD 896 = 金额已知，预印的 premarcato fatturatore
  - TD 451 = 空白单或由账户持有人自行打印
  - TD 123 = 通用空白单（这一点来自二手来源）

  手册里对应本单的版式是 "Allegato 3/f – 3/h: TD 674 Premarcato Non Fatturatore (dato causale noto e dati versante manuali)"，即 causale 已知、付款人信息手写。这正是这张单子的情况。
  - [官方] https://business.poste.it/business/files/1476471333939/caratteristiche-del-bollettino.pdf （PDF 创建于 2020-10-13）
- 是否在 kit 里：
  - [官方] poste.it 的原话是使用 "un unico ed apposito bollettino di conto corrente per ogni richiedente … che troverai in tutti gli uffici postali"。它只说明各邮局都能拿到，没有明确说"在 kit 内"。页面标注 "ultimo aggiornamento: 30 maggio 2024"。https://www.poste.it/guida-rilascio-e-rinnovo-permesso-di-soggiorno
  - [二手] UniGe 的说法是 "Dovrai compilare il bollettino rosso che troverai all'interno del Kit di Poste Italiane"，并注明用黑笔。https://unige.it/sites/unige.it/files/2024-02/Istruzioni_rilascio_ita.pdf
  - [二手] UniCatt 2026 版指南把 kit 内容列为 "Modulo 1 + Payment slip (Bollettino postale)"。https://international.unicatt.it/ucscinternational-residency%20permit%20request%202026.pdf
  - 判断：bollettino 随 kit（"kit a banda gialla"）一起发放，这是普遍做法。官方文字只确认了邮局有这张单子。

## 2. 预印字段与手填字段

单子分三联，从左到右依次是：
1. "Attestazione di Versamento"
2. "Ricevuta di Versamento"
3. "Ricevuta di Accredito"（BancoPosta）

依据是上面 Ca' Foscari 扫描图，由我目视读取。

**已预印：**
- `sul C/C n. 67422402`（三联都有）。
- 左两联的 INTESTATO A 印 "MEF DIP.TO DEL TESORO VERS. DOVUTO RILASCIO PERMESSO SOGG.NO ELETT.CO"。右联用等宽大字印 "MEF DIP.TO DEL TESORO VERS. DOVUTO RILASCIO PERMESSO SOGG.NO ELETT.CO"。左两联顶部还有 "MINISTERO DELL'ECONOMIA E DELLE FINANZE"。
- CAUSALE 印 "Importo per il rilascio del permesso di soggiorno elettronico"。左两联在下方，右联在方框里。
- 27 格 CODICE IBAN 全部印成 `*`（即"asteriscato"，表示不用 IBAN）。
- `TD 674`、codeline `000067422402<  674>`。
- 右侧竖排小字大约是 "Aut. DB/SSIC/E 20422 del 31/05/2006 – EP 2205 – Mod. 30218A"，是目视读取，可能不精确。
- "AVVERTENZE" 标准文字（见第 3 节）。

**留空、由申请人手填：**
| 字段 | 左两联（各一份） | 右联 Ricevuta di Accredito |
|---|---|---|
| 金额数字 `di Euro` | 方格：约 8 格整数 + `,` + 2 格小数 | 方格：约 9 格整数 + `,` + 2 格小数 |
| `importo (in lettere)` 金额大写 | 横线 | 横线（"importo in lettere"） |
| `eseguito da` 付款人姓名 | 横线 | `ESEGUITO DA`：2 行方格，每行约 22 格 |
| `residente in via` 地址 | 横线 | `RESIDENTE IN VIA - PIAZZA`：1 行方格 |
| `CAP` 邮编 | 没有单独栏位（二手指南把 CAP 和城市写在地址行里） | 5 格 |
| `LOCALITA'` 城市 | 没有单独栏位 | 一行方格，约 16 格 |
| `BOLLO DELL'UFF. POSTALE` | 由邮局盖章，不用填 | 由邮局盖章，不用填 |

- 金额**不是预印的 30,46，而是空白**。理由有两条：
  - TD 674 的定义就是金额由付款人填写（见上面的官方手册）。
  - poste.it 要求 "compilare sommando l'importo per la produzione del Permesso e l'eventuale importo per il contributo"，也就是把制卡费和可能的 contributo 加起来自己填。[官方] https://www.poste.it/guida-rilascio-e-rinnovo-permesso-di-soggiorno
- "IMPORTANTE: NON SCRIVERE NELLA ZONA SOTTOSTANTE"：codeline 区域不能写字（来自扫描图）。
- [二手] 填写示例：
  - UniCatt 2026 的示例：左两联写 `NAME SURNAME` 和地址（含 CAP、城市）；右联分别写 NAME、SURNAME、`VIA MERCANTI 8`、`20121`、`MILANO`。指南还提示 "Indicate your address according to what you wrote in Modulo 1 – page 3"，即地址要和 Modulo 1 第 3 页一致。https://international.unicatt.it/ucscinternational-residency%20permit%20request%202026.pdf
  - Ca' Foscari 的示例相同：左两联写 "SURNAME NAME / Address in Italy"，右联写 "ZIP code/CAP City/Città"。

## 3. 填写规则

- **墨水颜色**：
  - [官方] 单子上印的标准 AVVERTENZE 原文："Il bollettino deve essere compilato in ogni sua parte (con inchiostro nero o blu) e non deve recare abrasioni, correzioni o cancellature." 后面还有 "La causale è obbligatoria per i versamenti a favore delle Pubbliche Amministrazioni" 和 "Le informazioni richieste vanno riportate in modo identico in ciascuna delle parti di cui si compone il bollettino"。也就是说三联的内容必须**一致**。这段文字在 Poste 手册 §2.4 和扫描图里都有。https://business.poste.it/business/files/1476471333939/caratteristiche-del-bollettino.pdf
  - [二手] 各大学指南对整个 kit 的统一要求是 "IN MAIUSCOLO e con penna nera"，比 Poste 允许的"黑或蓝"更严格。
    - Ca' Foscari：上面同一个 URL，第 4 页。
    - UniCatt 2026："Write in CAPITAL LETTERS / NO special characters / Use a BLACK PEN"。
    - UniGe："sempre penna nera"。
- **大写**：
  - Poste 手册要求 intestazione 的预印内容 "completamente in maiuscolo"，这是对账户持有人打印的要求。
  - 手写部分要求大写，依据只有二手指南。没有找到 Poste 官方对手写部分大小写的明文规定。
- **一格一字**：右联 ESEGUITO DA、RESIDENTE IN VIA、CAP、LOCALITA'、金额都是方格栏位。按惯例和 OCR 的需要，每格写一个字符。Poste 手册对 TD 451 Manuale 有 "compilati manualmente … all'interno delle caselle predisposte" 的说法，但**没有找到"一格一字"的官方逐字规定**。
- **金额大写格式**：
  - 写法是整数部分用意大利文字母写出，`/`，再跟两位数字的 cent。例如 70,46 写作 `SETTANTA/46`；整数金额写 `/00`。
  - [二手] UniCatt 2026 写作 `SETTANTA/46`。
  - [二手] Ca' Foscari 写作 `SETTANTA//46`（双斜杠）。
  - [二手] 通用指南的示例是 "SEDICI/20"，并说明无 cent 时写 "/00"。
    - https://www.money.it/come-compilare-un-bollettino-postale
    - https://quifinanza.it/info-utili/come-compilare-bollettino-postale/309595/
  - 没有找到 Poste 官方对金额大写格式的明文规定。
  - 常用金额的写法（意大利语拼写，供参考）：
    - 30,46 写作 `TRENTA/46`
    - 70,46 写作 `SETTANTA/46`
    - 80,46 写作 `OTTANTA/46`
    - 130,46 写作 `CENTOTRENTA/46`

## 4. 可作为视觉模板的样张

| URL | 级别 | 内容 |
|---|---|---|
| https://www.unive.it/pag/fileadmin/user_upload/ateneo/internazionale/documenti/destinazione_cafoscari/soggiorno/stay-permit_how-to-fill-in-the-kit.pdf | 二手（大学） | 第 14 页是**本单子 TD 674 / c/c 67422402 的真实扫描**，三联齐全，带填写示例（70,46 / SETTANTA//46）。图像约 1846×568 px，是目前找到的最佳模板。www7.unive.it 的同一路径连接被拒，所以用 www.unive.it。 |
| https://international.unicatt.it/ucscinternational-residency%20permit%20request%202026.pdf | 二手（大学，2026） | 第 11–12 页是 bollettino 填写示例（70,46 / SETTANTA/46，含地址分栏）。示例图我没有提取成功，没能核对图中的 TD 编号。 |
| https://business.poste.it/business/files/1476471333939/caratteristiche-del-bollettino.pdf | 官方（Poste） | TD 674 版式规范，含毫米级尺寸。Allegato 3/f（约第 26 页）是"causale 已知 + 付款人手写"的 TD 674 通用样张。它不是本账户的单子，但版式相同。 |
| https://business.poste.it/business/files/1476473314849/manuale-stampa-in-proprio.pdf | 官方（Poste） | 自行打印手册（我没有细读）。 |

官方的 poste.it、questure 和 portaleimmigrazione 网站上，**都没有找到这张 PSE 专用 bollettino 的样张**。

## 5. 一张单付总额，还是分开付

**结论：只用一张单子，填总额**（30,46 加上适用的 contributo）。

- [官方] Poste 的原话是 "dovrai utilizzare un unico ed apposito bollettino di conto corrente per ogni richiedente, che dovrai compilare sommando l'importo per la produzione del Permesso e l'eventuale importo per il contributo"。即每位申请人一张单，金额是两项之和。https://www.poste.it/guida-rilascio-e-rinnovo-permesso-di-soggiorno
- [官方] 某 Questura 的 "Documenti da inserire nel kit postale…"（PDF 创建于 2024-03-19）直接列出单张金额：
  - "Bollettino postale di € 70,46 per permessi di soggiorno di durata inferiore o pari ad un anno oppure di € 80,46 per … superiore ad 1 anno o pari a 2 anni"
  - lungo periodo 为 "€ 130,46"
  - 重办（duplicato）等情况为 "€ 30,46"
  - https://questure.poliziadistato.it/statics/29/documenti-da-inserire-nel-kit-postale-per-le-principali-tipologie-di-permesso-di-soggiorno.pdf
- [官方] Questura di Treviso（2024-05-16）写的是 "bollettino postale per la smart card (€ 30,46) e per il contributo previsto (€ 40,00 … € 50,00 …)"。bollettino 是单数，意思是同一张单合计。需要 contributo 豁免的类型（例如 FAM IT、未成年人）只填 30,46。https://questure.poliziadistato.it/statics/03/3_rilascio_ps_elettronici__kit_-postale_maggio_24.pdf?lang=it
- contributo 金额来自 DM 5 maggio 2017，目前没有发现 2026 年有改动：
  - 3 个月到 1 年：40 €，总额 70,46
  - 1 到 2 年：50 €，总额 80,46
  - UE lungo periodo：100 €，总额 130,46
  - [二手] https://www.money.it/quanto-costa-il-permesso-di-soggiorno-gli-importi-di-rinnovo-e-richiesta
  - [二手] https://www.studiocataldi.it/articoli/26431-permessi-di-soggiorno-in-vigore-i-nuovi-costi-per-rilasci-e-rinnovi.asp
- 邮局柜台另收的费用**不写在 bollettino 上**：
  - 约 30 € 的 assicurata（保价挂号）寄送服务费
  - [二手] UniCatt 2026 列出总计 101,90 = 30,00 服务费 + 70,46 bollettino + 1,50 "tax"。1,50 可能是 bollettino 手续费，未核实。
  - [二手] UniGe 写作 "70,46 +30 per il rilascio"。

---

## 不确定 / 需实测

1. **2026 年 kit 里的 bollettino 是否仍是 TD 674，版式是否和 2021 年扫描件一致**：唯一能逐像素看清的扫描件是 2021 年的。UniCatt 2026 示例的栏位布局文字与它一致，但我没能核对图中的 TD 编号和竖排授权编号。需要拿到实物核对。
2. **bollettino 是否一定装在 kit 里**：Poste 官方只说 "troverai in tutti gli uffici postali"。二手来源都说在 kit 内，需要实测确认。
3. **方格的确切数量**：金额整数位约 8 或 9 格，ESEGUITO DA 约 2×22 格，LOCALITA' 约 16 格。这些是从低分辨率扫描目测的，做打印模板前必须用实物测量，Poste 手册的毫米规格可以作参考。
4. **金额大写里用单斜杠还是双斜杠**（`SETTANTA/46` 与 `SETTANTA//46`）、是否要写 "EURO"：没有官方规定，两种写法都出现在大学指南里。建议用单斜杠 `/`。
5. **黑笔还是蓝笔**：Poste 印刷的 AVVERTENZE 允许黑或蓝；大学指南和 kit 惯例要求黑笔。保守做法是用黑笔、全大写。
6. **"一格一字"、是否必须大写**：没有找到 Poste 对手写部分的官方逐字规定，只是惯例。
7. **左两联有没有独立的 CAP / località 栏位**：扫描图中左两联只有 "eseguito da" 和 "residente in via" 两条横线，CAP 和城市应写在地址行里，需用实物确认。
8. **UniCatt 列出的 1,50 € "tax" 是什么**：可能是 bollettino 手续费，未核实。它和 30 € 服务费一样，都不计入 bollettino 金额。
9. **contributo 金额**：截至今天没有发现 2026 年的修订，最新的 Questura 文件是 2024 年的。提交前应再查一次 Questura 和 poste.it。
10. **Treviso 和 statics/29 文件中 1–2 年期的 contributo**：两份文件都写 50 €，与 DM 2017 一致。statics/29 对应哪一个 Questura 未能确认。
