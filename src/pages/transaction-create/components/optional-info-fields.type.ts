import { Dispatch } from 'react'
import { OptionalInfoAction } from './transaction-form.type'

import { OptionalInfo } from '~/queries/transaction/transaction.type'

export interface OptionalInfoProps {
  optionalInfo: OptionalInfo
  dispatchOptional: Dispatch<OptionalInfoAction>
}
