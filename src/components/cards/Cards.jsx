// import { baseUrl } from '../../pages/adv-page/AdvPage';
// import { formatDate } from '../../utils/getDate';
import { Link } from 'react-router-dom'
import * as S from './Cards.styles'

export const Cards = () => {

  return (
    <S.MainContent>
      <S.Cards>
        <S.CardsItem>
          <S.Card>
            <Link to={`/adv/:id`}>
              <S.CardImg>
                <img
                  src="#"
                  alt="picture"
                />
              </S.CardImg>
              <S.CardContent>
                <S.CardTitle>
                  Ракетка для большого тенниса Triumph Pro ST
                </S.CardTitle>
                <S.CardPrice>2&nbsp;200&nbsp;₽</S.CardPrice>
                <S.CardPlace>Санкт Петербург</S.CardPlace>
                <S.CardDate>Сегодня в&nbsp;10:45</S.CardDate>
              </S.CardContent>
            </Link>
          </S.Card>
        </S.CardsItem>

        <S.CardsItem>
          <S.Card>
            <S.CardImg>
              <Link
                href="#"
                target="_blank"
              >
                <img
                  src="#"
                  alt="picture"
                />
              </Link>
            </S.CardImg>
            <S.CardContent>
              <Link
                href=""
                target="_blank"
              >
                <S.CardTitle>
                  Ракетка для большого тенниса Triumph Pro ST
                </S.CardTitle>
              </Link>
              <S.CardPrice>2&nbsp;200&nbsp;₽</S.CardPrice>
              <S.CardPlace>Санкт Петербург</S.CardPlace>
              <S.CardDate>Сегодня в&nbsp;10:45</S.CardDate>
            </S.CardContent>
          </S.Card>
        </S.CardsItem>

        <S.CardsItem>
          <S.Card>
            <S.CardImg>
              <Link
                href="#"
                target="_blank"
              >
                <img
                  src="#"
                  alt="picture"
                />
              </Link>
            </S.CardImg>
            <S.CardContent>
              <Link
                href=""
                target="_blank"
              >
                <S.CardTitle>
                  Ракетка для большого тенниса Triumph Pro ST
                </S.CardTitle>
              </Link>
              <S.CardPrice>2&nbsp;200&nbsp;₽</S.CardPrice>
              <S.CardPlace>Санкт Петербург</S.CardPlace>
              <S.CardDate>Сегодня в&nbsp;10:45</S.CardDate>
            </S.CardContent>
          </S.Card>
        </S.CardsItem>

        {/* {data?.map((ad) => (
          <S.CardsItem key={ad.id}>
            <S.Card>
              <S.CardImg>
                <Link to={`/ad/${ad.id}`}>
                  <img
                    src={
                      ad?.images[0]
                        ? baseUrl + ad.images[0].url
                        : '/img/nopic.png'
                    }
                    alt="picture"
                  />
                </Link>
              </S.CardImg>
              <S.CardContent>
                <Link to={`/ad/${ad.id}`}>
                  <S.CardTitle>{ad.title}</S.CardTitle>
                </Link>
                <S.CardPrice>{ad.price.toLocaleString('ru')} ₽</S.CardPrice>
                <S.CardPlace>{ad.user.city}</S.CardPlace>
                <S.CardDate>{formatDate(ad.created_on)}</S.CardDate>
              </S.CardContent>
            </S.Card>
          </S.CardsItem>
        ))} */}
      </S.Cards>
    </S.MainContent>
  )
}
