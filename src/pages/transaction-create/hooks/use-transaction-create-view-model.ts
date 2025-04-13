import { useReducer } from 'react'
import { TransactionCreateSchema } from '~/queries/transactions'
import { useTransactionCreateMutation } from '~/queries/transactions'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '~/router'
import { optionalInfoReducer, requiredInfoReducer } from '../services/transaction-form-reducer'

export const useTransactionCreateViewModel = () => {
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

  const { mutateAsync: createTransaction } = useTransactionCreateMutation()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    TransactionCreateSchema.parse({
      ...requiredInfo,
      ...optionalInfo,
    })

    const createTransactionResult = await createTransaction({
      type: requiredInfo.type,
      amount: requiredInfo.amount,
      ...(requiredInfo.type === 'expense' ? { to: requiredInfo.payee } : { from: requiredInfo.payee }),
      date: requiredInfo.date,
      category: optionalInfo.category,
      memo: optionalInfo.memo,
    })
    navigate(ROUTE.transactions.root)
    return createTransactionResult
  }

  return { handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional }
}
