import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setAuth } from '../store/authSlice'

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8090/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access_token

      console.log('Использую токен из стора', { token })

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  })

  const result = await baseQuery(args, api, extraOptions)
  console.log('Результат первого запроса', { result })
  if (result?.error?.status !== 401) {
    return result
  }

  const forceLogout = () => {
    console.log('Принудительная авторизация!')

    api.dispatch(
      setAuth({
        access_token: null,
        refresh_token: null,
        isAuth: false,
      }),
    )
    localStorage.clear()
    // window.location.assign('/login')
  }

  const { auth } = api.getState()
  console.log('Данные пользователя в сторе', { auth })

  if (!auth.refresh_token) {
    return forceLogout()
  }

  const refreshResult = await baseQuery(
    {
      url: 'auth/login',
      method: 'PUT',
      body: {
        access_token: auth.access_token,
        refresh_token: auth.refresh_token,
      },
    },
    api,
    extraOptions,
  )
  console.log('Результат запроса на обновление токена', { refreshResult })
  if (refreshResult?.error?.data) {
    return forceLogout()
  }

  api.dispatch(
    setAuth({
      ...auth,
      access_token: refreshResult.data.access_token,
      refresh_token: refreshResult.data.refresh_token,
      isAuth: true,
    }),
  )

  const retryResult = await baseQuery(args, api, extraOptions)

  if (retryResult?.error?.status === 401) {
    return forceLogout()
  }
  console.log('Повторный запрос завершился успешно')
  return retryResult
}

export const adsApi = createApi({
  reducerPath: 'adsApi',
  tagTypes: ['ads'],
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({
    getAds: build.query({
      query: () => ({
        url: 'ads',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'ads', id })),
              { type: 'ads', id: 'LIST' },
            ]
          : [{ type: 'ads', id: 'LIST' }],
    }),
    // getAdsSeller: build.query({
    //   query: ({ user_id }) => ({
    //     url: `ads?user_id=${user_id}`,
    //     method: 'GET',
    //   }),
    //   providesTags: [{ type: 'ads' }],
    // }),
    getIdAds: build.query({
      query: ({ id }) => ({
        url: `ads/${id}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'ads' }],
    }),
    // addNewAds: build.mutation({
    //   query: (data) => {
    //     const searchParams = new URLSearchParams()
    //     searchParams.append('title', data.get('title'))
    //     searchParams.append('description', data.get('description'))
    //     searchParams.append('price', data.get('price'))

    //     const arrData = [...data]
    //     const length = arrData.length
    //     const formData = new FormData()

    //     for (let i = 1; i < length - 2; i++) {
    //       formData.append(`files`, data.get(`image${i}`))
    //     }

    //     return {
    //       url: `ads?${searchParams.toString()}`,
    //       method: 'POST',
    //       body: formData,
    //     }
    //   },
    //   invalidatesTags: [{ type: 'ads' }],
    // }),
    addNewAdsText: build.mutation({
      query: (data) => ({
        url: 'adstext',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'ads' }],
    }),
    editAds: build.mutation({
      query: ({ id, title, description, price }) => ({
        url: `ads/${id}`,
        method: 'PATCH',
        body: { title, description, price },
      }),
      invalidatesTags: [{ type: 'ads' }],
    }),
    deleteAds: build.mutation({
      query: ({ id }) => ({
        url: `ads/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ads' }],
    }),

    addFotoToAdv: build.mutation({
      query: ({ id, formData }) => ({
        url: `ads/${id}/image`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'ads' }],
    }),
    deleteAdvFoto: build.mutation({
      query: ({ id, imageUrl }) => ({
        url: `ads/${id}/image?file_url=${imageUrl}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ads' }],
    }),

    getIdCommentsAds: build.query({
      query: ({ id }) => ({
        url: `ads/${id}/comments`,
        method: 'GET',
      }),
      providesTags: [{ type: 'ads' }],
    }),
    addIdCommentsAds: build.mutation({
      query: ({ id, text }) => ({
        url: `ads/${id}/comments`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: [{ type: 'ads' }],
    }),

    getUser: build.query({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
      providesTags: [{ type: 'ads' }],
    }),
    getAdsUser: build.query({
      query: () => ({
        url: 'ads/me',
        method: 'GET',
      }),
      providesTags: [{ type: 'ads' }],
    }),
    changeInfoUser: build.mutation({
      query: (userData) => ({
        url: 'user',
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: [{ type: 'ads' }],
    }),
    uploadUserAvatar: build.mutation({
      query: (img) => ({
        url: 'user/avatar',
        method: 'POST',
        body: img,
      }),
      invalidatesTags: [{ type: 'ads' }],
    }),
  }),
})

export const {
  useGetAdsQuery,
  useGetIdAdsQuery,
  useGetIdCommentsAdsQuery,
  useAddIdCommentsAdsMutation,
  useGetUserQuery,
  useGetAdsUserQuery,
  useChangeInfoUserMutation,
  useUploadUserAvatarMutation,
  useAddNewAdsTextMutation,
  useAddFotoToAdvMutation,
  useDeleteAdvFotoMutation,
  useAddNewAdsMutation,
  useEditAdsMutation,
  useDeleteAdsMutation,
} = adsApi
