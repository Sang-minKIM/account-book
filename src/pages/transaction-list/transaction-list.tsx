import { Container, Flex, Section } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { useTransactionListViewModel } from './hooks/use-transaction-list-view-model'
import { ROUTE } from '~/router'
import { IconLink } from '~/components/base'
import { Calendar } from '~/components/calendar'

import { DailyTransactionList } from './components/daily-transaction-list'
import { MonthlyTransaction } from './components/monthly-transaction'

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
          <Calendar
            getDailyTransaction={getDailyTransaction}
            year={year}
            month={month}
            day={day}
            dispatch={dispatchCalender}
          />
          <MonthlyTransaction monthlyIncome={monthlyIncome} monthlyExpense={monthlyExpense} />
        </Section>
        <Section width="50%" minWidth="300px">
          <DailyTransactionList dailyTransactionList={dailyTransactionList} />
        </Section>
      </Flex>
    </Container>
  )
}
