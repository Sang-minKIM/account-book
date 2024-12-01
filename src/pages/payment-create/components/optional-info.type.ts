import { Dispatch } from 'react'
import { OptionalInfoAction } from './payment-form.type'

import { OptionalInfo } from './payment-form.type'

export interface OptionalInfoProps {
  optionalInfo: OptionalInfo
  dispatchOptional: Dispatch<OptionalInfoAction>
}
