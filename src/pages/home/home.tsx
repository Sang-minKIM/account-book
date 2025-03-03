import { PaymentAddForm } from './components/payment-add-form'
import { PaymentListTable } from './components/payment-list-table'

export const Home = () => {
  return (
    <>
      <PaymentAddForm />
      <PaymentListTable />
    </>
  )
}
