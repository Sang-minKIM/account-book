import { Container, Flex, Section } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { useTransactionListViewModel } from './hooks/use-transaction-list-view-model'
import { ROUTE } from '~/router'
import { IconLink } from '~/components/base'
import { Calendar } from '~/components/calendar'

import { DailyTransactionList } from './components/daily-transaction-list'
import { MonthlyTransaction } from './components/monthly-transaction'
import { DateCell } from '~/components/calendar/date-cell'
import { ACTION_TYPE } from '~/components/calendar/hooks/use-calendar'
import { DateCellDef } from '~/components/calendar/calendar-body'

export const TransactionList = () => {
  const {
    dailyTransactionList,
    getDailyTransaction,
    monthlyIncome,
    monthlyExpense,
    year,
    month,
    day,
    dispatchCalender,
  } = useTransactionListViewModel()

  return (
    <Container>
      <Flex height="50px" align="center" justify="end" p="2">
        <IconLink to={ROUTE.calendar.create}>
          <Pencil1Icon width="22" height="22" />
        </IconLink>
      </Flex>
      <Flex justify="between" gap="9" height="calc(100dvh - 50px)">
        <Section width="50%" minWidth="300px">
          <Calendar year={year} month={month}>
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

const dateCells: DateCellDef = {
  prevMonthDate: ({ date }) => {
    return <DateCell date={date} disabled />
  },
  currentMonthDate: ({ date, day }) => {
    const color = (() => {
      switch (day) {
        case '일':
          return 'red'
        case '토':
          return 'blue'
        default:
          return 'gray'
      }
    })()
    return <DateCell date={date} color={color} variant="soft" />
  },
  nextMonthDate: ({ date }) => {
    return <DateCell date={date} disabled />
  },
}
