import { BarChartIcon, CalendarIcon, DashboardIcon, PieChartIcon, TableIcon } from '@radix-ui/react-icons'
import { Avatar, Card, Flex, Heading, Text } from '@radix-ui/themes'

import { styled } from 'styled-components'
import { Accordion } from '~/components/accordion'
import { ROUTE } from '~/router/route.model'
import { IconLink } from './icon-link'

export const Sidebar = () => {
  return (
    <Aside>
      <Heading as="h1" align="left">
        자산 관리
      </Heading>
      <Card size="2">
        <Flex gap="3" align="center">
          <Avatar size="3" src="https://avatars.githubusercontent.com/u/87116017?v=4" radius="full" fallback="김상민" />
          <Flex direction="column" gap="1" minWidth="149px">
            <Text size="2" weight="bold">
              김상민
            </Text>
            <Text size="2" color="gray">
              kimpran@naver.com
            </Text>
          </Flex>
        </Flex>
      </Card>
      <AccordionRoot>
        <Accordion.Item defaultOpen={true}>
          <Accordion.Header height="50px">
            <Accordion.Title weight="bold">네비게이션</Accordion.Title>
            <Accordion.Icon />
          </Accordion.Header>
          <Accordion.Body>
            <Flex direction="column" gap="2" width="100%">
              <IconLink to={ROUTE.dashboard.root} title="대시보드">
                <DashboardIcon />
              </IconLink>
              <IconLink to={ROUTE.calendar.root} title="캘린더">
                <CalendarIcon />
              </IconLink>
              <IconLink to={ROUTE.transactions.root} title="거래 내역">
                <TableIcon />
              </IconLink>
              <IconLink to={ROUTE.statistics} title="카테고리별 소비">
                <PieChartIcon />
              </IconLink>
              <IconLink to={ROUTE.savings.root} title="저축">
                <BarChartIcon />
              </IconLink>
            </Flex>
          </Accordion.Body>
        </Accordion.Item>
      </AccordionRoot>
    </Aside>
  )
}

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

const AccordionRoot = styled(Accordion.Root)`
  padding: var(--space-2);
`
