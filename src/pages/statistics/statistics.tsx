import { DonutChart } from './components/donut-chart'

export const Statistics = () => {
  const expenses = [
    { category: '식비', amount: 300 },
    { category: '기타', amount: 50 },
    { category: '교통비', amount: 150 },
    { category: '유흥비', amount: 100 },
  ]
  return <DonutChart data={expenses} />
}
