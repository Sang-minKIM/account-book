import { useReducer } from 'react'
import { usePaymentDeleteMutation, usePaymentUpdateMutation } from '~/queries/payment/payment.api'
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
    await updatePayment({
      type: requiredInfo.type,
      amount: requiredInfo.amount,
      ...(requiredInfo.type === 'expense' ? { to: requiredInfo.payee } : { from: requiredInfo.payee }),
      date: requiredInfo.date,
      category: optionalInfo.category,
      memo: optionalInfo.memo,
    })
    navigate(ROUTE.payment.list)
  }
  const { mutateAsync: deletePayment } = usePaymentDeleteMutation(paymentId)
  const handleDeleteClick = async () => {
    await deletePayment()
    navigate(ROUTE.payment.list)
  }

  return { handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional, handleDeleteClick }
}
