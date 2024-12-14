import { useCallback, useMemo } from 'react'
import { DateState } from '~/components/calender/calender.type'
import { useCalender } from '~/components/calender/hooks/use-calender'
import { SORT_ORDER } from '~/constants/query'

import { Payment, RequiredInfo, usePaymentsListQuery } from '~/queries/payment'
import { toNumber } from '~/utils/number'
import { getSumOfPayments } from '../services/getSumOfPayments'

export const usePaymentListViewModel = () => {
  const { year, month, day, dispatch: dispatchCalender } = useCalender()
  const { data } = usePaymentsListQuery(toNumber(year), toNumber(month) + 1, SORT_ORDER.DESC)

  const allIncome = useMemo(() => getSumOfPayments('income', data), [data])
  const allExpense = useMemo(() => getSumOfPayments('expense', data), [data])

  const dailyPaymentMap = useMemo(
    () =>
      data?.reduce<Map<string, Payment[]>>((map, payment) => {
        const date = payment.date.split('T')[0]
        if (!map.has(date)) {
          map.set(date, [])
        }
        map.get(date)!.push(payment)
        return map
      }, new Map<string, Payment[]>()),
    [data]
  )

  // Map을 배열로 변환합니다.
  const dailyPaymentArray = dailyPaymentMap ? Array.from(dailyPaymentMap.entries()) : []

  const getDailyPayment = useCallback(
    ({ type, year, month, day }: Pick<RequiredInfo, 'type'> & DateState) => {
      const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      const payments = dailyPaymentMap.get(date)
      return payments ? getSumOfPayments(type, payments) : 0
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
    allIncome,
    allExpense,
  }
}
