import { Container, Flex, Section, Text } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { useTransactionListViewModel } from './hooks/use-transaction-list-view-model'
import { ROUTE } from '~/router'
import { IconLink } from '~/components/base'
import { Calendar } from '~/components/calendar'

import { DailyTransactionList } from './components/daily-transaction-list'
import { MonthlyTransaction } from './components/monthly-transaction'
import { DateCell } from '~/components/calendar/date-cell'
import { ACTION_TYPE } from '~/components/calendar/hooks/use-calendar'
import { DateCellDef } from '~/components/calendar/types'
import { transactionAmountFormat } from '~/utils/units'
import { useMemo } from 'react'

export const TransactionList = () => {
  const {
    dailyTransactionList,
    getDailyTransaction,
    monthlyIncome,
    monthlyExpense,
    year,
    oneBasedMonth,
    dispatchCalender,
  } = useTransactionListViewModel()

  const dateCells: DateCellDef = useMemo(() => {
    return {
      prevMonthDate: ({ date }) => {
        return <DateCell date={date} disabled />
      },
      currentMonthDate: ({ date, oneBasedMonth, year }) => {
        const expense = getDailyTransaction({ type: 'expense', year, oneBasedMonth, date })
        const income = getDailyTransaction({ type: 'income', year, oneBasedMonth, date })
        return (
          <DateCell date={date} color="gray" variant="soft">
            {income > 0 && (
              <Text size="1" color="blue">
                {transactionAmountFormat({ amount: income, type: 'income' })}
              </Text>
            )}
            {expense > 0 && (
              <Text size="1" color="red">
                {transactionAmountFormat({ amount: expense, type: 'expense' })}
              </Text>
            )}
          </DateCell>
        )
      },
      nextMonthDate: ({ date }) => {
        return <DateCell date={date} disabled />
      },
    }
  }, [getDailyTransaction])

  return (
    <Container>
      <Flex height="50px" align="center" justify="end" p="2">
        <IconLink to={ROUTE.calendar.create}>
          <Pencil1Icon width="22" height="22" />
        </IconLink>
      </Flex>
      <Flex justify="between" gap="9" height="calc(100dvh - 50px)">
        <Section width="50%" minWidth="300px">
          <Calendar year={year} oneBasedMonth={oneBasedMonth}>
            <Calendar.Header
              onPrevMonthClick={() => dispatchCalender({ type: ACTION_TYPE.SET_PREV_MONTH })}
              onNextMonthClick={() => dispatchCalender({ type: ACTION_TYPE.SET_NEXT_MONTH })}
            />
            <Calendar.Body dateCells={dateCells} />
          </Calendar>
          <MonthlyTransaction monthlyIncome={monthlyIncome} monthlyExpense={monthlyExpense} />
        </Section>
        <Section width="50%" minWidth="300px">
          <DailyTransactionList dailyTransactionList={dailyTransactionList} />
        </Section>
      </Flex>
    </Container>
  )
}
