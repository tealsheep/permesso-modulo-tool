import type { Application } from '../data/application-schema'
import applicationTypes from '../../data/application-types.json' with { type: 'json' }

export const demoAsOf = '2026-11-05'
export type P1Code = '16' | '15' | '09' | '03'

/** Fictional identities and deliberately invalid example addresses/documents. */
export function exampleApplication(code: string, operation?: Application['application']['operation'], art27Letter: NonNullable<Application['application']['art27Letter']> = 'a'): Application {
  const type = applicationTypes.types.find((type) => type.code === code)
  if (!type) throw new Error(`缺少虚构样例类型：${code}`)
  const application: Application = {
    application: { code, operation: operation ?? (type.operations.includes('rinnovo') ? 'rinnovo' : type.operations[0]! as Application['application']['operation']),
      ...(code === '16' ? { expectedDurationMonths: 12 } : code === '15' ? { expectedDurationMonths: 24 } : {}),
      aggiornamentoReasons: code === '03' ? ['passaporto', 'foto'] : [], submissionTotalSheets: 12 },
    questura: { city: 'MILANO', province: 'MI' },
    person: { surname: 'Ésempio', givenNames: 'Fittìzio', sex: 'F', birthDate: '1990-01-31',
      birthCountry: 'CHN', citizenship: 'CHN', birthCity: 'Città Fittizia', maritalStatus: 'B', refugee: false },
    document: { kind: 'passport', number: 'DEMO00000', validUntil: '2030-01-01' },
    currentPermit: { number: 'DEMO0000000', typeCode: code === '03' ? '09' : code === '15' ? '15' : '16', validUntil: '2026-12-31' },
    address: { province: 'MI', comune: 'Esempia', street: 'Via Esempio', civic: { numero: '0', lettera: 'A' },
      cap: '00000', email: 'esempio_demo+kit@example.invalid', phoneMobile: { prefisso: '0000', numero: '000000000000' } },
    mailTo: null, childrenUnder14: [],
    work: { type: code === '15' ? 'autonomo' : 'subordinato', contract: 'determinato', contractMonths: 12,
      autonomoForm: code === '15' ? 'socio' : null, jobTitle: 'Attività Fittizia', hiredThisYear: true, contrattoSoggiornoStatus: 'same-employer' },
    employer: { kind: 'giuridica', name: 'Impresa Fittizia Esempio' },
    contrattoSoggiorno: { mode: 'sottoscritto', province: 'MI', date: '2026-01-01', raccomandata: { numero: '00000000000', controllo: '0' } },
    business: { name: 'Attività Fittizia', cciaaProvince: 'MI', cciaaNumber: 'DEMO0000', cciaaDate: '2020-01-01', albo: 'Registro Fittizio', alboDate: '2020-01-01' },
    income: { annualCents: 1234567, monthlyCents: 123456, lastTaxYear: 2025, taxForm: code === '15' ? 'unico-pf' : 'cud',
      bustaPaga: code !== '15', bollettinoInps: code === '15', autonomoStartedThisYear: code === '15' },
    family: { childrenEnteredWithFamilyVisa: false },
  }
  if (code === '09') {
    application.housing = { idoneita: { date: '2026-01-01', issuer: 'comune', province: 'MI', comuneOrAsl: 'Comune Fittizio' },
      pastResidences: [{ province: 'MI', comune: 'Esempia', street: 'Via Esempio' }],
      currentResidence: { province: 'MI', comune: 'Esempia', street: 'Via Esempio' } }
    application.childrenUnder14 = [{ surname: 'Esempio', givenNames: 'Minore Fittizio', sex: 'M', birthDate: '2020-02-29',
      birthCountry: 'CHN', citizenship: 'CHN', birthCity: 'Città Fittizia' }]
    application.dependents = { cohabitingCount: 2, children: true, childrenCount: 1, spouse: false, other: false }
  }
  if (!['16', '15', '09', '03'].includes(code)) {
    delete application.work; delete application.employer; delete application.contrattoSoggiorno; delete application.business
    application.currentPermit!.typeCode = ['11'].includes(code) ? '09' : ['13', '14', '24', '31'].includes(code) ? code : code === '30' ? '24' : '16'
    if (code === '04') application.application.aggiornamentoReasons = ['passaporto', 'foto']
    if (code === '13') { application.family!.sponsorPermitValidUntil = '2028-11-05'; application.application.expectedDurationMonths = 24 }
    if (code === '14') application.person!.birthDate = '2010-01-31'
    if (['24', '31', '30', '05'].includes(code)) application.application.expectedDurationMonths = 12
    if (['24', '31'].includes(code)) {
      application.study = { working: code === '24' }
      if (code === '24') {
        application.work = { type: 'subordinato', contract: 'determinato', contractMonths: 12, hiredThisYear: false, contrattoSoggiornoStatus: 'none' }
        application.employer = { kind: 'giuridica', name: 'Impresa Fittizia Esempio' }
      } else delete application.income
      if (application.application.operation === 'rilascio') {
        delete application.currentPermit
        application.visa = { entryDate: '2026-09-01', border: 'Confine Fittizio', number: 'DEMO0001', type: 'D', entries: 'multiple', notes: 'Studio', durationDays: 365, validFrom: '2026-09-01', validUntil: '2027-08-31' }
      }
    } else if (['30', '05'].includes(code)) application.employmentCentre = { registrationDate: '2026-10-01', province: 'MI', city: 'Esempia', circoscrizione: 'DEMO' }
    else delete application.income
  }
  if (code === '10') application.family!.sponsorKind = 'straniero'
  if (code === '18') {
    application.currentPermit!.typeCode = '18'
    application.application.expectedDurationMonths = 9
    application.work = { type: 'subordinato', contract: 'stagionale', contractMonths: 9, hiredThisYear: true, contrattoSoggiornoStatus: 'none' }
    application.employer = { kind: 'giuridica', name: 'Azienda Stagionale Fittizia' }
    application.income = { annualCents: 1234567, lastTaxYear: 2025, taxForm: 'cud', bustaPaga: true, monthlyCents: 123456 }
  }
  if (code === '21' || code === '06') application.application.expectedDurationMonths = 12
  if (code === '21') {
    application.income = { annualCents: 2345678, lastTaxYear: 2025, taxForm: 'unico-pf' }
    if (application.application.operation === 'rilascio') {
      delete application.currentPermit
      application.visa = { entryDate: '2026-09-01', border: 'Confine Fittizio', number: 'DEMO0001', type: 'D', entries: 'multiple', notes: 'Residenza', durationDays: 365, validFrom: '2026-09-01', validUntil: '2027-08-31' }
    } else application.currentPermit!.typeCode = '21'
  }
  if (code === '06' && application.application.operation === 'rinnovo') application.currentPermit!.typeCode = '06'
  if (code === '02') { application.person!.birthDate = '2010-01-31'; application.currentPermit!.typeCode = '02' }
  if (['32', '33', '19', '20', '27', '28', '29', '23', '07'].includes(code)) {
    application.currentPermit!.typeCode = code === '28' ? '27' : code
    application.application.expectedDurationMonths = 12
    if (['32', '33'].includes(code)) {
      application.person!.birthDate = '2010-01-31'
      application.study = { working: false }
    }
    if (['32', '33', '19', '20'].includes(code) && application.application.operation === 'rilascio') {
      delete application.currentPermit
      application.visa = { entryDate: '2026-09-01', border: 'Confine Fittizio', number: 'DEMO0001', type: 'D', entries: 'multiple', notes: 'Esempio Fittizio', durationDays: 365, validFrom: '2026-09-01', validUntil: '2027-08-31' }
    }
    if (['27', '29'].includes(code)) {
      application.work = { type: 'subordinato', contract: 'determinato', contractMonths: 12, hiredThisYear: false, contrattoSoggiornoStatus: 'none' }
      application.employer = { kind: 'giuridica', name: 'Istituto Fittizio Esempio' }
      application.income = { annualCents: 1234567, lastTaxYear: 2025, taxForm: 'cud' }
    }
    if (code === '28') application.employmentCentre = { registrationDate: '2026-10-01', province: 'MI', city: 'Esempia', circoscrizione: 'DEMO' }
    if (code === '07') {
      application.person!.refugee = true
      application.document = { kind: 'other', otherCode: '02', number: 'DEMO00000', validUntil: '2030-01-01', issuerCode: '03' }
    }
  }
  if (code === '17') {
    application.application.art27Letter = art27Letter
    application.application.expectedDurationMonths = 12
    application.currentPermit!.typeCode = '17'
    application.work = { type: 'subordinato', contract: 'determinato', contractMonths: 12, hiredThisYear: false, contrattoSoggiornoStatus: 'none' }
    application.employer = { kind: 'giuridica', name: 'Ente Fittizio Esempio' }
    application.income = { annualCents: 1234567, lastTaxYear: 2025, taxForm: 'cud' }
  }
  if (['30', '28'].includes(code)) delete application.application.expectedDurationMonths
  application.mailToDifferent = false
  return application
}
