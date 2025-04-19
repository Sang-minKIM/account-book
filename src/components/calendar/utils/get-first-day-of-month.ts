export function getFirstDayOfMonth(year: number, month: number): number {
  const FIRST_DATE_OF_MONTH = 1
  return new Date(year, month, FIRST_DATE_OF_MONTH).getDay()
}
