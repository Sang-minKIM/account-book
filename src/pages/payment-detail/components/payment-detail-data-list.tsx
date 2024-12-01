import { DataList, Text } from '@radix-ui/themes'
import { PaymentDetailDataListProps } from './payment-detail-data-list.type'

export const PaymentDetailDataList = ({ type, amount, payee, memo, category, date }: PaymentDetailDataListProps) => {
  return (
    <DataList.Root>
      <DataList.Item align="center">
        <DataList.Label minWidth="88px">거래처</DataList.Label>
        <DataList.Value>{payee}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">금액</DataList.Label>
        <DataList.Value>
          <Text weight="bold" size="4" color={type === 'expense' ? 'red' : 'green'}>
            {amount}
          </Text>
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">카테고리</DataList.Label>
        <DataList.Value>{category}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">메모</DataList.Label>
        <DataList.Value>{memo}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">거래일시</DataList.Label>
        <DataList.Value>{date}</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  )
}
