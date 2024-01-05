import { StyleSheet, View, Text, TextInput, Alert } from 'react-native'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Person } from '../models/types'

export default function People() {
  const [people, setPeople] = useState<Person[]>()

  useEffect(() => {
    async function getDb() {
      const db = getFirestore()
      const peopleCol = collection(db, 'people')
      const peopleSnapshot = await getDocs(peopleCol)
      const peopleList = []

      peopleSnapshot.docs.map((doc) =>
        peopleList.push({ ...doc.data(), id: doc.id })
      )
      setPeople(peopleList)
    }
    getDb()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
      <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
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
