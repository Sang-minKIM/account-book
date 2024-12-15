import { CalendarIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { Payment } from '~/queries/payment'
import { paymentAmountFormat } from '~/utils/units'
import { ROUTE } from '~/router'
import { useNavigate } from 'react-router-dom'

export const DailyPaymentList = ({ dailyPaymentList }: { dailyPaymentList: [string, Payment[]][] }) => {
  return (
    <Flex direction="column" gap="6">
      {dailyPaymentList.map(([date, payments]) => (
        <Flex key={date} direction="column" gap="4" px="6">
          <Text size="1" color="gray">
            {date}
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
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(ROUTE.payment.detail(payment.id))
  }

  return (
    <Flex justify="start" align="center" gap="5" onClick={handleClick}>
      <IconButton size="3" color="indigo" variant="soft" radius="full">
        <CalendarIcon width={16} height={16} />
      </IconButton>
      <Flex direction="column">
        <Text weight="medium" color={payment.type === 'expense' ? undefined : 'blue'}>
          {paymentAmountFormat(payment.amount, payment.type, 'full')}
        </Text>
        <Text size="1" color="gray">
          {payment.type === 'expense' ? payment.to : payment.from}
        </Text>
      </Flex>
    </Flex>
  )
}
