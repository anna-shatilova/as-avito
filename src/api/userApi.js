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

// export async function register({ email, password,firstName, lastName, city }) {
//   const response = await fetch(`${baseUrl}auth/register/`, {
//     method: 'POST',
//     body: JSON.stringify({
//       password,
//       email,
//       name: firstName,
//       surname: lastName,
//       city,
//     }),
//     headers: {
//       'content-type': 'application/json',
//     },
//   })

//   const data = await response.json()

//   if (!response.ok) {
//     const error = data.email?.[0] ?? data.password?.[0]
//     throw new Error(error)
//   }

//   return data
// }

// export async function login({ email, password }) {
//   const response = await fetch(`${baseUrl}/auth/login/`, {
//     method: 'POST',
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//     headers: {
//       'content-type': 'application/json',
//     },
//   })

//   const data = await response.json()

//   if (!response.ok) {
//     const error = data.email ?? data.password
//     throw new Error(error)
//   }

//   return data
// }

// export async function getToken({ email, password }) {
//   const response = await fetch(`${baseURL}/user/token/`, {
//     method: 'POST',
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//     headers: {
//       'content-type': 'application/json',
//     },
//   })

//   const data = await response.json()

//   if (!response.ok) {
//     const error = data.email?.[0] ?? data.username?.[0] ?? data.password?.[0]
//     throw new Error(error)
//   }

//   return data
// }
