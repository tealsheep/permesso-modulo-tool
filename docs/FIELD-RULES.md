# 问卷字段规则表

由 `npm run rules:build` 根据当前 `stepsFor`、正式映射元数据和分支样例生成。勿手改；一致性测试会检查。

每个类型 / 办理方式下，列出分支覆盖集。某字段的“显示于”是它在这些分支中出现的条件集合；未列出的分支不显示。表中不包含申请人的个人答案。

## 16 · 雇佣工作 · rinnovo

覆盖分支：`default`、`other-document+mail+family`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| work.type | 工作类型 | 全部覆盖分支 | 是 | subordinato=雇佣工作 · Subordinato | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | 全部覆盖分支 | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | 全部覆盖分支 | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | 全部覆盖分支 | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | default、other-document+mail+family、work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | default、other-document+mail+family、work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | 全部覆盖分支 | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | 全部覆盖分支 | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| income.annualCents | 上一年的年收入（欧元） | contract-determinato、contract-indeterminato、contract-stagionale、contract-altro | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| application.expectedDurationMonths | 预计能批几个月 | contract-altro | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |

## 15 · 自雇工作 · rinnovo

覆盖分支：`default`、`other-document+mail+family`、`work-autonomo`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| work.type | 工作类型 | 全部覆盖分支 | 是 | autonomo=自雇工作 · Autonomo | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.autonomoForm | 自雇的形式 | 全部覆盖分支 | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| work.jobTitle | 工种 / 职务 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| business.name | 企业名称 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | 全部覆盖分支 | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | 全部覆盖分支 | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.annualCents | 上一年的年收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | 全部覆盖分支 | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 09 · 欧盟长期居留 · rilascio

覆盖分支：`default`、`other-document+mail+family`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`work-autonomo`、`work-altro`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| housing.idoneita.date | 住房适宜证明的签发日期 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 87 栏 · RILASCIATA IN DATA M1-087 |
| housing.idoneita.issuer | 住房适宜证明是谁开的 | 全部覆盖分支 | 否 | comune=市政府 · Comune；asl=卫生局 · ASL | Modulo 1 · 第 88 栏 · DAL COMUNE M1-088、M1-089、M1-090、M1-091、M1-092、M1-093 |
| housing.idoneita.province | 住房适宜证明签发地所在省（缩写） | 全部覆盖分支 | 否 | 选项集 O4 | Modulo 1 · 第 89 栏 · PROVINCIA M1-089、M1-092 |
| housing.idoneita.comuneOrAsl | 签发的 Comune 或 ASL 名称 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 90 栏 · COMUNE M1-090、M1-093 |
| housing.currentResidence.province | 登记住址所在省（缩写） | 全部覆盖分支 | 否 | 选项集 O4 | Modulo 1 · 第 109 栏 · PROVINCIA M1-109 |
| housing.currentResidence.comune | 目前登记住址所在城市 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 110 栏 · COMUNE M1-110 |
| housing.currentResidence.street | 目前登记住址的街道和门牌 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 111 栏 · INDIRIZZO M1-111 |
| housing.pastResidences[0].province | 过去住址所在省（缩写） | 全部覆盖分支 | 否 | 选项集 O4 | Modulo 1 · 第 96 栏 · PROVINCIA M1-096 |
| housing.pastResidences[0].comune | 所在城市 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 97 栏 · COMUNE M1-097 |
| housing.pastResidences[0].street | 街道和门牌 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 98 栏 · INDIRIZZO M1-098 |
| work.type | 工作类型 | 全部覆盖分支 | 是 | subordinato=雇佣工作 · Subordinato；autonomo=自雇工作 · Autonomo；altro=其他 · Altro | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | default、other-document+mail+family、work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | default、other-document+mail+family、work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| dependents.cohabitingCount | 和你同住、靠你抚养的有几个人？ | 全部覆盖分支 | 否 | — | Modulo 1 · 第 120 栏 · NUMERO PERSONE CONVIVENTI M1-120 |
| dependents.spouse | 其中有配偶吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 122 栏 · CONIUGE M1-122 |
| dependents.children | 其中有子女吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 123 栏 · FIGLI M1-123、M1-124 |
| dependents.childrenCount | 子女人数 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 124 栏 · NUMERO M1-124 |
| dependents.other | 还有其他亲属吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 125 栏 · ALTRO M1-125、M1-126 |
| childrenUnder14[0].surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | 全部覆盖分支 | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| housing.pastResidences[1].province | 过去住址所在省（缩写） | other-document+mail+family | 否 | 选项集 O4 | Modulo 1 · 第 99 栏 · PROVINCIA M1-099 |
| housing.pastResidences[1].comune | 所在城市 | other-document+mail+family | 否 | — | Modulo 1 · 第 100 栏 · COMUNE M1-100 |
| housing.pastResidences[1].street | 街道和门牌 | other-document+mail+family | 否 | — | Modulo 1 · 第 101 栏 · INDIRIZZO M1-101 |
| housing.pastResidences[2].province | 过去住址所在省（缩写） | other-document+mail+family | 否 | 选项集 O4 | Modulo 1 · 第 102 栏 · PROVINCIA M1-102 |
| housing.pastResidences[2].comune | 所在城市 | other-document+mail+family | 否 | — | Modulo 1 · 第 103 栏 · COMUNE M1-103 |
| housing.pastResidences[2].street | 街道和门牌 | other-document+mail+family | 否 | — | Modulo 1 · 第 104 栏 · INDIRIZZO M1-104 |
| housing.pastResidences[3].province | 过去住址所在省（缩写） | other-document+mail+family | 否 | 选项集 O4 | Modulo 1 · 第 105 栏 · PROVINCIA M1-105 |
| housing.pastResidences[3].comune | 所在城市 | other-document+mail+family | 否 | — | Modulo 1 · 第 106 栏 · COMUNE M1-106 |
| housing.pastResidences[3].street | 街道和门牌 | other-document+mail+family | 否 | — | Modulo 1 · 第 107 栏 · INDIRIZZO M1-107 |
| dependents.otherRelation | 是什么亲属关系 | other-document+mail+family | 否 | — | Modulo 1 · 第 126 栏 · SPECIFICARE RAPPORTO DI PARENTELA M1-126 |
| spouse.surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 129 栏 · COGNOME M1-129 |
| spouse.givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 130 栏 · NOME M1-130 |
| spouse.sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 131 栏 · SESSO M1-131 |
| spouse.birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 132 栏 · NATO/A IL M1-132 |
| spouse.birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 133 栏 · CODICE STATO NASCITA M1-133 |
| spouse.citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 134 栏 · CODICE STATO CITTADINANZA M1-134 |
| spouse.birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 135 栏 · CITTA' DI NASCITA M1-135 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| income.annualCents | 上一年的年收入（欧元） | contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、work-autonomo | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |
| work.autonomoForm | 自雇的形式 | work-autonomo | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| business.name | 企业名称 | work-autonomo | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | work-autonomo | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | work-autonomo | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | work-autonomo | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | work-autonomo | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | work-autonomo | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | work-autonomo | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | work-autonomo | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | work-autonomo | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | work-autonomo | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.taxForm | 你用哪一种证明收入？ | work-autonomo | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.taxForm | 你用哪一种证明收入？ | work-altro | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |

## 03 · 更新长居卡 · aggiornamento

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| application.aggiornamentoReasons | 这次要更新哪些信息？ | 全部覆盖分支 | 是 | domicilio=换住址 · Cambio domicilio；stato-civile=婚姻状况变了 · Stato civile；figli-nati-italia=加孩子（在意大利出生）· Inserimento figli；figli-ingresso=加孩子（从国外入境）· Inserimento figli；passaporto=换护照 · Cambio passaporto；anagrafica=改身份信息 · Variazioni anagrafiche；foto=更新照片 · Aggiornamento foto | Modulo 1 · 第 17 栏 · AGGIORNAMENTO FOTO CARTA SOGGIORNO STRANIERI M1-017 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 04 · 更新居留许可 · aggiornamento

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| application.aggiornamentoReasons | 这次要更新哪些信息？ | 全部覆盖分支 | 是 | domicilio=换住址 · Cambio domicilio；stato-civile=婚姻状况变了 · Stato civile；figli-nati-italia=加孩子（在意大利出生）· Inserimento figli；figli-ingresso=加孩子（从国外入境）· Inserimento figli；passaporto=换护照 · Cambio passaporto；anagrafica=改身份信息 · Variazioni anagrafiche；foto=更新照片 · Aggiornamento foto | Modulo 1 · 第 17 栏 · AGGIORNAMENTO FOTO CARTA SOGGIORNO STRANIERI M1-017 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 12 · 补发居留许可 · duplicato

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 11 · 补发长居卡 · duplicato

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 13 · 家庭 · rinnovo

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| family.sponsorPermitValidUntil | 担保你的家属的居留到期日 | 全部覆盖分支 | 是 | — | 不写进表格 · 用来算缴费金额  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 14 · 家庭（14–18 岁未成年人） · rinnovo

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 24 · 学习（大学） · rilascio

