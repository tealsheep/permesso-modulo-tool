import type { FieldValues } from '../engine/application'
import { italianMoney } from '../engine/italian-money'

/** All identities, addresses and receipt numbers are explicitly fictional. */
export const modulo2Values: FieldValues = {
  'M2-H01': 'ESEMPIO', 'M2-H02': 'RM', 'M2-004': true,
  'M2-039': { numero: '00000000000', controllo: '0' },
  'M2-053': { euro: '80', centesimi: '46' }, 'M2-062': { euro: '80', centesimi: '46' },
}

export const bollettinoValues: FieldValues = {
  ...Object.fromEntries([1, 2, 3].flatMap((copy) => [
    [`B-importo-${copy}`, { euro: '80', centesimi: '46' }],
    [`B-lettere-${copy}`, italianMoney(8046)],
    [`B-eseguito-${copy}`, 'ESEMPIO FITTIZIO'],
    [`B-residente-${copy}`, 'VIA ESEMPIO 0'],
  ])),
  'B-cap-3': '00000', 'B-localita-3': 'ESEMPIO',
}
