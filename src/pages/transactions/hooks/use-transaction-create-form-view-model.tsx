import { useReducer } from 'react'
import { z } from 'zod'
import { MAX_MEMO_LENGTH, TRANSACTION_TYPE } from '~/constants/transaction'
import { SORT_ORDER } from '~/constants/query'
import { useCategoryListQuery } from '~/queries/category'
import { useTransactionCreateMutation, useTransactionListQuery } from '~/queries/transactions'
import { TransactionCreateSchema } from '~/queries/transactions/transactions.type'
type TransactionRequestBody = z.infer<typeof TransactionCreateSchema>
type TransactionFormState = Omit<TransactionRequestBody, 'from' | 'to'> & { payee: string }

export const useTransactionCreateFormViewModel = () => {
  const [transaction, dispatch] = useReducer(reducer, initialState)

  const { data: categoryList } = useCategoryListQuery()
  const { refetch: refetchTransactions } = useTransactionListQuery({
    sort: [{ column: 'date', order: SORT_ORDER.DESC }],
  })

  const { mutateAsync: createTransaction } = useTransactionCreateMutation()

  const handleSubmit = async () => {
    const { type, payee, ...rest } = transaction
    const payload = type === TRANSACTION_TYPE.EXPENSE ? { ...rest, type, to: payee } : { ...rest, type, from: payee }
    await createTransaction(payload)
    await refetchTransactions()
    dispatch({ type: 'CLEAR' })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return { transaction, dispatch, categoryList, handleSubmit, handleKeyDown }
}

const initialState: TransactionFormState = {
  type: TRANSACTION_TYPE.EXPENSE,
  amount: 0,
  payee: '',
  date: '',
  category: 1,
  memo: '',
}

function reducer(state: TransactionFormState, action: ActionType) {
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
  | { type: 'SET_TYPE'; payload: TransactionFormState['type'] }
  | { type: 'SET_AMOUNT'; payload: TransactionFormState['amount'] }
  | { type: 'SET_PAYEE'; payload: TransactionFormState['payee'] }
  | { type: 'SET_DATE'; payload: TransactionFormState['date'] }
  | { type: 'SET_CATEGORY'; payload: TransactionFormState['category'] }
  | { type: 'SET_MEMO'; payload: TransactionFormState['memo'] }
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
