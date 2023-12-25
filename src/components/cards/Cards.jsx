// import { baseUrl } from '../../pages/adv-page/AdvPage';
// import { formatDate } from '../../utils/getDate';
import { Link } from 'react-router-dom'
import * as S from './Cards.styles'
import { useGetAdsQuery } from '../../api/adsApi'
import { Loader } from '../../App.styles'
import { formatDate } from '../../utils/formatDate'

export const Cards = () => {
  const { data = [], isLoading, error } = useGetAdsQuery()

  return (
    <S.MainContent>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p> Не удалось загрузить список товаров, попробуйте позже</p>
      ) : (
        <S.Cards>
          {data?.map((ad) => (
            <S.CardsItem key={ad.id}>
              <S.Card>
                <S.CardImg>
                  <Link to={`/adv/${ad.id}`}>
                    <img
                      src={
                        ad?.images[0]
                          ? 'http://localhost:8090/' + ad.images[0].url
                          : '/img/nopic.png'
                      }
                      alt="picture"
                    />
                  </Link>
                </S.CardImg>
                <S.CardContent>
                  <Link to={`/adv/${ad.id}`}>
                    <S.CardTitle>{ad.title}</S.CardTitle>
                  </Link>
                  <S.CardPrice>{ad.price.toLocaleString('ru')} ₽</S.CardPrice>
                  <S.CardPlace>{ad.user.city}</S.CardPlace>
                  <S.CardDate>{formatDate(ad.created_on)}</S.CardDate>
                </S.CardContent>
              </S.Card>
            </S.CardsItem>
          ))}
        </S.Cards>
      )}
    </S.MainContent>
  )
}
