import styled from 'styled-components'

import { Flex } from '@radix-ui/themes'

import { CalendarContext } from './context'
import { CalendarHeader } from './calendar-header'
import { PropsWithChildren } from 'react'
import { CalendarBody } from './calendar-body'
import type { OneBasedMonth } from './types'
interface CalendarProps {
  year: number
  oneBasedMonth: OneBasedMonth
}

export const Calendar = ({ year, oneBasedMonth, children }: PropsWithChildren<CalendarProps>) => {
  return (
    <CalendarContext.Provider value={{ year, oneBasedMonth }}>
      <Container direction="column" width="100%" height="fit-content" gap="2">
        {children}
      </Container>
    </CalendarContext.Provider>
  )
}

Calendar.Header = CalendarHeader
Calendar.Body = CalendarBody
const Container = styled(Flex)`
  /* flex: 1; */
`
