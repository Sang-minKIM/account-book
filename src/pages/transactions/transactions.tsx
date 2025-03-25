import { Flex } from '@radix-ui/themes'
import { TransactionCreateForm, TransactionListTable } from './components'

export const Transactions = () => {
  return (
    <Flex height="100%" direction="column" gap="5">
      <TransactionListTable />
      <TransactionCreateForm />
    </Flex>
  )
}
