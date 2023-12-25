import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['user'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8090/',
  }),
  //    baseQueryWithReAuth,
  endpoints: (build) => ({
    getUser: build.query({
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
    // getIdTrack: build.query({
    //   query: ({ id }) => ({
    //     url: `track/${id}`,
    //     method: 'GET',
    //   }),
    //   providesTags: [{ type: 'Track' }],
    // }),
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
  useGetUserQuery,
  //   useGetIdTrackQuery,
  //   useGetFavoriteTracksQuery,
  //   useAddFavoriteTracksMutation,
  //   useDeleteFavoriteTracksMutation,
  //   useGetCategoryTracksQuery,
} = userApi
