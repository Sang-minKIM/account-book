import { useMemo } from 'react'
import { usePaymentsListQuery } from '~/queries/payment/payment-list.api'

export const usePaymentListViewModel = () => {
  const { data, isLoading } = usePaymentsListQuery()

  const sortedPaymentList = useMemo(() => {
    if (!data) return []

    return [...data].sort((a, b) => {
      return b.date.localeCompare(a.date)
    })
  }, [data])

  return {
    paymentList: sortedPaymentList,
    isLoading,
  }
}
