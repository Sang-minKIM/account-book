import { Flex, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'

import { Table } from '~/components/table'

import { Payment, useAllPaymentsListQuery } from '~/queries/payment'
import { paymentAmountFormat } from '~/utils/units'

export const PaymentListTable = () => {
  const { data } = useAllPaymentsListQuery()

  return (
    <Flex direction="column" gap="4">
      <Text size="5" weight="bold">
        입출금 내역
      </Text>
      <Table.Root<Payment> data={data} columns={columns}>
        <Table.Header />
        <Table.Body />
      </Table.Root>
    </Flex>
  )
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'amount',
    header: '금액',
    cell: ({ row }) => (
      <Text weight="medium" color={row.original.type === 'expense' ? undefined : 'blue'}>
        {paymentAmountFormat(row.original.amount, row.original.type, 'short')}
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
