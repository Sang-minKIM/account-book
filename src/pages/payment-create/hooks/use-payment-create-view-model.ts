import { useReducer } from 'react'
import { paymentFormSchema } from '~/queries/payment/payment.type'
import { usePaymentCreateMutation } from '~/queries/payment'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '~/router'
import { optionalInfoReducer, requiredInfoReducer } from '../services/payment-form-reducer'

export const usePaymentCreateViewModel = () => {
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