覆盖分支：`default`、`other-document+mail+family`、`not-working`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`work-autonomo`、`work-altro`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| visa.entryDate | 入境意大利日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 48 栏 · DATA DI INGRESSO IN ITALIA M1-048 |
| visa.border | 入境口岸 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 49 栏 · FRONTIERA M1-049 |
| visa.number | 签证号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 50 栏 · NUMERO VISTO M1-050 |
| visa.type | 签证类型 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 51 栏 · TIPO VISTO M1-051 |
| visa.entries | 入境次数 | 全部覆盖分支 | 是 | single=单次 · Ingresso singolo；multiple=多次 · Ingresso multiplo | Modulo 1 · 第 52 栏 · INGRESSO SINGOLO M1-052、M1-053 |
| visa.notes | 签证备注 / 入境事由 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 54 栏 · ANNOTAZIONI / MOTIVO DEL VISTO DI INGRESSO M1-054 |
| visa.durationDays | 签证天数 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 55 栏 · DURATA DEL VISTO M1-055 |
| visa.validFrom | 签证有效期自 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 56 栏 · VALIDO DAL M1-056 |
| visa.validUntil | 签证有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 57 栏 · SINO AL M1-057 |
| study.working | 你现在有打工收入吗？ | 全部覆盖分支 | 是 | true=是；false=否 | 不写进表格 · 决定要不要填 Modulo 2  |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| work.type | 工作类型 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 是 | subordinato=雇佣工作 · Subordinato；autonomo=自雇工作 · Autonomo；altro=其他 · Altro | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | default、other-document+mail+family、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、work-autonomo | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| income.annualCents | 上一年的年收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.bustaPaga | 附上工资单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |
| work.autonomoForm | 自雇的形式 | work-autonomo | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| business.name | 企业名称 | work-autonomo | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | work-autonomo | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | work-autonomo | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | work-autonomo | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | work-autonomo | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | work-autonomo | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | work-autonomo | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | work-autonomo | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | work-autonomo | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | work-autonomo | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.taxForm | 你用哪一种证明收入？ | work-autonomo | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.taxForm | 你用哪一种证明收入？ | work-altro | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |

## 24 · 学习（大学） · rinnovo

覆盖分支：`default`、`other-document+mail+family`、`not-working`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`work-autonomo`、`work-altro`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| study.working | 你现在有打工收入吗？ | 全部覆盖分支 | 是 | true=是；false=否 | 不写进表格 · 决定要不要填 Modulo 2  |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| work.type | 工作类型 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 是 | subordinato=雇佣工作 · Subordinato；autonomo=自雇工作 · Autonomo；altro=其他 · Altro | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | default、other-document+mail+family、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、work-autonomo | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| income.annualCents | 上一年的年收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.bustaPaga | 附上工资单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |
| work.autonomoForm | 自雇的形式 | work-autonomo | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| business.name | 企业名称 | work-autonomo | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | work-autonomo | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | work-autonomo | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | work-autonomo | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | work-autonomo | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | work-autonomo | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | work-autonomo | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | work-autonomo | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | work-autonomo | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | work-autonomo | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.taxForm | 你用哪一种证明收入？ | work-autonomo | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.taxForm | 你用哪一种证明收入？ | work-altro | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |

## 31 · 学生（成年人读高中、技术培训课程） · rilascio

覆盖分支：`default`、`other-document+mail+family`、`not-working`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`work-autonomo`、`work-altro`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| visa.entryDate | 入境意大利日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 48 栏 · DATA DI INGRESSO IN ITALIA M1-048 |
| visa.border | 入境口岸 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 49 栏 · FRONTIERA M1-049 |
| visa.number | 签证号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 50 栏 · NUMERO VISTO M1-050 |
| visa.type | 签证类型 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 51 栏 · TIPO VISTO M1-051 |
| visa.entries | 入境次数 | 全部覆盖分支 | 是 | single=单次 · Ingresso singolo；multiple=多次 · Ingresso multiplo | Modulo 1 · 第 52 栏 · INGRESSO SINGOLO M1-052、M1-053 |
| visa.notes | 签证备注 / 入境事由 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 54 栏 · ANNOTAZIONI / MOTIVO DEL VISTO DI INGRESSO M1-054 |
| visa.durationDays | 签证天数 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 55 栏 · DURATA DEL VISTO M1-055 |
| visa.validFrom | 签证有效期自 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 56 栏 · VALIDO DAL M1-056 |
| visa.validUntil | 签证有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 57 栏 · SINO AL M1-057 |
| study.working | 你现在有打工收入吗？ | 全部覆盖分支 | 是 | true=是；false=否 | 不写进表格 · 决定要不要填 Modulo 2  |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| work.type | 工作类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 是 | subordinato=雇佣工作 · Subordinato；autonomo=自雇工作 · Autonomo；altro=其他 · Altro | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| income.annualCents | 上一年的年收入（欧元） | contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、work-autonomo | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |
| work.autonomoForm | 自雇的形式 | work-autonomo | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| business.name | 企业名称 | work-autonomo | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | work-autonomo | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | work-autonomo | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | work-autonomo | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | work-autonomo | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | work-autonomo | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | work-autonomo | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | work-autonomo | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | work-autonomo | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | work-autonomo | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.taxForm | 你用哪一种证明收入？ | work-autonomo | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.taxForm | 你用哪一种证明收入？ | work-altro | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |

## 31 · 学生（成年人读高中、技术培训课程） · rinnovo

覆盖分支：`default`、`other-document+mail+family`、`not-working`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`work-autonomo`、`work-altro`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| study.working | 你现在有打工收入吗？ | 全部覆盖分支 | 是 | true=是；false=否 | 不写进表格 · 决定要不要填 Modulo 2  |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| work.type | 工作类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 是 | subordinato=雇佣工作 · Subordinato；autonomo=自雇工作 · Autonomo；altro=其他 · Altro | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| income.annualCents | 上一年的年收入（欧元） | contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、work-autonomo | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |
| work.autonomoForm | 自雇的形式 | work-autonomo | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| business.name | 企业名称 | work-autonomo | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | work-autonomo | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | work-autonomo | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | work-autonomo | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | work-autonomo | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | work-autonomo | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | work-autonomo | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | work-autonomo | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | work-autonomo | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | work-autonomo | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.taxForm | 你用哪一种证明收入？ | work-autonomo | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.taxForm | 你用哪一种证明收入？ | work-altro | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |

## 30 · 毕业后找工作 / 创业 · conversione

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| employmentCentre.registrationDate | 在职业介绍中心登记的日期 | 全部覆盖分支 | 是 | — | Modulo 2 · 第 65 栏 · DATA DI ISCRIZIONE M2-065 |
| employmentCentre.province | 登记所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 2 · 第 66 栏 · PROVINCIA M2-066 |
| employmentCentre.city | 登记所在城市 | 全部覆盖分支 | 是 | — | Modulo 2 · 第 67 栏 · CITTA' M2-067 |
| employmentCentre.circoscrizione | 片区（circoscrizione） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 68 栏 · CIRCOSCRIZIONE M2-068 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| income.annualCents | 上一年的年收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | 全部覆盖分支 | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 05 · 等待就业（失业后） · rinnovo

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| employmentCentre.registrationDate | 在职业介绍中心登记的日期 | 全部覆盖分支 | 是 | — | Modulo 2 · 第 65 栏 · DATA DI ISCRIZIONE M2-065 |
| employmentCentre.province | 登记所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 2 · 第 66 栏 · PROVINCIA M2-066 |
| employmentCentre.city | 登记所在城市 | 全部覆盖分支 | 是 | — | Modulo 2 · 第 67 栏 · CITTA' M2-067 |
| employmentCentre.circoscrizione | 片区（circoscrizione） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 68 栏 · CIRCOSCRIZIONE M2-068 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| income.annualCents | 上一年的年收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | 全部覆盖分支 | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 10 · 转为家庭居留 · conversione

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| family.sponsorKind | 你要和哪一类家属团聚？ | 全部覆盖分支 | 是 | straniero=在意大利合法居留的外国人 · Straniero regolarmente soggiornante；italiano-ue=意大利或欧盟公民 · Cittadino italiano o UE；rifugiato=被承认的难民 · Rifugiato | 不写进表格 · 决定材料清单  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 18 · 季节性工作 · rinnovo

覆盖分支：`default`、`other-document+mail+family`、`work-subordinato`、`contract-stagionale`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| work.type | 工作类型 | 全部覆盖分支 | 是 | subordinato=雇佣工作 · Subordinato | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | 全部覆盖分支 | 是 | stagionale=季节工 · Stagionale | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | 全部覆盖分支 | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | 全部覆盖分支 | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | default、other-document+mail+family、work-subordinato、contract-stagionale、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | 全部覆盖分支 | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | 全部覆盖分支 | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | 全部覆盖分支 | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | default、other-document+mail+family、work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| income.annualCents | 上一年的年收入（欧元） | contract-stagionale | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |

## 21 · 选择性居留 · rilascio

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| visa.entryDate | 入境意大利日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 48 栏 · DATA DI INGRESSO IN ITALIA M1-048 |
| visa.border | 入境口岸 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 49 栏 · FRONTIERA M1-049 |
| visa.number | 签证号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 50 栏 · NUMERO VISTO M1-050 |
| visa.type | 签证类型 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 51 栏 · TIPO VISTO M1-051 |
| visa.entries | 入境次数 | 全部覆盖分支 | 是 | single=单次 · Ingresso singolo；multiple=多次 · Ingresso multiplo | Modulo 1 · 第 52 栏 · INGRESSO SINGOLO M1-052、M1-053 |
| visa.notes | 签证备注 / 入境事由 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 54 栏 · ANNOTAZIONI / MOTIVO DEL VISTO DI INGRESSO M1-054 |
| visa.durationDays | 签证天数 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 55 栏 · DURATA DEL VISTO M1-055 |
| visa.validFrom | 签证有效期自 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 56 栏 · VALIDO DAL M1-056 |
| visa.validUntil | 签证有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 57 栏 · SINO AL M1-057 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| income.annualCents | 上一年的年收入（欧元） | 全部覆盖分支 | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | 全部覆盖分支 | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 21 · 选择性居留 · rinnovo

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| income.annualCents | 上一年的年收入（欧元） | 全部覆盖分支 | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | 全部覆盖分支 | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 06 · 等待入籍 · rilascio

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 06 · 等待入籍 · rinnovo

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 02 · 寄养 / 监护托付 · rinnovo

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 32 · 未成年学生（第 39 条之二） · rilascio

