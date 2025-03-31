import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { Flex, Heading } from '@radix-ui/themes'

import { TransactionForm } from './components/transaction-form'
import { IconLink } from '~/components/base'
import { ROUTE } from '~/router'
import styled from 'styled-components'
import { useTransactionCreateViewModel } from './hooks/use-transaction-create-view-model'

export const TransactionCreate = () => {
  const { handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional } =
    useTransactionCreateViewModel()
  return (
    <Flex direction="column" gap="8">
      <Flex justify="between" align="center" gap="2" height="50px" p="2">
        <IconLink to={ROUTE.transaction.list}>
          <ChevronLeftIcon width="24" height="24" />
        </IconLink>
        <Heading>거래내역 추가하기</Heading>
        <EmptySpace />
      </Flex>
      <TransactionForm {...{ handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional }} />
    </Flex>
  )
}

//FIXME: 공통화
const EmptySpace = styled.div`
  width: 24px;
`
