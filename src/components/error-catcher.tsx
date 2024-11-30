import { useEffect } from 'react'
import { useErrorStore } from '~/stores/error'

export const ErrorCatcher = () => {
  const { error } = useErrorStore()
  useEffect(() => {
    if (!error) {
      return
    }
    // FIXME: 에러 코드에 따라 Fallback UI, Toast, Modal등 다른 처리를 해야함
    /*
    if (!isPredictableError(error.errorCode)) {
      throw error
    }
    modal.error(ERROR_MESSAGE[error.errorCode])
    */
    throw error
  }, [error])
  return <></>
}
