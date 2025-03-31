import { ChevronLeftIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Flex, Heading } from '@radix-ui/themes'
import { IconLink } from '~/components/base'
import { ROUTE } from '~/router'
import { TransactionDetailDataList } from './components/transaction-detail-data-list'
import { useTransactionDetailViewModel } from './hooks/use-transaction-detail-view-model'
import { useParams } from 'react-router-dom'

export const TransactionDetail = () => {
  const { id } = useParams()

  if (!id) throw new Error('transactionId를 찾을 수 없습니다.')
  const { type, amount, payee, memo, category, date } = useTransactionDetailViewModel(id)
  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center" height="50px" p="2">
        <IconLink to={ROUTE.transaction.list}>
          <ChevronLeftIcon width="24" height="24" />
        </IconLink>
        <Heading>상세 내역</Heading>
        <IconLink to={ROUTE.transaction.update(id)}>
          <Pencil1Icon width="24" height="24" />
        </IconLink>
      </Flex>
      <TransactionDetailDataList
        type={type}
        amount={amount}
        payee={payee}
        memo={memo}
        category={category}
        date={date}
      />
    </Flex>
  )
}
