import { z } from 'zod'
import { TRANSACTION_TYPE } from '~/constants/transaction'
import { CategorySchema } from '../category'

const BaseTransactionSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  date: z.string(),
  category: CategorySchema,
  memo: z.string(),
})

const ExpenseSchema = BaseTransactionSchema.extend({
  type: z.literal(TRANSACTION_TYPE.EXPENSE),
  to: z.string(),
  from: z.null(),
})

const IncomeSchema = BaseTransactionSchema.extend({
  type: z.literal(TRANSACTION_TYPE.INCOME),
  from: z.string(),
  to: z.null(),
})

export const TransactionSchema = z.discriminatedUnion('type', [ExpenseSchema, IncomeSchema])

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
