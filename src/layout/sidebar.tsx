import { Avatar, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { Accordion } from '~/components/accordion'
import { ROUTE } from '~/router/route.model'

export const Sidebar = () => {
  return (
    <Aside>
      <Heading as="h1" align="left">
        자산 관리
      </Heading>

      <Card size="2">
        <Flex gap="3" align="center">
          <Avatar
            size="3"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            radius="full"
            fallback="김상민"
          />
          <Flex direction="column" gap="1">
            <Text size="2" weight="bold">
              김상민
            </Text>
            <Text size="2" color="gray">
              kimpran@naver.com
            </Text>
          </Flex>
        </Flex>
      </Card>
      <Accordion.Root>
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.Title>네비게이션</Accordion.Title>
            <Accordion.Icon />
          </Accordion.Header>
          <Accordion.Body>
            <Flex direction="column" gap="2">
              <Flex asChild>
                <NavLink to={ROUTE.root}>홈</NavLink>
              </Flex>
              <Text>홈</Text>
              <Text>홈</Text>
              <Text>홈</Text>
              <Text>홈</Text>
              <Text>홈</Text>
            </Flex>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion.Root>
    </Aside>
  )
}

const NavLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: var(--space-2);
  box-sizing: border-box;
`

const Aside = styled.aside`
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-2);
  box-sizing: border-box;
  align-items: start;
  border-right: 1px solid #e0e0e0;
`
