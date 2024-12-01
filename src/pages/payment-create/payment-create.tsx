import { Flex, Heading } from '@radix-ui/themes'
import { PaymentForm } from './components/payment-form'

export const PaymentCreate = () => {
  return (
    <Flex direction="column" gap="4">
      <Heading>거래내역 추가하기</Heading>
      <PaymentForm />
    </Flex>
  )
}
