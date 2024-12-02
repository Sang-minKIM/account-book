import { Flex, Spinner } from '@radix-ui/themes'

export const Loader = () => {
  return (
    <Flex align="center" justify="center" height="100dvh">
      <Spinner size="3" />
    </Flex>
  )
}
