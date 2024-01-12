import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Image,
} from 'react-native'
import { useEffect, useState } from 'react'
import { Person } from '../models/types'
import { fetchCharacters } from '../apis/characters'
import CharacterCard from './CharacterCard'

export default function People({ navigation }) {
  const [people, setPeople] = useState<Person[]>()

  useEffect(() => {
    async function getDb() {
      const characterData = await fetchCharacters()
      setPeople(characterData)
    }
    getDb()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/athena-favicon-color.png')}
        />
        <Text style={styles.title}>Characters</Text>
      </View>
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
        {people &&
          people.map((person) => (
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
