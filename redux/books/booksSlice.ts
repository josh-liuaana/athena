import { createSlice } from '@reduxjs/toolkit'
import { fetchBooks, postBook } from '../../apis/books'

import { Book } from '../../models/types'

const initialState = {
  bookList: [] as Book[],
  current: {} as Book,
}

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      return action.payload
    },
    addBook: (state, action) => {
      console.log('action payload', action.payload)
      const newBookList = [...state.bookList, action.payload]
      return {
        bookList: newBookList,
        current: state.current,
      }
    },
    // deleteBook: (state, action) => {
    //   // ! -- need to update so store shape includes current
    //   return state.filter((book) => book.id !== action.payload.id)
    // },
  },
})

export const fetchThunkBooks = () => async (dispatch) => {
  const res = await fetchBooks()
  dispatch(setBooks(res))
}

export const postThunkBook = (newBookInfo) => async (dispatch) => {
  const res = await postBook(newBookInfo)
  dispatch(addBook(res))
}
// export const { setBooks, addBook, deleteBook } = bookSlice.actions
export const { setBooks, addBook } = bookSlice.actions

export default bookSlice.reducer
