export function getLastDayOfMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getPrevMonthAndYear(year: number, month: number): [number, number] {
  const prevMonth = month - 1
  const prevYear = prevMonth < 0 ? year - 1 : year
  return [prevYear, (prevMonth + 12) % 12]
}

export function getNextMonthAndYear(year: number, month: number): [number, number] {
  const nextMonth = month + 1
  const nextYear = nextMonth > 11 ? year + 1 : year
  return [nextYear, nextMonth % 12]
}

export function getDayOfFirstDayInMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}
