import { useNavigate } from 'react-router-dom'
import * as S from './AuthForm.styles'
import { useEffect, useState } from 'react'

export const AuthForm = ({ title, typeLogin }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [repPass, setRepPass] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')

  //   const [isLoading, setIsLoading] = useState(false)
  const [inputError, setInputError] = useState(null)

  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
  }
  //   const handleClick = async () => {
  //     try {
  const handleClick = () => {
    if (!email) {
      setInputError('Введите email')
      return
    }
    if (!pass) {
      setInputError('Введите пароль')
      return
    }
    if (!typeLogin && pass !== repPass) {
      setInputError('Пароли не совпадают')
      return
    }
    if (!typeLogin && pass.length < 8 && pass.length > 0) {
      setInputError('Пароль должен содержать не менее 8 символов')
      return
    }
    navigate('/profile')

    //   setIsLoading(true)
    //   let user = {}
    //   if (typeLogin) {
    //     user = await login({ email, pass })
    //   } else {
    //     user = await registration({ email, pass })
    //   }
    //   if (user) {
    //     dispatch(
    //       setUser({
    //         email: user.email,
    //         id: user.uid,
    //         token: user.accessToken,
    //       }),
    //     )
    //     saveUserInfoInLocalStorage(user)
    //     navigate('/')
    //   }
    // } catch (error) {
    // setInputError(error.message)
    // } finally {
    //   setIsLoading(false)
    // }
  }

  // Сбрасываем ошибку если пользователь меняет данные на форме или меняется режим формы
  useEffect(() => {
    setInputError(null)
  }, [email, pass])

  return (
    <S.AuthContainer>
      <S.Modal>
        <S.ModalLogo>
          <img
            src="/img/logo_modal.png"
            alt="logo"
          />
        </S.ModalLogo>
        <S.ModalForm onSubmit={onSubmit}>
          <S.Inputs>
            <S.ModalInput
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <S.ModalInput
              type="password"
              name="password"
              placeholder="Пароль"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            {!typeLogin && (
              <>
                <S.ModalInput
                  type="password"
                  name="repeat-password"
                  placeholder="Повторите пароль"
                  value={repPass}
                  onChange={(e) => setRepPass(e.target.value)}
                />
                <S.ModalInput
                  type="text"
                  name="first-name"
                  placeholder="Имя (необязательно)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <S.ModalInput
                  type="text"
                  name="last-name"
                  placeholder="Фамилия (необязательно)"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <S.ModalInput
                  type="text"
                  name="city"
                  placeholder="Город (необязательно)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </>
            )}
          </S.Inputs>
          {inputError && <S.Error>{inputError}</S.Error>}
          <S.Buttons>
            <S.ModalButton
              type="submit"
              //   disabled={isLoading}
              onClick={handleClick}
            >
              {/* {isLoading ? 'Логинимся' :  */}
              {title}
            </S.ModalButton>
            {typeLogin && (
              <S.ModalButtonRegister
                type="submit"
                onClick={() => navigate('/register')}
              >
                Зарегистрироваться
              </S.ModalButtonRegister>
            )}
          </S.Buttons>
        </S.ModalForm>
      </S.Modal>
    </S.AuthContainer>
  )
}
