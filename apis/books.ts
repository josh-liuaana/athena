import { collection, getDocs, getFirestore } from 'firebase/firestore'

export async function fetchBooks() {
  const db = getFirestore()
  const booksCol = collection(db, 'books')
  const booksSnapshot = await getDocs(booksCol)
  const booksList = []
  const currentBookArr = []

  booksSnapshot.docs.map((doc) => {
    if (doc.data().isCurrent === 'true') {
      const current = {
        ...doc.data(),
        id: doc.id,
      }
      currentBookArr.push(current)
    }
    booksList.push({ ...doc.data(), id: doc.id })
  })

  return { booksList, currentBook: currentBookArr[0] }
}
