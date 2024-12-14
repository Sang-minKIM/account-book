import { useCallback } from 'react'
import { DateState } from '~/components/calender/calender.type'
import { useCalender } from '~/components/calender/hooks/use-calender'
import { SORT_ORDER } from '~/constants/query'

import { Payment, RequiredInfo, usePaymentsListQuery } from '~/queries/payment'
import { toNumber } from '~/utils/number'

export const usePaymentListViewModel = () => {
  const { year, month, day, dispatch: dispatchCalender } = useCalender()
  const { data } = usePaymentsListQuery(toNumber(year), toNumber(month) + 1, SORT_ORDER.DESC)

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

  const getDailyPayment = useCallback(
    ({ type, year, month, day }: Pick<RequiredInfo, 'type'> & DateState) => {
      const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      const payments = dailyPaymentMap.get(date)
      return payments
        ? payments.reduce((sum, payment) => {
            if (payment.type === type) {
              return sum + payment.amount
            }
            return sum
          }, 0)
        : 0
    },
    [dailyPaymentMap]
  )

  return {
    dailyPaymentList: dailyPaymentArray,
    getDailyPayment,
    year,
    month,
    day,
    dispatchCalender,
  }
}
