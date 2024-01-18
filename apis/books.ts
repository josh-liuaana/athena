import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'

export async function fetchBooks() {
  console.log('fetching books...')
  const booksCol = collection(db, 'books')
  const booksSnapshot = await getDocs(booksCol)
  const bookList = []
  let current

  booksSnapshot.docs.map((doc) => {
    if (doc.data().isCurrent === true) {
      current = { ...doc.data(), id: doc.id }
    }
    bookList.push({ ...doc.data(), id: doc.id })
  })
  console.log('retrieved books')

  return { bookList, current }
}

export async function postBook(newBookData) {
  try {
    console.log('adding book...')
    const res = await addDoc(collection(db, 'books'), newBookData)
    console.log('book added:', res.id)
    return res
  } catch (err) {
    throw new Error(err)
  }
}

export async function updateBookDetails(updateData, id) {
  try {
    console.log('updating book...')
    const bookRef = doc(db, 'books', id)
    await updateDoc(bookRef, updateData)
    console.log('book updated')
  } catch (err) {
    console.error(err)
  }
}

export async function deleteBook(id) {
  try {
    console.log('deleting book...')
    await deleteDoc(doc(db, 'books', id))
    console.log('book deleted')
  } catch (err) {
    console.error(err)
  }
}
