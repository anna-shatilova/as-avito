import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { setAuth } from './authSlice'

// const baseQueryWithReAuth = async (args, api, extraOptions) => {
//   const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:8090/',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().user.access

//       if (token) {
//         headers.set('authorization', `Bearer ${token}`)
//       }

//       return headers
//     },
//   })

//   const result = await baseQuery(args, api, extraOptions)

//   if (result?.error?.status !== 401) {
//     return result
//   }

//   const forceLogout = () => {
//     api.dispatch(setAuth(null))
//     window.location.assign('/login')
//   }

//   const { auth } = api.getState()

//   if (!auth.refresh) {
//     return forceLogout()
//   }

//   const refreshResult = await baseQuery(
//     {
//       url: '/user/token/refresh/',
//       method: 'POST',
//       body: {
//         refresh: auth.refresh,
//       },
//     },
//     api,
//     extraOptions,
//   )

//   if (refreshResult?.error?.data) {
//     return forceLogout()
//   }

//   api.dispatch(setAuth({ ...auth, access: refreshResult.data.access }))

//   const retryResult = await baseQuery(args, api, extraOptions)

//   if (retryResult?.error?.status === 401) {
//     return forceLogout()
//   }

//   return retryResult
// }

export const adsApi = createApi({
  reducerPath: 'adsApi',
  tagTypes: ['ads'],
  baseQuery:fetchBaseQuery({
    baseUrl: 'http://localhost:8090/',
  }),
//    baseQueryWithReAuth,
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
    getIdAds: build.query({
      query: ({ id }) => ({
        url: `ads/${id}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'ads' }],
    }),
    // getFavoriteTracks: build.query({
    //   query: () => ({
    //     url: 'track/favorite/all',
    //   }),
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.map(({ id }) => ({ type: 'FavoriteTracks', id })),
    //           { type: 'FavoriteTracks', id: 'LIST' },
    //         ]
    //       : [{ type: 'FavoriteTracks', id: 'LIST' }],
    // }),
    // addFavoriteTracks: build.mutation({
    //   query: ({ id }) => ({
    //     url: `track/${id}/favorite/`,
    //     method: 'POST',
    //   }),
    //   invalidatesTags: [
    //     { type: 'FavoriteTracks', id: 'LIST' },
    //     { type: 'Track' },
    //   ],
    // }),
    // deleteFavoriteTracks: build.mutation({
    //   query: ({ id }) => ({
    //     url: `track/${id}/favorite/`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: [
    //     { type: 'FavoriteTracks', id: 'LIST' },
    //     { type: 'Track' },
    //   ],
    // }),
    // getCategoryTracks: build.query({
    //   query: ({ id }) => ({
    //     url: `selection/${id}/`,
    //     method: 'GET',
    //   }),
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.items.map(({ id }) => ({ type: 'FavoriteTracks', id })),
    //           { type: 'FavoriteTracks', id: 'LIST' },
    //         ]
    //       : [{ type: 'FavoriteTracks', id: 'LIST' }],
    // }),
  }),
})

export const {
  useGetAdsQuery,
  useGetIdAdsQuery,
//   useGetFavoriteTracksQuery,
//   useAddFavoriteTracksMutation,
//   useDeleteFavoriteTracksMutation,
//   useGetCategoryTracksQuery,
} = adsApi
