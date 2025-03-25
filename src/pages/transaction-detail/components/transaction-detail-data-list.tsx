import { DataList, Text } from '@radix-ui/themes'
import { TransactionDetailDataListProps } from './transaction-detail-data-list.type'
import styled from 'styled-components'
import { commaNumber } from '~/utils/number-format'
import { WON_UNIT } from '~/constants/unit'

export const TransactionDetailDataList = ({
  type,
  amount,
  payee,
  memo,
  category,
  date,
}: TransactionDetailDataListProps) => {
  return (
    <DataList.Root size="3">
      <Item>
        <DataList.Label minWidth="88px">거래처</DataList.Label>

        <DataList.Value>{payee}</DataList.Value>
      </Item>
      <Item>
        <DataList.Label minWidth="88px">금액</DataList.Label>
        <DataList.Value>
          <Text weight="bold" size="4" color={type === 'expense' ? 'red' : 'blue'}>
            {type === 'expense' ? '' : '+'}
            {commaNumber(amount)}
            {WON_UNIT}
          </Text>
        </DataList.Value>
      </Item>
      <Item>
        <DataList.Label minWidth="88px">카테고리</DataList.Label>
        <DataList.Value>{category}</DataList.Value>
      </Item>
      <Item>
        <DataList.Label minWidth="88px">메모</DataList.Label>
        <DataList.Value>{memo}</DataList.Value>
      </Item>
      <Item>
        <DataList.Label minWidth="88px">거래일시</DataList.Label>
        <DataList.Value>{date}</DataList.Value>
      </Item>
    </DataList.Root>
  )
}

const Item = styled(DataList.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  min-width: 20rem;
`
