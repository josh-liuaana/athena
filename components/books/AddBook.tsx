import { View, Text, StyleSheet, Pressable, Alert, Image } from 'react-native'
import { useEffect, useRef, useState } from 'react'

import DropDownPicker from 'react-native-dropdown-picker'
import { Checkbox, TextInput } from 'react-native-paper'

import appLogo from '../../assets/images/athena-favicon-color.png'

import { auth } from '../../firebase.config'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { postThunkBook, updateThunkBook } from '../../redux/books/booksSlice'

import type { Book } from '../../models/types'

export default function AddBook({ navigation }) {
  const dispatch = useAppDispatch()
  const books = useAppSelector((state) => state.books.bookList)
  const currentId = useAppSelector((state) => state.books.current.id)

  const authorRef = useRef(null)
  const [newBookInfo, setNewBookInfo] = useState<Partial<Book>>({
    title: '',
    author: '',
  })
  const [checked, setChecked] = useState(false)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([])

  const user = auth.currentUser
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

  const submitNewBook = async (current) => {
    if (current === true) {
      dispatch(updateThunkBook({ isCurrent: false }, currentId))
    }
    await dispatch(
      postThunkBook({ ...newBookInfo, userId: user.uid, isCurrent: current })
    )
    setNewBookInfo({ title: '', author: '' })
    setChecked(false)
    Alert.alert('Thanks for adding a new book')
    navigation.navigate('Tomes', { screen: 'Books' })
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Image style={styles.logo} source={appLogo} />
        <Text style={styles.title}>Add Book</Text>
        <TextInput
          style={styles.textInput}
          value={newBookInfo.title}
          mode="outlined"
          label="Book Title"
          autoCapitalize="words"
          onChangeText={(title) => setNewBookInfo({ ...newBookInfo, title })}
          selectionColor="#171d0b"
          activeOutlineColor="#5a712c"
          textColor="#171D0B"
          enterKeyHint="next"
          onSubmitEditing={() => authorRef.current.focus()}
        />
        <TextInput
          ref={authorRef}
          style={styles.textInput}
          mode="outlined"
          label="Author"
          autoCapitalize="words"
          selectionColor="#171d0b"
          activeOutlineColor="#5a712c"
          textColor="#171D0B"
          value={newBookInfo.author}
          onChangeText={(author) => setNewBookInfo({ ...newBookInfo, author })}
        />

        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked)
            }}
            uncheckedColor="black"
            color="#5a712c"
            label="Part of a series?"
            rippleColor="#5a712c"
            position="leading"
          />
        </View>
        {checked && (
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={items}
            setItems={setItems}
            value={value}
            setValue={setValue}
            placeholder="Choose a series..."
            placeholderStyle={{ color: 'grey' }}
            searchable={true}
            searchPlaceholder="Search for a series, or add a new one"
            addCustomItem={true}
            closeAfterSelecting={true}
          />
        )}

        <Pressable
          style={styles.button}
          onPress={() =>
            Alert.alert(
              `Are you currently reading this book`,
              'Would you like this book to be set as active',
              [
                {
                  text: 'Yes',
                  onPress: () => submitNewBook(true),
                },
                {
                  text: 'No',
                  onPress: () => submitNewBook(false),
                },
              ],
              {
                cancelable: true,
              }
            )
          }
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
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
  formContainer: {
    width: '80%',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 75,
    width: 75,
    margin: 15,
  },
  title: {
    fontFamily: 'caveat',
    fontSize: 70,
    width: '100%',
    textAlign: 'center',
  },
  textInput: {
    width: '100%',
  },
  button: {
    textAlign: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
    borderRadius: 10,
    width: '40%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'caveat',
  },
})
