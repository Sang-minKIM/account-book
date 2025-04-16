import { Flex, Grid, Text } from '@radix-ui/themes'
import { useCalendarContext } from './context'
import { getFirstDayOfMonth } from './services/get-first-day-of-month'
import { getLastDateOfMonth } from './services/get-last-date-of-month'
import { getDay } from './services/get-day'
import { map, pipe, range, toArray } from '@fxts/core'
import { DateCell } from './date-cell'
import styled from 'styled-components'

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

  const firstDayOfCurrentMonth = getFirstDayOfMonth(year, month)
  const lastDateOfPrevMonth = getLastDateOfMonth(year, month - 1)

  const prevMonthStartDate = lastDateOfPrevMonth - firstDayOfCurrentMonth + 1
  const prevMonthEndDate = lastDateOfPrevMonth

  const prevMonthDateCells = pipe(
    inclusiveRange(prevMonthStartDate, prevMonthEndDate),
    map((date) => {
      return dateCells.prevMonthDate?.({
        year,
        month,
        date,
        day: getDay(year, month, date),
      })
    }),
    toArray
  )

  const currentMonthStartDate = 1
  const currentMonthEndDate = getLastDateOfMonth(year, month)

  const currentMonthDateCells = pipe(
    inclusiveRange(currentMonthStartDate, currentMonthEndDate),
    map((date) => {
      return dateCells.currentMonthDate({
        year,
        month,
        date,
        day: getDay(year, month, date),
      })
    }),
    toArray
  )

  const firstDayOfNextMonth = getFirstDayOfMonth(year, month + 1)

  const nextMonthStartDate = 1
  const nextMonthEndDate = WEEK_DAY_COUNT - firstDayOfNextMonth

  const nextMonthDateCells = pipe(
    inclusiveRange(nextMonthStartDate, nextMonthEndDate),
    map((date) => {
      return dateCells.nextMonthDate?.({
        year,
        month,
        date,
        day: getDay(year, month, date),
      })
    }),
    toArray
  )

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
        {prevMonthDateCells}
        {currentMonthDateCells}
        {nextMonthDateCells}
      </Grid>
    </>
  )
}
const WEEK_DAY_COUNT = 7
const DAY_TITLES = ['일', '월', '화', '수', '목', '금', '토']

function inclusiveRange(start: number, inclusiveEnd: number) {
  const RANGE_OFFSET = 1
  return range(start, inclusiveEnd + RANGE_OFFSET)
}

const WeekDayLabel = styled(Text)`
  flex: 1;
`
