import { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'

import { TextInputComp } from '../@shared/TextInputComp'
import SubmitButton from '../@shared/SubmitButton'

import ErrorComp from '../Error'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { updateThunkBook } from '../../redux/books/booksSlice'
import { showError } from '../../redux/error/errorSlice'

export default function EditBook({ book, setCurrentlyEditing }) {
  const error = useAppSelector((state) => state.error)
  const dispatch = useAppDispatch()

  const { author, title, id } = book
  const [bookUpdateData, setBookUpdateData] = useState({
    title,
    author,
  })

  const handleUpdateDetails = (): void => {
    try {
      dispatch(updateThunkBook(bookUpdateData, id))
      Alert.alert('book updated')
    } catch (err) {
      dispatch(
        showError({
          errorTechnical: err.message,
          errorMessage: `Can't update book details right now, try again later`,
        })
      )
    } finally {
      setCurrentlyEditing(false)
    }
  }

  return (
    <View style={styles.editFormContainer}>
      {error && <ErrorComp />}
      <TextInputComp
        func={(newTitle) =>
          setBookUpdateData({ ...bookUpdateData, title: newTitle })
        }
        value={bookUpdateData.title}
        label="New Title"
        style={{ width: '80%' }}
      />
      <TextInputComp
        func={(newAuthor) =>
          setBookUpdateData({ ...bookUpdateData, author: newAuthor })
        }
        value={bookUpdateData.author}
        label="New Author"
        style={{ width: '80%' }}
      />
      <SubmitButton
        buttonText="Submit"
        clickHandleFunction={handleUpdateDetails}
        disabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  editFormContainer: {
    marginTop: 5,
    gap: 5,
    alignItems: 'center',
  },
})
