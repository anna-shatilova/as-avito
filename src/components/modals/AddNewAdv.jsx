import { useEffect, useState } from 'react'
import { ModalCloseButton } from '../modal-close-button/ModalCloseButton'
import * as S from './AddNewAdv.styles'
import {
  useAddFotoToAdvMutation,
  useAddNewAdsTextMutation,
  useDeleteAdvFotoMutation,
  useEditAdsMutation,
} from '../../api/adsApi'
import { baseUrl } from '../../utils/baseUrl'

export const AddNewAdv = ({
  ads,
  id,
  isEditMode,
  setOpenSettingsWindow,
  setOpenNewAdvWindow,
}) => {
  const array = [1, 2, 3, 4, 5]

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const [img, setImg] = useState([])
  const [imgSrc, setImgSrc] = useState([])

  const [isFormChanged, setIsFormChanged] = useState(false)
  const [error, setError] = useState(null)

  const [addNewAdsText] = useAddNewAdsTextMutation()
  const [editAds] = useEditAdsMutation()
  const [addFotoToAdv] = useAddFotoToAdvMutation()

  useEffect(() => {
    if (ads) {
      setTitle(ads.title)
      setDescription(ads.description)
      setPrice(ads.price)
      setImg(ads.images)
    }
  }, [ads])

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    setIsFormChanged(true)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
    setIsFormChanged(true)
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
    setIsFormChanged(true)
  }

  // preview фото

  const handleUploadFoto = async (e) => {
    e.preventDefault()
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setImg([...img, selectedFile])

      if (selectedFile.type && !selectedFile.type.startsWith('image/')) {
        console.log('File is not an image.', selectedFile.type, selectedFile)
        return
      }
      const newImageSrc = []
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        newImageSrc.push(reader.result)
        setImgSrc([...imgSrc, ...newImageSrc])
      })
      reader.readAsDataURL(selectedFile)
    }
    setIsFormChanged(true)
    setError(null)
  }

  // Изменить фото

  const uploadFotoToAdv = async (evt) => {
    evt.preventDefault()

    const selectedFile = evt.target.files[0]
    const formData = new FormData()
    formData.append('file', selectedFile)

    await addFotoToAdv({ id, formData }).unwrap()

    setIsFormChanged(true)
    setError(null)
  }

  // Удалить фото

  const [deleteAdvFoto] = useDeleteAdvFotoMutation()

  const deleteFotoToAdv = async (evt, imageUrl) => {
    evt.preventDefault()

    await deleteAdvFoto({ id, imageUrl }).unwrap()
  }

  // Опубликовать объявление или сохранить изменения в зависимости от режима isEditMode

  const publishAd = async (e) => {
    e.preventDefault()

    if (!isEditMode && !title) {
      setError('Введите название')
      return
    }
    if (!isEditMode && !price) {
      setError('Введите цену')
      return
    }

    let postAdvData

    if (isEditMode) {
      postAdvData = await editAds({
        title: title,
        description: description,
        price: price,
        id,
      })
    } else {
      postAdvData = await addNewAdsText({
        title: title.trim(),
        description: description.trim(),
        price: price.trim(),
      })
      if (img.length) {
        const advIdData = postAdvData.data.id
        const formData = new FormData()

        img.forEach(async (image) => {
          formData.append('file', image)

          await addFotoToAdv({
            id: advIdData,
            formData,
          })
        })
      }
    }
    setIsFormChanged(false)
    setError(null)
  }

  return (
    <S.Wrapper>
      <S.ContainerBg>
        <S.ModalBlock>
          <S.ModalContent>
            <S.ModalHeading>
              {isEditMode ? 'Редактировать объявление' : 'Новое объявление'}
            </S.ModalHeading>
            <ModalCloseButton
              setOpenModalWindow={
                isEditMode ? setOpenSettingsWindow : setOpenNewAdvWindow
              }
            />
            <S.FormNewAd
              id="#"
              action="#"
            >
              <S.FormNewAdBlock>
                <label htmlFor="name">Название</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Введите название"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </S.FormNewAdBlock>
              <S.FormNewAdBlock>
                <label htmlFor="text">Описание</label>
                <textarea
                  name="text"
                  cols="auto"
                  rows="10"
                  placeholder="Введите описание"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                ></textarea>
              </S.FormNewAdBlock>
              <S.FormNewAdBlock>
                <S.FormNewAdText>
                  Фотографии товара<span>не более 5 фотографий</span>
                </S.FormNewAdText>
                <S.FormNewAdBarImg>
                  {isEditMode &&
                    (ads.images.length < 5 ? (
                      <>
                        {ads.images.map((image) => (
                          <S.FormNewAdImgLabel
                            key={image.id}
                            htmlFor="photo"
                            $visibleImg={ads.images}
                            onChange={uploadFotoToAdv}
                          >
                            <img
                              src={baseUrl + image.url}
                              alt=""
                            />
                            <S.FormNewAdImgInput
                              type="file"
                              id="photo"
                              accept="image/*"
                            />
                            <S.DeleteImgButton
                              onClick={(e) => deleteFotoToAdv(e, image.url)}
                            >
                              <S.DeleteImgButtonLine />
                            </S.DeleteImgButton>
                          </S.FormNewAdImgLabel>
                        ))}
                        <S.FormNewAdImgLabel
                          htmlFor="photo"
                          $visibleImg={imgSrc.length}
                          onChange={uploadFotoToAdv}
                        >
                          <S.FormNewAdImgInput
                            type="file"
                            id="photo"
                            accept="image/*"
                          />
                        </S.FormNewAdImgLabel>
                      </>
                    ) : (
                      ads.images.map((image) => (
                        <S.FormNewAdImgLabel
                          key={image.id}
                          htmlFor="photo"
                          $visibleImg={ads.images}
                        >
                          <img
                            src={baseUrl + image.url}
                            alt=""
                          />
                          <S.FormNewAdImgInput
                            type="file"
                            id="photo"
                            accept="image/*"
                            multiple
                          />
                          <S.DeleteImgButton
                            onClick={(e) => deleteFotoToAdv(e, image.url)}
                          >
                            <S.DeleteImgButtonLine />
                          </S.DeleteImgButton>
                        </S.FormNewAdImgLabel>
                      ))
                    ))}
                  {!isEditMode && imgSrc.length
                    ? imgSrc.map((item) => (
                        <S.FormNewAdImgLabel
                          key={item}
                          htmlFor="photo"
                          $visibleImg={imgSrc.length}
                          onChange={handleUploadFoto}
                        >
                          <img
                            src={item}
                            alt=""
                          />
                          <S.FormNewAdImgInput
                            type="file"
                            id="photo"
                            accept="image/*"
                            multiple
                          />
                        </S.FormNewAdImgLabel>
                      ))
                    : !isEditMode &&
                      array.map((item) => (
                        <S.FormNewAdImgLabel
                          key={item}
                          htmlFor="photo"
                          $visibleImg={imgSrc.length}
                          onChange={handleUploadFoto}
                        >
                          <img
                            src="#"
                            alt=""
                          />
                          <S.FormNewAdImgInput
                            type="file"
                            id="photo"
                            accept="image/*"
                            multiple
                          />
                        </S.FormNewAdImgLabel>
                      ))}
                </S.FormNewAdBarImg>
              </S.FormNewAdBlock>

              <S.FormNewAdBlock>
                <label htmlFor="price">Цена</label>
                <S.FormNewAdPriceInput
                  type="number"
                  name="price"
                  value={price}
                  onChange={handlePriceChange}
                  required
                />
                <S.FormNewAdPriceCover />
              </S.FormNewAdBlock>
              {error && <S.Error>{error}</S.Error>}
              <S.FormNewAdButtonPublish
                disabled={!isFormChanged}
                $disabled={!isFormChanged}
                onClick={publishAd}
              >
                {isEditMode ? 'Сохранить' : 'Опубликовать'}
              </S.FormNewAdButtonPublish>
            </S.FormNewAd>
          </S.ModalContent>
        </S.ModalBlock>
      </S.ContainerBg>
    </S.Wrapper>
  )
}
