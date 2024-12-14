import { Container, Flex, Section, Text } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { usePaymentListViewModel } from './hooks/use-payment-list-view-model.ts'
import { ROUTE } from '~/router'
import { IconLink } from '~/components'

import { DailyPaymentList } from './components/daily-payment-list'
import { Calender } from '~/components/calender'
import { paymentAmountFormat } from '~/utils/units'

export const PaymentList = () => {
  const { dailyPaymentList, getDailyPayment, allIncome, allExpense, year, month, day, dispatchCalender } =
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
          <Flex justify="center" align="center" gap="2">
            <Text size="4" weight="bold" align="center" color="blue">
              {paymentAmountFormat(allIncome, 'income', 'full')}
            </Text>
            <Text size="3" weight="bold" align="center">
              받고
            </Text>
            <Text size="4" weight="bold" align="center" color="red">
              {paymentAmountFormat(allExpense, 'expense', 'full')}
            </Text>
            <Text size="3" weight="bold" align="center">
              썼어요
            </Text>
          </Flex>
        </Section>
        <Section width="50%" minWidth="300px">
          <DailyPaymentList dailyPaymentList={dailyPaymentList} />
        </Section>
      </Flex>
    </Container>
  )
}
