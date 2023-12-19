import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Reviews } from '../../components/modals/Reviews'
import * as S from './AdvPage.styles'
import { AddNewAdv } from '../../components/modals/AddNewAdv'

export const AdvPage = () => {
  const navigate = useNavigate()
  const [isOpenReviews, setOpenReviews] = useState(false)
  const [isAdvSettings, setAdvSettings] = useState(false)

  const handlerOpenReviews = () => {
    setOpenReviews((isOpenReviews) => !isOpenReviews)
  }
  const handlerAdvSettings = () => {
    setAdvSettings((isAdvSettings) => !isAdvSettings)
  }
  // закрывает модальные окна
  function closeWindows() {
    // setOpenReviews((isOpenReviews) => !isOpenReviews)
    setAdvSettings((isAdvSettings) => !isAdvSettings)
    // setModalError(false)
  }
  return (
    <>
      <S.ArticleContainer>
        <S.Article>
          <S.ArticleMerryGoRound>
            <S.Carousel>
              <S.CarouselImg>
                <img src="#" />
              </S.CarouselImg>
              <S.CarouselBar>
                <S.CarouselBarImg>
                  <img
                    src="/img/nopic.png"
                    alt=""
                  />
                </S.CarouselBarImg>
              </S.CarouselBar>
              <S.CarouselBarMob>
                <div className="img-bar-mob__circle circle-active"></div>
                <div className="img-bar-mob__circle"></div>
                <div className="img-bar-mob__circle"></div>
                <div className="img-bar-mob__circle"></div>
                <div className="img-bar-mob__circle"></div>
              </S.CarouselBarMob>
            </S.Carousel>
          </S.ArticleMerryGoRound>
          <S.ArticleInfoContainer>
            <S.ArticleInfo>
              <S.ArticleHeading>
                Ракетка для большого тенниса Triumph Pro STС Б/У
              </S.ArticleHeading>
              <S.ArticleInfoText>
                <p>123</p>
                <p>123</p>
                <S.Reviews onClick={handlerOpenReviews}>23 отзыва</S.Reviews>
              </S.ArticleInfoText>
              <S.ArticlePrice>123 ₽</S.ArticlePrice>
              <S.ButtonsContainer>
                <S.ArticleButton onClick={handlerAdvSettings}>
                  Редактировать
                </S.ArticleButton>
                <S.ArticleButton>Снять с публикации</S.ArticleButton>
              </S.ButtonsContainer>

              <S.ArticleAuthor>
                <S.AuthorImg>
                  <img
                    src="#"
                    alt=""
                  />
                </S.AuthorImg>
                <S.AuthorInfo>
                  <S.AuthorName onClick={() => navigate('/seller-profile')}>
                    123
                  </S.AuthorName>
                  <S.AuthorAbout>Продает товары с 123</S.AuthorAbout>
                </S.AuthorInfo>
              </S.ArticleAuthor>
            </S.ArticleInfo>
          </S.ArticleInfoContainer>
        </S.Article>
      </S.ArticleContainer>

      <S.ArticleDescriptionContainer>
        <S.DescriptionHeading>Описание товара</S.DescriptionHeading>
        <S.Description>
          {/* <p>{actualAd?.description}</p> */}
          <p>Описание товара отсутствует</p>
        </S.Description>
      </S.ArticleDescriptionContainer>

      {isOpenReviews && <Reviews setOpenModalWindow={closeWindows} />}
      {isAdvSettings && <AddNewAdv setOpenModalWindow={closeWindows} />}
    </>
  )
}
