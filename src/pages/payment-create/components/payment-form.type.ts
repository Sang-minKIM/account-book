import { Dispatch } from 'react'
import { RequiredInfo, OptionalInfo } from '~/queries/payment/payment.type'

type ActionType<T> = {
  [K in keyof T]: { type: `SET_${Uppercase<string & K>}`; payload: T[K] }
}[keyof T]

export type RequiredInfoAction = ActionType<RequiredInfo>
export type OptionalInfoAction = ActionType<OptionalInfo>
export interface PaymentFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  requiredInfo: RequiredInfo
  optionalInfo: OptionalInfo
  dispatchRequired: Dispatch<RequiredInfoAction>
  dispatchOptional: Dispatch<OptionalInfoAction>
}
