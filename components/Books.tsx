import { Text, StyleSheet, View, TextInput, Alert } from 'react-native'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import * as convert from '../models/data-functions'

interface Book {
  id: string
  title: string
  author: string
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>()

  useEffect(() => {
    async function getDb() {
      const db = getFirestore()
      const booksCol = collection(db, 'books')
      const booksSnapshot = await getDocs(booksCol)
      const booksList = []

      booksSnapshot.docs.map((doc) =>
        booksList.push({ ...doc.data(), id: doc.id })
      )

      setBooks(booksList)
    }
    getDb()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Library</Text>
      <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        onSubmitEditing={() => Alert.alert('function to come')}
        placeholder="Search for book..."
      />
      {books &&
        books.map((book) => (
          <View key={book.id}>
            <Text>
              {convert.capitalise(book.title)} -{' '}
              {convert.capitalise(book.author)}
            </Text>
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBE2CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 10,
    width: '50%',
    borderWidth: 1,
    padding: 5,
  },
  title: {
    fontFamily: 'Caveat-Regular',
    fontSize: 70,
  },
})
