import { styled } from 'styled-components'
import { DonutChart } from './components/donut-chart'
import { Flex, Text } from '@radix-ui/themes'
import { paymentAmountFormat } from '~/utils/units'

export const Statistics = () => {
  const expenses = [
    { label: '식비', amount: 300 },
    { label: '기타', amount: 50 },
    { label: '교통비', amount: 150 },
    { label: '유흥비', amount: 100 },
    { label: '월세', amount: 100 },
  ]
  const total = expenses.reduce((result, value) => result + value.amount, 0)
  expenses.sort((a, b) => b.amount - a.amount)
  return (
    <Flex direction="column" align="center" gap="6">
      <DonutChart data={expenses} />
      <Flex direction="column" gap="2">
        {expenses.map((item, index) => (
          <Legend
            key={item.label}
            label={item.label}
            color={`var(--accent-${11 - index * 2})`}
            ratio={item.amount / total}
            amount={item.amount}
          />
        ))}
      </Flex>
    </Flex>
  )
}

const Legend = ({ label, color, ratio, amount }: { label: string; color: string; ratio: number; amount: number }) => {
  const formattedRatio = `${(ratio * 100).toFixed(1)}%`
  return (
    <Flex justify="start" align="center" gap="5" width="300px">
      <ColorBox color={color} />
      <Flex direction="column">
        <Text size="3" weight="medium">
          {label}
        </Text>
        <Text size="1" color="gray">
          {formattedRatio}
        </Text>
      </Flex>
      <Text weight="medium" ml="auto">
        {paymentAmountFormat(amount, 'expense', 'full')}
      </Text>
    </Flex>
  )
}
const ColorBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`
