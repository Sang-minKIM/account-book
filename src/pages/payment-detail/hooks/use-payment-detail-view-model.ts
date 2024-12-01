import { useParams } from 'react-router-dom'
import { usePaymentDetailQuery } from '~/queries/payment/payment.api'

export const usePaymentDetailViewModel = () => {
  const { id: paymentId } = useParams()
  console.log(paymentId)
  if (!paymentId) throw new Error('paymentId를 찾을 수 없습니다.')
  const {
    data: [
      {
        type,
        amount,
        from,
        to,
        memo,
        category: { name: category },
        date,
      },
    ],
  } = usePaymentDetailQuery(paymentId)
  const amountNumber = type === 'expense' ? -amount : amount
  const payee = type === 'expense' ? to : from
  const dateString = new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return { type, amount: amountNumber, payee, memo, category, date: dateString }
}
