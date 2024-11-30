import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

import { ErrorCatcher } from '~/components'
import { QueryProvider } from '~/providers/query-client-provider'
import { StrictPropsWithChildren } from '~/types/props.type'
import { GlobalSuspenseBoundary } from './global-suspense-boundary'

export const ProviderList = ({ children }: StrictPropsWithChildren) => {
  return (
    <Theme appearance="light" accentColor="iris" radius="medium">
      <GlobalSuspenseBoundary>
        <QueryProvider>
          <ErrorCatcher />
          {children}
        </QueryProvider>
      </GlobalSuspenseBoundary>
    </Theme>
  )
}
