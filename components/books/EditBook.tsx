import { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'

import { TextInputComp } from '../@shared/TextInputComp'
import SubmitButton from '../@shared/SubmitButton'

import { useAppDispatch } from '../../hooks/redux'

import { updateThunkBook } from '../../redux/books/booksSlice'

export default function EditBook({ book, setCurrentlyEditing }) {
  const dispatch = useAppDispatch()

  const { author, title, id } = book
  const [bookUpdateData, setBookUpdateData] = useState({
    title,
    author,
  })

  const handleUpdateDetails = () => {
    dispatch(updateThunkBook(bookUpdateData, id))
    setCurrentlyEditing(false)
    Alert.alert('book updated')
  }

  return (
    <View style={styles.editFormContainer}>
      <TextInputComp
        func={(newTitle) =>
          setBookUpdateData({ ...bookUpdateData, title: newTitle })
        }
        value={bookUpdateData.title}
        label="New Title"
      />
      <TextInputComp
        func={(newAuthor) =>
          setBookUpdateData({ ...bookUpdateData, author: newAuthor })
        }
        value={bookUpdateData.author}
        label="New Author"
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
