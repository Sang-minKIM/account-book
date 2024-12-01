import { useState } from 'react'
import { SORT_ORDER } from '~/constants/query'

import { usePaymentsListQuery } from '~/queries/payment'
import { SortOrder } from '~/types/query.type'

export const usePaymentListViewModel = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER.DESC)
  const { data } = usePaymentsListQuery(sortOrder)

  const toggleSort = () => {
    setSortOrder((prev) => (prev === SORT_ORDER.DESC ? SORT_ORDER.ASC : SORT_ORDER.DESC))
  }

  return {
    paymentList: data || [],
    toggleSort,
    sortOrder,
  }
}
