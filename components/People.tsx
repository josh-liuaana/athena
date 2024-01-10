import { StyleSheet, View, Text, TextInput, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { Person } from '../models/types'
import { fetchCharacters } from '../apis/characters'

export default function People() {
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
      <Text style={styles.title}>Characters</Text>
      <TextInput
        style={styles.input}
        onSubmitEditing={() => Alert.alert('function to come')}
        placeholder="Search for character..."
      />
      {people &&
        people.map((person) => (
          <View key={person.id}>
            <Text>{person.name}</Text>
          </View>
        ))}
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
  input: {
    margin: 10,
    width: '50%',
    borderWidth: 1,
    padding: 5,
  },
  title: {
    fontFamily: 'Caveat-Regular',
    fontSize: 70,
  },
})
