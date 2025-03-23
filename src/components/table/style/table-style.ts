import { styled } from 'styled-components'
import { Table as RadixTable } from '@radix-ui/themes'

export const TableWrapper = styled.div`
  width: 100%;
  height: auto;
`

export const TableBody = styled(RadixTable.Body)`
  display: block;
  max-height: 400px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

export const TableRow = styled(RadixTable.Row)`
  display: table;
  width: 100%;
  table-layout: fixed;
`

export const TableFooter = styled.div`
  width: 100%;
  border-top: 1px solid var(--gray-5);
`
