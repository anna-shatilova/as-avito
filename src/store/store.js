import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { adsApi } from '../api/adsApi'
import { userApi } from '../api/userApi'
// import { adsReducer } from './adsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // ads: adsReducer,
    [userApi.reducerPath]: userApi.reducer,
    [adsApi.reducerPath]: adsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware, adsApi.middleware)
  },
})
