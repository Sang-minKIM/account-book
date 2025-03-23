import { useReducer } from 'react'
import { z } from 'zod'
import { MAX_MEMO_LENGTH, PAYMENT_TYPE } from '~/constants/payment'
import { SORT_ORDER } from '~/constants/query'
import { useCategoryListQuery } from '~/queries/category'
import { useAllPaymentsListQuery, usePaymentCreateMutation } from '~/queries/payment'
import { paymentCreateSchema } from '~/queries/payment/payment.type'

type Payment = z.infer<typeof paymentCreateSchema>

export const usePaymentCreateFormViewModel = () => {
  const [payment, dispatch] = useReducer(reducer, initialState)

  const { data: categoryList } = useCategoryListQuery(SORT_ORDER.ASC)
  const { refetch: refetchPayments } = useAllPaymentsListQuery()

  const { mutateAsync: createPayment } = usePaymentCreateMutation()

  const onSubmit = async () => {
    const { payee, ...rest } = payment
    const payload = {
      ...rest,
      ...(payment.type === 'expense' ? { to: payee } : { from: payee }),
    }
    dispatch({ type: 'CLEAR' })
    await createPayment(payload)
    await refetchPayments()
  }

  return { payment, dispatch, categoryList, onSubmit }
}

const initialState: Payment = {
  type: PAYMENT_TYPE.EXPENSE,
  amount: 0,
  payee: '',
  date: '',
  category: 1,
  memo: '',
}

function reducer(state: Payment, action: ActionType) {
  switch (action.type) {
    case 'SET_TYPE':
      return { ...state, type: action.payload }
    case 'SET_AMOUNT':
      return { ...state, amount: action.payload }
    case 'SET_PAYEE':
      return { ...state, payee: action.payload }
    case 'SET_DATE':
      return { ...state, date: action.payload }
    case 'SET_CATEGORY':
      return { ...state, category: action.payload }
    case 'SET_MEMO':
      if (action.payload.length > MAX_MEMO_LENGTH) {
        const memo = action.payload.slice(0, MAX_MEMO_LENGTH)
        return { ...state, memo }
      }
      return { ...state, memo: action.payload }
    case 'CLEAR':
      return initialState
  }
}

type ActionType =
  | { type: 'SET_TYPE'; payload: Payment['type'] }
  | { type: 'SET_AMOUNT'; payload: Payment['amount'] }
  | { type: 'SET_PAYEE'; payload: Payment['payee'] }
  | { type: 'SET_DATE'; payload: Payment['date'] }
  | { type: 'SET_CATEGORY'; payload: Payment['category'] }
  | { type: 'SET_MEMO'; payload: Payment['memo'] }
  | { type: 'CLEAR' }

export const ACTION_TYPE = {
  SET_TYPE: 'SET_TYPE',
  SET_AMOUNT: 'SET_AMOUNT',
  SET_PAYEE: 'SET_PAYEE',
  SET_DATE: 'SET_DATE',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_MEMO: 'SET_MEMO',
  CLEAR: 'CLEAR',
} as const
