import { useParams } from 'react-router-dom'
import { Cards } from '../../components/cards/Cards'
import { ShowPhoneNumButton } from '../../components/phone-num-button/ShowPhoneNumButton'
import { formatDate } from '../../utils/formatDate'
import * as S from './ProfilePage.styles'
import { baseUrl } from '../../utils/baseUrl'

import { useGetAdsQuery } from '../../api/adsApi'

export const SellerProfilePage = () => {
  const params = useParams()

  const { data = [], isLoading, error } = useGetAdsQuery()

  const adsSeller = data.filter(
    (ads) => Number(ads.user_id) === Number(params.id),
  )

  return (
    <>
      <S.ProfileContainer>
        <S.ProfileTitle>Профиль продавца</S.ProfileTitle>

        <S.Profile>
          <S.ProfileContent>
            <S.ProfileSettings>
              <S.SettingsLeft>
                <S.SettingsAvatar>
                  <a
                    href="#"
                    target="_self"
                  >
                    <img
                      src={
                        adsSeller[0]?.user?.avatar &&
                        baseUrl + adsSeller[0].user.avatar
                      }
                    />
                  </a>
                </S.SettingsAvatar>
              </S.SettingsLeft>
              <S.SettingsRight>
                  <S.SellerInfoContainer>
                    <p>{adsSeller[0]?.user?.name}</p>
                    <p>{adsSeller[0]?.user?.city}</p>
                    <p>
                      Продает товары с{' '}
                      {formatDate(adsSeller[0]?.user?.sells_from)}
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

                      <ShowPhoneNumButton phone={adsSeller[0]?.user?.phone} />
                    </div>
                  </S.SellerInfoContainer>
              </S.SettingsRight>
            </S.ProfileSettings>
          </S.ProfileContent>
        </S.Profile>
      </S.ProfileContainer>
      <S.CardsContainer>
        <S.ProfileHeading>
          Товары продавца
        </S.ProfileHeading>
        <Cards
          data={ adsSeller }
          isLoading={isLoading}
          error={error}
        />
      </S.CardsContainer>
    </>
  )
}
