import { ChevronRightIcon } from '@radix-ui/react-icons'
import { useNavigate, useMatch } from 'react-router-dom'
import { Flex, Text, Button } from '@radix-ui/themes'
import { styled } from 'styled-components'
import { PropsWithChildren } from 'react'

interface IconLinkProps extends PropsWithChildren {
  to: string
  title: string
}

export const IconLink = ({ to, children, title }: IconLinkProps) => {
  const navigate = useNavigate()
  const match = useMatch(to)

  return (
    <LinkButton onClick={() => navigate(to)} variant="ghost" color={match ? 'blue' : 'gray'}>
      <Flex align="center" gap="2">
        {children}
        <Text size="2" weight={match ? 'bold' : 'medium'}>
          {title}
        </Text>
      </Flex>
      <ChevronRightIcon />
    </LinkButton>
  )
}

const LinkButton = styled(Button)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`
