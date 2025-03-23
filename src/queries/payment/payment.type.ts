import { z } from 'zod'
import { CategoryResponse } from '../category'
import { PAYMENT_TYPE } from '~/constants/payment'

type ExpensePayment = {
  type: typeof PAYMENT_TYPE.EXPENSE
  from?: string
  to: string
}

type IncomePayment = {
  type: typeof PAYMENT_TYPE.INCOME
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
  type: z.enum([PAYMENT_TYPE.INCOME, PAYMENT_TYPE.EXPENSE]),
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

// FIXME: 스키마 타입 단순화 필요. 위의 타입들 추후 없애기
// 기본적으로 상태로 다룰 타입을 스키마로 정의하고 실제 요청 타입은 스키마를 확장하여 정의 => 그래야 유효성 검사 쉬워짐
export const paymentCreateSchema = z.object({
  type: z.enum([PAYMENT_TYPE.INCOME, PAYMENT_TYPE.EXPENSE]),
  amount: z.number().positive().max(1000000000, '너무 큰 금액입니다.').min(1, '최소 1원 이상 입력해주세요'),
  payee: z.string().min(1, '필수 입력 항목입니다.'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, '올바른 날짜를 입력해주세요'),
  category: z.number().min(1),
  memo: z.string().max(60, '최대 60자까지 입력 가능합니다.'),
})
