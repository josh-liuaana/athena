import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import bookSlice from './books/booksSlice'

export const store = configureStore({
  reducer: {
    books: bookSlice,
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
