import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import { useEffect, useRef, useState } from 'react'

import DropDownPicker from 'react-native-dropdown-picker'
import { Checkbox, Dialog, Portal, TextInput, Button } from 'react-native-paper'

import appLogo from '../../assets/images/athena-favicon-color.png'

import SubmitButton from '../@shared/SubmitButton'
import TextInputComp from '../@shared/TextInputComp'

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
  const [dialogVisible, setDialogVisible] = useState(false)

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
    setDialogVisible(false)
    Alert.alert('Thanks for adding a new book')
    navigation.navigate('Tomes', { screen: 'Books' })
  }

  return (
    <Portal.Host>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Image style={styles.logo} source={appLogo} />
          <Text style={styles.title}>Add Book</Text>
          <TextInputComp
            func={(title) => setNewBookInfo({ ...newBookInfo, title })}
            value={newBookInfo.title}
            label="Book Title"
          />
          <TextInputComp
            func={(author) => setNewBookInfo({ ...newBookInfo, author })}
            value={newBookInfo.author}
            label="Author"
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
          <View style={{ width: '80%' }}>
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
          </View>

          <SubmitButton
            disabled={false} // change to true when fields are filled in correctly
            buttonText="Submit"
            clickHandleFunction={() => setDialogVisible(true)}
          />
        </View>
      </View>
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Icon icon="book-check-outline" />
        <Dialog.Title>{`Are you currently reading this book?`}</Dialog.Title>
        <Dialog.Content>
          <Text>{`Would you like this book to be set as active?\nYou can always change your active book in library so don't worry`}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => submitNewBook(false)}>No</Button>
          <Button onPress={() => submitNewBook(true)}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal.Host>
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
    width: '100%',
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
})
