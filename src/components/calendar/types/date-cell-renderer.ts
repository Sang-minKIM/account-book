import { DateCell } from '../date-cell'

interface CalendarDayInfo {
  date: number
  year: number
  month: number
  day: string
}

export type DateCellRenderer = (info: CalendarDayInfo) => ReturnType<typeof DateCell>
