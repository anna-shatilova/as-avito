import { useParams } from 'react-router-dom'
import { ProfilePage } from './ProfilePage'
import { useGetAdsQuery } from '../../api/adsApi'

export const SellerProfilePage = () => {
  const params = useParams()

  const { data = [], isLoading, error } = useGetAdsQuery()

  const adsSeller = data.filter(
    (ads) =>
      Number(ads.user_id) === Number(params.id)
  )

  return (
    <ProfilePage
      adsSeller={adsSeller}
      isLoading={isLoading}
      error={error}
      sellerPage={true}
    />
  )
}
