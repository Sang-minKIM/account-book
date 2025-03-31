import { ReactNode } from 'react'

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { confirmStore } from '~/stores/confirm-store'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: async (error) => {
      await confirmStore.open({
        title: '오류가 발생했습니다. 다시 시도해 주세요',
        description: error.message,
      })
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
