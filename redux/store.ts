import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import bookSlice from './books/booksSlice'
import characterSlice from './characters/characterSlice'
import errorSlice from './error/errorSlice'

export const store = configureStore({
  reducer: {
    books: bookSlice,
    characters: characterSlice,
    error: errorSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
