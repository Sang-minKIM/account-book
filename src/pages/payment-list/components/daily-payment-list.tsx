import { CalendarIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import styled from 'styled-components'
import { Payment } from '~/queries/payment'
import { dateFormat } from '~/utils/date'
import { paymentAmountFormat } from '~/utils/units'

export const DailyPaymentList = ({ dailyPaymentList }: { dailyPaymentList: [string, Payment[]][] }) => {
  return (
    <Flex direction="column" gap="6">
      {dailyPaymentList.map(([date, payments]) => (
        <Flex key={date} direction="column" gap="4" px="6">
          <Text size="1" color="gray">
            {dateFormat(date)}
          </Text>
          <Flex direction="column" gap="4">
            {payments.map((payment) => (
              <PaymentInfo key={payment.id} payment={payment} />
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

const PaymentInfo = ({ payment }: { payment: Payment }) => {
  return (
    <Flex justify="start" align="center" gap="5">
      <IconButton size="3" color="indigo" variant="soft" radius="full">
        <CalendarIcon width={16} height={16} />
      </IconButton>
      <Flex direction="column">
        <Pay type={payment.type} weight="medium">
          {paymentAmountFormat(payment.amount, payment.type, 'full')}
        </Pay>
        <Text size="1" color="gray">
          {payment.type === 'expense' ? payment.to : payment.from}
        </Text>
      </Flex>
    </Flex>
  )
}

const Pay = styled(Text)<{ type: 'expense' | 'income' }>`
  color: ${({ type }) => (type === 'expense' ? 'black' : 'blue')};
`
