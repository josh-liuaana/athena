import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore'

export async function fetchBooks() {
  console.log('fetching books...')
  const db = getFirestore()
  const booksCol = collection(db, 'books')
  const booksSnapshot = await getDocs(booksCol)
  const bookList = []
  let current

  booksSnapshot.docs.map((doc) => {
    if (doc.data().isCurrent === 'true') {
      current = { ...doc.data(), id: doc.id }
    }
    bookList.push({ ...doc.data(), id: doc.id })
  })
  console.log('retrieved books')

  return { bookList, current }
}

export async function postBook(newBookData) {
  const db = getFirestore()
  try {
    console.log('adding book...')
    const res = await addDoc(collection(db, 'books'), newBookData)
    console.log('book added:', res.id)
    return res
  } catch (err) {
    throw new Error(err)
  }
}
