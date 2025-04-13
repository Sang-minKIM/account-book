import { useCallback, useMemo } from 'react'
import { DateState } from '~/components/calender/calender.type'
import { useCalender } from '~/components/calender/hooks/use-calender'
import { SORT_ORDER } from '~/constants/query'

import { useTransactionListQuery, TransactionSchema } from '~/queries/transactions'
import { getSumOfTransactions } from '../services/get-sum-of-transactions'
import { dateFormat } from '~/utils/date'
import { z } from 'zod'

type Transaction = z.infer<typeof TransactionSchema>

export const useTransactionListViewModel = () => {
  const { year, month, day, dispatch: dispatchCalender } = useCalender()
  const { data } = useTransactionListQuery({
    sort: [{ column: 'date', order: SORT_ORDER.DESC }],
    filters: [
      { column: 'date', operator: 'gte', value: `${year}-${month + 1}-01` },
      { column: 'date', operator: 'lte', value: `${year}-${month + 1}-${day}` },
    ],
  })

  const monthlyIncome = useMemo(() => getSumOfTransactions('income', data), [data])
  const monthlyExpense = useMemo(() => getSumOfTransactions('expense', data), [data])

  const dailyTransactionMap = useMemo(
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

  const dailyTransactionArray = dailyTransactionMap
    ? Array.from(dailyTransactionMap.entries()).map(([date, transactions]) => [dateFormat(date), transactions])
    : []

  const getDailyTransaction = useCallback(
    ({ type, year, month, day }: Pick<Transaction, 'type'> & DateState) => {
      const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      const transactions = dailyTransactionMap.get(date)
      return transactions ? getSumOfTransactions(type, transactions) : 0
    },
    [dailyTransactionMap]
  )

  return {
    dailyTransactionList: dailyTransactionArray,
    getDailyTransaction,
    year,
    month,
    day,
    dispatchCalender,
    monthlyIncome,
    monthlyExpense,
  }
}
