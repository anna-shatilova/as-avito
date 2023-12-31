import { useGetAdsUserQuery, useGetUserQuery } from '../../api/adsApi'
import { Cards } from '../../components/cards/Cards'
import { ShowPhoneNumButton } from '../../components/phone-num-button/ShowPhoneNumButton'
import { formatDate } from '../../utils/formatDate'
import * as S from './ProfilePage.styles'
import { baseUrl } from '../../utils/baseUrl'

export const ProfilePage = ({ adsSeller, isLoading, error, sellerPage }) => {
  const { data } = useGetUserQuery()
  const { data: adsUser } = useGetAdsUserQuery()
  console.log('ProfilePageData', data)

  console.log('ProfilePageAdsUser', adsUser)

  return (
    <>
      <S.ProfileContainer>
        <S.ProfileTitle>
          {sellerPage ? 'Профиль продавца' : `Здравствуйте, ${data.email}!`}
        </S.ProfileTitle>

        <S.Profile>
          <S.ProfileContent>
            {!sellerPage && (
              <S.ProfileHeading>Настройки профиля</S.ProfileHeading>
            )}
            <S.ProfileSettings>
              <S.SettingsLeft>
                <S.SettingsAvatar>
                  <a
                    href="#"
                    target="_self"
                  >
                    <img
                      src={
                        sellerPage
                          ? adsSeller[0]?.user?.avatar &&
                            baseUrl + adsSeller[0].user.avatar
                          : data.avatar && baseUrl + data.avatar
                      }
                    />
                  </a>
                </S.SettingsAvatar>
                {!sellerPage && (
                  <S.SettingsChangeAvatar
                    href="#"
                    target="_self"
                  >
                    Заменить
                  </S.SettingsChangeAvatar>
                )}
              </S.SettingsLeft>
              <S.SettingsRight>
                {!sellerPage && (
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
                )}
                {sellerPage && (
                  <S.SellerInfoContainer>
                    <p>{adsSeller[0].user.name}</p>
                    <p>{adsSeller[0].user.city}</p>
                    <p>
                      Продает товары с{' '}
                      {formatDate(adsSeller[0].user.sells_from)}
                    </p>

                    <div className="seller__img-mob-block">
                      <div
                        className="seller__img-mob"
                        style={{ display: 'none' }}
                      >
                        <a
                          href=""
                          target="_self"
                        >
                          <img
                            src="#"
                            alt=""
                          />
                        </a>
                      </div>

                      <ShowPhoneNumButton phone={adsSeller[0].user.phone} />
                    </div>
                  </S.SellerInfoContainer>
                )}
              </S.SettingsRight>
            </S.ProfileSettings>
          </S.ProfileContent>
        </S.Profile>
      </S.ProfileContainer>
      <S.CardsContainer>
        <S.ProfileHeading>
          {sellerPage ? 'Товары продавца' : 'Мои товары'}
        </S.ProfileHeading>
        <Cards
          data={sellerPage ? adsSeller : adsUser}
          isLoading={isLoading}
          error={error}
        />
      </S.CardsContainer>
    </>
  )
}