覆盖分支：`default`、`other-document+mail+family`、`not-working`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`work-autonomo`、`work-altro`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| visa.entryDate | 入境意大利日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 48 栏 · DATA DI INGRESSO IN ITALIA M1-048 |
| visa.border | 入境口岸 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 49 栏 · FRONTIERA M1-049 |
| visa.number | 签证号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 50 栏 · NUMERO VISTO M1-050 |
| visa.type | 签证类型 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 51 栏 · TIPO VISTO M1-051 |
| visa.entries | 入境次数 | 全部覆盖分支 | 是 | single=单次 · Ingresso singolo；multiple=多次 · Ingresso multiplo | Modulo 1 · 第 52 栏 · INGRESSO SINGOLO M1-052、M1-053 |
| visa.notes | 签证备注 / 入境事由 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 54 栏 · ANNOTAZIONI / MOTIVO DEL VISTO DI INGRESSO M1-054 |
| visa.durationDays | 签证天数 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 55 栏 · DURATA DEL VISTO M1-055 |
| visa.validFrom | 签证有效期自 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 56 栏 · VALIDO DAL M1-056 |
| visa.validUntil | 签证有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 57 栏 · SINO AL M1-057 |
| study.working | 你现在有打工收入吗？ | 全部覆盖分支 | 是 | true=是；false=否 | 不写进表格 · 决定要不要填 Modulo 2  |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| work.type | 工作类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 是 | subordinato=雇佣工作 · Subordinato；autonomo=自雇工作 · Autonomo；altro=其他 · Altro | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| income.annualCents | 上一年的年收入（欧元） | contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、work-autonomo | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |
| work.autonomoForm | 自雇的形式 | work-autonomo | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| business.name | 企业名称 | work-autonomo | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | work-autonomo | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | work-autonomo | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | work-autonomo | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | work-autonomo | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | work-autonomo | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | work-autonomo | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | work-autonomo | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | work-autonomo | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | work-autonomo | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.taxForm | 你用哪一种证明收入？ | work-autonomo | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.taxForm | 你用哪一种证明收入？ | work-altro | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |

## 32 · 未成年学生（第 39 条之二） · rinnovo

覆盖分支：`default`、`other-document+mail+family`、`not-working`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`work-autonomo`、`work-altro`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| study.working | 你现在有打工收入吗？ | 全部覆盖分支 | 是 | true=是；false=否 | 不写进表格 · 决定要不要填 Modulo 2  |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| work.type | 工作类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 是 | subordinato=雇佣工作 · Subordinato；autonomo=自雇工作 · Autonomo；altro=其他 · Altro | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| income.annualCents | 上一年的年收入（欧元） | contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、work-autonomo | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |
| work.autonomoForm | 自雇的形式 | work-autonomo | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| business.name | 企业名称 | work-autonomo | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | work-autonomo | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | work-autonomo | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | work-autonomo | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | work-autonomo | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | work-autonomo | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | work-autonomo | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | work-autonomo | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | work-autonomo | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | work-autonomo | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.taxForm | 你用哪一种证明收入？ | work-autonomo | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.taxForm | 你用哪一种证明收入？ | work-altro | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |

## 33 · 职业培训 / 实习生（第 39 条之二） · rilascio

覆盖分支：`default`、`other-document+mail+family`、`not-working`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`work-autonomo`、`work-altro`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| visa.entryDate | 入境意大利日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 48 栏 · DATA DI INGRESSO IN ITALIA M1-048 |
| visa.border | 入境口岸 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 49 栏 · FRONTIERA M1-049 |
| visa.number | 签证号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 50 栏 · NUMERO VISTO M1-050 |
| visa.type | 签证类型 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 51 栏 · TIPO VISTO M1-051 |
| visa.entries | 入境次数 | 全部覆盖分支 | 是 | single=单次 · Ingresso singolo；multiple=多次 · Ingresso multiplo | Modulo 1 · 第 52 栏 · INGRESSO SINGOLO M1-052、M1-053 |
| visa.notes | 签证备注 / 入境事由 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 54 栏 · ANNOTAZIONI / MOTIVO DEL VISTO DI INGRESSO M1-054 |
| visa.durationDays | 签证天数 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 55 栏 · DURATA DEL VISTO M1-055 |
| visa.validFrom | 签证有效期自 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 56 栏 · VALIDO DAL M1-056 |
| visa.validUntil | 签证有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 57 栏 · SINO AL M1-057 |
| study.working | 你现在有打工收入吗？ | 全部覆盖分支 | 是 | true=是；false=否 | 不写进表格 · 决定要不要填 Modulo 2  |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| work.type | 工作类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 是 | subordinato=雇佣工作 · Subordinato；autonomo=自雇工作 · Autonomo；altro=其他 · Altro | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| income.annualCents | 上一年的年收入（欧元） | contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、work-autonomo | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |
| work.autonomoForm | 自雇的形式 | work-autonomo | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| business.name | 企业名称 | work-autonomo | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | work-autonomo | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | work-autonomo | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | work-autonomo | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | work-autonomo | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | work-autonomo | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | work-autonomo | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | work-autonomo | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | work-autonomo | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | work-autonomo | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.taxForm | 你用哪一种证明收入？ | work-autonomo | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.taxForm | 你用哪一种证明收入？ | work-altro | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |

## 33 · 职业培训 / 实习生（第 39 条之二） · rinnovo

覆盖分支：`default`、`other-document+mail+family`、`not-working`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`work-autonomo`、`work-altro`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| study.working | 你现在有打工收入吗？ | 全部覆盖分支 | 是 | true=是；false=否 | 不写进表格 · 决定要不要填 Modulo 2  |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| work.type | 工作类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 是 | subordinato=雇佣工作 · Subordinato；autonomo=自雇工作 · Autonomo；altro=其他 · Altro | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-autonomo、work-altro | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| income.annualCents | 上一年的年收入（欧元） | contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、work-autonomo | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |
| work.autonomoForm | 自雇的形式 | work-autonomo | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| business.name | 企业名称 | work-autonomo | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | work-autonomo | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | work-autonomo | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | work-autonomo | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | work-autonomo | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | work-autonomo | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | work-autonomo | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | work-autonomo | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | work-autonomo | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | work-autonomo | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.taxForm | 你用哪一种证明收入？ | work-autonomo | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.taxForm | 你用哪一种证明收入？ | work-altro | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |

## 19 · 公务派遣 · rilascio

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| visa.entryDate | 入境意大利日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 48 栏 · DATA DI INGRESSO IN ITALIA M1-048 |
| visa.border | 入境口岸 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 49 栏 · FRONTIERA M1-049 |
| visa.number | 签证号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 50 栏 · NUMERO VISTO M1-050 |
| visa.type | 签证类型 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 51 栏 · TIPO VISTO M1-051 |
| visa.entries | 入境次数 | 全部覆盖分支 | 是 | single=单次 · Ingresso singolo；multiple=多次 · Ingresso multiplo | Modulo 1 · 第 52 栏 · INGRESSO SINGOLO M1-052、M1-053 |
| visa.notes | 签证备注 / 入境事由 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 54 栏 · ANNOTAZIONI / MOTIVO DEL VISTO DI INGRESSO M1-054 |
| visa.durationDays | 签证天数 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 55 栏 · DURATA DEL VISTO M1-055 |
| visa.validFrom | 签证有效期自 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 56 栏 · VALIDO DAL M1-056 |
| visa.validUntil | 签证有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 57 栏 · SINO AL M1-057 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 19 · 公务派遣 · rinnovo

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 20 · 宗教事由 · rilascio

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| visa.entryDate | 入境意大利日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 48 栏 · DATA DI INGRESSO IN ITALIA M1-048 |
| visa.border | 入境口岸 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 49 栏 · FRONTIERA M1-049 |
| visa.number | 签证号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 50 栏 · NUMERO VISTO M1-050 |
| visa.type | 签证类型 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 51 栏 · TIPO VISTO M1-051 |
| visa.entries | 入境次数 | 全部覆盖分支 | 是 | single=单次 · Ingresso singolo；multiple=多次 · Ingresso multiplo | Modulo 1 · 第 52 栏 · INGRESSO SINGOLO M1-052、M1-053 |
| visa.notes | 签证备注 / 入境事由 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 54 栏 · ANNOTAZIONI / MOTIVO DEL VISTO DI INGRESSO M1-054 |
| visa.durationDays | 签证天数 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 55 栏 · DURATA DEL VISTO M1-055 |
| visa.validFrom | 签证有效期自 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 56 栏 · VALIDO DAL M1-056 |
| visa.validUntil | 签证有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 57 栏 · SINO AL M1-057 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 20 · 宗教事由 · rinnovo

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 27 · 研究人员（第 27 条之三） · rinnovo

覆盖分支：`default`、`other-document+mail+family`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`work-autonomo`、`work-altro`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| work.type | 工作类型 | 全部覆盖分支 | 是 | subordinato=雇佣工作 · Subordinato；autonomo=自雇工作 · Autonomo；altro=其他 · Altro | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | default、other-document+mail+family、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、work-autonomo | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| income.annualCents | 上一年的年收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.bustaPaga | 附上工资单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |
| work.autonomoForm | 自雇的形式 | work-autonomo | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| business.name | 企业名称 | work-autonomo | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | work-autonomo | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | work-autonomo | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | work-autonomo | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | work-autonomo | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | work-autonomo | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | work-autonomo | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | work-autonomo | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | work-autonomo | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | work-autonomo | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.taxForm | 你用哪一种证明收入？ | work-autonomo | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.taxForm | 你用哪一种证明收入？ | work-altro | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |

## 28 · 研究人员：找工作 / 创业 · conversione

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| employmentCentre.registrationDate | 在职业介绍中心登记的日期 | 全部覆盖分支 | 是 | — | Modulo 2 · 第 65 栏 · DATA DI ISCRIZIONE M2-065 |
| employmentCentre.province | 登记所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 2 · 第 66 栏 · PROVINCIA M2-066 |
| employmentCentre.city | 登记所在城市 | 全部覆盖分支 | 是 | — | Modulo 2 · 第 67 栏 · CITTA' M2-067 |
| employmentCentre.circoscrizione | 片区（circoscrizione） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 68 栏 · CIRCOSCRIZIONE M2-068 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| income.annualCents | 上一年的年收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | 全部覆盖分支 | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 29 · 研究人员：流动 · rinnovo

