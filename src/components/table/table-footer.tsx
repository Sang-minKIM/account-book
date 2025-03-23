import { Button, Flex, Select, Text } from '@radix-ui/themes'

import { useTableContext } from './context'
import { S } from './style'

export const TableFooter = () => {
  const { table, pagination } = useTableContext()

  const isPaginationEnabled = pagination.pageSize !== table.getRowCount()

  return (
    <S.TableFooter>
      <Flex gap="3" align="center" justify="between" p="3">
        <div>
          <Text size="2">
            {table.getFilteredSelectedRowModel().rows.length}개 선택 / 총 {table.getFilteredRowModel().rows.length}개
          </Text>
        </div>
        {isPaginationEnabled && (
          <Flex gap="2" align="center">
            <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              이전
            </Button>
            <Text size="2">
              {table.getState().pagination.pageIndex + 1} / {table.getPageCount()} 페이지
            </Text>
            <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              다음
            </Button>
            <Select.Root
              value={String(table.getState().pagination.pageSize)} // defaultValue 대신 value 사용
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <Select.Trigger />
              <Select.Content>
                {[10, 20, 30, 50].map((pageSize) => (
                  <Select.Item key={pageSize} value={String(pageSize)}>
                    {pageSize}행
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
        )}
      </Flex>
    </S.TableFooter>
  )
}
