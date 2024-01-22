import { createSlice } from '@reduxjs/toolkit'
import {
  deleteBook,
  fetchBooks,
  postBook,
  updateBookDetails,
} from '../../apis/books'

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
      const newBookList = [...state.bookList, action.payload]
      return {
        bookList: newBookList,
        current: state.current,
      }
    },
    delBook: (state, action) => {
      const newBookList = state.bookList.filter(
        (book) => book.id !== action.payload.id
      )
      return {
        bookList: newBookList,
        current: state.current,
      }
    },
    updBook: (state, action) => {
      const newBookList = state.bookList.map((book) => {
        if (book.id === action.payload.id) {
          return action.payload
        }
        return book
      })
      return { bookList: newBookList, current: state.current }
    },
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

export const deleteThunkBook = (id) => async (dispatch) => {
  await deleteBook(id)
  dispatch(delBook(id))
}

export const updateThunkBook = (updatedBookInfo, id) => async (dispatch) => {
  const res = await updateBookDetails(updatedBookInfo, id)
  dispatch(updBook(res))
}

export const { setBooks, addBook, delBook, updBook } = bookSlice.actions
export default bookSlice.reducer
