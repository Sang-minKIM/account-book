import { ChevronLeftIcon, TrashIcon } from '@radix-ui/react-icons'
import { Flex, Heading, IconButton } from '@radix-ui/themes'

import { IconLink } from '~/components/base'
import { ROUTE } from '~/router'

import { TransactionForm } from '../transaction-create'
import { useTransactionUpdateViewModel } from './hooks/transaction-update-view-model'
import { useParams } from 'react-router-dom'

export const TransactionUpdate = () => {
  const { id: transactionId } = useParams()

  if (!transactionId) throw new Error('transactionId를 찾을 수 없습니다.')
  const { handleSubmit, handleDeleteClick, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional } =
    useTransactionUpdateViewModel(transactionId)
  return (
    <Flex direction="column" gap="8">
      <Flex justify="between" align="center" gap="2" height="50px" p="2">
        <IconLink to={ROUTE.transaction.list}>
          <ChevronLeftIcon width="24" height="24" />
        </IconLink>
        <Heading>거래내역 수정하기</Heading>
        <IconButton variant="ghost" size="4" onClick={handleDeleteClick}>
          <TrashIcon width="24" height="24" />
        </IconButton>
      </Flex>
      <TransactionForm {...{ handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional }} />
    </Flex>
  )
}
