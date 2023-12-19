import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // [favoritesApi.reducerPath]: favoritesApi.reducer,
  },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(favoritesApi.middleware),
})
