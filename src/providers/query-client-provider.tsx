import { ReactNode } from 'react'

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useErrorStore } from '~/stores'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      useErrorStore.getState().updateError(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      useErrorStore.getState().updateError(error)
    },
  }),
})

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}
