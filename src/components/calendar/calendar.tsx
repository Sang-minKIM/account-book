import styled from 'styled-components'

import { Flex } from '@radix-ui/themes'

import { CalendarContext } from './context'
import { CalendarHeader } from './calendar-header'
import { PropsWithChildren } from 'react'
import { CalendarBody } from './calendar-body'

interface CalendarProps {
  year: number
  month: number
}

export const Calendar = ({ year, month, children }: PropsWithChildren<CalendarProps>) => {
  return (
    <CalendarContext.Provider value={{ year, month }}>
      <Container direction="column" width="100%" height="fit-content" gap="2">
        {children}
        {/* 요일 표시 */}
      </Container>
    </CalendarContext.Provider>
  )
}

Calendar.Header = CalendarHeader
Calendar.Body = CalendarBody
const Container = styled(Flex)`
  /* flex: 1; */
`
