import { DateCellRenderer } from './date-cell-renderer'

export interface DateCellDef {
  prevMonthDate?: DateCellRenderer
  currentMonthDate: DateCellRenderer
  nextMonthDate?: DateCellRenderer
}
