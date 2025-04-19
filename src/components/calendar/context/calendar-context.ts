import { createContext, useContext } from 'react'
import type { OneBasedMonth } from '../types'

interface CalendarContextType {
  year: number
  month: OneBasedMonth
}

export const CalendarContext = createContext<CalendarContextType | null>(null)

export const useCalendarContext = () => {
  const context = useContext(CalendarContext)
  if (!context) throw new Error('CalendarContext는 Calendar 컴포넌트 내부에서만 사용할 수 있습니다.')
  return context
}
