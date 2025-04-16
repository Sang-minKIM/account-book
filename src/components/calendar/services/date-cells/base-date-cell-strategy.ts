import { map, pipe, range, toArray } from '@fxts/core'

import { getDay } from '../../utils/get-day'
import { DateCellRenderer, DateRange } from '../../types'
import { DateCell } from '../../date-cell'

export abstract class BaseDateCellStrategy {
  constructor(protected dateCellRenderer: DateCellRenderer) {}

  abstract calculateRange(year: number, month: number): DateRange

  createCells(year: number, month: number): ReturnType<typeof DateCell>[] {
    const range = this.calculateRange(year, month)
    return pipe(
      this.inclusiveRange(range.startDate, range.endDate),
      map((date) =>
        this.dateCellRenderer({
          year,
          month: this.getTargetMonth(month),
          date,
          day: getDay(year, this.getTargetMonth(month), date),
        })
      ),
      toArray
    )
  }

  private inclusiveRange(start: number, inclusiveEnd: number) {
    const RANGE_OFFSET = 1
    return range(start, inclusiveEnd + RANGE_OFFSET)
  }

  protected abstract getTargetMonth(month: number): number
}
