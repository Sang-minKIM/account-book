import { Flex, Text } from '@radix-ui/themes'
import { transactionAmountFormat } from '~/utils/units'

export const MonthlyTransaction = ({
  monthlyIncome,
  monthlyExpense,
}: {
  monthlyIncome: number
  monthlyExpense: number
}) => {
  return (
    <Flex justify="center" align="center" gap="2">
      <Text size="4" weight="bold" align="center" color="blue">
        {transactionAmountFormat({ amount: monthlyIncome, type: 'income', mode: 'full' })}
      </Text>
      <Text size="3" weight="bold" align="center">
        받고
      </Text>
      <Text size="4" weight="bold" align="center" color="red">
        {transactionAmountFormat({ amount: monthlyExpense, type: 'expense', mode: 'full' })}
      </Text>
      <Text size="3" weight="bold" align="center">
        썼어요
      </Text>
    </Flex>
  )
}
