import { Table } from '@radix-ui/themes'
import { Payment } from '~/queries/payment'
import { ROUTE } from '~/router'
import { useNavigate } from 'react-router-dom'

interface PaymentListItemProps {
  payment: Payment
}

export const PaymentListItem = ({ payment }: PaymentListItemProps) => {
  const navigate = useNavigate()

  return (
    <Table.Row
      key={payment.id}
      onClick={() => navigate(ROUTE.payment.detail(payment.id))}
      style={{ cursor: 'pointer' }}
    >
      <Table.Cell>{new Date(payment.date).toLocaleString()}</Table.Cell>
      <Table.Cell>{payment.type === 'expense' ? payment.to : payment.from}</Table.Cell>
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
