import { z } from 'zod'
import { CategoryResponse } from '../category'

type ExpensePayment = {
  type: 'expense'
  from?: string
  to: string
}

type IncomePayment = {
  type: 'income'
  from: string
  to?: string
}
export type Payment = {
  id: string
  amount: number
  memo: string
  category: CategoryResponse
  date: string
} & (ExpensePayment | IncomePayment)

const requiredInfoSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.number().positive().max(1000000000, '너무 큰 금액입니다.'),
  payee: z.string().min(1, '필수 입력 항목입니다.'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, '올바른 날짜를 입력해주세요'),
})

const optionalInfoSchema = z.object({
  category: z.number().min(1),
  memo: z.string(),
})

export const paymentFormSchema = requiredInfoSchema.merge(optionalInfoSchema)

export type PaymentFormData = z.infer<typeof paymentFormSchema>
export type RequiredInfo = z.infer<typeof requiredInfoSchema>
export type OptionalInfo = z.infer<typeof optionalInfoSchema>

type PaymentBaseType = Omit<RequiredInfo, 'payee'> & OptionalInfo

export interface PaymentMutationPayload extends PaymentBaseType {
  from?: string
  to?: string
}
