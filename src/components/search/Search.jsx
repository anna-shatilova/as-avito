import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as S from './Search.styles'

export const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const displaySearchInput = location.pathname === '/' ? 'flex' : 'none'
  const displayGoMainPageButton = location.pathname === '/' ? 'none' : 'flex'
  return (
    <S.MainSearch>
      <Link to="/">
        <S.SearchLogoImg
          src="/img/logo.png"
          alt="logo"
        />
      </Link>
      <Link
        to="/"
        style={{ display: 'none' }}
      >
        <S.SearchLogoMobImg
          src="/img/logo-mob.png"
          alt="logo"
        />
      </Link>
      <S.SearchBlock>
        <S.SearchText
          type="search"
          placeholder="Поиск по объявлениям"
          name="search"
          style={{ display: displaySearchInput }}
        />
        <S.SearchTextMob
          type="search"
          placeholder="Поиск"
          name="search-mob"
        />
        <S.SearchButton style={{ display: displaySearchInput }}>
          Найти
        </S.SearchButton>
        <S.GoMainPageButton
          style={{ display: displayGoMainPageButton }}
          onClick={() => {
            navigate('/', { replace: true })
          }}
        >
          Вернуться на главную
        </S.GoMainPageButton>
      </S.SearchBlock>
    </S.MainSearch>
  )
}
