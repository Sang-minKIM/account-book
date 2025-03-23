import { useTableContext } from './context'
import { flexRender } from '@tanstack/react-table'
import { S } from './style'
import { Table as RadixTable } from '@radix-ui/themes'
export const TableBody = () => {
  const { table } = useTableContext()
  return (
    <S.TableBody>
      {table.getRowModel().rows.map((row) => (
        <S.TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <RadixTable.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</RadixTable.Cell>
          ))}
        </S.TableRow>
      ))}
      {table.getRowModel().rows.length === 0 && (
        <S.TableRow>
          <RadixTable.Cell colSpan={table.getAllColumns().length} style={{ textAlign: 'center' }}>
            데이터가 없습니다
          </RadixTable.Cell>
        </S.TableRow>
      )}
    </S.TableBody>
  )
}
