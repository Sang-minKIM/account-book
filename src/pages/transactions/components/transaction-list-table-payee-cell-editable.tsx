import { TextField } from '@radix-ui/themes'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { ELEMENT_SIZE_SMALL } from '~/constants/style'
import { useTransactionUpdateMutation } from '~/queries/transactions'
import { TRANSACTIONS_KEY } from '~/queries/transactions/transactions.model'

interface TransactionListTablePayeeCellEditableProps {
  id: string
  defaultValue: string
  type: 'expense' | 'income'
  endEdit: () => void
}

export const TransactionListTablePayeeCellEditable = ({
  id,
  defaultValue,
  type,
  endEdit,
}: TransactionListTablePayeeCellEditableProps) => {
  const queryClient = useQueryClient()
  const { mutate: updateTransaction } = useTransactionUpdateMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY.default })
    },
  })

  const [payee, setPayee] = useState(defaultValue)

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setPayee(value)

  const handleBlur = () => {
    updateTransaction({
      id,
      data: {
        ...(type === 'expense' ? { to: payee } : { from: payee }),
      },
    })
    endEdit()
  }

  return (
    <TextField.Root
      type="text"
      placeholder="거래처를 입력하세요"
      value={payee}
      onChange={handleChange}
      onBlur={handleBlur}
      size={ELEMENT_SIZE_SMALL}
      autoFocus={true}
      required
    />
  )
}
