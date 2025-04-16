import { useCalendarContext } from './context'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { TriangleLeftIcon, TriangleRightIcon } from '@radix-ui/react-icons'

interface HeaderProps {
  onPrevMonthClick: () => void
  onNextMonthClick: () => void
}

export const CalendarHeader = ({ onPrevMonthClick, onNextMonthClick }: HeaderProps) => {
  const { year, month } = useCalendarContext()
  const MONTH_DISPLAY_OFFSET = 1
  return (
    <Flex justify="center" mb="2" align="center" py="2" gap="2">
      <IconButton size="1" variant="ghost" onClick={onPrevMonthClick} ml="2">
        <TriangleLeftIcon width="22" height="22" color="gray" />
      </IconButton>
      <Flex align="center" gap="2">
        <Flex gap="1">
          <Text>
            {year}년 {month + MONTH_DISPLAY_OFFSET}월
          </Text>
        </Flex>
      </Flex>
      <IconButton size="1" variant="ghost" onClick={onNextMonthClick} mr="2">
        <TriangleRightIcon width="22" height="22" color="gray" />
      </IconButton>
    </Flex>
  )
}
