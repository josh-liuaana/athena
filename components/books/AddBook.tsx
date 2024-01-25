import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native'
import { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { postThunkBook } from '../../redux/books/booksSlice'
import { Book } from '../../models/types'

export default function AddBook({ navigation }) {
  const dispatch = useAppDispatch()
  const books = useAppSelector((state) => state.books.bookList)

  const [newBookInfo, setNewBookInfo] = useState<Partial<Book>>()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([{ label: 'Standalone Novel', value: '' }])
  const dropdownArray = []
  const uniqueUniverse = []

  useEffect(() => {
    books.map((book) => {
      if (book.universe && uniqueUniverse.includes(book.universe) === false) {
        uniqueUniverse.push(book.universe)
        dropdownArray.push({ label: book.universe, value: book.universe })
      }
      setItems(items.concat(dropdownArray))
    })
  }, [])

  useEffect(() => {
    setNewBookInfo({ ...newBookInfo, universe: value })
  }, [value])

  const submitNewBook = async () => {
    await dispatch(postThunkBook(newBookInfo))
    Alert.alert('Thanks for adding a new book')
    navigation.navigate('Books')
  }

  // TODO - need to include userID in the newBookInfo so db knows who added the book
  // * also need to include an 'are you currently reading this section' checkbox potential
  // TODO - dropdown
  // styling - looks crook as

  return (
    <View style={styles.container}>
      <Text>Add Book</Text>
      <TextInput
        placeholder="Book Title"
        onChangeText={(title) => setNewBookInfo({ ...newBookInfo, title })}
      />
      <TextInput
        placeholder="Author"
        onChangeText={(author) => setNewBookInfo({ ...newBookInfo, author })}
      />

      <Text>Is this book part of a series?</Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        items={items}
        setItems={setItems}
        value={value}
        setValue={setValue}
        placeholder="Choose a series uce..."
        placeholderStyle={{ color: 'grey' }}
        searchable={true}
        searchPlaceholder="Search for a series, or add a new one"
        addCustomItem={true}
        closeAfterSelecting={true}
        // * potentially use modal, but without the drop box view, click yes that modal popup
        // listMode="MODAL"
        // modalProps={{ animationType: 'slide' }}
      />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText} onPress={submitNewBook}>
          Submit
        </Text>
      </Pressable>
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
  button: {
    textAlign: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'Caveat-Regular',
  },
})
