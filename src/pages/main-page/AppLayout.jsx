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
import { Context } from '../../context/searchContext'
import { useState } from 'react'

export const AppLayout = () => {
  
  const [searchText, setSearchText] = useState('')

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Container>
          <Header />
          <Main>
            <Context.Provider value={[searchText, setSearchText]}>
              <Search />
              <MainContainer>
                <Outlet />
              </MainContainer>
            </Context.Provider>
          </Main>
          <Footer />
        </Container>
      </Wrapper>
    </>
  )
}
