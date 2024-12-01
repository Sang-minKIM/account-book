import { Flex, SegmentedControl, Text, TextField } from '@radix-ui/themes'
import { RequiredInfoProps } from './required-info.type'

export const RequiredInfo = ({ requiredInfo: { type, date, payee, amount }, dispatchRequired }: RequiredInfoProps) => {
  const displayAmount = amount === 0 ? '' : amount
  const amountPlaceholder = '금액을 입력하세요'
  const datePlaceholder = '날짜를 입력하세요'
  const payeePlaceholder = `${type === 'expense' ? '지출처' : '수입처'}를 입력하세요`
  const textFieldSize = '3'
  return (
    <Flex direction="column" gap="2" width="50%">
      <SegmentedControl.Root
        defaultValue="expense"
        value={type}
        onValueChange={(value) => dispatchRequired({ type: 'SET_TYPE', payload: value as 'expense' | 'income' })}
      >
        <SegmentedControl.Item value="expense">지출</SegmentedControl.Item>
        <SegmentedControl.Item value="income">수입</SegmentedControl.Item>
      </SegmentedControl.Root>
      <TextField.Root
        type="number"
        placeholder={amountPlaceholder}
        value={displayAmount}
        onChange={(event) => dispatchRequired({ type: 'SET_AMOUNT', payload: Number(event.target.value) })}
        size={textFieldSize}
      >
        <TextField.Slot side="right">
          <Text as="label" size={textFieldSize} weight="bold">
            {WON_UNIT}
          </Text>
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        type="text"
        placeholder={payeePlaceholder}
        size={textFieldSize}
        value={payee}
        onChange={(event) => dispatchRequired({ type: 'SET_PAYEE', payload: event.target.value })}
      />
      <TextField.Root
        type="datetime-local"
        placeholder={datePlaceholder}
        size={textFieldSize}
        value={date}
        onChange={(event) => dispatchRequired({ type: 'SET_DATE', payload: event.target.value })}
      />
    </Flex>
  )
}

const WON_UNIT = '원'
