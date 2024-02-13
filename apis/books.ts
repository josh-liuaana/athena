import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import request from 'superagent'

import { auth, db } from '../firebase.config'

import { Book, BookData, BookStore } from '../models/types'

/**
 * Fetches book data from firebase /books collection
 * @returns Array of books from the firebase DB
 */
export async function fetchBooks(): Promise<BookStore> {
  try {
    // Connect to firestore and receive an array of books in alphabetical order ascending
    const booksCol = collection(db, 'books')
    const booksSnapshot = await getDocs(
      query(
        booksCol,
        where('userId', '==', auth.currentUser.uid),
        orderBy('title', 'asc')
      )
    )

    const bookList = []
    let current

    /** Loop through firestore date and push into new array after the .data() function makes it usable
     * Also filters through the data to find the currently being read book an sets it as current
     */
    booksSnapshot.docs.map((doc) => {
      if (doc.data().isCurrent === true) {
        current = { ...doc.data(), id: doc.id }
      }
      bookList.push({ ...doc.data(), id: doc.id })
    })

    return { bookList, current }
  } catch (err) {
    console.error('An error has occurred in the fetchBooks function call')
    throw new Error(err.message)
  }
}

/**
 * Adds book to firestore
 * @param newBookData raw Book data received from thunk function to be added to the db
 * @returns Book data from db including new ID
 */
export async function postBook(newBookData: Partial<BookData>): Promise<Book> {
  try {
    const bookCover = await fetchBookInformation(
      newBookData.title,
      newBookData.author
    )
    const res = await addDoc(collection(db, 'books'), {
      ...newBookData,
      cover: bookCover,
    })
    const newBook = await getDoc(doc(db, 'books', res.id))
    return { ...newBook.data(), id: newBook.id, cover: bookCover } as Book
  } catch (err) {
    throw new Error(err.message)
  }
}

/**
 * Retrieves book cover image from google books api
 * @param title
 * @param author
 * @returns book cover image url
 */
export async function fetchBookInformation(title, author): Promise<string> {
  try {
    const res = await request.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`
    )
    return res.body.items[0].volumeInfo.imageLinks.thumbnail
  } catch (err) {
    throw new Error('fetch book information error', err.message)
  }
}

/**
 * Updates a document in firestore
 * @param updateData raw update data received from thunk
 * @param id relates to the firestore id in db
 * @returns Book data from firestore db
 */
export async function updateBookDetails(
  updateData: Partial<BookData>,
  id: string
): Promise<Book> {
  try {
    const bookRef = doc(db, 'books', id)
    await updateDoc(bookRef, updateData)
    const updatedBook = await getDoc(doc(db, 'books', id))
    return { ...updatedBook.data(), id } as Book
  } catch (err) {
    throw new Error(err.message)
  }
}

/**
 * Delete document from firestore
 * @param id relates to firestore id in db
 */
export async function deleteBook(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'books', id))
  } catch (err) {
    throw new Error(err.message)
  }
}
