import { useGetAdsQuery } from '../../api/adsApi'
import { Cards } from '../../components/cards/Cards'
import * as S from './MainPage.styles'

export const MainPage = () => {
  const { data = [], isLoading, error } = useGetAdsQuery()

  return (
    <>
      <S.MainTitle>Объявления</S.MainTitle>
      <Cards
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </>
  )
}
