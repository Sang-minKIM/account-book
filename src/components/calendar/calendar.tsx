import styled from 'styled-components'

import { TriangleLeftIcon, TriangleRightIcon } from '@radix-ui/react-icons'
import { Flex, Grid as RGrid, IconButton, Text } from '@radix-ui/themes'

import { getFirstDayOfMonth } from './services/get-first-day-of-month'
import { getLastDateOfMonth } from './services/get-last-date-of-month'
import { Day } from './date-cell'
import { getDay } from './services/get-day'
import { map, pipe, range, toArray } from '@fxts/core'

interface CalendarDayInfo {
  date: number
  year: number
  month: number
  day: string
}

export interface DateCellDef {
  prevMonthDate?: (info: CalendarDayInfo) => ReturnType<typeof Day>
  currentMonthDate: (info: CalendarDayInfo) => ReturnType<typeof Day>
  nextMonthDate?: (info: CalendarDayInfo) => ReturnType<typeof Day>
}

interface CalendarProps {
  year: number
  month: number
  dateCells: DateCellDef
}

export const Calendar = ({ year, month, dateCells }: CalendarProps) => {
  const prevMonthDateCells = pipe(
    range(getLastDateOfMonth(year, month - 1) - getFirstDayOfMonth(year, month), getLastDateOfMonth(year, month - 1)),
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

  const currentMonthDateCells = pipe(
    range(FIRST_DATE_OF_MONTH, getLastDateOfMonth(year, month)),
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

  const nextMonthDateCells = pipe(
    range(FIRST_DATE_OF_MONTH, WEEK_DAY_COUNT - getFirstDayOfMonth(year, month)),
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
    <Container direction="column" width="100%" height="fit-content">
      <Flex justify="center" mb="2" align="center" py="2" gap="2">
        <IconButton size="1" variant="ghost" onClick={() => {}} ml="2">
          <TriangleLeftIcon width="22" height="22" color="gray" />
        </IconButton>
        <Flex align="center" gap="2">
          <Flex gap="1">
            <Text>
              {year}년 {month + 1}월
            </Text>
          </Flex>
        </Flex>
        <IconButton size="1" variant="ghost" onClick={() => {}} mr="2">
          <TriangleRightIcon width="22" height="22" color="gray" />
        </IconButton>
      </Flex>
      {/* 요일 표시 */}
      <Flex mb="1">
        {DAY_TITLES.map((dayTitle, index) => (
          <WeekDayLabel size="2" align="center" key={index} color="gray">
            {dayTitle}
          </WeekDayLabel>
        ))}
      </Flex>

      <Grid columns="7" justify="center" align="center" gap="2" width="100%" height="100%">
        {prevMonthDateCells}
        {currentMonthDateCells}
        {nextMonthDateCells}
      </Grid>
    </Container>
  )
}
const FIRST_DATE_OF_MONTH = 1
const WEEK_DAY_COUNT = 7
const DAY_TITLES = ['일', '월', '화', '수', '목', '금', '토']

const Container = styled(Flex)`
  flex: 1;
`

const WeekDayLabel = styled(Text)`
  flex: 1;
`
const Grid = styled(RGrid)`
  justify-items: center;
`
