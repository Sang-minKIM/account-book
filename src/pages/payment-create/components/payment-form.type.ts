import { z } from 'zod'

const requiredInfoSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.number().positive(),
  payee: z.string().min(1),
  date: z.string().datetime(),
})

const optionalInfoSchema = z.object({
  category: z.string(),
  memo: z.string(),
})

export const paymentFormSchema = requiredInfoSchema.merge(optionalInfoSchema)

export type PaymentFormData = z.infer<typeof paymentFormSchema>
export type RequiredInfo = z.infer<typeof requiredInfoSchema>
export type OptionalInfo = z.infer<typeof optionalInfoSchema>

type ActionType<T> = {
  [K in keyof T]: { type: `SET_${Uppercase<string & K>}`; payload: T[K] }
}[keyof T]

export type RequiredInfoAction = ActionType<RequiredInfo>
export type OptionalInfoAction = ActionType<OptionalInfo>
