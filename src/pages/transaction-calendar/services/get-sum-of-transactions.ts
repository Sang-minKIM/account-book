import { z } from 'zod'

import { TransactionSchema } from '~/queries/transactions'

type Transaction = z.infer<typeof TransactionSchema>

export const getSumOfTransactions = (type: Transaction['type'], transactions: Transaction[]) => {
  return transactions.reduce((sum, transaction) => {
    if (transaction.type === type) {
      return sum + transaction.amount
    }
    return sum
  }, 0)
}
