import { Table } from '@radix-ui/themes'
import { Payment } from '../../../queries/payment/payment-list.type'

interface PaymentListItemProps {
  payment: Payment
}

export const PaymentListItem = ({ payment }: PaymentListItemProps) => {
  return (
    <Table.Row key={payment.id}>
      <Table.Cell>{new Date(payment.date).toLocaleString()}</Table.Cell>
      <Table.Cell>{payment.type === 'expense' ? payment.from : payment.to}</Table.Cell>
      <Table.Cell
        align="right"
        style={{
          color: payment.type === 'income' ? 'blue' : 'black',
        }}
      >
        {payment.type === 'expense' ? '-' : ''}
        {payment.amount.toLocaleString()}원
      </Table.Cell>
    </Table.Row>
  )
}
