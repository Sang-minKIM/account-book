import { Outlet } from 'react-router-dom'
import { Container } from '@radix-ui/themes'
import { Sidebar } from './sidebar'
import { styled } from 'styled-components'

export const MainLayout = () => {
  return (
    <Main>
      <Sidebar />
      <Container width="calc(100% - 200px)" height="100%">
        <Outlet />
      </Container>
    </Main>
  )
}

const Main = styled.main`
  background-color: rgba(246, 247, 249, 1);
  width: 100%;
  height: 100dvh;
  display: flex;
`
