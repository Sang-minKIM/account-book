import { flexRender } from '@tanstack/react-table'
import { useTableContext } from './context'
import { Table as RadixTable } from '@radix-ui/themes'
import { S } from './style'

export const TableHeader = () => {
  const table = useTableContext()

  return (
    <RadixTable.Header>
      {table.getHeaderGroups().map((headerGroup) => (
        <S.TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <RadixTable.ColumnHeaderCell key={header.id}>
              {header.isPlaceholder ? null : (
                <div
                  {...{
                    className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              )}
            </RadixTable.ColumnHeaderCell>
          ))}
        </S.TableRow>
      ))}
    </RadixTable.Header>
  )
}
