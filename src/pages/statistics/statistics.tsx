import { styled } from 'styled-components'
import { DonutChart } from './components/donut-chart'
import { Flex, Section, Text } from '@radix-ui/themes'
import { transactionAmountFormat } from '~/utils/units'
import { Transaction, useTransactionsListQuery } from '~/queries/transaction'
import { toNumber } from '~/utils/number'
import { SORT_ORDER } from '~/constants/query'
import { useMemo } from 'react'
import { DailyTransactionList } from '../transaction-list/components/daily-transaction-list'

export const Statistics = () => {
  const date = new Date()
  const { year, month } = { year: date.getFullYear(), month: date.getMonth() }
  const { data } = useTransactionsListQuery(toNumber(year), toNumber(month) + 1, SORT_ORDER.DESC)

  const categoryTransactionMap = useMemo(
    () =>
      data?.reduce<Map<string, Transaction[]>>((map, transaction) => {
        const category = transaction.category.name
        if (!map.has(category)) {
          map.set(category, [])
        }
        map.get(category)!.push(transaction)
        return map
      }, new Map<string, Transaction[]>()),
    [data]
  )

  const categoryTransactionList = useMemo(() => Array.from(categoryTransactionMap.entries()), [categoryTransactionMap])

  const categoryTotalTransaction = useMemo(() => {
    return Array.from(categoryTransactionMap.entries()).map(([category, transactions]) => {
      const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
      return { label: category, amount: totalAmount }
    })
  }, [categoryTransactionMap])
  categoryTotalTransaction.sort((a, b) => b.amount - a.amount)

  const total = categoryTotalTransaction.reduce((result, value) => result + value.amount, 0)
  return (
    <Flex justify="between" gap="9" height="calc(100dvh - 50px)">
      <Flex width="50%" minWidth="300px" direction="column" align="center" gap="6">
        <DonutChart data={categoryTotalTransaction} />
        <Flex direction="column" gap="2">
          {categoryTotalTransaction.map((item, index) => (
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
      <Section width="50%" minWidth="300px">
        <DailyTransactionList dailyTransactionList={categoryTransactionList} />
      </Section>
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
        {transactionAmountFormat(amount, 'expense', 'full')}
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
