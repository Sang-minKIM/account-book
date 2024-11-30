import { Table } from '@radix-ui/themes'

import { PaymentListItem } from './components/payment-list-item'
import { usePaymentListViewModel } from './hooks/use-payment-list-view-model'

export const PaymentList = () => {
  const { paymentList, toggleSort, sortOrder } = usePaymentListViewModel()

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell onClick={toggleSort}>날짜 {sortOrder === 'desc' ? '▼' : '▲'}</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>거래처</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell align="right">금액</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{paymentList?.map((payment) => <PaymentListItem key={payment.id} payment={payment} />)}</Table.Body>
    </Table.Root>
  )
}
