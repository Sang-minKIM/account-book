import { PropsWithChildren, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
// FIXME: 추후 로더와 에러 페이지 추가
export const GlobalSuspenseBoundary = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ErrorBoundary fallback={<div>error...</div>}>{children}</ErrorBoundary>
    </Suspense>
  )
}
