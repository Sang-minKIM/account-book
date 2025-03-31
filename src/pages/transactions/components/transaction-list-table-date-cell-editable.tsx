import { TextField } from '@radix-ui/themes'

import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { ELEMENT_SIZE_SMALL } from '~/constants/style'
import { useTransactionUpdateMutation } from '~/queries/transactions'
import { TRANSACTIONS_KEY } from '~/queries/transactions/transactions.model'

interface TransactionListTableDateCellEditableProps {
  id: string
  defaultValue: string
  endEdit: () => void
}

export const TransactionListTableDateCellEditable = ({
  id,
  defaultValue,
  endEdit,
}: TransactionListTableDateCellEditableProps) => {
  const queryClient = useQueryClient()
  const { mutate: updateTransaction } = useTransactionUpdateMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY.default })
    },
  })

  const [date, setDate] = useState(defaultValue)

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setDate(value)

  const handleBlur = () => {
    updateTransaction({
      id,
      data: {
        date,
      },
    })
    endEdit()
  }
  return (
    <TextField.Root
      type="date"
      placeholder="날짜를 입력하세요"
      size={ELEMENT_SIZE_SMALL}
      value={date}
      onChange={handleChange}
      onBlur={handleBlur}
      required
      autoFocus
    />
  )
}
