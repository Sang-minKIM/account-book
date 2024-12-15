import { styled } from 'styled-components'
import { DonutChart } from './components/donut-chart'
import { Flex, Text } from '@radix-ui/themes'
import { paymentAmountFormat } from '~/utils/units'
import { Payment, usePaymentsListQuery } from '~/queries/payment'
import { toNumber } from '~/utils/number'
import { SORT_ORDER } from '~/constants/query'
import { useMemo } from 'react'

export const Statistics = () => {
  const date = new Date()
  const { year, month } = { year: date.getFullYear(), month: date.getMonth() }
  const { data } = usePaymentsListQuery(toNumber(year), toNumber(month) + 1, SORT_ORDER.DESC)

  const categoryPaymentMap = useMemo(
    () =>
      data?.reduce<Map<string, Payment[]>>((map, payment) => {
        const category = payment.category.name
        if (!map.has(category)) {
          map.set(category, [])
        }
        map.get(category)!.push(payment)
        return map
      }, new Map<string, Payment[]>()),
    [data]
  )

  const categoryTotalPayment = useMemo(() => {
    return Array.from(categoryPaymentMap.entries()).map(([category, payments]) => {
      const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0)
      return { label: category, amount: totalAmount }
    })
  }, [categoryPaymentMap])
  categoryTotalPayment.sort((a, b) => b.amount - a.amount)

  const total = categoryTotalPayment.reduce((result, value) => result + value.amount, 0)
  return (
    <Flex direction="column" align="center" gap="6">
      <DonutChart data={categoryTotalPayment} />
      <Flex direction="column" gap="2">
        {categoryTotalPayment.map((item, index) => (
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
