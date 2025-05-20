import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatIsOpen : false,
  chatUser : null
}

const msgSlice = createSlice({
  name : "msg",
  initialState,
  reducers : {
    toggleChatIsOpen : (state, action) => {
      if (state.chatIsOpen) {
        state.chatUser = null
      }
      state.chatIsOpen = !state.chatIsOpen
    },
    updateChatUser : (state, action) => {
      state.chatUser = action.payload
    }
  }
})

export const {toggleChatIsOpen, updateChatUser} = msgSlice.actions

export default msgSlice.reducer