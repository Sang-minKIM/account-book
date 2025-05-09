import { DateCell } from '../date-cell'
import { OneBasedMonth } from './one-based-month'

interface CalendarDayInfo {
  date: number
  year: number
  oneBasedMonth: OneBasedMonth
  day: string
}

export type DateCellRenderer = (info: CalendarDayInfo) => ReturnType<typeof DateCell>
