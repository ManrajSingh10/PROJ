import {configureStore} from '@reduxjs/toolkit'

import dataReducer from "../Redux/dataSlice"
import favouriteReducer from "../Redux/favouriteSlice"
import userReducer from "../Redux/userSlice"
import chatReducer from '../Redux/chatSlice'
import msgReducer from '../Redux/msgSlice'

export const store = configureStore({
  reducer: {
    data: dataReducer,
    favourite : favouriteReducer,
    user : userReducer,
    chat : chatReducer,
    msg : msgReducer
  },
})