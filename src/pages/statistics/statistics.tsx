import { styled } from 'styled-components'
import { DonutChart } from './components/donut-chart'
import { Flex, Text } from '@radix-ui/themes'

export const Statistics = () => {
  const expenses = [
    { label: '식비', amount: 300 },
    { label: '기타', amount: 50 },
    { label: '교통비', amount: 150 },
    { label: '유흥비', amount: 100 },
  ]
  expenses.sort((a, b) => b.amount - a.amount)
  return (
    <Flex direction="column" align="center" gap="1">
      <DonutChart data={expenses} />
      <Flex direction="column" gap="2">
        {expenses.map((item, index) => (
          <Legend key={item.label} label={item.label} color={`var(--accent-${11 - index})`} />
        ))}
      </Flex>
    </Flex>
  )
}

const Legend = ({ label, color }: { label: string; color: string }) => {
  return (
    <Flex align="center" gap="2">
      <ColorBox color={color} />
      <Text size="2">{label}</Text>
    </Flex>
  )
}
const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: ${({ color }) => color};
`
