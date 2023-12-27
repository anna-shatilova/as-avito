import { useNavigate } from 'react-router-dom'
import * as S from './AuthForm.styles'
import { useEffect, useState } from 'react'
import {
  useGetTokensMutation,
  useRegisterUserMutation,
} from '../../api/userApi'
import { trimSpaces } from '../../utils/trimSpaces'

export const AuthForm = ({ title, typeLogin }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [repPass, setRepPass] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')

  const [inputError, setInputError] = useState(null)

  const navigate = useNavigate()

  const [registerUser, { isLoading: regLoading }] = useRegisterUserMutation()
  const [getTokens, { isLoading }] = useGetTokensMutation()

  // Препятствует перезагрузке страницы при нажатиии кнопок, когда они находятся внутри формы
  const onSubmit = (event) => {
    event.preventDefault()
  }

  const handleClick = async () => {
    try {
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
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!pattern.test(email.toLowerCase())) {
        setInputError('Введите корректный email')
        return
      }

      if (typeLogin) {
        // Авторизация

        await getTokens({ email, password }).then((tokensData) => {
          if (tokensData.error?.status === 401) {
            setInputError('Неправильный пароль')
            return
          } else {
            localStorage.setItem('ads-board', JSON.stringify(tokensData.data))
            navigate('/profile', { replace: true })
          }
        })
      } else {
        // Регистрация
        await registerUser({
          email,
          password,
          name: trimSpaces(firstName),
          surname: trimSpaces(lastName),
          city: trimSpaces(city),
          role: 'user',
        }).then((userData) => {
          if (userData.error?.status === 400) {
            setInputError('Пользователь с таким email уже существует')
            return
          } else {
            getTokens({ email, password }).then((tokensData) => {
              localStorage.setItem('ads-board', JSON.stringify(tokensData.data))
              navigate('/profile', { replace: true })
            })
          }
        })
      }
    } catch (error) {
      setInputError(error.message)
    }
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
              {isLoading || regLoading ? 'Логинимся' : title}
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
