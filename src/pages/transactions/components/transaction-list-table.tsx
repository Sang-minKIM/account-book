import { Box, Flex, Text, Tooltip } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'

import { Table } from '~/components/table'

import { Transaction, useTransactionListQuery } from '~/queries/transactions'
import { transactionAmountFormat } from '~/utils/units'
import { TransactionListTableAmountCellEditable } from './transaction-list-table-amount-cell-editable'
import { TransactionListTablePayeeCellEditable } from './transaction-list-table-payee-cell-editable'
import { TransactionListTableCategoryCellEditable } from './transaction-list-table-category-cell-editable'
import { TransactionListTableMemoCellEditable } from './transaction-list-table-memo-cell-editable'
import { TransactionListTableDateCellEditable } from './transaction-list-table-date-cell-editable'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { SORT_ORDER } from '~/constants/query'

export const TransactionListTable = () => {
  const { data } = useTransactionListQuery({
    sort: [{ column: 'date', order: SORT_ORDER.DESC }],
  })

  return (
    <Flex direction="column" gap="2">
      <Flex align="center" gap="2">
        <Text size="4" weight="bold">
          입출금 내역
        </Text>
        <Tooltip content="셀을 더블클릭해서 수정할 수 있어요" side="right">
          <InfoCircledIcon />
        </Tooltip>
      </Flex>

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
      <Table.EditableCell
        renderReadOnly={({ startEdit }) => (
          <Text weight="medium" color={row.original.type === 'expense' ? undefined : 'blue'} onDoubleClick={startEdit}>
            {transactionAmountFormat({ amount: row.original.amount, type: row.original.type, mode: 'full' })}
          </Text>
        )}
        renderEditable={({ endEdit }) => (
          <TransactionListTableAmountCellEditable
            id={row.original.id}
            defaultValue={row.original.amount}
            endEdit={endEdit}
          />
        )}
      />
    ),
  },
  {
    accessorKey: 'payee',
    header: '거래처',
    cell: ({ row }) => (
      <Table.EditableCell
        renderReadOnly={({ startEdit }) => (
          <Box width="100%" height="100%" onDoubleClick={startEdit}>
            <Text>{row.original.type === 'expense' ? row.original.to : row.original.from}</Text>
          </Box>
        )}
        renderEditable={({ endEdit }) => (
          <TransactionListTablePayeeCellEditable
            id={row.original.id}
            defaultValue={row.original.type === 'expense' ? row.original.to : row.original.from}
            type={row.original.type}
            endEdit={endEdit}
          />
        )}
      />
    ),
  },
  {
    accessorKey: 'category',
    accessorFn: (row) => row.category.name,
    header: '카테고리',
    cell: ({ row }) => (
      <Table.EditableCell
        renderReadOnly={({ startEdit }) => <Text onDoubleClick={startEdit}>{row.original.category.name}</Text>}
        renderEditable={({ endEdit }) => (
          <TransactionListTableCategoryCellEditable
            id={row.original.id}
            defaultValue={Number(row.original.category.id)}
            endEdit={endEdit}
          />
        )}
      />
    ),
  },
  {
    accessorKey: 'date',
    header: '거래일자',
    cell: ({ row }) => (
      <Table.EditableCell
        renderReadOnly={({ startEdit }) => <Text onDoubleClick={startEdit}>{row.original.date.split('T')[0]}</Text>}
        renderEditable={({ endEdit }) => (
          <TransactionListTableDateCellEditable
            id={row.original.id}
            defaultValue={row.original.date}
            endEdit={endEdit}
          />
        )}
      />
    ),
  },
  {
    accessorKey: 'memo',
    header: '메모',
    cell: ({ row }) => (
      <Table.EditableCell
        renderReadOnly={({ startEdit }) => <Text onDoubleClick={startEdit}>{row.original.memo}</Text>}
        renderEditable={({ endEdit }) => (
          <TransactionListTableMemoCellEditable
            id={row.original.id}
            defaultValue={row.original.memo}
            endEdit={endEdit}
          />
        )}
      />
    ),
  },
]
