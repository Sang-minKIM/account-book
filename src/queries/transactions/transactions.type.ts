import { z } from 'zod'
import { CategoryResponse } from '../category'
import { TRANSACTION_TYPE } from '~/constants/transaction'

type ExpenseTransaction = {
  type: typeof TRANSACTION_TYPE.EXPENSE
  from?: string
  to: string
}

type IncomeTransaction = {
  type: typeof TRANSACTION_TYPE.INCOME
  from: string
  to?: string
}
export type Transaction = {
  id: string
  amount: number
  memo: string
  category: CategoryResponse
  date: string
} & (ExpenseTransaction | IncomeTransaction)

const requiredInfoSchema = z.object({
  type: z.enum([TRANSACTION_TYPE.INCOME, TRANSACTION_TYPE.EXPENSE]),
  amount: z.number().positive().max(1000000000, '너무 큰 금액입니다.'),
  payee: z.string().min(1, '필수 입력 항목입니다.'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, '올바른 날짜를 입력해주세요'),
})

const optionalInfoSchema = z.object({
  category: z.number().min(1),
  memo: z.string(),
})

export const transactionFormSchema = requiredInfoSchema.merge(optionalInfoSchema)

export type TransactionFormData = z.infer<typeof transactionFormSchema>
export type RequiredInfo = z.infer<typeof requiredInfoSchema>
export type OptionalInfo = z.infer<typeof optionalInfoSchema>

// FIXME: 스키마 타입 단순화 필요. 위의 타입들 추후 없애기
// 기본적으로 요청에 보낼 타입을 스키마로 정의하고 각 컴포넌트의 상태는 infer로 다루기. 유효성 검사할 때는 요청 타입에 맞게 변환 필요
const BaseTransactionCreateSchema = z.object({
  amount: z.number().positive().max(1000000000, '너무 큰 금액입니다.').min(1, '최소 1원 이상 입력해주세요'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, '올바른 날짜를 입력해주세요'),
  category: z.number().min(1),
  memo: z.string().max(60, '최대 60자까지 입력 가능합니다.'),
})

const ExpenseCreateSchema = BaseTransactionCreateSchema.extend({
  type: z.literal(TRANSACTION_TYPE.EXPENSE),
  to: z.string().min(1, '필수 입력 항목입니다.'),
})

const IncomeCreateSchema = BaseTransactionCreateSchema.extend({
  type: z.literal(TRANSACTION_TYPE.INCOME),
  from: z.string().min(1, '필수 입력 항목입니다.'),
})

export const TransactionCreateSchema = z.discriminatedUnion('type', [ExpenseCreateSchema, IncomeCreateSchema])

export const TransactionUpdateSchema = z.object({
  type: z.enum([TRANSACTION_TYPE.INCOME, TRANSACTION_TYPE.EXPENSE]).optional(),
  amount: z.number().max(1000000000, '너무 큰 금액입니다.').min(1, '최소 1원 이상 입력해주세요').optional(),
  from: z.string().min(1, '필수 항목 입니다.').optional(),
  to: z.string().min(1, '필수 항목 입니다.').optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}/, '올바른 날짜를 입력해주세요')
    .optional(),
  category: z.number().min(1).optional(),
  memo: z.string().max(60, '최대 60자까지 입력 가능합니다.').optional(),
})