覆盖分支：`default`、`other-document+mail+family`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`work-autonomo`、`work-altro`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| work.type | 工作类型 | 全部覆盖分支 | 是 | subordinato=雇佣工作 · Subordinato；autonomo=自雇工作 · Autonomo；altro=其他 · Altro | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | 全部覆盖分支 | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | default、other-document+mail+family、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、work-autonomo | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| income.annualCents | 上一年的年收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.bustaPaga | 附上工资单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、work-altro | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |
| work.autonomoForm | 自雇的形式 | work-autonomo | 是 | titolare=经营者 · Titolare；socio=合伙人 · Socio；libero=自由职业 · Libero professionista；altro=其他 · Altro | Modulo 2 · 第 15 栏 · TITOLARE M2-015、M2-016、M2-017、M2-018 |
| business.name | 企业名称 | work-autonomo | 否 | — | Modulo 2 · 第 42 栏 · DENOMINAZIONE SOCIALE M2-042 |
| business.codiceFiscale | 企业税号 | work-autonomo | 否 | — | Modulo 2 · 第 43 栏 · CODICE FISCALE M2-043 |
| business.partitaIva | 增值税号（Partita IVA） | work-autonomo | 否 | — | Modulo 2 · 第 44 栏 · PARTITA IVA M2-044 |
| business.inps | INPS 编号（Matricola） | work-autonomo | 否 | — | Modulo 2 · 第 45 栏 · MATRICOLA INPS M2-045 |
| business.cciaaProvince | 商会注册所在省（缩写） | work-autonomo | 否 | 选项集 O4 | Modulo 2 · 第 46 栏 · PROVINCIA DI ISCRIZIONE C.C.I.A.A M2-046 |
| business.cciaaNumber | 商会注册号（REA） | work-autonomo | 否 | — | Modulo 2 · 第 47 栏 · NUMERO M2-047 |
| business.cciaaDate | 商会注册日期 | work-autonomo | 否 | — | Modulo 2 · 第 48 栏 · DATA DI ISCRIZIONE M2-048 |
| business.albo | 职业名册 | work-autonomo | 否 | — | Modulo 2 · 第 49 栏 · ISCRIZIONE ALBI / REGISTRI M2-049 |
| business.alboDate | 职业名册登记日期 | work-autonomo | 否 | — | Modulo 2 · 第 50 栏 · IN DATA M2-050 |
| income.autonomoStartedThisYear | 自雇是今年才开始的吗？ | work-autonomo | 是 | true=是；false=否 | Modulo 2 · 第 63 栏 · INIZIO ATTIVITA' AUTONOMA NELL'ANNO IN CORSO M2-063 |
| income.taxForm | 你用哪一种证明收入？ | work-autonomo | 否 | unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.taxForm | 你用哪一种证明收入？ | work-altro | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |

## 23 · 无国籍身份续签 · rinnovo

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| income.annualCents | 上一年的年收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | 全部覆盖分支 | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 07 · 庇护续签 · rinnovo

覆盖分支：`default`、`other-document+mail+family`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.otherCode | 其他证件的种类 | 全部覆盖分支 | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | 全部覆盖分支 | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| income.annualCents | 上一年的年收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | 全部覆盖分支 | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | 全部覆盖分支 | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF)；unico-sp=合伙公司报税 · Redditi SP (Unico SP)；unico-sc=有限公司报税 · Redditi SC (Unico SC)；unico-enc=非营利机构报税 · Redditi ENC | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| income.bustaPaga | 附上工资单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | 全部覆盖分支 | 否 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |

## 17 · 特殊工作（第 27 条：高管、教授、翻译、艺人、运动员、护士等） · rinnovo

覆盖分支：`default`、`other-document+mail+family`、`work-subordinato`、`contract-determinato`、`contract-indeterminato`、`contract-stagionale`、`contract-altro`、`employer-fisica-none`、`employer-giuridica-none`、`employer-fisica-same-employer`、`employer-giuridica-same-employer`、`employer-fisica-changed`、`employer-giuridica-changed`、`subtype-a`、`subtype-b`、`subtype-c`、`subtype-d`、`subtype-e`、`subtype-f`、`subtype-i`、`subtype-m`、`subtype-n`、`subtype-o`、`subtype-p`、`subtype-q`、`subtype-r`、`subtype-r-bis`

