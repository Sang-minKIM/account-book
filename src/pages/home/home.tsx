import { Flex } from '@radix-ui/themes'
import { PaymentCreateForm, PaymentListTable } from './components'

export const Home = () => {
  return (
    <Flex height="100%" direction="column" gap="5">
      <PaymentListTable />
      <PaymentCreateForm />
    </Flex>
  )
}
