import { createSlice } from "@reduxjs/toolkit";
import { isLoggedin } from "../Helper";

const initialState = {
  homeProperties: [],
  homePropertiesWithUserLikes : []
}

export const dataSlice = createSlice({
  name: "data",
  initialState, 
  reducers: {
    addProperties: (state, action) => {
      state.homeProperties.push(action.payload); 
    },
    addHomePropertiesWithUserLikes : (state, action) => {
      state.homePropertiesWithUserLikes.push(action.payload)
    },
    editLikedProp : (state, action) => {
      if (!isLoggedin() || !state.homePropertiesWithUserLikes.length) 
        return
      state.homePropertiesWithUserLikes[0] = state.homePropertiesWithUserLikes[0].map((prop) => {
        if (prop._id === action.payload) {
          const isLike = prop.isLiked? 1 : -1
          return {
            ...prop,
            isLiked: !prop.isLiked, 
            favourite: prop.favourite - isLike
          };
        }
        return prop; 
      });
    },
  },
});

export const { addProperties, addHomePropertiesWithUserLikes, editLikedProp } = dataSlice.actions

export default dataSlice.reducer