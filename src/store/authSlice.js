import { createSlice } from '@reduxjs/toolkit'

const AUTH_KEY = 'auth'

function getAuthFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY))
  } catch (error) {
    return null
  }
}

const initialState = {
  // id: 0,
  // email: '',
  // name: '',
  // surname: '',
  // phone: '',
  // city: '',
  access_token: '',
  refresh_token: '',
  isAuth: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getAuthFromLocalStorage() ?? initialState,
  reducers: {
    setAuth(state, action) {
      const payload = action.payload ?? initialState

      // state.id = payload.id
      // state.email = payload.email
      // state.name = payload.name
      // state.surname = payload.surname
      // state.phone = payload.phone
      // state.city = payload.city
      state.access_token = payload.access_token
      state.refresh_token = payload.refresh_token
      state.isAuth = payload.isAuth

      localStorage.setItem(AUTH_KEY, JSON.stringify(state))
    },
  },
})
export const { setAuth } = authSlice.actions
export const authReducer = authSlice.reducer

//       const payload = action.payload ?? initialState

//       state.id = payload.id
//       state.email = payload.email
//       state.access_token = payload.access_token
//       state.refresh_token = payload.refresh_token
