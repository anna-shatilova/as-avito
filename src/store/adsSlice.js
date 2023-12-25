import { createSlice } from '@reduxjs/toolkit'

const adsSlice = createSlice({
//   name: 'ads',
//   initialState: {},
//   reducers: {
//     setCurrentAds(state, action) {
//       state.currentAds = action.payload
//     },
//   },
})

export const { setCurrentAds } = adsSlice.actions

export const adsReducer = adsSlice.reducer
