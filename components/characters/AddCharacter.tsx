import { StyleSheet, View, Pressable, Text, Image, Alert } from 'react-native'
import { useState } from 'react'

import { TextInput } from 'react-native-paper'

import appLogo from '../../assets/images/athena-favicon-color.png'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { postThunkCharacter } from '../../redux/characters/characterSlice'

import { auth } from '../../firebase.config'

export default function AddCharacter({ navigation }) {
  const dispatch = useAppDispatch()
  const currentBook = useAppSelector((state) => state.books.current)
  const [newCharacter, setNewCharacter] = useState({
    city: '',
    ethnicity: '',
    name: '',
    books: [currentBook.title],
    userId: auth.currentUser.uid,
  })

  const submitNewCharacter = async () => {
    if (currentBook.universe) {
      await dispatch(
        postThunkCharacter({ ...newCharacter, universe: currentBook.universe })
      )
    } else {
      await dispatch(postThunkCharacter(newCharacter))
    }
    Alert.alert('Thanks for adding a new character')
    navigation.navigate('Characters', { paramPropKey: 'paramPropValue' })
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={appLogo} />
      <Text style={styles.title}>Add Character</Text>
      <Text style={styles.currentBook}>Adding to {currentBook.title}</Text>
      <TextInput
        style={styles.textInput}
        value={newCharacter.name}
        mode="outlined"
        label="Name"
        autoCapitalize="words"
        autoCorrect={false}
        onChangeText={(name) => setNewCharacter({ ...newCharacter, name })}
        selectionColor="#171d0b"
        activeOutlineColor="#5a712c"
        textColor="#171D0B"
      />
      <TextInput
        style={styles.textInput}
        value={newCharacter.city}
        mode="outlined"
        label="Home"
        autoCapitalize="words"
        autoCorrect={false}
        onChangeText={(city) => setNewCharacter({ ...newCharacter, city })}
        selectionColor="#171d0b"
        activeOutlineColor="#5a712c"
        textColor="#171D0B"
      />
      <TextInput
        style={styles.textInput}
        value={newCharacter.ethnicity}
        mode="outlined"
        label="Race"
        autoCapitalize="words"
        autoCorrect={false}
        onChangeText={(ethnicity) =>
          setNewCharacter({ ...newCharacter, ethnicity })
        }
        selectionColor="#171d0b"
        activeOutlineColor="#5a712c"
        textColor="#171D0B"
        enterKeyHint="done"
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText} onPress={submitNewCharacter}>
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
    gap: 5,
  },
  logo: {
    height: 75,
    width: 75,
  },
  title: {
    fontFamily: 'caveat',
    fontSize: 70,
    width: '100%',
    textAlign: 'center',
  },
  currentBook: {
    fontSize: 20,
  },
  textInput: {
    width: '80%',
  },
  button: {
    textAlign: 'center',
    justifyContent: 'center',
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
