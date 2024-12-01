import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

import { PAYMENTS_ENDPOINT, PAYMENTS_KEY } from './payment.model'
import { Payment, PaymentMutationPayload } from './payment.type'
import { request } from '~/utils/request'
import { SortOrder } from '~/types/query.type'

export const usePaymentsListQuery = (sortOrder: SortOrder) =>
  useSuspenseQuery<Payment[]>({
    queryKey: PAYMENTS_KEY.order({ order: sortOrder }),
    queryFn: () => request(PAYMENTS_ENDPOINT.order({ order: sortOrder })),
  })

export const usePaymentDetailQuery = (paymentId: string) =>
  useSuspenseQuery<Payment[]>({
    queryKey: PAYMENTS_KEY.detail(paymentId),
    queryFn: () => request(PAYMENTS_ENDPOINT.detail(paymentId)),
  })

export const usePaymentCreateMutation = () => {
  return useMutation<void, Error, PaymentMutationPayload>({
    mutationFn: (data) =>
      request(PAYMENTS_ENDPOINT.default, {
        method: 'POST',
        data: JSON.stringify(data),
      }),
  })
}

export const usePaymentUpdateMutation = (paymentId: string) => {
  return useMutation<void, Error, PaymentMutationPayload>({
    mutationFn: (data) => request(PAYMENTS_ENDPOINT.update(paymentId), { method: 'PATCH', data: JSON.stringify(data) }),
  })
}

export const usePaymentDeleteMutation = (paymentId: string) => {
  return useMutation<void>({
    mutationFn: () => request(PAYMENTS_ENDPOINT.update(paymentId), { method: 'DELETE' }),
  })
}