| 字段 | 问题 | 显示于 | 必填 | 有效选项 | 表格 |
|---|---|---|---|---|---|
| questura.city | 交给哪个 Questura | 全部覆盖分支 | 是 | 选项集 O1 | Modulo 1 · 表格抬头（无栏号） · AL SIGNOR QUESTORE DI M1-H01、M1-H02、M2-H01、M2-H02 |
| currentPermit.number | 现在这张居留的卡号 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 18 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-018 |
| currentPermit.typeCode | 现在这张居留的类型 | 全部覆盖分支 | 是 | 选项集 O2 | Modulo 1 · 第 19 栏 · CODICE TIPOLOGIA CARTA/PERMESSO DI SOGGIORNO IN POSSESSO O DI RIFERIMENTO M1-019 |
| currentPermit.validUntil | 现在这张居留的到期日 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 20 栏 · DATA DI SCADENZA DEL PERMESSO M1-020 |
| application.art27Letter | 你属于第 27 条的哪一类？ | 全部覆盖分支 | 是 | 选项集 O5 | 不写进表格 · 决定要不要 Modulo 2、费用和材料清单 M1-024 |
| application.expectedDurationMonths | 预计能批几个月 | 全部覆盖分支 | 是 | — | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| person.surname | 姓 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 3 栏 · COGNOME M1-003、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.givenNames | 名 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 4 栏 · NOME M1-004、B-eseguito-1、B-eseguito-2、B-eseguito-3 |
| person.sex | 性别 | 全部覆盖分支 | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 33 栏 · SESSO M1-033 |
| person.birthDate | 出生日期 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 34 栏 · NATO/A IL M1-034 |
| person.birthCountry | 出生国家 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 35 栏 · CODICE STATO NASCITA M1-035 |
| person.citizenship | 国籍 | 全部覆盖分支 | 是 | 选项集 O3 | Modulo 1 · 第 36 栏 · CODICE STATO CITTADINANZA M1-036 |
| person.birthCity | 出生地 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 38 栏 · CITTA' DI NASCITA M1-038 |
| person.maritalStatus | 婚姻状况 | 全部覆盖分支 | 是 | A=未婚 / 离婚 / 丧偶 · A (Stato libero)；B=已婚 · B (Coniugato/a) | Modulo 1 · 第 32 栏 · STATO CIVILE M1-032 |
| person.codiceFiscale | 税号（Codice fiscale） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 31 栏 · CODICE FISCALE (OVE IN POSSESSO) M1-031 |
| person.refugee | 你是难民身份吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 37 栏 · RIFUGIATO M1-037 |
| document.kind | 用什么证件申请 | 全部覆盖分支 | 是 | passport=护照 · Passaporto；other=其他旅行证件 · Altro documento | Modulo 1 · 第 40 栏 · PASSAPORTO M1-040、M1-041 |
| document.number | 护照号码 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 44 栏 · NUMERO M1-044 |
| document.validUntil | 护照有效期至 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 45 栏 · VALIDO SINO AL M1-045 |
| address.province | 住址所在省（缩写） | 全部覆盖分支 | 是 | 选项集 O4 | Modulo 1 · 第 5 栏 · PROVINCIA DI DOMICILIO M1-005、M1-066 |
| address.comune | 住址所在城市（Comune） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 6 栏 · COMUNE DI DOMICILIO M1-006、M1-067、B-localita-3 |
| address.street | 街道 | 全部覆盖分支 | 是 | — | Modulo 1 · 第 68 栏 · INDIRIZZO M1-068、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.numero | 门牌号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.civic.lettera | 门牌字母 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 69 栏 · NUMERO CIVICO M1-069、B-residente-1、B-residente-2、B-residente-3 |
| address.scala | 楼梯（Scala） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 70 栏 · SCALA M1-070 |
| address.interno | 室号（Interno） | 全部覆盖分支 | 否 | — | Modulo 1 · 第 71 栏 · INTERNO M1-071 |
| address.cap | 邮编（CAP） | 全部覆盖分支 | 是 | — | Modulo 1 · 第 72 栏 · CAP M1-072、B-cap-3 |
| address.email | 电子邮箱 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 73 栏 · INDIRIZZO E-MAIL (FACOLTATIVO) M1-073 |
| address.phoneFixed.prefisso | 区号 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneFixed.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 74 栏 · TELEFONO FISSO IN ITALIA (FACOLTATIVO) M1-074 |
| address.phoneMobile.prefisso | 前缀 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| address.phoneMobile.numero | 号码 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 75 栏 · TELEFONO CELLULARE IN ITALIA (FACOLTATIVO) M1-075 |
| mailToDifferent | 收信地址 | 全部覆盖分支 | 是 | false=与住址相同；true=使用其他地址 | Modulo 1 · 第 8 节（第 76–84 栏）· RECAPITO PER EVENTUALI COMUNICAZIONI  |
| work.type | 工作类型 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 是 | subordinato=雇佣工作 · Subordinato | Modulo 2 · 第 4 栏 · SUBORDINATO M2-004、M2-005、M2-006、M2-008、M2-009、M2-010、M2-011、M2-012、M2-013、M2-015、M2-016、M2-017、M2-018、M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032、M2-034、M2-035、M2-036、M2-037、M2-038、M2-039、M2-040、M2-042、M2-043、M2-044、M2-045、M2-046、M2-047、M2-048、M2-049、M2-050、M2-063 |
| work.contract | 劳动合同类型 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 是 | indeterminato=无固定期限 · Tempo indeterminato；determinato=固定期限 · Tempo determinato；stagionale=季节工 · Stagionale；altro=其他 · Altro | Modulo 2 · 第 8 栏 · A TEMPO INDETERMINATO M2-008、M2-009、M2-010、M2-011、M2-012 |
| work.contractMonths | 合同期限（月） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 是 | — | Modulo 2 · 第 11 栏 · DURATA MESI M2-011 |
| work.contractDays | 额外天数 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-stagionale、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 否 | — | Modulo 2 · 第 13 栏 · DURATA GIORNI M2-013 |
| work.jobTitle | 工种 / 职务 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 否 | — | Modulo 2 · 第 19 栏 · MANSIONE SVOLTA M2-019 |
| employer.kind | 雇主是公司还是个人？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 是 | giuridica=公司 / 法人 · Persona giuridica；fisica=个人雇主 · Persona fisica | Modulo 2 · 第 21 栏 · PERSONA GIURIDICA M2-021、M2-022、M2-023、M2-024、M2-025、M2-026、M2-027、M2-028、M2-029、M2-030、M2-031、M2-032 |
| employer.name | 公司名称 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-giuridica-none、employer-giuridica-same-employer、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 是 | — | Modulo 2 · 第 22 栏 · DENOMINAZIONE SOCIALE M2-022 |
| employer.codiceFiscale | 雇主税号 | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 否 | — | Modulo 2 · 第 23 栏 · CODICE FISCALE M2-023、M2-031 |
| employer.partitaIva | 雇主增值税号（Partita IVA） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 否 | — | Modulo 2 · 第 24 栏 · OPPURE PARTITA IVA M2-024、M2-032 |
| employer.inps | 雇主 INPS 编号（Matricola） | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 否 | — | Modulo 2 · 第 25 栏 · MATRICOLA INPS M2-025 |
| work.contrattoSoggiornoStatus | 你有单独的《居留合同》吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 是 | none=没有 / 不清楚；same-employer=有，现在还是同一个雇主；changed=有，但后来换了雇主 | Modulo 2 · 第 33–40 栏 · CONTRATTO DI SOGGIORNO M2-034、M2-035、M2-036 |
| work.hiredThisYear | 你是今年才入职这份工作的吗？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 是 | true=是；false=否 | 不写进表格 · 决定要带哪些材料  |
| income.annualCents | 上一年的年收入（欧元） | default、other-document+mail+family、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 是 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.lastTaxYear | 最近一次报税是哪一年？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 否 | — | Modulo 2 · 第 54 栏 · ULTIMO ANNO DI PRESENTAZIONE DELLA DICHIARAZIONE DEI REDDITI M2-054 |
| income.taxForm | 你用哪一种证明收入？ | default、other-document+mail+family、work-subordinato、contract-determinato、contract-indeterminato、contract-stagionale、contract-altro、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed、subtype-a、subtype-b、subtype-c、subtype-d、subtype-e、subtype-o、subtype-p、subtype-r | 否 | cud=CU / 101 · Certificazione Unica (CUD)；unico-pf=730 或 740 · 个人报税 · Redditi PF (Unico PF) | Modulo 2 · 第 55 栏 · MODELLO UNICO PERSONE FISICHE M2-055、M2-056、M2-057、M2-058、M2-059 |
| relatedApplication.spouse | 这份申请和配偶的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 114 栏 · SI M1-114、M1-115 |
| relatedApplication.parent | 这份申请和父母的申请一起交吗？ | 全部覆盖分支 | 否 | true=是；false=否 | Modulo 1 · 第 117 栏 · SI M1-117、M1-118 |
| application.submissionTotalSheets | 表格和复印件一共几页 | 全部覆盖分支 | 否 | — | Modulo 1 · 第 25 栏 · INDICARE IL NUMERO TOTALE DI FOGLI M1-025 |
| document.otherCode | 其他证件的种类 | other-document+mail+family | 否 | 01=无国籍人旅行证 · TITOLO DI VIAGGIO PER APOLIDI (01)；02=难民旅行证 · DOCUMENTO DI VIAGGIO PER RIFUGIATI (02)；03=外国人旅行证 · TITOLO DI VIAGGIO PER STRANIERI (03)；04=海员证 · LIBRETTO DI NAVIGAZIONE PER I MARITTIMI (04)；05=航空机组证件 · DOCUMENTO DI NAVIGAZIONE AEREA (05)；06=联合国通行证 · LASCIAPASSARE DELLE NAZIONI UNITE (06)；07=北约总部签发的证件 · DOCUMENTO RILASCIATO DA UN QUARTIER GENERALE DELLA NATO (07)；08=UNMIK 旅行证件 · DOCUMENTO DI VIAGGIO UNMIK (08)；09=欧盟国家公民身份证 · CARTA DI IDENTITÀ PER I CITTADINI DEGLI STATI DELLA U.E. (09) | Modulo 1 · 第 42 栏 · SPECIFICARE ALTRO TIPO DI DOCUMENTO M1-042 |
| document.otherName | 其他证件的名称 | other-document+mail+family | 否 | — | Modulo 1 · 第 43 栏 · ALTRO M1-043 |
| document.issuerCode | 其他证件的签发机关 | other-document+mail+family | 否 | 01=政府 · GOVERNO (01)；02=本国驻外使领馆（意大利以外） · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA ALL'ESTERO (02)；03=本国驻意大利使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE DELLO STATO DI APPARTENENZA IN ITALIA (03)；04=本国驻梵蒂冈使领馆 · RAPPRESENTANZA DIPLOMATICA / CONSOLARE PRESSO LO STATO DELLA CITTÀ DEL VATICANO (04)；05=联合国（官员通行证） · ONU – LASCIAPASSARE PROPRI DIRIGENTI (05)；06=警察局（Questura） · QUESTURA (06) | Modulo 1 · 第 46 栏 · RILASCIATO DA M1-046 |
| mailTo.presso | 代收人（Presso） | other-document+mail+family | 否 | — | Modulo 1 · 第 77 栏 · PRESSO M1-077 |
| mailTo.province | 收信地址所在省（缩写） | other-document+mail+family | 是 | 选项集 O4 | Modulo 1 · 第 78 栏 · PROVINCIA M1-078 |
| mailTo.comune | 收信地址所在城市（Comune） | other-document+mail+family | 是 | — | Modulo 1 · 第 79 栏 · COMUNE M1-079 |
| mailTo.street | 收信地址街道 | other-document+mail+family | 是 | — | Modulo 1 · 第 80 栏 · INDIRIZZO M1-080 |
| mailTo.civic.numero | 门牌号 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.civic.lettera | 门牌字母 | other-document+mail+family | 否 | — | Modulo 1 · 第 81 栏 · NUMERO CIVICO M1-081 |
| mailTo.scala | 楼梯（Scala） | other-document+mail+family | 否 | — | Modulo 1 · 第 82 栏 · SCALA M1-082 |
| mailTo.interno | 室号（Interno） | other-document+mail+family | 否 | — | Modulo 1 · 第 83 栏 · INTERNO M1-083 |
| mailTo.cap | 邮编（CAP） | other-document+mail+family | 是 | — | Modulo 1 · 第 84 栏 · CAP M1-084 |
| childrenUnder14[0].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 137 栏 · COGNOME M1-026、M1-137 |
| childrenUnder14[0].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 138 栏 · NOME M1-026、M1-138 |
| childrenUnder14[0].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 139 栏 · SESSO M1-026、M1-139 |
| childrenUnder14[0].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 140 栏 · NATO/A IL M1-026、M1-140 |
| childrenUnder14[0].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 141 栏 · CODICE STATO NASCITA M1-026、M1-141 |
| childrenUnder14[0].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 142 栏 · CODICE STATO CITTADINANZA M1-026、M1-142 |
| childrenUnder14[0].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 143 栏 · CITTA' DI NASCITA M1-026、M1-143 |
| childrenUnder14[1].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 145 栏 · COGNOME M1-026、M1-145 |
| childrenUnder14[1].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 146 栏 · NOME M1-026、M1-146 |
| childrenUnder14[1].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 147 栏 · SESSO M1-026、M1-147 |
| childrenUnder14[1].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 148 栏 · NATO/A IL M1-026、M1-148 |
| childrenUnder14[1].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 149 栏 · CODICE STATO NASCITA M1-026、M1-149 |
| childrenUnder14[1].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 150 栏 · CODICE STATO CITTADINANZA M1-026、M1-150 |
| childrenUnder14[1].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 151 栏 · CITTA' DI NASCITA M1-026、M1-151 |
| childrenUnder14[2].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 152 栏 · COGNOME M1-026、M1-152 |
| childrenUnder14[2].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 153 栏 · NOME M1-026、M1-153 |
| childrenUnder14[2].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 154 栏 · SESSO M1-026、M1-154 |
| childrenUnder14[2].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 155 栏 · NATO/A IL M1-026、M1-155 |
| childrenUnder14[2].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 156 栏 · CODICE STATO NASCITA M1-026、M1-156 |
| childrenUnder14[2].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 157 栏 · CODICE STATO CITTADINANZA M1-026、M1-157 |
| childrenUnder14[2].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 158 栏 · CITTA' DI NASCITA M1-026、M1-158 |
| childrenUnder14[3].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 160 栏 · COGNOME M1-026、M1-160 |
| childrenUnder14[3].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 161 栏 · NOME M1-026、M1-161 |
| childrenUnder14[3].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 162 栏 · SESSO M1-026、M1-162 |
| childrenUnder14[3].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 163 栏 · NATO/A IL M1-026、M1-163 |
| childrenUnder14[3].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 164 栏 · CODICE STATO NASCITA M1-026、M1-164 |
| childrenUnder14[3].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 165 栏 · CODICE STATO CITTADINANZA M1-026、M1-165 |
| childrenUnder14[3].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 166 栏 · CITTA' DI NASCITA M1-026、M1-166 |
| childrenUnder14[4].surname | 姓 | other-document+mail+family | 是 | — | Modulo 1 · 第 167 栏 · COGNOME M1-026、M1-167 |
| childrenUnder14[4].givenNames | 名 | other-document+mail+family | 是 | — | Modulo 1 · 第 168 栏 · NOME M1-026、M1-168 |
| childrenUnder14[4].sex | 性别 | other-document+mail+family | 是 | M=男 · M (Maschio)；F=女 · F (Femmina) | Modulo 1 · 第 169 栏 · SESSO M1-026、M1-169 |
| childrenUnder14[4].birthDate | 出生日期 | other-document+mail+family | 是 | — | Modulo 1 · 第 170 栏 · NATO/A IL M1-026、M1-170 |
| childrenUnder14[4].birthCountry | 出生国家 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 171 栏 · CODICE STATO NASCITA M1-026、M1-171 |
| childrenUnder14[4].citizenship | 国籍 | other-document+mail+family | 是 | 选项集 O3 | Modulo 1 · 第 172 栏 · CODICE STATO CITTADINANZA M1-026、M1-172 |
| childrenUnder14[4].birthCity | 出生地 | other-document+mail+family | 是 | — | Modulo 1 · 第 173 栏 · CITTA' DI NASCITA M1-026、M1-173 |
| family.childrenEnteredWithFamilyVisa | 孩子是凭家庭团聚签证入境的吗？ | other-document+mail+family | 否 | true=是；false=否 | 问卷辅助项 · 用于选择表格、费用或材料，不单独抄入表格  |
| contrattoSoggiorno.province | 在哪个省的 Sportello Unico 签的（缩写） | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | 选项集 O4 | Modulo 2 · 第 35 栏 · DELLA PREFETTURA/UTG DI M2-035、M2-038 |
| contrattoSoggiorno.date | 签订日期 | work-subordinato、employer-fisica-same-employer、employer-giuridica-same-employer | 否 | — | Modulo 2 · 第 36 栏 · DATA SOTTOSCRIZIONE M2-036、M2-040 |
| income.annualCents | 上一年的年收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | — | Modulo 2 · 第 52 栏 · ANNUALE PERCEPITO M2-052、M2-053 |
| income.bustaPaga | 附上工资单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | true=是；false=否 | Modulo 2 · 第 60 栏 · BUSTA PAGA M2-060 |
| income.bollettinoInps | 附上 INPS 缴费单吗？ | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 否 | true=是；false=否 | Modulo 2 · 第 61 栏 · BOLLETTINO INPS M2-061 |
| income.monthlyCents | 月收入（欧元） | work-subordinato、employer-fisica-none、employer-giuridica-none、employer-fisica-same-employer、employer-giuridica-same-employer、employer-fisica-changed、employer-giuridica-changed | 是 | — | Modulo 2 · 第 62 栏 · IMPORTO MENSILE M2-062 |
| work.contractOther | 其他合同类型说明 | contract-altro | 否 | — | Modulo 2 · 第 12 栏 · ALTRO M2-012 |
| employer.surname | 雇主的姓 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 28 栏 · COGNOME M2-028 |
| employer.givenNames | 雇主的名 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 29 栏 · NOME M2-029 |
| employer.birthDate | 雇主的出生日期 | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 30 栏 · NATO / A IL M2-030 |
| employer.permitNumber | 雇主的居留号码（如果雇主是外国人） | employer-fisica-none、employer-fisica-same-employer、employer-fisica-changed | 否 | — | Modulo 2 · 第 27 栏 · NUMERO PERMESSO / CARTA DI SOGGIORNO OVE IN POSSESSO M2-027 |

