import { MutationOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'

import { TRANSACTIONS_ENDPOINT, TRANSACTIONS_KEY } from './transactions.model'
import { Transaction, transactionCreateSchema, transactionUpdateSchema } from './transactions.type'
import { request } from '~/utils/request'
import { SortOrder } from '~/types/query.type'
import { z } from 'zod'

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

type TransactionCreatePayload = z.infer<typeof transactionCreateSchema>
export const useTransactionCreateMutation = () => {
  return useMutation<void, Error, TransactionCreatePayload>({
    mutationFn: (data) =>
      request(TRANSACTIONS_ENDPOINT.default, {
        method: 'POST',
        data,
      }),
  })
}

type TransactionUpdatePayload = { id: string; data: z.infer<typeof transactionUpdateSchema> }
export const useTransactionUpdateMutation = (options?: MutationOptions<void, Error, TransactionUpdatePayload>) => {
  return useMutation<void, Error, TransactionUpdatePayload>({
    mutationFn: (payload) => request(TRANSACTIONS_ENDPOINT.update(payload.id), { method: 'PATCH', data: payload.data }),
    ...options,
  })
}

export const useTransactionDeleteMutation = () => {
  return useMutation<void, Error, string>({
    mutationFn: (transactionId) => request(TRANSACTIONS_ENDPOINT.update(transactionId), { method: 'DELETE' }),
  })
}
