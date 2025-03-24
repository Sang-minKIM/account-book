import { Text } from '@radix-ui/themes'
import { ReactNode } from 'react'

export const AccordionTitle = ({ children }: { children: ReactNode | string }) => {
  return (
    <>
      {typeof children === 'string' ? (
        <Text size="2" color="gray" weight="medium">
          {children}
        </Text>
      ) : (
        children
      )}
    </>
  )
}
AccordionTitle.type = 'AccordionTitle' as const