## 共享选项集

### O1

AGRIGENTO=AG · AGRIGENTO；ALESSANDRIA=AL · ALESSANDRIA；ANCONA=AN · ANCONA；AOSTA=AO · AOSTA；AREZZO=AR · AREZZO；ASCOLI PICENO=AP · ASCOLI PICENO；ASTI=AT · ASTI；AVELLINO=AV · AVELLINO；BARI=BA · BARI；BARLETTA ANDRIA TRANI=BT · BARLETTA ANDRIA TRANI；BELLUNO=BL · BELLUNO；BENEVENTO=BN · BENEVENTO；BERGAMO=BG · BERGAMO；BIELLA=BI · BIELLA；BOLOGNA=BO · BOLOGNA；BOLZANO=BZ · BOLZANO；BRESCIA=BS · BRESCIA；BRINDISI=BR · BRINDISI；CAGLIARI=CA · CAGLIARI；CALTANISSETTA=CL · CALTANISSETTA；CAMPOBASSO=CB · CAMPOBASSO；CASERTA=CE · CASERTA；CATANIA=CT · CATANIA；CATANZARO=CZ · CATANZARO；CHIETI=CH · CHIETI；COMO=CO · COMO；COSENZA=CS · COSENZA；CREMONA=CR · CREMONA；CROTONE=KR · CROTONE；CUNEO=CN · CUNEO；ENNA=EN · ENNA；FERMO=FM · FERMO；FERRARA=FE · FERRARA；FIRENZE=FI · FIRENZE；FOGGIA=FG · FOGGIA；FORLI CESENA=FC · FORLI CESENA；FROSINONE=FR · FROSINONE；GENOVA=GE · GENOVA；GORIZIA=GO · GORIZIA；GROSSETO=GR · GROSSETO；IMPERIA=IM · IMPERIA；ISERNIA=IS · ISERNIA；L'AQUILA=AQ · L'AQUILA；LA SPEZIA=SP · LA SPEZIA；LATINA=LT · LATINA；LECCE=LE · LECCE；LECCO=LC · LECCO；LIVORNO=LI · LIVORNO；LODI=LO · LODI；LUCCA=LU · LUCCA；MACERATA=MC · MACERATA；MANTOVA=MN · MANTOVA；MASSA CARRARA=MS · MASSA CARRARA；MATERA=MT · MATERA；MESSINA=ME · MESSINA；MILANO=MI · MILANO；MODENA=MO · MODENA；MONZA E DELLA BRIANZA=MB · MONZA E DELLA BRIANZA；NAPOLI=NA · NAPOLI；NOVARA=NO · NOVARA；NUORO=NU · NUORO；ORISTANO=OR · ORISTANO；PADOVA=PD · PADOVA；PALERMO=PA · PALERMO；PARMA=PR · PARMA；PAVIA=PV · PAVIA；PERUGIA=PG · PERUGIA；PESARO URBINO=PU · PESARO URBINO；PESCARA=PE · PESCARA；PIACENZA=PC · PIACENZA；PISA=PI · PISA；PISTOIA=PT · PISTOIA；PORDENONE=PN · PORDENONE；POTENZA=PZ · POTENZA；PRATO=PO · PRATO；RAGUSA=RG · RAGUSA；RAVENNA=RA · RAVENNA；REGGIO CALABRIA=RC · REGGIO CALABRIA；REGGIO EMILIA=RE · REGGIO EMILIA；RIETI=RI · RIETI；RIMINI=RN · RIMINI；ROMA=RM · ROMA；ROVIGO=RO · ROVIGO；SALERNO=SA · SALERNO；SASSARI=SS · SASSARI；SAVONA=SV · SAVONA；SIENA=SI · SIENA；SIRACUSA=SR · SIRACUSA；SONDRIO=SO · SONDRIO；TARANTO=TA · TARANTO；TERAMO=TE · TERAMO；TERNI=TR · TERNI；TORINO=TO · TORINO；TRAPANI=TP · TRAPANI；TRENTO=TN · TRENTO；TREVISO=TV · TREVISO；TRIESTE=TS · TRIESTE；UDINE=UD · UDINE；VARESE=VA · VARESE；VENEZIA=VE · VENEZIA；VERBANO CUSIO OSSOLA=VB · VERBANO CUSIO OSSOLA；VERCELLI=VC · VERCELLI；VERONA=VR · VERONA；VIBO VALENTIA=VV · VIBO VALENTIA；VICENZA=VI · VICENZA；VITERBO=VT · VITERBO

### O2

02=寄养 / 监护托付 · Affidamento (02)；03=更新居留卡（长居）：换住址、婚姻状况、加子女、换护照、更新照片 · Aggiornamento carta di soggiorno (cambio domicilio, stato civile, inserimento figli, cambio passaporto, aggiornamento foto) (03)；04=更新居留许可：换住址、婚姻状况、加子女、换护照 · Aggiornamento permesso di soggiorno (cambio domicilio, stato civile, inserimento figli, cambio passaporto) (04)；05=等待就业 · Attesa occupazione (05)；06=等待入籍 · Attesa acquisto cittadinanza (06)；07=庇护续签 · Asilo rinnovo (07)；09=欧盟长期居留 · Permesso di soggiorno UE per soggiornanti di lungo periodo (09)；10=居留转换 · Conversione permesso di soggiorno (10)；11=补发居留卡（长居） · Duplicato Carta di soggiorno (11)；12=补发居留许可 · Duplicato Permesso di soggiorno (12)；13=家庭 · Famiglia (13)；14=家庭（未成年人 14–18 岁） · Famiglia minore (14)；15=自雇工作 · Lavoro Autonomo (15)；16=雇佣工作 · Lavoro Subordinato (16)；17=特殊工作类别（移民法第 27 条） · Lavoro casi particolari previsti art.27 Testo Unico Immigrazione (17)；18=季节性雇佣工作 · Lavoro subordinato-stagionale (18)；19=公务派遣 · Missione (19)；20=宗教事由 · Motivi Religiosi (20)；21=选择性居留 · Residenza elettiva (21)；23=无国籍身份续签 · Status apolidia rinnovo (23)；24=学习（移民法第 39 条） · Motivi di Studio (art.39 TUI) (24)；25=职业培训实习 · Tirocinio formazione professionale (25)；27=研究人员（第 27 条之三） · Ricercatore (art. 27 ter TUI) (27)；28=研究人员：找工作 / 创业 · Ricercatore - Ricerca lavoro (art.27 ter TUI) (28)；29=研究人员：流动 · Ricercatore - Mobilità (art.27 ter TUI) (29)；30=学生：毕业后找工作 / 创业 · Studente - Ricerca lavoro (art.39 bis.1 TUI) (30)；31=学生（第 39 条之二） · Studente (art.39 bis TUI) (31)；32=中小学生（第 39 条之二） · Alunno (art.39 bis TUI) (32)；33=实习生（第 39 条之二） · Tirocinante (art.39 bis TUI) (33)；34=意大利公民家属 · Familiare cittadino italiano (34)；35=欧盟公民家属电子居留卡 · Carta di soggiorno elettronica familiare cittadino UE (35)

