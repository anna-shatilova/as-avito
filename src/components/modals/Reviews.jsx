import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as S from './Reviews.styles'
import { ModalCloseButton } from '../modal-close-button/ModalCloseButton'
import { baseUrl } from '../../utils/baseUrl'
import { formatDate } from '../../utils/formatDate'

export const Reviews = ({ comments, setOpenReviewsWindow }) => {
  const user = useSelector((state) => state.auth.isAuth)
  const navigate = useNavigate()

  const [disableButton] = useState(true)

  const handlerButtonReviewLogin = () => {
    !user && navigate('/login')
  }
  return (
    <S.Wrapper>
      <S.ContainerBg>
        <S.ModalBlock>
          <S.ModalContent>
            <S.ModalHeading>Отзывы о товаре</S.ModalHeading>
            <ModalCloseButton setOpenModalWindow={setOpenReviewsWindow} />
            <S.ModalScroll>
              <S.ModalFormAddReview action="#">
                <S.FormAddReviewBlock>
                  {user ? (
                    <>
                      <label htmlFor="text">Добавить отзыв</label>
                      <textarea
                        name="text"
                        cols="auto"
                        rows="5"
                        placeholder="Введите описание"
                        required
                      ></textarea>
                    </>
                  ) : (
                    'Чтобы оставить отзыв о товаре, войдите в личный кабинет'
                  )}
                </S.FormAddReviewBlock>
                <S.FormButtonReviewPublish
                  onClick={handlerButtonReviewLogin}
                  $disable={disableButton}
                >
                  {user ? 'Опубликовать' : 'Войти'}
                </S.FormButtonReviewPublish>
              </S.ModalFormAddReview>

              <S.Reviews>
                {comments?.map((comment) => (
                  <S.Review key={comment.id}>
                    <S.ReviewItem>
                      <S.ReviewImgContainer>
                        <S.ReviewImg>
                          <img
                            src={
                              comment.author.avatar &&
                              baseUrl + comment.author.avatar
                            }
                          />
                        </S.ReviewImg>
                      </S.ReviewImgContainer>
                      <S.ReviewContent>
                        <S.ReviewAuthorName>
                          {comment.author.name}{' '}
                          <span>{formatDate(comment.created_on)}</span>
                        </S.ReviewAuthorName>
                        <p>Комментарий</p>
                        <p>{comment.text}</p>
                      </S.ReviewContent>
                    </S.ReviewItem>
                  </S.Review>
                ))}
              </S.Reviews>
            </S.ModalScroll>
          </S.ModalContent>
        </S.ModalBlock>
      </S.ContainerBg>
    </S.Wrapper>
  )
}
