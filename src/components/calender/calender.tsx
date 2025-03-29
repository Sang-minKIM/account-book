import { TriangleLeftIcon, TriangleRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Grid as RGrid, IconButton, Text } from '@radix-ui/themes'

import { times } from 'es-toolkit/compat'
import styled from 'styled-components'
import { getDayOfFirstDayInMonth, getLastDayOfMonth } from './services/calender'
import { ACTION_TYPE, DAY_TITLES } from './calender.model'
import { CalenderProps } from './calender.type'
import { transactionAmountFormat } from '~/utils/units'

export function Calender({ year, month, day, dispatch, getDailyTransaction, onDateChange }: CalenderProps) {
  return (
    <Container direction="column" width="100%" height="fit-content">
      <Flex justify="center" mb="2" align="center" py="2" gap="2">
        <IconButton size="1" variant="ghost" onClick={() => dispatch({ type: ACTION_TYPE.SET_PREV_MONTH })} ml="2">
          <TriangleLeftIcon width="22" height="22" color="gray" />
        </IconButton>
        <Flex align="center" gap="2">
          <Flex gap="1">
            <Text>
              {year}년 {month + 1}월
            </Text>
          </Flex>
        </Flex>
        <IconButton size="1" variant="ghost" onClick={() => dispatch({ type: ACTION_TYPE.SET_NEXT_MONTH })} mr="2">
          <TriangleRightIcon width="22" height="22" color="gray" />
        </IconButton>
      </Flex>
      {/* 요일 표시 */}
      <Flex mb="1">
        {DAY_TITLES.map((dayTitle, index) => (
          <Day size="2" align="center" key={index} color="gray">
            {dayTitle}
          </Day>
        ))}
      </Flex>

      <Grid columns="7" justify="center" align="center" gap="2" width="100%" height="100%">
        {/* 이전 달의 날짜들 */}
        {times(getDayOfFirstDayInMonth(year, month), (index) => (
          <DayButton radius="large" size="3" key={index} disabled>
            {getLastDayOfMonth(year, month - 1) - getDayOfFirstDayInMonth(year, month) + index + 1}
          </DayButton>
        ))}
        {/* 현재 달의 날짜들 */}
        {times(getLastDayOfMonth(year, month), (index) => {
          const selected = index === day - 1
          const date = index + 1
          const expense = getDailyTransaction({ type: 'expense', year, month: month + 1, day: date })
          const income = getDailyTransaction({ type: 'income', year, month: month + 1, day: date })
          return (
            <DayButton
              radius="large"
              key={index}
              color="gray"
              variant={selected ? 'outline' : 'soft'}
              size="3"
              onClick={() => dispatch({ type: ACTION_TYPE.SET_DAY, payload: index + 1 })}
            >
              {date}
              <Flex direction="column" align="center" justify="center">
                <Text size="1" color="blue">
                  {income > 0 && transactionAmountFormat({ amount: income, type: 'income' })}
                </Text>
                <Text size="1" color="red">
                  {expense > 0 && transactionAmountFormat({ amount: expense, type: 'expense' })}
                </Text>
              </Flex>
            </DayButton>
          )
        })}
        {/* 다음 달의 날짜들 */}
        {times(7 - getDayOfFirstDayInMonth(year, month + 1), (index) => (
          <DayButton radius="large" size="3" key={index} disabled>
            {index + 1}
          </DayButton>
        ))}
      </Grid>
    </Container>
  )
}

const Container = styled(Flex)`
  flex: 1;
`

const Day = styled(Text)`
  flex: 1;
`
const Grid = styled(RGrid)`
  justify-items: center;
`

const DayButton = styled(Button)`
  width: 100%;
  height: 100%;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
  box-sizing: border-box;
  background-color: transparent;
`
