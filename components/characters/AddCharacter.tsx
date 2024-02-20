import { StyleSheet, View, Text, Image, Alert, Keyboard } from 'react-native'
import { useState } from 'react'

import SubmitButton from '../@shared/SubmitButton'
import { TextInputComp } from '../@shared/TextInputComp'

import ErrorComp from '../Error'

import appLogo from '../../assets/images/athena-favicon-color.png'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { postThunkCharacter } from '../../redux/characters/characterSlice'

import { auth } from '../../firebase.config'
import { showError } from '../../redux/error/errorSlice'

export default function AddCharacter({ navigation }) {
  const dispatch = useAppDispatch()
  const currentBook = useAppSelector((state) => state.books.current)
  const error = useAppSelector((state) => state.error)

  const [newCharacter, setNewCharacter] = useState({
    city: '',
    ethnicity: '',
    name: '',
    books: currentBook && [currentBook.title],
    userId: auth.currentUser.uid,
  })

  const submitNewCharacter = async (): Promise<void> => {
    Keyboard.dismiss()
    if (newCharacter.name === '') {
      dispatch(
        showError({
          errorTechnical: null,
          errorMessage: `Can't submit a character without a name`,
        })
      )
    } else {
      try {
        if (currentBook.universe) {
          await dispatch(
            postThunkCharacter({
              ...newCharacter,
              universe: currentBook.universe,
            })
          )
        } else {
          await dispatch(postThunkCharacter(newCharacter))
        }
        setNewCharacter({
          ...newCharacter,
          city: '',
          ethnicity: '',
          name: '',
        })
        Alert.alert('Thanks for adding a new character')
        navigation.navigate('Tomes', {
          screen: 'Characters',
        })
      } catch (err) {
        dispatch(
          showError({
            errorTechnical: err.message,
            errorMessage: `Unable to add new character, try again later`,
          })
        )
      }
    }
  }

  return (
    <View style={styles.container}>
      {error && <ErrorComp />}
      <Image style={styles.logo} source={appLogo} />
      <Text style={styles.title}>Add Character</Text>
      {currentBook ? (
        <>
          <Text style={styles.currentBook}>Adding to {currentBook.title}</Text>
          <TextInputComp
            func={(name) => setNewCharacter({ ...newCharacter, name })}
            value={newCharacter.name}
            label="Name"
            style={{ width: '80%', backgroundColor: 'white' }}
          />
          <TextInputComp
            func={(city) => setNewCharacter({ ...newCharacter, city })}
            value={newCharacter.city}
            label="Home"
            style={{ width: '80%', backgroundColor: 'white' }}
          />
          <TextInputComp
            func={(ethnicity) =>
              setNewCharacter({ ...newCharacter, ethnicity })
            }
            value={newCharacter.ethnicity}
            label="Race"
            style={{ width: '80%', backgroundColor: 'white' }}
          />
          <SubmitButton
            buttonText="Submit"
            clickHandleFunction={submitNewCharacter}
            disabled={false}
          />
        </>
      ) : (
        <>
          <Text>You need to set a book as current to add Characters</Text>
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
})
