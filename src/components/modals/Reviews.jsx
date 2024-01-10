import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as S from './Reviews.styles'
import { ModalCloseButton } from '../modal-close-button/ModalCloseButton'
import { baseUrl } from '../../utils/baseUrl'
import { formatDate } from '../../utils/formatDate'
import { useAddIdCommentsAdsMutation } from '../../api/adsApi'

export const Reviews = ({ id, comments, setOpenReviewsWindow }) => {
  const [newComment, setNewComment] = useState('')

  const [addIdComment] = useAddIdCommentsAdsMutation()

  const user = useSelector((state) => state.auth.isAuth)
  const navigate = useNavigate()

  const [disableButton] = useState(true)

  const handlerButtonReviewLogin = async (e) => {
    e.preventDefault()

    if (!user) {
      navigate('/login')
    } else {
      await addIdComment({
        text: newComment.trim(),
        id,
      }).unwrap()
      setNewComment('')
    }
  }

  const handlerAddComment = (e) => {
    setNewComment(e.target.value)
  }

  return (
    <S.Wrapper>
      <S.ContainerBg>
        <S.ModalBlock>
          <S.ModalContent>
            <S.ModalHeading>Отзывы о товаре</S.ModalHeading>
            <ModalCloseButton setOpenModalWindow={setOpenReviewsWindow} />
            <S.ModalScroll>
              <S.ModalFormAddReview>
                <S.FormAddReviewBlock>
                  {user ? (
                    <>
                      <label htmlFor="text">Добавить отзыв</label>
                      <textarea
                        id="text"
                        name="text"
                        cols="auto"
                        rows="5"
                        placeholder="Введите описание"
                        required
                        value={newComment}
                        onChange={handlerAddComment}
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