### O3

AFG=阿富汗 · AFGHANISTAN (AFG)；ALB=阿尔巴尼亚 · ALBANIA (ALB)；DZA=阿尔及利亚 · ALGERIA (DZA)；AND=安道尔 · ANDORRA (AND)；AGO=安哥拉 · ANGOLA (AGO)；AIA=安圭拉 · ANGUILLA (ISOLA) (AIA)；ATG=安提瓜和巴布达 · ANTIGUA E BARBUDA (ATG)；XXX=无国籍 · APOLIDE (XXX)；SAU=沙特阿拉伯 · ARABIA SAUDITA (SAU)；ARG=阿根廷 · ARGENTINA (ARG)；ARM=亚美尼亚 · ARMENIA (ARM)；AUS=澳大利亚 · AUSTRALIA (AUS)；AUT=奥地利 · AUSTRIA (AUT)；AZE=阿塞拜疆 · AZERBAIGIAN (AZE)；BHS=巴哈马 · BAHAMA (BHS)；BHR=巴林 · BAHREIN (BHR)；BGD=孟加拉国 · BANGLADESH (BGD)；BRB=巴巴多斯 · BARBADOS (BRB)；BEL=比利时 · BELGIO (BEL)；BLZ=伯利兹 · BELIZE (BLZ)；BEN=贝宁 · BENIN (BEN)；BMU=百慕大 · BERMUDE (BMU)；BTN=不丹 · BHUTAN (BTN)；BLR=白俄罗斯 · BIELORUSSIA (BLR)；BOL=玻利维亚 · BOLIVIA (BOL)；BIH=波斯尼亚和黑塞哥维那 · BOSNIA ED ERZEGOVINA (BIH)；BWA=博茨瓦纳 · BOTSWANA (BWA)；BRA=巴西 · BRASILE (BRA)；BRN=文莱 · BRUNEI (BRN)；BGR=保加利亚 · BULGARIA (BGR)；BFA=布基纳法索 · BURKINA FASO (BFA)；BDI=布隆迪 · BURUNDI (BDI)；KHM=柬埔寨 · CAMBOGIA (KHM)；CMR=喀麦隆 · CAMERUN (CMR)；CAN=加拿大 · CANADA (CAN)；CPV=佛得角 · CAPO VERDE (CPV)；CYM=开曼群岛 · CAYMAN (ISOLE) (CYM)；CAF=中非 · CENTRAFRICA (CAF)；CXR=圣诞岛 · CHRISTMAS (CXR)；TCD=乍得 · CIAD (TCD)；CHL=智利 · CILE (CHL)；CHN=中国 · CINA POPOLARE (CHN)；CYP=塞浦路斯 · CIPRO (CYP)；VAT=梵蒂冈 · CITTA' DEL VATICANO (VAT)；CCK=科科斯群岛 · COCOS (CCK)；COL=哥伦比亚 · COLOMBIA (COL)；COM=科摩罗 · COMORE (COM)；COG=刚果（布） · CONGO (COG)；PRK=朝鲜 · COREA DEL NORD (PRK)；KOR=韩国 · COREA DEL SUD (KOR)；CIV=科特迪瓦 · COSTA D'AVORIO (CIV)；CRI=哥斯达黎加 · COSTARICA (CRI)；HRV=克罗地亚 · CROAZIA (HRV)；CUB=古巴 · CUBA (CUB)；DNK=丹麦 · DANIMARCA (DNK)；DMA=多米尼克 · DOMINICA (DMA)；ECU=厄瓜多尔 · ECUADOR (ECU)；EGY=埃及 · EGITTO (EGY)；SLV=萨尔瓦多 · EL SALVADOR (SLV)；ARE=阿联酋 · EMIRATI ARABI UNITI (ARE)；ERI=厄立特里亚 · ERITREA (ERI)；EST=爱沙尼亚 · ESTONIA (EST)；ETH=埃塞俄比亚 · ETIOPIA (ETH)；XXA=前苏联 · EX UNIONE SOVIETICA (XXA)；FRO=法罗群岛 · FAER OER (FRO)；FJI=斐济 · FIGI (FJI)；PHL=菲律宾 · FILIPPINE (PHL)；FIN=芬兰 · FINLANDIA (FIN)；FRA=法国 · FRANCIA (FRA)；GAB=加蓬 · GABON (GAB)；GMB=冈比亚 · GAMBIA (GMB)；GEO=格鲁吉亚 · GEORGIA (GEO)；DEU=德国 · GERMANIA (DEU)；GHA=加纳 · GHANA (GHA)；JAM=牙买加 · GIAMAICA (JAM)；JPN=日本 · GIAPPONE (JPN)；DJI=吉布提 · GIBUTI (DJI)；JOR=约旦 · GIORDANIA (JOR)；GRC=希腊 · GRECIA (GRC)；GRD=格林纳达 · GRENADA (GRD)；GRL=格陵兰 · GROENLANDIA (GRL)；GLP=瓜德罗普 · GUADALUPA (GLP)；GUM=关岛 · GUAM (GUM)；GTM=危地马拉 · GUATEMALA (GTM)；GUF=法属圭亚那 · GUAYANA FRANCESE (GUF)；GIN=几内亚 · GUINEA (GIN)；GNB=几内亚比绍 · GUINEA BISSAU (GNB)；GNQ=赤道几内亚 · GUINEA EQUATORIALE (GNQ)；GUY=圭亚那 · GUYANA (GUY)；HTI=海地 · HAITI (HTI)；HND=洪都拉斯 · HONDURAS (HND)；HKG=中国香港 · HONG KONG (HKG)；IND=印度 · INDIA (IND)；IDN=印度尼西亚 · INDONESIA (IDN)；IRN=伊朗 · IRAN (IRN)；IRQ=伊拉克 · IRAQ (IRQ)；IRL=爱尔兰 · IRLANDA (IRL)；ISL=冰岛 · ISLANDA (ISL)；VIR=美属维尔京群岛 · ISOLE VERGINI (VIR)；ISR=以色列 · ISRAELE (ISR)；ITA=意大利 · ITALIA (ITA)；KAZ=哈萨克斯坦 · KAZAKISTAN (KAZ)；KEN=肯尼亚 · KENIA (KEN)；KGZ=吉尔吉斯斯坦 · KIRGHIZISTAN (KGZ)；KIR=基里巴斯 · KIRIBATI (KIR)；KOS=科索沃 · KOSOVO (KOS)；KWT=科威特 · KUWAIT (KWT)；REU=留尼汪 · LA REUNION (REU)；LAO=老挝 · LAOS (LAO)；LSO=莱索托 · LESOTHO (LSO)；LVA=拉脱维亚 · LETTONIA (LVA)；LBN=黎巴嫩 · LIBANO (LBN)；LBR=利比里亚 · LIBERIA (LBR)；LBY=利比亚 · LIBIA (LBY)；LIE=列支敦士登 · LIECHTENSTEIN (LIE)；LTU=立陶宛 · LITUANIA (LTU)；LUX=卢森堡 · LUSSEMBURGO (LUX)；MAC=中国澳门 · MACAO (MAC)；MDG=马达加斯加 · MADAGASCAR (MDG)；MWI=马拉维 · MALAWI (MWI)；MYS=马来西亚 · MALAYSIA (MYS)；MDV=马尔代夫 · MALDIVE (MDV)；MLI=马里 · MALI (MLI)；MLT=马耳他 · MALTA (MLT)；FLK=马尔维纳斯群岛（福克兰群岛） · MALVINE (FLK)；MAR=摩洛哥 · MAROCCO (MAR)；MHL=马绍尔群岛 · MARSHALL (MHL)；MTQ=马提尼克 · MARTINICA (MTQ)；MRT=毛里塔尼亚 · MAURITANIA (MRT)；MUS=毛里求斯 · MAURIZIO (MUS)；MYT=马约特 · MAYOTTE (MYT)；MEX=墨西哥 · MESSICO (MEX)；FSM=密克罗尼西亚联邦 · MICRONESIA STATI FEDERALI (FSM)；MDA=摩尔多瓦 · MOLDAVIA (MDA)；MCO=摩纳哥 · MONACO (MCO)；MNG=蒙古 · MONGOLIA (MNG)；MNE=黑山 · MONTENEGRO (MNE)；MSR=蒙特塞拉特 · MONTSERRAT (MSR)；MOZ=莫桑比克 · MOZAMBICO (MOZ)；MMR=缅甸 · MYANMAR (BIRMANIA) (MMR)；NAM=纳米比亚 · NAMIBIA (NAM)；NRU=瑙鲁 · NAURU (NRU)；NPL=尼泊尔 · NEPAL (NPL)；NIC=尼加拉瓜 · NICARAGUA (NIC)；NER=尼日尔 · NIGER (NER)；NGA=尼日利亚 · NIGERIA (NGA)；NFK=诺福克岛 · NORFOLK (NFK)；NOR=挪威 · NORVEGIA (NOR)；NCL=新喀里多尼亚 · NUOVA CALEDONIA (NCL)；NZL=新西兰 · NUOVA ZELANDA (NZL)；OMN=阿曼 · OMAN (OMN)；NLD=荷兰 · PAESI BASSI (NLD)；PAK=巴基斯坦 · PAKISTAN (PAK)；PLW=帕劳 · PALAU REPUBBLICA (PLW)；PSE=巴勒斯坦 · PALESTINA (PSE)；PAN=巴拿马 · PANAMA (PAN)；PNG=巴布亚新几内亚 · PAPUASIA-N.GUINEA (PNG)；PRY=巴拉圭 · PARAGUAY (PRY)；PER=秘鲁 · PERU' (PER)；PCN=皮特凯恩群岛 · PITCAIRN (PCN)；PYF=法属波利尼西亚 · POLINESIA (PYF)；POL=波兰 · POLONIA (POL)；PRT=葡萄牙 · PORTOGALLO (PRT)；PRI=波多黎各 · PUERTO RICO (PRI)；QAT=卡塔尔 · QATAR (QAT)；GBR=英国 · REGNO UNITO (GBR)；CZE=捷克 · REPUBBLICA CECA (CZE)；COD=刚果（金） · REPUBBLICA DEMOCRATICA DEL CONGO (COD)；MKD=北马其顿 · REPUBBLICA DI MACEDONIA DEL NORD (MKD)；DOM=多米尼加共和国 · REPUBBLICA DOMINICANA (DOM)；SVK=斯洛伐克 · REPUBBLICA SLOVACCA (SVK)；ROU=罗马尼亚 · ROMANIA (ROU)；RWA=卢旺达 · RUANDA (RWA)；RUS=俄罗斯 · RUSSIA (RUS)；KNA=圣基茨和尼维斯 · S. CHRISTOPHER E NEVIS (KNA)；ESH=西撒哈拉 · SAHARA SPAGNOLO (ESH)；LCA=圣卢西亚 · SAINT LUCIA (LCA)；SPM=圣皮埃尔和密克隆 · SAINT PIERRE ET MIQUELON (SPM)；VCT=圣文森特和格林纳丁斯 · SAINT VINCENT E GRENADINE (VCT)；SLB=所罗门群岛 · SALOMONE (SLB)；WSM=萨摩亚 · SAMOA (WSM)；ASM=美属萨摩亚 · SAMOA AMERICANE (ASM)；SMR=圣马力诺 · SAN MARINO (SMR)；SHN=圣赫勒拿 · SANT'ELENA (SHN)；STP=圣多美和普林西比 · SAO TOME' E PRINCIPE (STP)；SYC=塞舌尔 · SEICELLE (SYC)；SEN=塞内加尔 · SENEGAL (SEN)；SRB=塞尔维亚 · SERBIA (SRB)；SLE=塞拉利昂 · SIERRA LEONE (SLE)；SGP=新加坡 · SINGAPORE (SGP)；SYR=叙利亚 · SIRIA (SYR)；SVN=斯洛文尼亚 · SLOVENIA (SVN)；SOM=索马里 · SOMALIA (SOM)；ESP=西班牙 · SPAGNA (ESP)；LKA=斯里兰卡 · SRI LANKA (CEYLON) (LKA)；USA=美国 · STATI UNITI D'AMERICA (USA)；ZAF=南非 · SUD AFRICA (ZAF)；SSD=南苏丹 · SUD SUDAN (SSD)；SDN=苏丹 · SUDAN (SDN)；SUR=苏里南 · SURINAME (SUR)；SWE=瑞典 · SVEZIA (SWE)；CHE=瑞士 · SVIZZERA (CHE)；SWZ=斯威士兰（埃斯瓦蒂尼） · SWAZILAND (SWZ)；TJK=塔吉克斯坦 · TAGIKISTAN (TJK)；TWN=中国台湾 · TAIWAN (TWN)；TZA=坦桑尼亚 · TANZANIA (TZA)；THA=泰国 · THAILANDIA (THA)；TLS=东帝汶 · TIMOR (TLS)；TGO=多哥 · TOGO (TGO)；TKL=托克劳 · TOKELAU (TKL)；TON=汤加 · TONGA (TON)；TTO=特立尼达和多巴哥 · TRINIDAD E TOBAGO (TTO)；TUN=突尼斯 · TUNISIA (TUN)；TUR=土耳其 · TURCHIA (TUR)；TKM=土库曼斯坦 · TURKMENISTAN (TKM)；TCA=特克斯和凯科斯群岛 · TURKS (TCA)；TUV=图瓦卢 · TUVALU (TUV)；UKR=乌克兰 · UCRAINA (UKR)；UGA=乌干达 · UGANDA (UGA)；HUN=匈牙利 · UNGHERIA (HUN)；URY=乌拉圭 · URUGUAY (URY)；UZB=乌兹别克斯坦 · UZBEKISTAN (UZB)；VUT=瓦努阿图 · VANUATU (VUT)；VEN=委内瑞拉 · VENEZUELA (VEN)；VGB=英属维尔京群岛 · VERGINI BRITANNICHE (ISOLE) (VGB)；VNM=越南 · VIETNAM (VNM)；WLF=瓦利斯和富图纳 · WALLIS (WLF)；YEM=也门 · YEMEN (YEM)；ZMB=赞比亚 · ZAMBIA (ZMB)；ZWE=津巴布韦 · ZIMBABWE (ZWE)

