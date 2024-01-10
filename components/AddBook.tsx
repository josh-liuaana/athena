import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native'
import { useState } from 'react'
import { postBook } from '../apis/books'
import { Book } from '../models/types'

export default function AddBook({ navigation }) {
  const [newBookInfo, setNewBookInfo] = useState<Partial<Book>>()

  const submitNewBook = async () => {
    await postBook(newBookInfo)
    Alert.alert('Thanks for adding a new book')
    navigation.navigate('Books')
  }

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
