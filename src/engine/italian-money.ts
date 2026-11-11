const units = ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci',
  'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove']
const tens = ['', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta']

function underThousand(value: number): string {
  if (value < 20) return units[value]!
  if (value < 100) {
    const unit = value % 10
    const ten = tens[Math.floor(value / 10)]!
    return (unit === 1 || unit === 8 ? ten.slice(0, -1) : ten) + (unit === 0 ? '' : units[unit]!)
  }
  const rest = value % 100
  const hundred = (value < 200 ? '' : units[Math.floor(value / 100)]!) + 'cento'
  return (rest === 8 || (rest >= 80 && rest < 90) ? hundred.slice(0, -1) : hundred) +
    (rest === 0 ? '' : underThousand(rest))
}

/** Integer cents avoid floating point rounding. Conventional unaccented bollettino text. */
export function italianMoney(cents: number): string {
  if (!Number.isSafeInteger(cents) || cents < 0 || cents > 99_999_999) {
    throw new RangeError('金额必须是 0 至 99999999 的整数分')
  }
  const euros = Math.floor(cents / 100)
  const thousands = Math.floor(euros / 1000)
  const rest = euros % 1000
  const words = thousands === 0 ? underThousand(rest) :
    (thousands === 1 ? 'mille' : underThousand(thousands) + 'mila') + (rest ? underThousand(rest) : '')
  return `${words.toUpperCase()}/${String(cents % 100).padStart(2, '0')}`
}
