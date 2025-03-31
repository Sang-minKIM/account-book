import { Flex, Text, TextArea } from '@radix-ui/themes'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { ELEMENT_SIZE_SMALL } from '~/constants/style'
import { MAX_MEMO_LENGTH } from '~/constants/transaction'
import { useTransactionUpdateMutation } from '~/queries/transactions'
import { TRANSACTIONS_KEY } from '~/queries/transactions/transactions.model'

interface TransactionListTableMemoCellEditableProps {
  id: string
  defaultValue: string
  endEdit: () => void
}

export const TransactionListTableMemoCellEditable = ({
  id,
  defaultValue,
  endEdit,
}: TransactionListTableMemoCellEditableProps) => {
  const queryClient = useQueryClient()
  const { mutate: updateTransaction } = useTransactionUpdateMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY.default })
    },
  })

  const [memo, setMemo] = useState(defaultValue)

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => setMemo(value)

  const handleBlur = () => {
    updateTransaction({
      id,
      data: {
        memo,
      },
    })
    endEdit()
  }
  return (
    <Flex direction="column" gap="2">
      <TextArea
        size={ELEMENT_SIZE_SMALL}
        placeholder="메모를 남겨보세요"
        value={memo}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={MAX_MEMO_LENGTH}
        autoFocus
      />
      <Text size="1" align="right">
        나만 볼 수 있는 메모 {memo.length}/{MAX_MEMO_LENGTH}
      </Text>
    </Flex>
  )
}
