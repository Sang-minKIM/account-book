import { Button, Flex, SegmentedControl, Select, Text, TextArea, TextField, Grid, Card, Kbd } from '@radix-ui/themes'
import { ELEMENT_SIZE } from '~/constants/style'
import { WON_UNIT } from '~/constants/unit'
import { commaNumber, parseCommaNumber } from '~/utils/number-format'
import { usePaymentCreateFormViewModel } from '../hooks/use-payment-create-form-view-model'
import { MAX_MEMO_LENGTH } from '~/constants/payment'
import { Label } from '~/components/base'

export const PaymentCreateForm = () => {
  const { payment, dispatch, categoryList, handleSubmit, handleKeyDown } = usePaymentCreateFormViewModel()
  const { type, amount, payee, date, memo } = payment

  const displayAmount = amount === 0 ? '' : commaNumber(amount)

  const payeePlaceholder = `${type === 'expense' ? '지출처' : '수입처'}를 입력하세요`

  return (
    <Flex direction="column" gap="2">
      <Text size="4" weight="bold">
        거래 내역 추가
      </Text>
      <Card asChild>
        <form onKeyDown={handleKeyDown}>
          <Flex justify="between" align="center">
            <SegmentedControl.Root
              defaultValue="expense"
              value={type}
              onValueChange={(value) => dispatch({ type: 'SET_TYPE', payload: value as 'expense' | 'income' })}
              size="2"
            >
              <SegmentedControl.Item value="expense">지출</SegmentedControl.Item>
              <SegmentedControl.Item value="income">수입</SegmentedControl.Item>
            </SegmentedControl.Root>
            <Flex gap="2">
              <Button variant="soft" onClick={() => dispatch({ type: 'CLEAR' })}>
                초기화
              </Button>
              <Button variant="solid" onClick={handleSubmit}>
                <Flex align="center" gap="2">
                  <Text>등록</Text>
                  <Text>⌘ ⏎</Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
          <Grid columns="5" gap="4">
            <Flex direction="column" gap="2">
              <Label>금액</Label>
              <TextField.Root
                type="text"
                inputMode="numeric"
                pattern="[0-9, ,]*"
                placeholder="금액을 입력하세요"
                value={displayAmount}
                onChange={({ target: { value } }) => dispatch({ type: 'SET_AMOUNT', payload: parseCommaNumber(value) })}
                size={ELEMENT_SIZE}
                required
              >
                <TextField.Slot side="right">
                  <Text as="label" size={ELEMENT_SIZE} weight="bold">
                    {WON_UNIT}
                  </Text>
                </TextField.Slot>
              </TextField.Root>
            </Flex>

            <Flex direction="column" gap="2">
              <Label>지출처</Label>
              <TextField.Root
                type="text"
                placeholder={payeePlaceholder}
                size={ELEMENT_SIZE}
                value={payee}
                onChange={(event) => dispatch({ type: 'SET_PAYEE', payload: event.target.value })}
                required
              />
            </Flex>

            <Flex direction="column" gap="2">
              <Label>날짜</Label>
              <TextField.Root
                type="date"
                placeholder="날짜를 입력하세요"
                size={ELEMENT_SIZE}
                value={date}
                onChange={(event) => dispatch({ type: 'SET_DATE', payload: event.target.value })}
                required
              />
            </Flex>

            <Flex direction="column" gap="2">
              <Label>카테고리</Label>
              <Select.Root
                size={ELEMENT_SIZE}
                defaultValue={categoryList?.[0].id.toString()}
                onValueChange={(value) => dispatch({ type: 'SET_CATEGORY', payload: Number(value) })}
              >
                <Select.Trigger />
                <Select.Content>
                  {categoryList?.map((category) => (
                    <Select.Item key={category.id} value={category.id.toString()}>
                      {category.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction="column" gap="2">
              <Label>메모</Label>
              <TextArea
                size={ELEMENT_SIZE}
                placeholder="메모를 남겨보세요"
                value={memo}
                onChange={({ target: { value } }) => dispatch({ type: 'SET_MEMO', payload: value })}
                maxLength={MAX_MEMO_LENGTH}
              />
              <Text size="1" align="right">
                나만 볼 수 있는 메모 {memo.length}/{MAX_MEMO_LENGTH}
              </Text>
            </Flex>
          </Grid>
        </form>
      </Card>
    </Flex>
  )
}
