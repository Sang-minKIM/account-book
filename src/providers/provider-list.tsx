import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

import { QueryProvider } from '~/providers/query-client-provider'
import { StrictPropsWithChildren } from '~/utils/props.type'

export const ProviderList = ({ children }: StrictPropsWithChildren) => {
  return (
    <QueryProvider>
      <Theme appearance="light" accentColor="iris" radius="medium">
        {children}
      </Theme>
    </QueryProvider>
  )
}
