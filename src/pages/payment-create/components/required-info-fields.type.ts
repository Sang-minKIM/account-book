import { Dispatch } from 'react'

import { RequiredInfoAction } from './payment-form.type'
import { RequiredInfo } from '~/queries/payment/payment.type'

export interface RequiredInfoProps {
  requiredInfo: RequiredInfo
  dispatchRequired: Dispatch<RequiredInfoAction>
}
