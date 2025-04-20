export function getDay(year: number, month: number, date: number) {
  return new Date(year, month, date).toLocaleDateString('ko-KR', { weekday: 'short' })
}
