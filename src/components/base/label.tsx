import { Text } from '@radix-ui/themes'

export const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text as="label" size="2" weight="bold">
      {children}
    </Text>
  )
}
