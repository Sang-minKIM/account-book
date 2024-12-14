import { Container, Flex, Section } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { usePaymentListViewModel } from './hooks/use-payment-list-view-model.ts'
import { ROUTE } from '~/router'
import { IconLink } from '~/components'
import { Calender } from '~/components/calender'

import { DailyPaymentList } from './components/daily-payment-list'
import { MonthlyPayment } from './components/monthly-payment'

export const PaymentList = () => {
  const { dailyPaymentList, getDailyPayment, monthlyIncome, monthlyExpense, year, month, day, dispatchCalender } =
    usePaymentListViewModel()

  return (
    <Container>
      <Flex height="50px" align="center" justify="end" p="2">
        <IconLink to={ROUTE.payment.create}>
          <Pencil1Icon width="22" height="22" />
        </IconLink>
      </Flex>
      <Flex justify="between" gap="9" height="calc(100dvh - 50px)">
        <Section width="50%" minWidth="300px">
          <Calender getDailyPayment={getDailyPayment} year={year} month={month} day={day} dispatch={dispatchCalender} />
          <MonthlyPayment monthlyIncome={monthlyIncome} monthlyExpense={monthlyExpense} />
        </Section>
        <Section width="50%" minWidth="300px">
          <DailyPaymentList dailyPaymentList={dailyPaymentList} />
        </Section>
      </Flex>
    </Container>
  )
}
