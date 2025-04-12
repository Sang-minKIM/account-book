import { MutationOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query'

import { TRANSACTIONS_ENDPOINT, TRANSACTIONS_KEY } from './transactions.model'
import { Transaction, TransactionCreateSchema, TransactionUpdateSchema } from './transactions.type'
import { request } from '~/utils/request'
import { z } from 'zod'
import { QueryOptions } from '~/utils/build-query'

export const useTransactionListQuery = (options: QueryOptions) => {
  return useSuspenseQuery<Transaction[]>({
    queryKey: TRANSACTIONS_KEY.list(options),
    queryFn: () => request(TRANSACTIONS_ENDPOINT.list(options)),
  })
}

export const useTransactionDetailQuery = (transactionId: string) => {
  return useSuspenseQuery<Transaction[]>({
    queryKey: TRANSACTIONS_KEY.detail(transactionId),
    queryFn: () => request(TRANSACTIONS_ENDPOINT.detail(transactionId)),
  })
}

type TransactionCreatePayload = z.infer<typeof TransactionCreateSchema>

export const useTransactionCreateMutation = () => {
  return useMutation<void, Error, TransactionCreatePayload>({
    mutationFn: (data) =>
      request(TRANSACTIONS_ENDPOINT.default, {
        method: 'POST',
        data,
      }),
  })
}

type TransactionUpdatePayload = { id: string; data: z.infer<typeof TransactionUpdateSchema> }

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
