import { Container, Flex, IconButton, Text } from '@radix-ui/themes'
import { CalendarIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { usePaymentListViewModel } from './hooks/use-payment-list-view-model'
import { ROUTE } from '~/router'
import { IconLink } from '~/components'
import { DatePicker } from '~/components/calender'
import styled from 'styled-components'

export const PaymentList = () => {
  const { dailyPaymentList } = usePaymentListViewModel()

  return (
    <Container>
      <DatePicker />
      <Flex height="50px" align="center" justify="end" p="2">
        <IconLink to={ROUTE.payment.create}>
          <Pencil1Icon width="22" height="22" />
        </IconLink>
      </Flex>
      <Flex direction="column" gap="6">
        {dailyPaymentList.map(([date, payments]) => (
          <Flex key={date} direction="column" gap="4" px="6">
            <Text size="1" color="gray">
              {new Date(date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
            </Text>
            <Flex direction="column" gap="4">
              {payments.map((payment) => (
                <Flex key={payment.id} justify="start" align="center" gap="5">
                  <IconButton size="3" color="indigo" variant="soft" radius="full">
                    <CalendarIcon width={16} height={16} />
                  </IconButton>
                  <Flex direction="column">
                    <Pay type={payment.type} weight="medium">
                      {payment.type === 'expense' ? '-' : '+'}
                      {payment.amount.toLocaleString()}원
                    </Pay>
                    <Text size="1" color="gray">
                      {payment.type === 'expense' ? payment.to : payment.from}
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Container>
  )
}

const Pay = styled(Text)<{ type: 'expense' | 'income' }>`
  color: ${({ type }) => (type === 'expense' ? 'black' : 'blue')};
`
