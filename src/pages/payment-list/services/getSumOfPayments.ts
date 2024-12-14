import { Payment, RequiredInfo } from '~/queries/payment'

export const getSumOfPayments = (type: RequiredInfo['type'], payments: Payment[]) => {
  return payments.reduce((sum, payment) => {
    if (payment.type === type) {
      return sum + payment.amount
    }
    return sum
  }, 0)
}
