import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

import { QueryProvider } from '~/providers/query-client-provider'
import { StrictPropsWithChildren } from '~/types/props.type'
import { GlobalSuspenseBoundary } from './global-suspense-boundary'
import { GlobalStyle } from './globalStyle'
import { ConfirmDialog } from '~/hooks/use-confirm/components/confirm-dialog'

export const ProviderList = ({ children }: StrictPropsWithChildren) => {
  return (
    <Theme appearance="light" accentColor="blue" radius="small" scaling="100%" hasBackground>
      <GlobalStyle />
      <GlobalSuspenseBoundary>
        <QueryProvider>
          {children}
          <ConfirmDialog />
        </QueryProvider>
      </GlobalSuspenseBoundary>
    </Theme>
  )
}
