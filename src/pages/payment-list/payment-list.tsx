import { Container, Flex, Table } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'

import { PaymentListItem } from './components/payment-list-item'
import { usePaymentListViewModel } from './hooks/use-payment-list-view-model'
import { ROUTE } from '~/router'
import { IconLink } from '~/components'
import { DatePicker } from '~/components/calender'

export const PaymentList = () => {
  const { paymentList, toggleSort, sortOrder } = usePaymentListViewModel()

  return (
    <Container>
      <DatePicker />
      <Flex height="50px" align="center" justify="end" p="2">
        <IconLink to={ROUTE.payment.create}>
          <Pencil1Icon width="22" height="22" />
        </IconLink>
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell onClick={toggleSort}>
              날짜 {sortOrder === 'desc' ? '▼' : '▲'}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>거래처</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell align="right">금액</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{paymentList?.map((payment) => <PaymentListItem key={payment.id} payment={payment} />)}</Table.Body>
      </Table.Root>
    </Container>
  )
}
