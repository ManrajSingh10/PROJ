import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  favouriteData : []
}

export const favouriteSlice = createSlice({
  name : "Favourite",
  initialState,
  reducers : {
    setFavouriteData : (state, action) => {
      state.favouriteData.push(action.payload)
    },
    addFavProperty : (state, action) => {
      if (!state.favouriteData.length) return
      state.favouriteData[0].push(action.payload)
    },
    removeFavProperty : (state, action) => {
      if (!state.favouriteData.length) return
      state.favouriteData[0] = state.favouriteData[0].filter(prop => prop._id !== action.payload);
    }
  }
}) 

export const {setFavouriteData, addFavProperty, removeFavProperty} = favouriteSlice.actions

export default favouriteSlice.reducer