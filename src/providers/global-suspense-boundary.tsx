import { PropsWithChildren, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Loader } from '~/components'
// FIXME: 추후 에러 페이지 추가
export const GlobalSuspenseBoundary = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary fallback={<div>error...</div>}>{children}</ErrorBoundary>
    </Suspense>
  )
}
