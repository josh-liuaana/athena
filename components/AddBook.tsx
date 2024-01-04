import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native'
import { useState } from 'react'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

export default function AddBook() {
  const [newBookInfo, setNewBookInfo] = useState({
    title: '',
    author: '',
    isCurrent: false,
  })

  const submitNewBook = async () => {
    const db = getFirestore()
    console.log(newBookInfo)
    try {
      await addDoc(collection(db, 'books'), newBookInfo)
      Alert.alert('Thanks for adding a new book')
    } catch (err) {
      console.log(err)
    }
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
