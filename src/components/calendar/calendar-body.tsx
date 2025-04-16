import styled from 'styled-components'

import { Flex, Grid, Text } from '@radix-ui/themes'

import { useCalendarContext } from './context'
import { DateCell } from './date-cell'
import {
  PrevMonthDateCellStrategy,
  CurrentMonthDateCellStrategy,
  NextMonthDateCellStrategy,
  DateCellContext,
} from './services/date-cells'
interface CalendarDayInfo {
  date: number
  year: number
  month: number
  day: string
}

export interface DateCellDef {
  prevMonthDate?: (info: CalendarDayInfo) => ReturnType<typeof DateCell>
  currentMonthDate: (info: CalendarDayInfo) => ReturnType<typeof DateCell>
  nextMonthDate?: (info: CalendarDayInfo) => ReturnType<typeof DateCell>
}

export const CalendarBody = ({ dateCells }: { dateCells: DateCellDef }) => {
  const { year, month } = useCalendarContext()

  const dateCellsByMonth = {
    prev:
      dateCells.prevMonthDate &&
      new DateCellContext(new PrevMonthDateCellStrategy(dateCells.prevMonthDate)).createCells(year, month),

    current: new DateCellContext(new CurrentMonthDateCellStrategy(dateCells.currentMonthDate)).createCells(year, month),

    next:
      dateCells.nextMonthDate &&
      new DateCellContext(new NextMonthDateCellStrategy(dateCells.nextMonthDate)).createCells(year, month),
  }

  return (
    <>
      <Flex justify="center" mb="1">
        {DAY_TITLES.map((dayTitle, index) => (
          <WeekDayLabel size="2" align="center" key={index} color="gray">
            {dayTitle}
          </WeekDayLabel>
        ))}
      </Flex>

      <Grid columns="7" justify="center" align="center" width="100%" height="100%">
        {dateCellsByMonth.prev}
        {dateCellsByMonth.current}
        {dateCellsByMonth.next}
      </Grid>
    </>
  )
}

const DAY_TITLES = ['일', '월', '화', '수', '목', '금', '토']

const WeekDayLabel = styled(Text)`
  flex: 1;
`
