import { Button, StyleSheet, Text, View } from 'react-native'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

export default function Books() {
  async function getBooks() {
    const db = getFirestore()
    const booksCol = collection(db, 'books')
    const bookSnapshot = await getDocs(booksCol)
    const bookList = []

    bookSnapshot.docs.map((doc) => bookList.push({ ...doc.data(), id: doc.id }))
    console.log(bookList)
  }

  return (
    <View style={styles.container}>
      <Button onPress={getBooks} title="get firebase data" />
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
