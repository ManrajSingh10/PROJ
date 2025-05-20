import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  contacts : [],
}

const chatSlice = createSlice({
  name : "chat",
  initialState,
  reducers : {
    addContacts : (state, action) => {
      state.contacts.push(action.payload)
    },
    removeNotification : (state, action) => {
      state.contacts[0] = state.contacts[0].map(conversation =>
        conversation._id === action.payload
        ? { ...conversation, unreadCount: 0 } 
        : conversation 
      )
    },
    addNotification : (state, action) => {
      state.contacts[0] = state.contacts[0].map(conversation =>
        conversation._id === action.payload
        ? {
            ...conversation,
            unreadCount: (conversation.unreadCount || 0) + 1,
          }
        : conversation
      )
    }
  }
})

export const { addContacts, removeNotification, addNotification } = chatSlice.actions

export default chatSlice.reducer