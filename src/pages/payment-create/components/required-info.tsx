import { Flex, SegmentedControl, Text, TextField } from '@radix-ui/themes'
import { RequiredInfoProps } from './required-info.type'
import { commaNumber, parseCommaNumber } from '~/utils/number-format'

export const RequiredInfo = ({ requiredInfo: { type, date, payee, amount }, dispatchRequired }: RequiredInfoProps) => {
  // FIXME: 숫자 최대 10억으로 제한
  const displayAmount = amount === 0 ? '' : commaNumber(amount)
  const amountPlaceholder = '금액을 입력하세요'
  const datePlaceholder = '날짜를 입력하세요'
  const payeePlaceholder = `${type === 'expense' ? '지출처' : '수입처'}를 입력하세요`
  const textFieldSize = '3'
  return (
    <Flex direction="column" gap="2">
      <SegmentedControl.Root
        defaultValue="expense"
        value={type}
        onValueChange={(value) => dispatchRequired({ type: 'SET_TYPE', payload: value as 'expense' | 'income' })}
      >
        <SegmentedControl.Item value="expense">지출</SegmentedControl.Item>
        <SegmentedControl.Item value="income">수입</SegmentedControl.Item>
      </SegmentedControl.Root>
      <TextField.Root
        type="text"
        inputMode="numeric" // 모바일에서 숫자 키패드 표시
        pattern="[0-9, ,]*"
        placeholder={amountPlaceholder}
        value={displayAmount}
        onChange={({ target: { value } }) => dispatchRequired({ type: 'SET_AMOUNT', payload: parseCommaNumber(value) })}
        size={textFieldSize}
        required
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
        required
      />
      <TextField.Root
        type="datetime-local"
        placeholder={datePlaceholder}
        size={textFieldSize}
        value={date}
        onChange={(event) => dispatchRequired({ type: 'SET_DATE', payload: event.target.value })}
        required
      />
    </Flex>
  )
}

const WON_UNIT = '원'
