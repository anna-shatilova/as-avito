import { createSlice } from '@reduxjs/toolkit'

const USER_KEY = 'user'

function getUserFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch (error) {
    return null
  }
}

const initialState = {
  id: 0,
  email: '',
  username: '',
  access: '',
  refresh: '',
  first_name: '',
  last_name: '',
  city: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: getUserFromLocalStorage() ?? initialState,
  reducers: {
    setUser(state, action) {
      const payload = action.payload ?? initialState

      state.id = payload.id
      state.email = payload.email
      state.username = payload.username
      state.access = payload.access
      state.refresh = payload.refresh
      state.first_name = payload.first_name
      state.last_name = payload.last_name
      state.city = payload.city

      localStorage.setItem(USER_KEY, JSON.stringify(state))
    },
  },
})
export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer
