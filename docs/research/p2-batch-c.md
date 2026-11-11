# P2 C 批调研：官方要求（2026-11-06，Claude）

来源：portaleimmigrazione.it 各类型子页（均标"Ultimo aggiornamento 22/07/2024"，查看 2026-11-06）。费用另见 `official-facts.md` §5 和 `p2-batch-b.md` §1。

标记：【官方】= 官方门户原文要点；【推断】= 按官方文字推断，没有直接写明；【二手】= 非官方来源。

## 0. 范围（D48；C2 见 §4）

用户决定：
- C 批分两步。**C1** 做 9 种：32、33、19、20、27、28、29、23、07。**C2** 单独做 17（15 个子类，见 `p2-batch-b.md` §3）。
- **34 / 35 暂不做**，继续显示"即将支持"。
  - 原因：官方门户说可以走邮局；但查到的一份 Questura 材料清单（questure.poliziadistato.it 的 mod. 0.3，2026-11-06 查看）是按直接去 Questura 交写的，各地做法不一。
  - 那份清单只收 €16 印花税票和 €30,46，不收 contributo。以后做时可参考。
- **25 不做**：官网 2024 版已经删掉这一类。
- 07 不支持同时续办旅行证件，只在提醒里说明。

## 1. 各类型要求

### 31 / 32 / 33 学生 · 未成年学生 · 职业培训和实习（第 39 条之二）· Modulo 1，打工的加 Modulo 2
【官方】soggStudente.html、soggAlunno.html、soggTirocinante.html。三页正文**完全相同**，开头列了三类人：
1. 在高中、IFTS、ITS、高级培训课程读书的**成年**外国人；
2. 上职业培训课程、做课程内或课程外实习（tirocinio）的；
3. 读书的**未成年**外国人。

【推断】三个代码按这三类人分：31 Studente 对应第 1 类，33 Tirocinante 对应第 2 类，32 Alunno 对应第 3 类。
- 原来 31 的中文名写成"学生（高中、职业培训、实习）"，和 33 重叠，现在改为"学生（成年人读高中、技术培训课程）"。
- 三类都加了提醒：按签证或现有居留上写的类型选。

附件和 31 相同：
- 首次：经使领馆盖章的课程证明或实习协议；保险。
- 续签：课程或实习仍在进行的证明；经济来源证明（打工的可以用 Modulo 2）；保险。
- 对数据的含义：32 / 33 直接复用 31 的材料和问卷（`workStep: student`、首次填签证）。未成年自动免 contributo。

### 19 公务派遣（missione）· 只要 Modulo 1 · contributo 按期限
【官方】soggMissione.html。
- 附件：整本护照复印件。
- 续签：要附派遣单位（政府机关、公立或私立机构、国际组织）出具的**任务仍在进行**的声明。
- 首次签发：凭公务派遣签证入境后交 kit，填签证一节。期限没写，问预计期限，默认 12 个月。

### 20 宗教事由（motivi religiosi）· 只要 Modulo 1 · contributo 按期限
【官方】soggMotiviReligiosi.html。首次和续签附件相同：
- 整本护照复印件；
- 在意大利的宗教团体负责人的声明：说明担任的职务、承担食宿费用，并经主教公署（Curia vescovile）或同等宗教机构签章；
- 覆盖居留期的医疗和意外保险。

### 27 研究人员（第 27 条之三）· Modulo 1 + 2 · contributo 按期限
【官方】soggRicercatore27.html。
- 首次签发：Modulo 1、2 由发 nulla osta 的 Sportello Unico 填写，**只提示**。
- 续签：研究项目延期时才能续，期限等于延期的时间，要附续签后的接待协议（convenzione di accoglienza）。
- 费用：€100 档只适用于第 27 条第 1 款 a 项的高管 / 高技能人员（属于 17），研究人员按期限收。

### 28 研究人员：找工作 / 创业 · Modulo 1 + 2 · contributo 按期限
【官方】soggRicercatoreRicercaLavoro.html。附件：
- 整本护照复印件；
- 研究机构出具的研究完成证明；
- 经济来源证明；
- 保险；
- 在 centro per l'impiego 登记的证明。

对数据的含义：结构和 30 相同（Modulo 2 第 6 节、收入选填、按 rilascio），所以 OPEN_QUESTIONS 里 30 勾"签发"还是"转换"的问题也适用于 28。

### 29 研究人员：流动（mobilità）· Modulo 1 + 2 · contributo 按期限
【官方】soggRicercatoreMobilita27.html。
- 首次签发：由研究所在地的 Sportello Unico 填，**只提示**。
- 附件：
  - 其他欧盟国家签发的研究人员居留；
  - 和第一个欧盟国家研究机构签的接待协议；
  - 接待协议里没写明的，另附生活费用和医疗保险证明。

### 23 无国籍身份续签（apolidia）· Modulo 1，有收入加 Modulo 2 · contributo 按期限
【官方】soggStatusApolidiaRinnovo.html。
- 只受理续签。
- 附件：护照复印件（有的话）；申请认定无国籍身份的申请书复印件。
- DM 6 ottobre 2011 第 3 条的免缴名单里没有无国籍，按期限收。

