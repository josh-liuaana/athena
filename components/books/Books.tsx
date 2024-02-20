import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'

import { TextInputComp } from '../@shared/TextInputComp'

import BookCard from './BookCard'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchThunkBooks } from '../../redux/books/booksSlice'

import type { Book } from '../../models/types'

export default function Books({ navigation, route }) {
  const dispatch = useAppDispatch()
  const bookList = useAppSelector((state) => state.books.bookList)
  const currentBook = useAppSelector((state) => state.books.current)

  const [filteredBooks, setFilteredBooks] = useState<Book[]>(bookList)
  const [bookSearch, setBookSearch] = useState('')

  useEffect(() => {
    dispatch(fetchThunkBooks())
  }, [dispatch, route])

  useEffect(() => {
    const filter = bookList.filter(
      (book) =>
        book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
        book.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
        book.universe?.toLowerCase().includes(bookSearch.toLowerCase())
    )
    setFilteredBooks(filter)
  }, [bookSearch])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Library</Text>
      </View>
      {bookList.length > 0 ? (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.currentText}>Currently Reading: </Text>
            {!currentBook ? (
              <Text>You need to select a book as currently reading</Text>
            ) : (
              <>
                <Text style={styles.currentBookTitle}>
                  {currentBook && currentBook.title}
                </Text>
                <Text>{currentBook && currentBook.author}</Text>
              </>
            )}
            <TextInputComp
              func={(search) => setBookSearch(search)}
              value={bookSearch}
              label="Search"
              style={{ width: '80%', backgroundColor: 'white' }}
            />
          </View>
          <ScrollView style={styles.scrollContainer}>
            {filteredBooks &&
              filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} navigation={navigation} />
              ))}
          </ScrollView>
        </>
      ) : (
        <>
          <Text>These are not the droids you are looking for</Text>
          <View style={styles.getStartedContainer}>
            <Text>You need to</Text>
            <Text
              style={{ color: 'blue', marginHorizontal: 3 }}
              onPress={() => navigation.navigate('Lore', { screen: 'AddBook' })}
            >
              add a book
            </Text>
            <Text>to get started</Text>
          </View>
        </>
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
  scrollContainer: {
    width: '100%',
  },
  getStartedContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
