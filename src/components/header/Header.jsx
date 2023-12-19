// import { useSelector } from 'react-redux'
import * as S from './Header.styles'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AddNewAdv } from '../modals/AddNewAdv'

export const Header = () => {
  const user = false
  // useSelector((state) => state.auth.email)
  const [modalAddNewAdv, setModalAddNewAdv] = useState(false)
  const navigate = useNavigate()

  const displayHeaderButton = user ? 'flex' : 'none'
  const handlerModalAddNewAdv = () => {
    setModalAddNewAdv(!modalAddNewAdv)
  }
  const handlerChangeModal = () => {
    user ? navigate('/seller-profile') : navigate('/login')
  }
  return (
    <>
      <S.Header>
        <S.HeaderNav>
          <S.HeaderButton
            onClick={handlerModalAddNewAdv}
            style={{ display: displayHeaderButton }}
          >
            Разместить объявление
          </S.HeaderButton>
          <S.HeaderButton onClick={handlerChangeModal}>
            {user ? 'Личный кабинет' : 'Вход в личный кабинет'}
          </S.HeaderButton>
        </S.HeaderNav>
      </S.Header>

      {modalAddNewAdv ? (
        <AddNewAdv setModalAddNewAdv={setModalAddNewAdv} />
      ) : (
        ''
      )}
    </>
  )
}
