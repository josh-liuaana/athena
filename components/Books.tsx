import { Text, StyleSheet, View, TextInput, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { fetchBooks } from '../apis/books'
import { Book } from '../models/types'

export default function Books() {
  const [books, setBooks] = useState<Book[]>()
  const [currentBook, setCurrentBook] = useState<Book>()

  useEffect(() => {
    async function getDb() {
      const bookData = await fetchBooks()
      setCurrentBook(bookData.current)
      setBooks(bookData.bookList)
    }
    getDb()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Library</Text>
      <Text>Currently Reading: {currentBook && currentBook.title}</Text>
      <TextInput
        style={styles.input}
        onSubmitEditing={() => Alert.alert('function to come')}
        placeholder="Search for book..."
      />
      {books &&
        books.map((book) => (
          <View key={book.id}>
            <Text>
              {book.title} - {book.author}
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
