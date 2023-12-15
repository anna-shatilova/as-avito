import * as S from './AdvPage.styles'

export const AdvPage = () => {
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
              <S.ArticleHeading>Ракетка для большого тенниса Triumph Pro STС Б/У</S.ArticleHeading>
              <S.ArticleInfoText>
                <p>123</p>
                <p>123</p>
                <a href="#">23 отзыва</a>
              </S.ArticleInfoText>
              <S.ArticlePrice>123 ₽</S.ArticlePrice>
              <S.ButtonsContainer>
                <S.ArticleButton>Редактировать</S.ArticleButton>
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
                  <S.AuthorName>123</S.AuthorName>
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
    </>
  )
}
