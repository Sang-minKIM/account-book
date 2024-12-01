import { ChevronLeftIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Flex, Heading } from '@radix-ui/themes'
import { IconLink } from '~/components'
import { ROUTE } from '~/router'
import { PaymentDetailDataList } from './components/payment-detail-data-list'
import { usePaymentDetailViewModel } from './hooks/use-payment-detail-view-model'
import { useParams } from 'react-router-dom'

export const PaymentDetail = () => {
  const { id } = useParams()

  if (!id) throw new Error('paymentId를 찾을 수 없습니다.')
  const { type, amount, payee, memo, category, date } = usePaymentDetailViewModel(id)
  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center" height="50px" p="2">
        <IconLink to={ROUTE.payment.list}>
          <ChevronLeftIcon width="24" height="24" />
        </IconLink>
        <Heading>상세 내역</Heading>
        <IconLink to={ROUTE.payment.update(id)}>
          <Pencil1Icon width="24" height="24" />
        </IconLink>
      </Flex>
      <PaymentDetailDataList type={type} amount={amount} payee={payee} memo={memo} category={category} date={date} />
    </Flex>
  )
}
