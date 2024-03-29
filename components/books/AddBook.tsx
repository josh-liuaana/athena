import { View, Text, StyleSheet, Image, Keyboard } from 'react-native'
import { useEffect, useState } from 'react'

import DropDownPicker from 'react-native-dropdown-picker'
import { Checkbox, Dialog, Portal, Button } from 'react-native-paper'

import appLogo from '../../assets/images/athena-favicon-color.png'

import SubmitButton from '../@shared/SubmitButton'
import { TextInputComp } from '../@shared/TextInputComp'

import ErrorComp from '../Error'

import { auth } from '../../firebase.config'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { postThunkBook, updateThunkBook } from '../../redux/books/booksSlice'

import type { Book } from '../../models/types'
import { showError } from '../../redux/error/errorSlice'

export default function AddBook({ navigation }) {
  const dispatch = useAppDispatch()
  const books = useAppSelector((state) => state.books.bookList)
  const currentBook = useAppSelector((state) => state.books.current)
  const error = useAppSelector((state) => state.error)

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

  const handleSubmitClick = (): void => {
    Keyboard.dismiss()
    if (
      newBookInfo.title !== '' &&
      newBookInfo.author !== '' &&
      checked === true &&
      value === null
    ) {
      dispatch(
        showError({
          errorTechnical: null,
          errorMessage: `Did you mean to tick series?\nIf so, make sure you've selected a universe`,
        })
      )
      setChecked(false)
    } else if (newBookInfo.title !== '' && newBookInfo.author !== '') {
      try {
        setDialogVisible(true)
      } catch (err) {
        dispatch(
          showError({
            errorTechnical: err.message,
            errorMessage: 'Something has gone wrong, please try again later',
          })
        )
      }
    } else {
      dispatch(
        showError({
          errorTechnical: null,
          errorMessage:
            'Make sure you fill out the Title and Author fields correctly',
        })
      )
    }
  }

  const submitNewBook = async (current: boolean): Promise<void> => {
    if (currentBook && current === true) {
      dispatch(updateThunkBook({ isCurrent: false }, currentBook.id))
    }
    try {
      await dispatch(
        postThunkBook({ ...newBookInfo, userId: user.uid, isCurrent: current })
      )
      setNewBookInfo({ title: '', author: '' })
      navigation.navigate('Tomes', { screen: 'Books' })
    } catch (err) {
      dispatch(
        showError({
          errorTechnical: err.message,
          errorMessage: 'Something has gone wrong, please try again later',
        })
      )
    } finally {
      setChecked(false)
      setDialogVisible(false)
    }
  }

  return (
    <Portal.Host>
      {error && <ErrorComp />}
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Image style={styles.logo} source={appLogo} />
          <Text style={styles.title}>Add Book</Text>
          <TextInputComp
            func={(title) => setNewBookInfo({ ...newBookInfo, title })}
            value={newBookInfo.title}
            label="Book Title"
            style={{ width: '80%', backgroundColor: 'white' }}
          />
          <TextInputComp
            func={(author) => setNewBookInfo({ ...newBookInfo, author })}
            value={newBookInfo.author}
            label="Author"
            style={{ width: '80%', backgroundColor: 'white' }}
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
              labelStyle={{ color: 'black' }}
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
                translation={{
                  NOTHING_TO_SHOW: `Enter your first series to get started!`,
                }}
              />
            )}
          </View>

          <SubmitButton
            disabled={false} // change to true when fields are filled in correctly
            buttonText="Submit"
            clickHandleFunction={() => handleSubmitClick()}
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
})
