import { useNavigate, useRouteError } from 'react-router-dom'
import { Button, Flex, Heading, Text } from '@radix-ui/themes'
import { ReloadIcon, ArrowLeftIcon } from '@radix-ui/react-icons'

export const ErrorPage = () => {
  const error = useRouteError() as Error
  const navigate = useNavigate()

  const handleRetry = () => {
    // 현재 페이지 새로고침
    window.location.reload()
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Heading size="7" mb="4">
        오류가 발생했습니다
      </Heading>

      <Text as="p" color="gray" size="3" mb="5" align="center">
        {error.message || '요청을 처리하는 중에 문제가 발생했습니다.'}
      </Text>

      <Flex gap="4">
        <Button variant="soft" color="gray" onClick={handleGoBack}>
          <ArrowLeftIcon />
          돌아가기
        </Button>
        <Button onClick={handleRetry}>
          <ReloadIcon />
          다시 시도
        </Button>
      </Flex>
    </Flex>
  )
}
