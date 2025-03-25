import { CalendarIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { Transaction } from '~/queries/transactions'
import { transactionAmountFormat } from '~/utils/units'
import { ROUTE } from '~/router'
import { useNavigate } from 'react-router-dom'

export const DailyTransactionList = ({ dailyTransactionList }: { dailyTransactionList: [string, Transaction[]] }) => {
  return (
    <Flex direction="column" gap="6">
      {dailyTransactionList.map(([date, transactions]) => (
        <Flex key={date} direction="column" gap="4" px="6">
          <Text size="1" color="gray">
            {date}
          </Text>
          <Flex direction="column" gap="4">
            {transactions.map((transaction) => (
              <TransactionInfo key={transaction.id} transaction={transaction} />
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

const TransactionInfo = ({ transaction }: { transaction: Transaction }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(ROUTE.transaction.detail(transaction.id))
  }

  return (
    <Flex justify="start" align="center" gap="5" onClick={handleClick}>
      <IconButton size="3" color="indigo" variant="soft" radius="full">
        <CalendarIcon width={16} height={16} />
      </IconButton>
      <Flex direction="column">
        <Text weight="medium" color={transaction.type === 'expense' ? undefined : 'blue'}>
          {transactionAmountFormat(transaction.amount, transaction.type, 'full')}
        </Text>
        <Text size="1" color="gray">
          {transaction.type === 'expense' ? transaction.to : transaction.from}
        </Text>
      </Flex>
    </Flex>
  )
}
