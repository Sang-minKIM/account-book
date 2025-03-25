import { useReducer } from 'react'
import { useTransactionDeleteMutation, useTransactionUpdateMutation } from '~/queries/transactions/transactions.api'
import { useNavigate } from 'react-router-dom'
import { useTransactionDetailQuery } from '~/queries/transactions/transactions.api'
import { transactionFormSchema } from '~/queries/transactions/transactions.type'
import { ROUTE } from '~/router'
import { requiredInfoReducer, optionalInfoReducer } from '~/pages/transaction-create'

export const useTransactionUpdateViewModel = (transactionId: string) => {
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
  } = useTransactionDetailQuery(transactionId)
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

  const { mutateAsync: updateTransaction } = useTransactionUpdateMutation(transactionId)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    transactionFormSchema.parse({
      ...requiredInfo,
      ...optionalInfo,
    })
    await updateTransaction({
      type: requiredInfo.type,
      amount: requiredInfo.amount,
      ...(requiredInfo.type === 'expense' ? { to: requiredInfo.payee } : { from: requiredInfo.payee }),
      date: requiredInfo.date,
      category: optionalInfo.category,
      memo: optionalInfo.memo,
    })
    navigate(ROUTE.transaction.list)
  }
  const { mutateAsync: deleteTransaction } = useTransactionDeleteMutation(transactionId)
  const handleDeleteClick = async () => {
    await deleteTransaction()
    navigate(ROUTE.transaction.list)
  }

  return { handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional, handleDeleteClick }
}
