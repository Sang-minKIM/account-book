import { Text, TextField } from '@radix-ui/themes'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { ELEMENT_SIZE_SMALL } from '~/constants/style'
import { WON_UNIT } from '~/constants/unit'
import { useTransactionUpdateMutation } from '~/queries/transactions'
import { TRANSACTIONS_KEY } from '~/queries/transactions/transactions.model'
import { parseCommaNumber } from '~/utils/number-format'

export const TransactionListTableAmountCellEditable = ({
  id,
  defaultValue,
  endEdit,
}: {
  id: string
  defaultValue: number
  endEdit: () => void
}) => {
  const queryClient = useQueryClient()
  const { mutate: updateTransaction } = useTransactionUpdateMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY.default })
    },
  })

  const [amount, setAmount] = useState(defaultValue)

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(parseCommaNumber(value))

  const handleBlur = () => {
    updateTransaction({
      id,
      data: {
        amount,
      },
    })
    endEdit()
  }

  return (
    <TextField.Root
      type="text"
      inputMode="numeric"
      pattern="[0-9, ,]*"
      placeholder="금액을 입력하세요"
      value={amount}
      onChange={handleChange}
      onBlur={handleBlur}
      size={ELEMENT_SIZE_SMALL}
      autoFocus={true}
      required
    >
      <TextField.Slot side="right">
        <Text as="label" size={ELEMENT_SIZE_SMALL} weight="bold">
          {WON_UNIT}
        </Text>
      </TextField.Slot>
    </TextField.Root>
  )
}
