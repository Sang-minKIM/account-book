import { BaseDateCellStrategy } from './base-date-cell-strategy'

export class DateCellContext {
  constructor(private dateCellStrategy: BaseDateCellStrategy) {}

  createCells(year: number, month: number) {
    return this.dateCellStrategy.createCells(year, month)
  }
}
