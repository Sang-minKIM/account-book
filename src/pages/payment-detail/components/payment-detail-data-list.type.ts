export interface PaymentDetailDataListProps {
  type: 'expense' | 'income'
  amount: number
  payee: string
  memo: string
  category: string
  date: string
}
