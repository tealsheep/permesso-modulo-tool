import { z } from 'zod'
import { isoDateSchema, maritalStatusSchema, operationSchema, sexSchema } from './schemas'
import { migrateLegacyWork } from './application-migration'

// Draft values remain unchanged. Required-question checks belong to the questionnaire.
const text = z.string().nullish()
const date = z.union([isoDateSchema, z.literal('')]).nullish()
const flag = z.boolean().nullish()
const count = z.number().int().nonnegative().nullish()
// Upper bounds follow the paper boxes: annual income M2-053 has 8 euro boxes, monthly M2-062 has 6.
export const moneyLimits = { 'income.annualCents': 9_999_999_999, 'income.monthlyCents': 99_999_999 } as const
const amount = (max: number) => z.number().int().nonnegative().max(max).nullish()
const named = z.strictObject({ numero: text, lettera: text }).nullish()
const phone = z.strictObject({ prefisso: text, numero: text }).nullish()
const residence = z.strictObject({ province: text, comune: text, street: text })
const address = {
  province: text, comune: text, street: text, civic: named, scala: text, interno: text, cap: text,
}
const familyPerson = {
  surname: text, givenNames: text, sex: sexSchema.nullish(), birthDate: date,
  birthCountry: text, citizenship: text, birthCity: text,
}
export const applicationSchema = z.strictObject({
  application: z.strictObject({
    art27Letter: z.enum(['a', 'b', 'c', 'd', 'e', 'f', 'i', 'm', 'n', 'o', 'p', 'q', 'r', 'r-bis']).nullish(),
    code: z.string().regex(/^\d{2}$/), operation: operationSchema,
    expectedDurationMonths: z.number().int().positive().nullish(),
    aggiornamentoReasons: z.array(z.enum(['domicilio', 'stato-civile', 'figli-nati-italia', 'figli-ingresso', 'passaporto', 'anagrafica', 'foto'])).nullish(),
    submissionTotalSheets: count,
  }),
  questura: z.strictObject({ city: text, province: text }).nullish(),
  person: z.strictObject({ ...familyPerson, maritalStatus: maritalStatusSchema.nullish(), codiceFiscale: text, refugee: flag }).nullish(),
  document: z.strictObject({ kind: z.enum(['passport', 'other']).nullish(), otherCode: text, otherName: text, number: text, validUntil: date, issuerCode: text }).nullish(),
  currentPermit: z.strictObject({ number: text, typeCode: text, validUntil: date }).nullish(),
  address: z.strictObject({ ...address, email: text, phoneFixed: phone, phoneMobile: phone }).nullish(),
  mailTo: z.strictObject({ ...address, presso: text }).nullish(),
  mailToDifferent: flag,
  housing: z.strictObject({
    idoneita: z.strictObject({ date, issuer: z.enum(['comune', 'asl']).nullish(), province: text, comuneOrAsl: text }).nullish(),
    pastResidences: z.array(residence).max(4).nullish(), currentResidence: residence.nullish(),
  }).nullish(),
  relatedApplication: z.strictObject({ spouse: flag, parent: flag }).nullish(),
  dependents: z.strictObject({ cohabitingCount: count, spouse: flag, children: flag, childrenCount: count, other: flag, otherRelation: text }).nullish(),
  spouse: z.strictObject(familyPerson).nullish(),
  childrenUnder14: z.array(z.strictObject(familyPerson)).max(5).nullish(),
  work: z.preprocess(migrateLegacyWork, z.strictObject({
    type: z.enum(['subordinato', 'autonomo', 'altro']).nullish(),
    contract: z.enum(['indeterminato', 'determinato', 'stagionale', 'altro']).nullish(),
    contractMonths: z.number().int().positive().nullish(), contractDays: count, contractOther: text,
    autonomoForm: z.enum(['titolare', 'socio', 'libero', 'altro']).nullish(), jobTitle: text,
    hiredThisYear: flag, contrattoSoggiornoStatus: z.enum(['none', 'same-employer', 'changed']).nullish(),
  }).nullish()),
  employer: z.strictObject({ kind: z.enum(['giuridica', 'fisica']).nullish(), name: text, codiceFiscale: text,
    partitaIva: text, inps: text, permitNumber: text, surname: text, givenNames: text, birthDate: date }).nullish(),
  contrattoSoggiorno: z.strictObject({ mode: z.enum(['sottoscritto', 'inviato']).nullish(), province: text, date,
    raccomandata: z.strictObject({ numero: text, controllo: text }).nullish() }).nullish(),
  business: z.strictObject({ name: text, codiceFiscale: text, partitaIva: text, inps: text,
    cciaaProvince: text, cciaaNumber: text, cciaaDate: date, albo: text, alboDate: date }).nullish(),
  income: z.strictObject({ annualCents: amount(moneyLimits['income.annualCents']), lastTaxYear: count,
    taxForm: z.enum(['unico-pf', 'unico-sp', 'unico-sc', 'unico-enc', 'cud']).nullish(),
    bustaPaga: flag, bollettinoInps: flag, monthlyCents: amount(moneyLimits['income.monthlyCents']), autonomoStartedThisYear: flag }).nullish(),
  family: z.strictObject({ childrenEnteredWithFamilyVisa: flag, sponsorPermitValidUntil: date, sponsorKind: z.enum(['straniero', 'italiano-ue', 'rifugiato']).nullish() }).nullish(),
  visa: z.strictObject({ entryDate: date, border: text, number: text, type: text,
    entries: z.enum(['single', 'multiple']).nullish(), notes: text, durationDays: count,
    validFrom: date, validUntil: date }).nullish(),
  employmentCentre: z.strictObject({ registrationDate: date, province: text, city: text, circoscrizione: text }).nullish(),
  study: z.strictObject({ working: flag }).nullish(),
})

export type Application = z.infer<typeof applicationSchema>
