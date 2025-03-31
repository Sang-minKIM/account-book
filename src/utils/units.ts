import { WON_UNIT } from '~/constants/unit'

type TransactionAmountFormatArgs = {
  amount: number
  type: 'expense' | 'income'
  mode?: 'full' | 'short'
}

export function transactionAmountFormat({ amount, type, mode = 'short' }: TransactionAmountFormatArgs) {
  return `${type === 'expense' ? '-' : '+'}${amount.toLocaleString()}${mode === 'full' ? WON_UNIT : ''}`
}
