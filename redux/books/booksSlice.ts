import { createSlice } from '@reduxjs/toolkit'
import { fetchBooks } from '../../apis/books'

import { Book } from '../../models/types'

const initialState = [{}] as Book[]

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      console.log('payload in setBooks slice', action.payload)
      return action.payload
    },
    addBook: (state, action) => {
      return [...state, action.payload]
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload.id)
    },
  },
})

export const fetchThunkBooks = () => async (dispatch) => {
  const res = await fetchBooks()
  dispatch(setBooks(res.bookList))
}

export const { setBooks, addBook, deleteBook } = bookSlice.actions

export default bookSlice.reducer
