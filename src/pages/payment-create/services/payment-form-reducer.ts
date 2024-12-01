import { RequiredInfo, OptionalInfo } from '~/queries/payment/payment.type'
import { OptionalInfoAction, RequiredInfoAction } from '../components/payment-form.type'

export function requiredInfoReducer(state: RequiredInfo, action: RequiredInfoAction) {
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

export function optionalInfoReducer(state: OptionalInfo, action: OptionalInfoAction) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload }
    case 'SET_MEMO':
      return { ...state, memo: action.payload }
    default:
      return state
  }
}
