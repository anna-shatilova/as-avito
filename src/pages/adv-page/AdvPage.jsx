import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Reviews } from '../../components/modals/Reviews'
import * as S from './AdvPage.styles'
import { AddNewAdv } from '../../components/modals/AddNewAdv'
import {
  useDeleteAdsMutation,
  useGetIdAdsQuery,
  useGetIdCommentsAdsQuery,
  useGetUserQuery,
} from '../../api/adsApi'
import { Loader } from '../../App.styles'
import { formatDate } from '../../utils/formatDate'
import { baseUrl } from '../../utils/baseUrl'
import { ShowPhoneNumButton } from '../../components/phone-num-button/ShowPhoneNumButton'

export const AdvPage = () => {
  const params = useParams()

  const [currentImg, setCurrentImg] = useState(null)
  const [isOpenReviews, setOpenReviews] = useState(false)
  const [isAdvSettings, setAdvSettings] = useState(false)
  const [isSkipRefetching, setIsSkipRefetching] = useState(false)

  const { data, isLoading, error } = useGetIdAdsQuery({
    id: params.id,
    skip: isSkipRefetching,
  })
  const { data: comments } = useGetIdCommentsAdsQuery({ id: params.id })
  const { data: user } = useGetUserQuery()
  const [deleteAds] = useDeleteAdsMutation()

  const navigate = useNavigate()

  const handlerOpenReviews = () => {
    setOpenReviews((isOpenReviews) => !isOpenReviews)
  }
  const handlerAdvSettings = () => {
    setAdvSettings((isAdvSettings) => !isAdvSettings)
  }

  const handlerDeleteAdv = async (evt) => {
    evt.preventDefault()
    setIsSkipRefetching(true)
    await deleteAds({ id: params.id }).unwrap()
    navigate('/profile')
  }

  // закрывает модальные окна
  function closeReviewsWindow() {
    setOpenReviews((isOpenReviews) => !isOpenReviews)
  }

  function closeSettingsWindow() {
    setAdvSettings((isAdvSettings) => !isAdvSettings)
    // setModalError(false)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p> Не удалось загрузить объявление, попробуйте позже</p>
      ) : (
        <>
          <S.ArticleContainer>
            <S.Article>
              <S.ArticleMerryGoRound>
                <S.Carousel>
                  <S.CarouselImg>
                    <img
                      src={
                        currentImg
                          ? baseUrl + currentImg
                          : !data.images[0]
                            ? '/img/nopic.png'
                            : baseUrl + data.images[0].url
                      }
                    />
                  </S.CarouselImg>
                  <S.CarouselBar>
                    {data.images.length > 1 ? (
                      data.images.map((image) => (
                        <S.CarouselBarImg
                          key={image.id}
                          onClick={() => setCurrentImg(image.url)}
                        >
                          <img src={baseUrl + image.url} />
                        </S.CarouselBarImg>
                      ))
                    ) : (
                      <S.CarouselBarImg>
                        <img src="/img/nopic.png" />
                      </S.CarouselBarImg>
                    )}
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
                  <S.ArticleHeading>{data.title}</S.ArticleHeading>
                  <S.ArticleInfoText>
                    <p>{formatDate(data.created_on)}</p>
                    <p>{data.user.city}</p>
                    <S.Reviews onClick={handlerOpenReviews}>
                      {comments?.length} отзывы
                    </S.Reviews>
                  </S.ArticleInfoText>
                  <S.ArticlePrice>{data.price} ₽</S.ArticlePrice>
                  <S.ButtonsContainer>
                    {Number(data.user_id) === Number(user?.id) ? (
                      <>
                        <S.ArticleButton onClick={handlerAdvSettings}>
                          Редактировать
                        </S.ArticleButton>
                        <S.ArticleButton onClick={handlerDeleteAdv}>
                          Снять с публикации
                        </S.ArticleButton>
                      </>
                    ) : (
                      <ShowPhoneNumButton phone={data.user.phone} />
                    )}
                  </S.ButtonsContainer>

                  <S.ArticleAuthor>
                    <S.AuthorImg>
                      <img
                        src={data.user.avatar && baseUrl + data.user.avatar}
                      />
                    </S.AuthorImg>
                    <S.AuthorInfo>
                      <S.AuthorName
                        onClick={() =>
                          navigate(`/seller-profile/${data.user_id}`)
                        }
                      >
                        {data.user.name}
                      </S.AuthorName>
                      <S.AuthorAbout>
                        Продает товары с {formatDate(data.user.sells_from)}
                      </S.AuthorAbout>
                    </S.AuthorInfo>
                  </S.ArticleAuthor>
                </S.ArticleInfo>
              </S.ArticleInfoContainer>
            </S.Article>
          </S.ArticleContainer>

          <S.ArticleDescriptionContainer>
            <S.DescriptionHeading>Описание товара</S.DescriptionHeading>
            <S.Description>
              {data.description ? (
                <p>{data.description}</p>
              ) : (
                <p>Описание товара отсутствует</p>
              )}
            </S.Description>
          </S.ArticleDescriptionContainer>
        </>
      )}

      {isOpenReviews && (
        <Reviews
          id={params.id}
          comments={comments}
          setOpenReviewsWindow={closeReviewsWindow}
        />
      )}
      {isAdvSettings && (
        <AddNewAdv
          id={params.id}
          ads={data}
          isEditMode={true}
          setOpenSettingsWindow={closeSettingsWindow}
        />
      )}
    </>
  )
}
