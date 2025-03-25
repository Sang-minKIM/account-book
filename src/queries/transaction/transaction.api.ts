import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

import { TRANSACTIONS_ENDPOINT, TRANSACTIONS_KEY } from './transaction.model'
import { Transaction, TransactionMutationPayload } from './transaction.type'
import { request } from '~/utils/request'
import { SortOrder } from '~/types/query.type'

export const useTransactionsListQuery = (
  year: number,
  month: number,
  sortOrder: SortOrder // TODO: 추후 searchOption 객체로 파라미터 변경 => 빈 객체면 전체 조회
) =>
  useSuspenseQuery<Transaction[]>({
    queryKey: TRANSACTIONS_KEY.list(year, month, sortOrder),
    queryFn: () => request(TRANSACTIONS_ENDPOINT.list(year, month, sortOrder)),
  })
export const useAllTransactionsListQuery = () =>
  // TODO: useTransactionsListQuery 리팩토링 후 삭제
  useSuspenseQuery<Transaction[]>({
    queryKey: TRANSACTIONS_KEY.default,
    queryFn: () => request(TRANSACTIONS_ENDPOINT.all({ sortOrder: 'desc' })),
  })

export const useTransactionDetailQuery = (transactionId: string) =>
  useSuspenseQuery<Transaction[]>({
    queryKey: TRANSACTIONS_KEY.detail(transactionId),
    queryFn: () => request(TRANSACTIONS_ENDPOINT.detail(transactionId)),
  })

export const useTransactionCreateMutation = () => {
  return useMutation<void, Error, TransactionMutationPayload>({
    mutationFn: (data) =>
      request(TRANSACTIONS_ENDPOINT.default, {
        method: 'POST',
        data: JSON.stringify(data),
      }),
  })
}

export const useTransactionUpdateMutation = (transactionId: string) => {
  return useMutation<void, Error, TransactionMutationPayload>({
    mutationFn: (data) =>
      request(TRANSACTIONS_ENDPOINT.update(transactionId), { method: 'PATCH', data: JSON.stringify(data) }),
  })
}

export const useTransactionDeleteMutation = (transactionId: string) => {
  return useMutation<void>({
    mutationFn: () => request(TRANSACTIONS_ENDPOINT.update(transactionId), { method: 'DELETE' }),
  })
}
