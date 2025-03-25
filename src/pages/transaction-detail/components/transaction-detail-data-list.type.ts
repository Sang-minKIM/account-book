export interface TransactionDetailDataListProps {
  type: 'expense' | 'income'
  amount: number
  payee: string
  memo: string
  category: string
  date: string
}
