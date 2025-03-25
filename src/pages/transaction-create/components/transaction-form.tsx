import { Button, Flex } from '@radix-ui/themes'
import { RequiredInfoFields } from './required-info-fields'
import { OptionalInfoFields } from './optional-info-fields'
import { ELEMENT_SIZE } from '~/constants/style'
import { TransactionFormProps } from './transaction-form.type'

export const TransactionForm = ({
  handleSubmit,
  requiredInfo,
  optionalInfo,
  dispatchRequired,
  dispatchOptional,
}: TransactionFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <Flex gap="7" direction="column" justify="between">
        <RequiredInfoFields requiredInfo={requiredInfo} dispatchRequired={dispatchRequired} />
        <OptionalInfoFields optionalInfo={optionalInfo} dispatchOptional={dispatchOptional} />
        <Button type="submit" size={ELEMENT_SIZE}>
          저장
        </Button>
      </Flex>
    </form>
  )
}
