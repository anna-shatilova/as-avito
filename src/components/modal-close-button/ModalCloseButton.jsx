import * as S from './ModalCloseButton.styles'

export const ModalCloseButton = ({ setOpenModalWindow }) => {
  const handleChangeOpen = () => {
    setOpenModalWindow((isOpenModalWindow) => !isOpenModalWindow)
  }

  return (
    <S.ModalButtonClose onClick={handleChangeOpen}>
      <S.ModalButtonCloseLine></S.ModalButtonCloseLine>
    </S.ModalButtonClose>
  )
}
