import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { Button, Flex, Heading } from '@radix-ui/themes'
import { IconLink } from '~/components'
import { ROUTE } from '~/router'
import { PaymentDetailDataList } from './components/payment-detail-data-list'
import { usePaymentDetailViewModel } from './hooks/use-payment-detail-view-model'

export const PaymentDetail = () => {
  const { type, amount, payee, memo, category, date } = usePaymentDetailViewModel()
  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center" height="50px" p="2">
        <IconLink to={ROUTE.payment.list}>
          <ChevronLeftIcon width="24" height="24" />
        </IconLink>
        <Heading ml="4">상세 내역</Heading>
        <Button size="2" variant="soft">
          수정
        </Button>
      </Flex>
      <PaymentDetailDataList type={type} amount={amount} payee={payee} memo={memo} category={category} date={date} />
    </Flex>
  )
}
