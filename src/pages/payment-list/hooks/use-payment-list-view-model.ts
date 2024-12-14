import { useState } from 'react'
import { DateState } from '~/components/calender/calender.type'
import { SORT_ORDER } from '~/constants/query'

import { Payment, RequiredInfo, usePaymentsListQuery } from '~/queries/payment'
import { SortOrder } from '~/types/query.type'

export const usePaymentListViewModel = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER.DESC)
  const { data } = usePaymentsListQuery(sortOrder)

  const dailyPaymentMap = data?.reduce<Map<string, Payment[]>>((map, payment) => {
    const date = payment.date.split('T')[0]
    if (!map.has(date)) {
      map.set(date, [])
    }
    map.get(date)!.push(payment)
    return map
  }, new Map<string, Payment[]>())

  // Map을 배열로 변환합니다.
  const dailyPaymentArray = dailyPaymentMap ? Array.from(dailyPaymentMap.entries()) : []

  const toggleSort = () => {
    setSortOrder((prev) => (prev === SORT_ORDER.DESC ? SORT_ORDER.ASC : SORT_ORDER.DESC))
  }

  const getDailyPayment = ({ type, year, month, day }: Pick<RequiredInfo, 'type'> & DateState) => {
    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    const payments = dailyPaymentMap.get(date)
    return payments
      ? payments.reduce((sum, payment) => {
          if (payment.type === type) {
            return sum + payment.amount
          }
          return sum
        }, 0)
      : ''
  }

  return {
    paymentList: data || [],
    dailyPaymentList: dailyPaymentArray,
    toggleSort,
    sortOrder,
    getDailyPayment,
  }
}
