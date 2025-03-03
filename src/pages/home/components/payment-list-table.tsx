import { Table, Text } from '@radix-ui/themes'
import styled from 'styled-components'
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
    <TableWrapper>
      <Table.Root variant="surface">
        <Table.Header>
          <TableRow>
            <Table.ColumnHeaderCell>금액</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>거래처</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>카테고리</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>거래일시</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>메모</Table.ColumnHeaderCell>
          </TableRow>
        </Table.Header>
        <TableBody>
          {paymentList?.map(({ id, type, amount, from, to, category, date, memo }) => (
            <TableRow key={id}>
              <Table.Cell>
                <Text weight="medium" color={type === 'expense' ? undefined : 'blue'}>
                  {paymentAmountFormat(amount, type, 'short')}
                </Text>
              </Table.Cell>
              <Table.Cell>{type === 'expense' ? to : from}</Table.Cell>
              <Table.Cell>{category}</Table.Cell>
              <Table.Cell>{date}</Table.Cell>
              <Table.Cell>{memo}</Table.Cell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </TableWrapper>
  )
}

const TableWrapper = styled.div`
  width: 100%;
  height: 500px;
`

const TableBody = styled(Table.Body)`
  display: block;
  max-height: 400px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`
const TableRow = styled(Table.Row)`
  display: table;
  width: 100%;
  table-layout: fixed;
`
