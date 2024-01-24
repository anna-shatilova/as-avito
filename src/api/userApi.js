import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../utils/baseUrl'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getTokens: build.mutation({
      query: (userData) => ({
        url: 'auth/login',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useGetTokensMutation,
} = userApi
