import { Checkbox, Text } from '@radix-ui/themes'

import { Table } from '~/components/table'

import { useAllPaymentsListQuery } from '~/queries/payment'
import { paymentAmountFormat } from '~/utils/units'

export const PaymentListTable = () => {
  const { data } = useAllPaymentsListQuery()
  const paymentList = data?.map((payment) => ({
    id: payment.id,
    type: payment.type,
    amount: payment.amount,
    from: payment.from,
    to: payment.to,
    category: payment.category.name,
    date: payment.date.replace('T', ' '),
    memo: payment.memo,
  }))

  return (
    <Table.Root data={paymentList} columns={columns} enablePagination>
      <Table.Header />
      <Table.Body />
      <Table.Footer />
    </Table.Root>
  )
}

const columns = [
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
    header: '카테고리',
  },
  {
    accessorKey: 'date',
    header: '거래일시',
  },
  {
    accessorKey: 'memo',
    header: '메모',
  },
]
