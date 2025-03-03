import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

import { PAYMENTS_ENDPOINT, PAYMENTS_KEY } from './payment.model'
import { Payment, PaymentMutationPayload } from './payment.type'
import { request } from '~/utils/request'
import { SortOrder } from '~/types/query.type'

export const usePaymentsListQuery = (
  year: number,
  month: number,
  sortOrder: SortOrder // TODO: 추후 searchOption 객체로 파라미터 변경 => 빈 객체면 전체 조회
) =>
  useSuspenseQuery<Payment[]>({
    queryKey: PAYMENTS_KEY.list(year, month, sortOrder),
    queryFn: () => request(PAYMENTS_ENDPOINT.list(year, month, sortOrder)),
  })
export const useAllPaymentsListQuery = () =>
  // TODO: usePaymentsListQuery 리팩토링 후 삭제
  useSuspenseQuery<Payment[]>({
    queryKey: PAYMENTS_KEY.default,
    queryFn: () => request(PAYMENTS_ENDPOINT.all({ sortOrder: 'desc' })),
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
