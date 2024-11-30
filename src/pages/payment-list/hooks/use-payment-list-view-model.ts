import { useState } from 'react'

import { usePaymentsListQuery } from '~/queries/payment'
import { SortOrder } from '~/queries/payment/payment-list.types'

export const usePaymentListViewModel = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const { data } = usePaymentsListQuery(sortOrder)

  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
  }

  return {
    paymentList: data || [],
    toggleSort,
    sortOrder,
  }
}
