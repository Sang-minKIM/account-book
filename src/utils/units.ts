import { WON_UNIT } from '~/constants/unit'

export function paymentAmountFormat(amount: number, type: 'expense' | 'income', mode: 'full' | 'short') {
  return `${type === 'expense' ? '-' : '+'}${amount.toLocaleString()}${mode === 'full' ? WON_UNIT : ''}`
}
