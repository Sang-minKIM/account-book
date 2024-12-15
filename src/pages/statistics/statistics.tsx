import { DonutChart } from './components/donut-chart'

export const Statistics = () => {
  const expenses = [
    { label: '식비', amount: 300 },
    { label: '기타', amount: 50 },
    { label: '교통비', amount: 150 },
    { label: '유흥비', amount: 100 },
  ]
  return <DonutChart data={expenses} />
}
