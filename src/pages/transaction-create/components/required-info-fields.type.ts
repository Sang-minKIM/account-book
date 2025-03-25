import { Dispatch } from 'react'

import { RequiredInfoAction } from './transaction-form.type'
import { RequiredInfo } from '~/queries/transaction/transaction.type'

export interface RequiredInfoProps {
  requiredInfo: RequiredInfo
  dispatchRequired: Dispatch<RequiredInfoAction>
}
