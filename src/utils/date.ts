export function dateFormat(date: string) {
  return new Date(date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })
}
