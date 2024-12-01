import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { Flex, Heading } from '@radix-ui/themes'

import { PaymentForm } from './components/payment-form'
import { IconLink } from '~/components'
import { ROUTE } from '~/router'
import styled from 'styled-components'
import { usePaymentCreateViewModel } from './hooks/use-payment-create-view-model'

export const PaymentCreate = () => {
  const { handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional } = usePaymentCreateViewModel()
  return (
    <Flex direction="column" gap="8">
      <Flex justify="between" align="center" gap="2" height="50px" p="2">
        <IconLink to={ROUTE.payment.list}>
          <ChevronLeftIcon width="24" height="24" />
        </IconLink>
        <Heading>거래내역 추가하기</Heading>
        <EmptySpace />
      </Flex>
      <PaymentForm {...{ handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional }} />
    </Flex>
  )
}

//FIXME: 공통화
const EmptySpace = styled.div`
  width: 24px;
`
