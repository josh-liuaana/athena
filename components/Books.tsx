import { Text, StyleSheet, View } from 'react-native'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'

export default function Books() {
  useEffect(() => {
    async function getDb() {
      const db = getFirestore()
      const booksCol = collection(db, 'books')
      const booksSnapshot = await getDocs(booksCol)
      const booksList = []

      booksSnapshot.docs.map((doc) =>
        booksList.push({ ...doc.data(), id: doc.id })
      )
      console.log(booksList)
    }
    getDb()
  }, [])

  return (
    <View style={styles.container}>
      <Text> BOOKS </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
