import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Image,
  Button,
} from 'react-native'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import CharacterCard from './CharacterCard'
import { fetchThunkCharacters } from '../../redux/characters/characterSlice'

export default function People({ navigation, route }) {
  const dispatch = useAppDispatch()
  const characters = useAppSelector((state) => state.characters)

  useEffect(() => {
    dispatch(fetchThunkCharacters())
  }, [dispatch, route])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/athena-favicon-color.png')}
        />
        <Text style={styles.title}>Characters</Text>
      </View>
      <Button
        onPress={() => console.log(characters)}
        title="print current redux store"
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onSubmitEditing={() => Alert.alert('function to come')}
          placeholder="Search for character..."
        />
        <TextInput
          style={styles.input}
          onSubmitEditing={() => Alert.alert('function to come')}
          placeholder="Apply Filter..."
        />
      </View>
      <ScrollView style={styles.scrollContainer}>
        {characters &&
          characters.characterList.map((person) => (
            <CharacterCard
              key={person.id}
              characterInfo={person}
              navigation={navigation}
            />
          ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBE2CC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },

  titleContainer: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 60,
    width: 60,
    margin: 10,
  },
  title: {
    fontFamily: 'vibes',
    fontSize: 70,
    letterSpacing: 5,
  },

  inputContainer: {
    height: '18%',
    width: '60%',
    padding: 10,
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    padding: 5,
  },

  scrollContainer: {
    height: '52%',
    width: '100%',
  },
})
