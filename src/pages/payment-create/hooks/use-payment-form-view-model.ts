import { useReducer } from 'react'
import { RequiredInfoAction, OptionalInfoAction } from '../components/payment-form.type'
import { RequiredInfo, OptionalInfo, paymentFormSchema } from '~/queries/payment/payment.type'
import { usePaymentCreateMutation } from '~/queries/payment'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '~/router'

export const usePaymentFormViewModel = () => {
  const navigate = useNavigate()
  const [requiredInfo, dispatchRequired] = useReducer(requiredInfoReducer, {
    type: 'expense',
    amount: 0,
    payee: '',
    date: new Date().toLocaleString('sv', { timeZone: 'Asia/Seoul' }).replace(' ', 'T').slice(0, 16),
  })

  const [optionalInfo, dispatchOptional] = useReducer(optionalInfoReducer, {
    category: 1,
    memo: '',
  })

  const { mutateAsync: createPayment } = usePaymentCreateMutation()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    paymentFormSchema.parse({
      ...requiredInfo,
      ...optionalInfo,
    })

    const createPaymentResult = await createPayment({
      type: requiredInfo.type,
      amount: requiredInfo.amount,
      ...(requiredInfo.type === 'expense' ? { to: requiredInfo.payee } : { from: requiredInfo.payee }),
      date: requiredInfo.date,
      category: optionalInfo.category,
      memo: optionalInfo.memo,
    })
    navigate(ROUTE.payment.list)
    return createPaymentResult
  }

  return { handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional }
}

function requiredInfoReducer(state: RequiredInfo, action: RequiredInfoAction) {
  switch (action.type) {
    case 'SET_TYPE':
      return { ...state, type: action.payload }
    case 'SET_AMOUNT':
      return { ...state, amount: action.payload }
    case 'SET_PAYEE':
      return { ...state, payee: action.payload }
    case 'SET_DATE':
      return { ...state, date: action.payload }
    default:
      return state
  }
}

function optionalInfoReducer(state: OptionalInfo, action: OptionalInfoAction) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload }
    case 'SET_MEMO':
      return { ...state, memo: action.payload }
    default:
      return state
  }
}
