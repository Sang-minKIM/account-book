import { Select } from '@radix-ui/themes'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SORT_ORDER } from '~/constants/query'
import { ELEMENT_SIZE_SMALL } from '~/constants/style'
import { useCategoryListQuery } from '~/queries/category'
import { useTransactionUpdateMutation } from '~/queries/transactions'
import { TRANSACTIONS_KEY } from '~/queries/transactions/transactions.model'

interface TransactionListTableCategoryCellEditableProps {
  id: string
  defaultValue: number
  endEdit: () => void
}

export const TransactionListTableCategoryCellEditable = ({
  id,
  defaultValue,
  endEdit,
}: TransactionListTableCategoryCellEditableProps) => {
  const queryClient = useQueryClient()
  const { mutate: updateTransaction } = useTransactionUpdateMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY.default })
    },
  })

  const { data: categoryList } = useCategoryListQuery(SORT_ORDER.ASC)

  const [category, setCategory] = useState(defaultValue)

  const handleValueChange = (value: string) => {
    setCategory(Number(value))
    updateTransaction({
      id,
      data: { category: Number(value) },
    })
    endEdit()
  }

  return (
    <Select.Root size={ELEMENT_SIZE_SMALL} defaultValue={defaultValue.toString()} onValueChange={handleValueChange}>
      <Select.Trigger />
      <Select.Content>
        {categoryList?.map((category) => (
          <Select.Item key={category.id} value={category.id.toString()}>
            {category.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
