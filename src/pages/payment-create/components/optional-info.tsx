import { Flex, Select, Text, TextArea } from '@radix-ui/themes'

import { OptionalInfoProps } from './optional-info.type'
import { useCategoryListQuery } from '~/queries/category'
import { SORT_ORDER } from '~/constants/query'

export const OptionalInfo = ({ optionalInfo, dispatchOptional }: OptionalInfoProps) => {
  // FIXME: 리펙토링 필요 뷰모델로 옮길건지 결정, 메모 최대 길이 제한하는거 어떻게 할지
  const { data: categoryList } = useCategoryListQuery(SORT_ORDER.ASC)

  const handleMemoChange = (value: string) => {
    if (value.length > MAX_MEMO_LENGTH) {
      value = value.slice(0, MAX_MEMO_LENGTH)
    }
    dispatchOptional({ type: 'SET_MEMO', payload: value })
  }
  const defaultCategory = categoryList?.[0].name
  const categoryListContent = categoryList?.map((category) => (
    <Select.Item key={category.id} value={category.name}>
      {category.name}
    </Select.Item>
  ))
  return (
    <Flex direction="column" gap="2">
      <Select.Root
        defaultValue={defaultCategory}
        onValueChange={(value) => dispatchOptional({ type: 'SET_CATEGORY', payload: value })}
      >
        <Select.Trigger />
        <Select.Content>{categoryListContent}</Select.Content>
      </Select.Root>
      <TextArea
        placeholder="메모를 남겨보세요"
        onChange={({ target: { value } }) => handleMemoChange(value)}
        maxLength={MAX_MEMO_LENGTH}
      />
      <Text size="2">
        나만 볼 수 있는 메모 {optionalInfo.memo.length}/{MAX_MEMO_LENGTH}
      </Text>
    </Flex>
  )
}

const MAX_MEMO_LENGTH = 60
