import { useReducer } from 'react'
import { RequiredInfo, OptionalInfo, RequiredInfoAction, OptionalInfoAction } from '../components/payment-form.type'

export const usePaymentFormViewModel = () => {
  const [requiredInfo, dispatchRequired] = useReducer(requiredInfoReducer, {
    type: 'expense',
    amount: 0,
    payee: '',
    date: new Date().toLocaleString('sv', { timeZone: 'Asia/Seoul' }).replace(' ', 'T').slice(0, 16),
  })

  const [optionalInfo, dispatchOptional] = useReducer(optionalInfoReducer, {
    category: '',
    memo: '',
  })

  const handleSubmit = () => {
    console.log('submit')
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
