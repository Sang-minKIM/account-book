import { useReducer } from 'react'
import { usePaymentUpdateMutation } from '~/queries/payment/payment.api'
import { useNavigate } from 'react-router-dom'
import { usePaymentDetailQuery } from '~/queries/payment/payment.api'
import { paymentFormSchema } from '~/queries/payment/payment.type'
import { ROUTE } from '~/router'
import { requiredInfoReducer, optionalInfoReducer } from '~/pages/payment-create'

export const usePaymentUpdateViewModel = (paymentId: string) => {
  const navigate = useNavigate()
  const {
    data: [
      {
        type,
        amount,
        from,
        to,
        memo,
        category: { id: category },
        date,
      },
    ],
  } = usePaymentDetailQuery(paymentId)
  const [requiredInfo, dispatchRequired] = useReducer(requiredInfoReducer, {
    type,
    amount,
    payee: type === 'expense' ? to : from,
    date,
  })
  const [optionalInfo, dispatchOptional] = useReducer(optionalInfoReducer, {
    category,
    memo,
  })

  const { mutateAsync: updatePayment } = usePaymentUpdateMutation(paymentId)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    paymentFormSchema.parse({
      ...requiredInfo,
      ...optionalInfo,
    })
    const updatePaymentResult = await updatePayment({
      type: requiredInfo.type,
      amount: requiredInfo.amount,
      ...(requiredInfo.type === 'expense' ? { to: requiredInfo.payee } : { from: requiredInfo.payee }),
      date: requiredInfo.date,
      category: optionalInfo.category,
      memo: optionalInfo.memo,
    })
    navigate(ROUTE.payment.list)
    return updatePaymentResult
  }

  return { handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional }
}
