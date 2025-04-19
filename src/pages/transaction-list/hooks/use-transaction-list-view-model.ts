import { useCallback, useMemo } from 'react'
import { DateState } from '~/components/calendar/hooks/use-calendar'
import { useCalendar } from '~/components/calendar/hooks/use-calendar'
import { SORT_ORDER } from '~/constants/query'

import { useTransactionListQuery, TransactionSchema } from '~/queries/transactions'
import { getSumOfTransactions } from '../services/get-sum-of-transactions'
import { dateFormat } from '~/utils/date'
import { z } from 'zod'
import { getNextMonthAndYear } from '~/components/calendar/utils/get-next-month-and-year'

type Transaction = z.infer<typeof TransactionSchema>

export const useTransactionListViewModel = () => {
  const { year, oneBasedMonth, dispatch: dispatchCalender } = useCalendar()
  const [yearOfNextMonth, nextMonth] = getNextMonthAndYear(year, oneBasedMonth)
  const { data } = useTransactionListQuery({
    sort: [{ column: 'date', order: SORT_ORDER.DESC }],
    filters: [
      { column: 'date', operator: 'gte', value: `${year}-${oneBasedMonth}-01` },
      { column: 'date', operator: 'lt', value: `${yearOfNextMonth}-${nextMonth}-01` },
    ],
  })

  const monthlyIncome = useMemo(() => getSumOfTransactions('income', data), [data])
  const monthlyExpense = useMemo(() => getSumOfTransactions('expense', data), [data])

  const dailyTransactionMap: Map<string, Transaction[]> = useMemo(
    () =>
      data?.reduce<Map<string, Transaction[]>>((map, transaction) => {
        const date = transaction.date.split('T')[0]
        if (!map.has(date)) {
          map.set(date, [])
        }
        map.get(date)!.push(transaction)
        return map
      }, new Map<string, Transaction[]>()),
    [data]
  )

  const dailyTransactionArray: [string, Transaction[]][] = dailyTransactionMap
    ? Array.from(dailyTransactionMap.entries()).map(([date, transactions]) => [dateFormat(date), transactions])
    : []

  const getDailyTransaction = useCallback(
    ({ type, year, oneBasedMonth, date }: Pick<Transaction, 'type'> & DateState) => {
      const dateKey = `${year}-${oneBasedMonth.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`
      const transactions = dailyTransactionMap.get(dateKey)
      return transactions ? getSumOfTransactions(type, transactions) : 0
    },
    [dailyTransactionMap]
  )

  return {
    dailyTransactionList: dailyTransactionArray,
    getDailyTransaction,
    year,
    oneBasedMonth,
    dispatchCalender,
    monthlyIncome,
    monthlyExpense,
  }
}
