// import { createSlice } from '@reduxjs/toolkit'

// const USER_KEY = 'user'

// function getUserFromLocalStorage() {
//   try {
//     return JSON.parse(localStorage.getItem(USER_KEY))
//   } catch (error) {
//     return null
//   }
// }

// const initialState = {
//   id: 0,
//   email: '',
//   name: '',
//   surname: '',
//   city: '',
//   access_token: '',
//   refresh_token: '',
// }

// const userSlice = createSlice({
//   name: 'user',
//   initialState: getUserFromLocalStorage() ?? initialState,
//   reducers: {
//     setUser(state, action) {
//       const payload = action.payload ?? initialState

//       state.id = payload.id
//       state.email = payload.email
//       state.name = payload.name
//       state.surname = payload.surname
//       state.phone = payload.phone
//       state.city = payload.city
//       state.access_token = payload.access_token
//       state.refresh_token = payload.refresh_token

//       localStorage.setItem(USER_KEY, JSON.stringify(state))
//     },
//   },
// })
// export const { setUser } = userSlice.actions
// export const userReducer = userSlice.reducer
