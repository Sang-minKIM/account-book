// ... existing code ...
import { PropsWithChildren, useState } from 'react'
import { Table as RadixTable } from '@radix-ui/themes'
import {
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  RowSelectionState,
  PaginationState,
} from '@tanstack/react-table'
import { TableContext } from './context'
import { S } from './style'

interface TableRootProps<T> {
  data: T[]
  columns: ColumnDef<T, unknown>[]
  enableRowSelection?: boolean
  enableMultiRowSelection?: boolean
  enableSorting?: boolean
  enablePagination?: boolean
  updateData?: (rowIndex: number, columnId: string, value: unknown) => void
}

export const TableRoot = <T,>({
  data,
  columns,
  enableRowSelection = false,
  enableMultiRowSelection = false,
  enableSorting = false,
  enablePagination = false,
  updateData,
  children,
}: PropsWithChildren<TableRootProps<T>>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>(
    enablePagination
      ? {
          pageIndex: 0,
          pageSize: 10,
        }
      : { pageIndex: 0, pageSize: data.length }
  )

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination,
    },
    enableRowSelection,
    enableMultiRowSelection,
    enableSorting,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    meta: {
      updateData,
    },
  })

  return (
    <TableContext.Provider value={{ table, pagination }}>
      <S.TableWrapper>
        <RadixTable.Root variant="surface">{children}</RadixTable.Root>
      </S.TableWrapper>
    </TableContext.Provider>
  )
}
