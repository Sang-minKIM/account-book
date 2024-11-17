import { Table } from '@radix-ui/themes'

import { PaymentListItem } from '~/components/payment-list'
import { usePaymentListViewModel } from './hooks/use-payment-list-view-model'

export const PaymentList = () => {
  const { paymentList } = usePaymentListViewModel()

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>날짜</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>거래처</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell align="right">금액</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{paymentList?.map((payment) => <PaymentListItem key={payment.id} payment={payment} />)}</Table.Body>
    </Table.Root>
  )
}
