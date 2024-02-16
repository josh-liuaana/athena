import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (_, action) => {
      return action.payload.errorMessage
    },
    hideError: (_, action) => {
      return action.payload
    },
  },
})

export const { showError, hideError } = errorSlice.actions
export default errorSlice.reducer
