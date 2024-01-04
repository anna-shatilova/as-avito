import { useGetAdsUserQuery, useGetUserQuery } from '../../api/adsApi'
import { Cards } from '../../components/cards/Cards'
import * as S from './ProfilePage.styles'
import { baseUrl } from '../../utils/baseUrl'
import { Loader } from '../../App.styles'

export const ProfilePage = () => {
  const { data, isLoading, error } = useGetUserQuery()
  const { data: adsUser } = useGetAdsUserQuery()

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
              Здравствуйте, {data.name ? data.name : data.email}!
            </S.ProfileTitle>

            <S.Profile>
              <S.ProfileContent>
                <S.ProfileHeading>Настройки профиля</S.ProfileHeading>
                <S.ProfileSettings>
                  <S.SettingsLeft>
                    <S.SettingsAvatar>
                      <a
                        href="#"
                        target="_self"
                      >
                        <img src={data.avatar && baseUrl + data.avatar} />
                      </a>
                    </S.SettingsAvatar>
                    <S.SettingsChangeAvatar
                      href="#"
                      target="_self"
                    >
                      Заменить
                    </S.SettingsChangeAvatar>
                  </S.SettingsLeft>
                  <S.SettingsRight>
                    <S.SettingsForm>
                      <S.SettingsInputContainer>
                        <label htmlFor="fname">Имя</label>
                        <input
                          name="fname"
                          type="text"
                          placeholder="Введите имя"
                        />
                      </S.SettingsInputContainer>

                      <S.SettingsInputContainer>
                        <label htmlFor="lname">Фамилия</label>
                        <input
                          name="lname"
                          type="text"
                          placeholder="Введите фамилию"
                        />
                      </S.SettingsInputContainer>

                      <S.SettingsInputContainer>
                        <label htmlFor="city">Город</label>
                        <input
                          name="city"
                          type="text"
                          placeholder="Введите город"
                        />
                      </S.SettingsInputContainer>

                      <S.SettingsInputContainer>
                        <label htmlFor="phone">Телефон</label>
                        <input
                          name="phone"
                          type="tel"
                          placeholder="Введите номер телефона"
                        />
                      </S.SettingsInputContainer>

                      <S.SettingsButton>Сохранить</S.SettingsButton>
                    </S.SettingsForm>
                  </S.SettingsRight>
                </S.ProfileSettings>
              </S.ProfileContent>
            </S.Profile>
          </S.ProfileContainer>
          <S.CardsContainer>
            <S.ProfileHeading>Мои товары</S.ProfileHeading>
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
