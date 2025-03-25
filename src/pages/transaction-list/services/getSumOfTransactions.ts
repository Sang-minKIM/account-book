import { Transaction, RequiredInfo } from '~/queries/transactions'

export const getSumOfTransactions = (type: RequiredInfo['type'], transactions: Transaction[]) => {
  return transactions.reduce((sum, transaction) => {
    if (transaction.type === type) {
      return sum + transaction.amount
    }
    return sum
  }, 0)
}
