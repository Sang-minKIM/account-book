import { Category } from '../category'

export type PaymentType = 'income' | 'expense'

export interface Payment {
  id: string
  type: PaymentType
  amount: number
  from?: string
  to?: string
  memo?: string
  category: Category
  date: string
}
