import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice'
import { adsApi } from '../api/adsApi'
import { userApi } from '../api/userApi'
// import { adsReducer } from './adsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    // ads: adsReducer,
    [adsApi.reducerPath]: adsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware, adsApi.middleware)
  },
})
