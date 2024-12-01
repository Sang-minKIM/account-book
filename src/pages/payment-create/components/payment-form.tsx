import { Flex } from '@radix-ui/themes'
import { RequiredInfo } from './required-info'
import { OptionalInfo } from './optional-info'
import { usePaymentFormViewModel } from '../hooks/use-payment-form-view-model'

export const PaymentForm = () => {
  const { handleSubmit, requiredInfo, optionalInfo, dispatchRequired, dispatchOptional } = usePaymentFormViewModel()
  return (
    <form onSubmit={handleSubmit}>
      <Flex gap="4">
        <RequiredInfo requiredInfo={requiredInfo} dispatchRequired={dispatchRequired} />
        <OptionalInfo optionalInfo={optionalInfo} dispatchOptional={dispatchOptional} />
      </Flex>
    </form>
  )
}
