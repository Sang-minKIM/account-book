import type { OneBasedMonth } from '../../types/one-based-month'
import type { BaseDateCellStrategy } from './base-date-cell-strategy'

export class DateCellContext {
  constructor(private dateCellStrategy: BaseDateCellStrategy) {}

  createCells(year: number, month: OneBasedMonth) {
    return this.dateCellStrategy.createCells(year, month)
  }
}
