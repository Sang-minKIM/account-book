import { Table } from '@radix-ui/themes'
import { useAllPaymentsListQuery } from '~/queries/payment'

export const PaymentListTable = () => {
  const { data } = useAllPaymentsListQuery()

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>금액</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>거래처</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>카테고리</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>거래일시</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>메모</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row></Table.Row>
        </Table.Body>
      </Table.Root>
    </>
  )
}
