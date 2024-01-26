import { createSlice } from '@reduxjs/toolkit'
import {
  deleteBook,
  fetchBooks,
  postBook,
  updateBookDetails,
} from '../../apis/books'

import { BookStore } from '../../models/types'

const initialState = {} as BookStore

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (_, action) => {
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
    updCurrent: (state, action) => {
      const newBookList = state.bookList.map((book) => {
        if (book.id === action.payload.id) {
          return action.payload
        } else if (book.isCurrent === true) {
          return { ...book, current: false }
        }
        return book
      })
      return { bookList: newBookList, current: action.payload }
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

export const updateCurrentThunkBook =
  (currentData, id, currentId) => async (dispatch) => {
    updateBookDetails({ isCurrent: false }, currentId)
    const res = await updateBookDetails(currentData, id)

    dispatch(updCurrent(res))
  }

export const { setBooks, addBook, delBook, updBook, updCurrent } =
  bookSlice.actions
export default bookSlice.reducer
