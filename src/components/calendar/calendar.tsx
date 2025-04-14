import styled from 'styled-components'
import { times } from 'es-toolkit/compat'

import { TriangleLeftIcon, TriangleRightIcon } from '@radix-ui/react-icons'
import { Flex, Grid as RGrid, IconButton, Text } from '@radix-ui/themes'

import { getFirstDayOfMonth } from './services/get-first-day-of-month'
import { getLastDayOfMonth } from './services/get-last-date-of-month'
import { Day } from './day'
import { getDay } from './services/get-day'

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
        {/* 이전 달의 날짜들 */}
        {/* {pipe(range())} */}
        {times(getFirstDayOfMonth(year, month), (index) => {
          if (typeof dateCells.prevMonthDate === 'function') {
            console.log(getLastDayOfMonth(year, month - 1))
            const date = getLastDayOfMonth(year, month - 1) - getFirstDayOfMonth(year, month) + index + 1
            return dateCells.prevMonthDate({
              year,
              month,
              date,
              day: getDay(year, month, date),
            })
          }
        })}
        {/* 현재 달의 날짜들 */}
        {times(getLastDayOfMonth(year, month), (index) => {
          const date = index + 1
          return dateCells.currentMonthDate({
            year,
            month,
            date,
            day: getDay(year, month, date),
          })
        })}
        {/* 다음 달의 날짜들 */}
        {times(7 - getFirstDayOfMonth(year, month + 1), (index) => {
          if (typeof dateCells.nextMonthDate === 'function') {
            const date = index + 1
            return dateCells.nextMonthDate({
              year,
              month,
              date,
              day: getDay(year, month, date),
            })
          }
        })}
      </Grid>
    </Container>
  )
}

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
