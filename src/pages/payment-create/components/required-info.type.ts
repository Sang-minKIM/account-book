import { Dispatch } from 'react'
import { RequiredInfoAction } from './payment-form.type'

import { RequiredInfo } from './payment-form.type'

export interface RequiredInfoProps {
  requiredInfo: RequiredInfo
  dispatchRequired: Dispatch<RequiredInfoAction>
}
