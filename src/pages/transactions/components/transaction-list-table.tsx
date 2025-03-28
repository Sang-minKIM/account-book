import { Flex, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'

import { Table } from '~/components/table'

import { Transaction, useAllTransactionsListQuery } from '~/queries/transactions'
import { transactionAmountFormat } from '~/utils/units'

export const TransactionListTable = () => {
  const { data } = useAllTransactionsListQuery()

  return (
    <Flex direction="column" gap="2">
      <Text size="4" weight="bold">
        입출금 내역
      </Text>
      <Table.Root<Transaction> data={data} columns={columns}>
        <Table.Header />
        <Table.Body />
      </Table.Root>
    </Flex>
  )
}

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'amount',
    header: '금액',
    cell: ({ row }) => (
      <Text weight="medium" color={row.original.type === 'expense' ? undefined : 'blue'}>
        {transactionAmountFormat(row.original.amount, row.original.type, 'short')}
      </Text>
    ),
  },
  {
    accessorKey: 'counterpart',
    header: '거래처',
    cell: ({ row }) => (row.original.type === 'expense' ? row.original.to : row.original.from),
  },
  {
    accessorKey: 'category',
    accessorFn: (row) => row.category.name,
    header: '카테고리',
  },
  {
    accessorKey: 'date',
    header: '거래일자',
    cell: ({ row }) => (
      <Text size="2" weight="medium">
        {row.original.date.split('T')[0]}
      </Text>
    ),
  },
  {
    accessorKey: 'memo',
    header: '메모',
  },
]
