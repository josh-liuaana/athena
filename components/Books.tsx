import { Text, StyleSheet, View, TextInput, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { fetchBooks } from '../apis/books'
import { Book } from '../models/types'
import BookCard from './BookCard'

export default function Books({ navigation, route }) {
  const [books, setBooks] = useState<Book[]>()
  const [currentBook, setCurrentBook] = useState<Book>()
  const [focus, setFocus] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState<Book[]>()

  useEffect(() => {
    async function getDb() {
      const bookData = await fetchBooks()
      setCurrentBook(bookData.current)
      setBooks(bookData.bookList)
    }
    getDb()
  }, [route])

  const customOnFocus = (focus) => {
    setFocus(focus)
  }
  const customOnBlur = () => {
    setFocus(null)
  }

  const handleSearchTyping = async (search) => {
    const filter = books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.universe?.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredBooks(filter)
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Library</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.currentText}>Currently Reading: </Text>
        <Text style={styles.currentBookTitle}>
          {' '}
          {currentBook && currentBook.title} -{' '}
          {currentBook && currentBook.author}
        </Text>
        <TextInput
          style={[
            { backgroundColor: focus === 'search' ? '#DBE2CC' : 'white' },
            { borderColor: focus === 'search' ? 'white' : '#DBE2CC' },
            styles.input,
          ]}
          onChangeText={(search) => handleSearchTyping(search)}
          placeholder="Search..."
          onFocus={() => customOnFocus('search')}
          onBlur={() => customOnBlur()}
        />
      </View>
      {filteredBooks ? (
        <ScrollView style={styles.scrollContainer}>
          {filteredBooks &&
            filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} navigation={navigation} />
            ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {books &&
            books.map((book) => (
              <BookCard key={book.id} book={book} navigation={navigation} />
            ))}
        </ScrollView>
      )}
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  title: {
    fontFamily: 'vibes',
    fontSize: 70,
    letterSpacing: 5,
  },
  currentText: {
    fontFamily: 'vibes',
    fontSize: 50,
    letterSpacing: 2,
  },
  currentBookTitle: {
    fontFamily: 'sans-serif',
    fontSize: 25,
    letterSpacing: 0,
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: 10,
    borderRadius: 7,
    width: '70%',
    borderWidth: 2,
    paddingHorizontal: 20,
    fontSize: 20,
    height: 50,
  },
  scrollContainer: {
    width: '100%',
  },
})
