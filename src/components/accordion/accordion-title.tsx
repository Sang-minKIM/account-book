import { Text } from '@radix-ui/themes'
import { ReactNode } from 'react'

export const AccordionTitle = ({
  children,
  weight = 'medium',
}: {
  children: ReactNode | string
  weight?: 'medium' | 'bold' | 'regular' | 'light'
}) => {
  return (
    <>
      {typeof children === 'string' ? (
        <Text size="2" weight={weight}>
          {children}
        </Text>
      ) : (
        children
      )}
    </>
  )
}
AccordionTitle.type = 'AccordionTitle' as const