### O4

AG=AG · AGRIGENTO；AL=AL · ALESSANDRIA；AN=AN · ANCONA；AO=AO · AOSTA；AR=AR · AREZZO；AP=AP · ASCOLI PICENO；AT=AT · ASTI；AV=AV · AVELLINO；BA=BA · BARI；BL=BL · BELLUNO；BN=BN · BENEVENTO；BG=BG · BERGAMO；BI=BI · BIELLA；BO=BO · BOLOGNA；BZ=BZ · BOLZANO；BS=BS · BRESCIA；BR=BR · BRINDISI；CA=CA · CAGLIARI；CL=CL · CALTANISSETTA；CB=CB · CAMPOBASSO；CE=CE · CASERTA；CT=CT · CATANIA；CZ=CZ · CATANZARO；CH=CH · CHIETI；CO=CO · COMO；CS=CS · COSENZA；CR=CR · CREMONA；KR=KR · CROTONE；CN=CN · CUNEO；EN=EN · ENNA；FM=FM · FERMO；FE=FE · FERRARA；FI=FI · FIRENZE；FG=FG · FOGGIA；FC=FC · FORLI CESENA；FR=FR · FROSINONE；GE=GE · GENOVA；GO=GO · GORIZIA；GR=GR · GROSSETO；IM=IM · IMPERIA；IS=IS · ISERNIA；AQ=AQ · L'AQUILA；SP=SP · LA SPEZIA；LT=LT · LATINA；LE=LE · LECCE；LC=LC · LECCO；LI=LI · LIVORNO；LO=LO · LODI；LU=LU · LUCCA；MC=MC · MACERATA；MN=MN · MANTOVA；MS=MS · MASSA；MT=MT · MATERA；ME=ME · MESSINA；MI=MI · MILANO；MO=MO · MODENA；MB=MB · MONZA E DELLA BRIANZA；NA=NA · NAPOLI；NO=NO · NOVARA；NU=NU · NUORO；OR=OR · ORISTANO；PD=PD · PADOVA；PA=PA · PALERMO；PR=PR · PARMA；PV=PV · PAVIA；PG=PG · PERUGIA；PU=PU · PESARO URBINO；PE=PE · PESCARA；PC=PC · PIACENZA；PI=PI · PISA；PT=PT · PISTOIA；PN=PN · PORDENONE；PZ=PZ · POTENZA；PO=PO · PRATO；RG=RG · RAGUSA；RA=RA · RAVENNA；RC=RC · REGGIO CALABRIA；RE=RE · REGGIO EMILIA；RI=RI · RIETI；RN=RN · RIMINI；RM=RM · ROMA；RO=RO · ROVIGO；SA=SA · SALERNO；SS=SS · SASSARI；SV=SV · SAVONA；SI=SI · SIENA；SR=SR · SIRACUSA；SO=SO · SONDRIO；TA=TA · TARANTO；TE=TE · TERAMO；TR=TR · TERNI；TO=TO · TORINO；TP=TP · TRAPANI；TN=TN · TRENTO；TV=TV · TREVISO；TS=TS · TRIESTE；UD=UD · UDINE；VA=VA · VARESE；VE=VE · VENEZIA；VB=VB · VERBANIA；VC=VC · VERCELLI；VR=VR · VERONA；VV=VV · VIBO VALENTIA；VI=VI · VICENZA；VT=VT · VITERBO

### O5

a=A 公司高管或高技能人员 · Dirigenti o personale altamente specializzato；b=B 大学交换或母语外语讲师 · Lettori universitari di scambio o di madre lingua；c=C 大学教授、研究人员 · Professori universitari e ricercatori；d=D 笔译、口译 · Traduttori ed interpreti；e=E 随雇主迁来的家政人员 · Collaboratori familiari；f=F 职业培训、受训 · Formazione professionale；i=I 国外公司派来做承包工程的员工 · Lavoratori dipendenti da datori all’estero；m=M 歌剧、戏剧、音乐会、芭蕾的演出和技术人员 · Personale artistico e tecnico per spettacoli；n=N 娱乐场所的舞者、艺人、乐手 · Ballerini, artisti e musicisti；o=O 受雇于音乐、戏剧、电影、电台电视机构的艺人 · Artisti per enti musicali, teatrali, cinematografici, radio-TV；p=P 职业运动员 · Attività sportive professionistiche；q=Q 驻意大利的外国记者 · Giornalisti corrispondenti accreditati；r=R 青年交流项目中的研究、临时工作或互惠生 · Scambi o mobilità di giovani, alla pari；r-bis=R bis 医疗机构聘用的护士 · Infermieri

