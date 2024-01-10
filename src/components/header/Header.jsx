import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as S from './Header.styles'
import { AddNewAdv } from '../modals/AddNewAdv'
import { setAuth } from '../../store/authSlice'

export const Header = () => {
  const user = useSelector((state) => state.auth.isAuth)

  const [openNewAdvWindow, setOpenNewAdvWindow] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlerModalAddNewAdv = () => {
    setOpenNewAdvWindow((openNewAdvWindow) => !openNewAdvWindow)
  }

  //функция закрывает модальное окно
  function closeNewAdvWindow() {
    setOpenNewAdvWindow((openNewAdvWindow) => !openNewAdvWindow)
  }


  const handleLogout = () => {
    dispatch(
      setAuth({
        access_token: '',
        refresh_token: '',
        isAuth: false,
      }),
    )
    localStorage.clear()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <S.Header>
        <S.HeaderNav>
          {user ? (
            <>
              <S.HeaderButton onClick={handlerModalAddNewAdv}>
                Разместить объявление
              </S.HeaderButton>
              <S.HeaderButton onClick={() => navigate('/profile')}>
                Личный кабинет
              </S.HeaderButton>
              <S.HeaderButton onClick={handleLogout}> Выйти</S.HeaderButton>
            </>
          ) : (
            <S.HeaderButton onClick={() => navigate('/login')}>
              Вход в личный кабинет
            </S.HeaderButton>
          )}
        </S.HeaderNav>
      </S.Header>

      {openNewAdvWindow &&
        <AddNewAdv isEditMode={false} setOpenNewAdvWindow={closeNewAdvWindow}  />
      }
    </>
  )
}
