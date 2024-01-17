import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  ScrollView,
  Image,
} from 'react-native'
import { useEffect, useState } from 'react'
import { fetchBooks } from '../apis/books'
import { Book } from '../models/types'
import BookCard from './BookCard'

export default function Books({ navigation, route }) {
  const [books, setBooks] = useState<Book[]>()
  const [currentBook, setCurrentBook] = useState<Book>()

  useEffect(() => {
    async function getDb() {
      const bookData = await fetchBooks()
      setCurrentBook(bookData.current)
      setBooks(bookData.bookList)
    }
    getDb()
  }, [route])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/athena-favicon-color.png')}
        />
        <Text style={styles.title}>Library</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>Currently Reading: {currentBook && currentBook.title}</Text>
        <TextInput
          style={styles.input}
          onSubmitEditing={() => Alert.alert('function to come')}
          placeholder="Search for book..."
        />
      </View>
      <ScrollView style={styles.scrollContainer}>
        {books &&
          books.map((book) => (
            <BookCard key={book.id} book={book} navigation={navigation} />
          ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBE2CC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  titleContainer: {
    // borderWidth: 1,
    // borderColor: 'green',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 60,
    width: 60,
    margin: 10,
  },
  title: {
    fontFamily: 'vibes',
    fontSize: 70,
    letterSpacing: 5,
  },
  inputContainer: {
    height: '15%',
    width: '60%',
    // borderWidth: 1,
    // borderColor: 'yellow',
    padding: 10,
  },
  input: {
    margin: 10,
    width: '50%',
    borderWidth: 1,
    padding: 5,
  },
  scrollContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
    width: '100%',
    // height: '50%',
  },
})
