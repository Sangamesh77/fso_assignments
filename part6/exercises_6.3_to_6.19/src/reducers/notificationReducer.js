import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return null
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, duration) => {
    return async dispatch => {
      dispatch(createNotification(`you voted '${content}'`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, duration)
    }
  }

export default notificationSlice.reducer