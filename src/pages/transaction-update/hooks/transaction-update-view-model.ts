import { useReducer } from 'react'
import { useTransactionDeleteMutation, useTransactionUpdateMutation } from '~/queries/transactions/transactions.api'
import { useNavigate } from 'react-router-dom'
import { useTransactionDetailQuery } from '~/queries/transactions/transactions.api'
import { TransactionUpdateSchema } from '~/queries/transactions'
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

  const { mutateAsync: updateTransaction } = useTransactionUpdateMutation()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    TransactionUpdateSchema.parse({
      ...requiredInfo,
      ...optionalInfo,
    })
    await updateTransaction({
      id: transactionId,
      data: {
        type: requiredInfo.type,
        amount: requiredInfo.amount,
        ...(requiredInfo.type === 'expense' ? { to: requiredInfo.payee } : { from: requiredInfo.payee }),
        date: requiredInfo.date,
        category: optionalInfo.category,
        memo: optionalInfo.memo,
      },
    })
    navigate(ROUTE.transactions.root)
  }
  const { mutateAsync: deleteTransaction } = useTransactionDeleteMutation()
  const handleDeleteClick = async () => {
    await deleteTransaction(transactionId)
    navigate(ROUTE.transactions.root)
  }

  return { handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional, handleDeleteClick }
}
