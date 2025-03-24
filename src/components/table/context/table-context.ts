import { Table } from '@tanstack/react-table'
import { createContext } from 'react'

import { useContext } from 'react'

type TableContextValue<T> = {
  table: Table<T>
  pagination: {
    pageIndex: number
    pageSize: number
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableContext = createContext<TableContextValue<any> | null>(null)

const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('Table 컴포넌트 내부에서만 사용할 수 있습니다')
  }
  return context
}

export { TableContext, useTableContext }
