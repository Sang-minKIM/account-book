import { CalendarIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { TransactionSchema } from '~/queries/transactions'
import { transactionAmountFormat } from '~/utils/units'
import { ROUTE } from '~/router'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

type Transaction = z.infer<typeof TransactionSchema>

interface DailyTransactionListProps {
  dailyTransactionList: [string, Transaction[]][]
}

export const DailyTransactionList = ({ dailyTransactionList }: DailyTransactionListProps) => {
  return (
    <Flex direction="column" gap="6" overflowY="scroll" height="100%">
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

interface TransactionInfoProps {
  transaction: Transaction
}

const TransactionInfo = ({ transaction }: TransactionInfoProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(ROUTE.calendar.detail(transaction.id))
  }

  return (
    <Flex justify="start" align="center" gap="5" onClick={handleClick}>
      <IconButton size="3" color="indigo" variant="soft" radius="full">
        <CalendarIcon width={16} height={16} />
      </IconButton>
      <Flex direction="column">
        <Text weight="medium" color={transaction.type === 'expense' ? undefined : 'blue'}>
          {transactionAmountFormat({ amount: transaction.amount, type: transaction.type, mode: 'full' })}
        </Text>
        <Text size="1" color="gray">
          {transaction.type === 'expense' ? transaction.to : transaction.from}
        </Text>
      </Flex>
    </Flex>
  )
}
