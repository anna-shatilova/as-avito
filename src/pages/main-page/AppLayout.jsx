import { Outlet } from 'react-router-dom'
import {
  Container,
  GlobalStyles,
  Main,
  MainContainer,
  Wrapper,
} from '../../App.styles'
import { Header } from '../../components/header/Header'
import { Search } from '../../components/search/Search'
import { Footer } from '../../components/footer/Footer'

export const AppLayout = () => {

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Container>
          <Header />
          <Main>
          <Search />
          <MainContainer>
            <Outlet />
          </MainContainer>
          </Main>
          <Footer />
        </Container>
      </Wrapper>
    </>
  )
}
