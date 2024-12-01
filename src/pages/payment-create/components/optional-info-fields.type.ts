import { Dispatch } from 'react'
import { OptionalInfoAction } from './payment-form.type'

import { OptionalInfo } from '~/queries/payment/payment.type'

export interface OptionalInfoProps {
  optionalInfo: OptionalInfo
  dispatchOptional: Dispatch<OptionalInfoAction>
}
