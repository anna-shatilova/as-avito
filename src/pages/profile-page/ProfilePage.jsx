import {
  useChangeInfoUserMutation,
  useGetAdsUserQuery,
  useGetUserQuery,
  useUploadUserAvatarMutation,
} from '../../api/adsApi'
import { Cards } from '../../components/cards/Cards'
import * as S from './ProfilePage.styles'
import { baseUrl } from '../../utils/baseUrl'
import { Loader } from '../../App.styles'
import { useEffect, useState } from 'react'

export const ProfilePage = () => {
  const { data: userData, isLoading, error } = useGetUserQuery()
  const { data: adsUser } = useGetAdsUserQuery()
  const [changeInfoUser] = useChangeInfoUserMutation()
  const [uploadUserAvatar] = useUploadUserAvatarMutation()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [isFormChanged, setIsFormChanged] = useState(false)
  const [isEditMode, setEditMode] = useState(false)

  const [typeError, setTypeError] = useState(null)

  const handlerNameChange = (e) => {
    setName(e.target.value.trim())
    setIsFormChanged(true)
  }

  const handlerSurnameChange = (e) => {
    setSurname(e.target.value.trim())
    setIsFormChanged(true)
  }

  const handlerCityChange = (e) => {
    setCity(e.target.value.trim())
    setIsFormChanged(true)
  }

  const handlerPhoneChange = (e) => {
    setPhone(e.target.value.trim())
    setIsFormChanged(true)
  }

  const handleEditModeBtn = () => {
    setEditMode(true)
  }
  const handleSaveChanges = async (evt) => {
    evt.preventDefault()

    await changeInfoUser({
      name,
      surname,
      city,
      phone,
    })
      .unwrap()
      .then((userData) => {
        setName(userData.name)
        setSurname(userData.surname)
        setCity(userData.city)
        setPhone(userData.phone)
      })

    setIsFormChanged(false)
    setEditMode(false)
  }

  useEffect(() => {
    if (userData) {
      setName(userData.name)
      setSurname(userData.surname)
      setCity(userData.city)
      setPhone(userData.phone)
    }
    setIsFormChanged(false)
  }, [userData])

  const uploadAvatar = async (evt) => {
    evt.preventDefault()

    const file = evt.target.files[0]
    if (!file?.type?.startsWith('image/')) {
      setTypeError('Неправильный формат изображения')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    await uploadUserAvatar(formData).unwrap()
    setTypeError(null)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p> Не удалось загрузить информацию, попробуйте позже</p>
      ) : (
        <>
          <S.ProfileContainer>
            <S.ProfileTitle>
              Здравствуйте, {userData.name ? userData.name : userData.email}!
            </S.ProfileTitle>

            <S.Profile>
              <S.ProfileContent>
                <S.ProfileHeading>Настройки профиля</S.ProfileHeading>
                {typeError && <S.TypeErrorText>{typeError}</S.TypeErrorText>}
                <S.ProfileSettings>
                  <S.SettingsLeft>
                    <S.SettingsAvatar>
                        <img
                          src={userData.avatar && baseUrl + userData.avatar}
                        />
                    </S.SettingsAvatar>
                    {isEditMode && (
                      <S.SettingsChangeAvatarLabel
                        htmlFor="avatar"
                        onChange={uploadAvatar}
                      >
                        Заменить
                        <input
                          id="avatar"
                          type="file"
                          accept="image/*"
                        />
                      </S.SettingsChangeAvatarLabel>
                    )}
                  </S.SettingsLeft>
                  <S.SettingsRight>
                    <S.SettingsForm>
                      {isEditMode ? (
                        <>
                          <S.SettingsInputContainer>
                            <label htmlFor="name">Имя</label>
                            <input
                              name="name"
                              type="text"
                              placeholder="Введите имя"
                              defaultValue={name}
                              onChange={handlerNameChange}
                            />
                          </S.SettingsInputContainer>

                          <S.SettingsInputContainer>
                            <label htmlFor="lname">Фамилия</label>
                            <input
                              name="surname"
                              type="text"
                              placeholder="Введите фамилию"
                              defaultValue={surname}
                              onChange={handlerSurnameChange}
                              // onClick={setInputFocus}
                            />
                          </S.SettingsInputContainer>

                          <S.SettingsInputContainer>
                            <label htmlFor="city">Город</label>
                            <input
                              name="city"
                              type="text"
                              placeholder="Введите город"
                              defaultValue={city}
                              onChange={handlerCityChange}
                            />
                          </S.SettingsInputContainer>

                          <S.SettingsInputContainer>
                            <label htmlFor="phone">Телефон</label>
                            <input
                              name="phone"
                              type="tel"
                              placeholder="Введите номер телефона"
                              defaultValue={phone}
                              onChange={handlerPhoneChange}
                            />
                          </S.SettingsInputContainer>

                          <S.SettingsButton onClick={() => setEditMode(false)}>
                            Назад
                          </S.SettingsButton>

                          <S.SettingsButton
                            disabled={!isFormChanged}
                            $disabled={!isFormChanged}
                            onClick={handleSaveChanges}
                          >
                            Сохранить
                          </S.SettingsButton>
                        </>
                      ) : (
                        <S.UserInfoContainer>
                          <p>
                            {name} {surname}
                          </p>
                          <p>{city}</p>
                          <p>{phone}</p>
                          <S.SettingsButton onClick={handleEditModeBtn}>
                            Редактировать
                          </S.SettingsButton>
                        </S.UserInfoContainer>
                      )}
                    </S.SettingsForm>
                  </S.SettingsRight>
                </S.ProfileSettings>
              </S.ProfileContent>
            </S.Profile>
          </S.ProfileContainer>
          <S.CardsContainer>
            <S.ProfileHeading>Мои товары</S.ProfileHeading>
            {/* {isAdsError ? (
          <h2>Ошибка: {adsError}</h2>
        ) : (
          !adsLoading && <Cards data={data} />
        )} */}
            <Cards
              data={adsUser}
              isLoading={isLoading}
              error={error}
            />
          </S.CardsContainer>
        </>
      )}
    </>
  )
}