### 07 庇护续签（asilo）· Modulo 1，有收入加 Modulo 2 · **免 contributo**，付 €30,46
【官方】AsiloRinnovo.html（L. 39/90、DPR 303/04）。
- 受理续签和转换。本工具只做续签。
- 附件：整本旅行证件复印件（有的话）。
- 同时续办旅行证件：填 Modulo 1 第 6 节，另附那张缴费单。**本工具不支持**，提醒先问 Questura。
- 费用：【二手】DM 6 ottobre 2011 第 3 条：庇护、申请庇护、辅助保护、人道理由免 contributo；DM 5 maggio 2017 保留这些免缴。多个来源一致（diritto.it、leggioggi.it 等转引），所以用 `senza-contributo`。
- 难民身份：Modulo 1 第 37 栏默认"是"（`person.refugee`）。

## 2. 顺带发现

- **09 由同住家属申请长居**：soggUEFamiliareConvivente.html 是 09 的另一种情形：家属的长居跟着同住家属申请。这种情形**只有自己有收入才要 Modulo 2**，还要附同住家属的报税单。现在的 09 一律按 Modulo 1 + 2 处理，写进了 OPEN_QUESTIONS。
- **34 名称是"permesso"，续签材料却写"carta di soggiorno"**：做 34 时要先确定勾 Modulo 1 第 14 栏还是第 15 栏。

## 3. 还要确认的

1. 31 / 32 / 33 按人群分（【推断】）：发布前问学校国际学生办公室或 Questura 确认。
2. 28 按 rilascio 处理，和 30 同一个问题。
3. 09 同住家属情形要不要单独处理。

## 4. C2：17 第 27 条特殊工作（2026-11-07 查看）

【官方】casiparticolariprevisti.html 和 15 个子类页（均标"Ultimo aggiornamento 22/07/2024"）。各页标题都是"Codice 17 – Permesso di Soggiorno per Lavoro Subordinato"。

### 4.1 共同点
- **第一次签发**：几乎所有子类都写"i moduli 1 e 2 sono compilati presso lo Sportello Unico Immigrazione all'atto della sottoscrizione del contratto di soggiorno"，由 Sportello Unico 代填。
- **申请人自己填首次的少数情形**：
  - B、C、D、P 凭自雇签证入境；
  - L、M、N、O 不满 90 天的短期演出签证；
  - F 凭学习签证来实习或上培训课程；
  - Q 记者（首次和续签材料相同）。
- **用户决定（D49）**：只做续签，首次签发只提示。

### 4.2 各子类续签

| 子类 | 谁 | 续签要的表 | 续签另附 |
|---|---|---|---|
| A | 公司高管、高技能人员 | 1 + 2 | 居留合同条款改过的：合同复印件 + 挂号信回执 |
| B | 大学交换 / 母语讲师 | 1 + 2 | 同 A |
| C | 大学教授、研究人员 | 1 + 2 | 同 A |
| D | 笔译、口译 | 1 + 2 | 同 A |
| E | 随欧盟 / 意大利雇主迁来的家政人员 | 1 + 2 | 同 A |
| F | 职业培训、受训 | 1 | 上培训课程的：出勤证明；被派来受训的：合同复印件 + 挂号信回执（不论改没改）；课程内实习的续签没写 |
| I | 国外雇主派来做承包工程的员工 | 1 | 同 A |
| L | 马戏团、巡回演出 | — | **页面没写续签**，不做 |
| M | 歌剧、戏剧、音乐会、芭蕾的演出和技术人员 | 1 | 延期后的 nulla osta + 居留合同 + 挂号信回执 |
| N | 娱乐场所的舞者、艺人、乐手 | 1 | 同 M |
| O | 音乐、戏剧、电影、电台电视机构的艺人 | 1 + 2 | 同 M |
| P | 职业运动员 | 1 + 2 | 同 A；以自雇身份的另附报税单（本工具只做雇佣） |
| Q | 驻意大利的外国记者 | 1 | 外交部记者注册证明（nota di accredito） |
| R | 青年交流项目中的研究、临时工作、互惠生 | 1 + 2 | 在研究机构任职的证明；打工度假（vacanze lavoro）去 Questura |
| R bis | 医疗机构聘用的护士 | 1 | 同 A |

【官方】期限：
- M、N、O、L：首次不超过 12 个月，可以延期；M、N 只能为了演完同一场、跟同一个雇主延期。
- I：不超过合同期限，最长 2 年。
- A：调派总期限含延期不超过 5 年。

### 4.3 费用
- A：官方费用表"dirigenti e lavoratori specializzati"按 €100（`p2-batch-b.md` §1），合计 €130,46。
- 其余按期限。

### 4.4 更正
`p2-batch-b.md` §3 的 1 / 1+2 分组是当时匆忙看的，有错：D 实际要 1 + 2，O 要 1 + 2，F、I、Q、R bis 只要 1，R 续签要 1 + 2。以本节为准。

### 4.5 还要确认的
- I、R bis 是雇佣工作，官方续签却写只要 Modulo 1。照官方页面做，发布前留意。
- 挂号信回执：16 / 18 已按"由 UNILAV 代替"处理。17 官方写"居留合同条款改过的才附"，照抄条件，没有改写。
- P 以自雇身份、F 课程内实习的续签：官方没写清，本工具不支持，只在提醒里说明。
