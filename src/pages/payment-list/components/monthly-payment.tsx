import { Flex, Text } from '@radix-ui/themes'
import { paymentAmountFormat } from '~/utils/units'

export const MonthlyPayment = ({
  monthlyIncome,
  monthlyExpense,
}: {
  monthlyIncome: number
  monthlyExpense: number
}) => {
  return (
    <Flex justify="center" align="center" gap="2">
      <Text size="4" weight="bold" align="center" color="blue">
        {paymentAmountFormat(monthlyIncome, 'income', 'full')}
      </Text>
      <Text size="3" weight="bold" align="center">
        받고
      </Text>
      <Text size="4" weight="bold" align="center" color="red">
        {paymentAmountFormat(monthlyExpense, 'expense', 'full')}
      </Text>
      <Text size="3" weight="bold" align="center">
        썼어요
      </Text>
    </Flex>
  )
}
