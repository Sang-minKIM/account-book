import styled from 'styled-components'

import { Flex, Grid, Text } from '@radix-ui/themes'

import { useCalendarContext } from './context'
import {
  PrevMonthDateCellStrategy,
  CurrentMonthDateCellStrategy,
  NextMonthDateCellStrategy,
  DateCellContext,
} from './services/date-cells'
import type { DateCellDef } from './types'

export const CalendarBody = ({ dateCells }: { dateCells: DateCellDef }) => {
  const { year, oneBasedMonth } = useCalendarContext()

  const dateCellsByMonth = {
    prev:
      dateCells.prevMonthDate &&
      new DateCellContext(new PrevMonthDateCellStrategy(dateCells.prevMonthDate)).createCells(year, oneBasedMonth),

    current: new DateCellContext(new CurrentMonthDateCellStrategy(dateCells.currentMonthDate)).createCells(
      year,
      oneBasedMonth
    ),

    next:
      dateCells.nextMonthDate &&
      new DateCellContext(new NextMonthDateCellStrategy(dateCells.nextMonthDate)).createCells(year, oneBasedMonth),
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
