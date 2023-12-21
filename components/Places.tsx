import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import * as convert from '../models/data-functions'
import { Location } from '../models/types'

export default function Places() {
  const [location, setLocation] = useState<Location[]>()

  useEffect(() => {
    async function getDb() {
      const db = getFirestore()
      const placesCol = collection(db, 'places')
      const placesSnapshot = await getDocs(placesCol)
      const placesList = []

      placesSnapshot.docs.map((doc) =>
        placesList.push({ ...doc.data(), id: doc.id })
      )
      setLocation(placesList)
    }
    getDb()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Locations</Text>
      <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        onSubmitEditing={() => Alert.alert('function to come')}
        placeholder="Search for location..."
      />
      {location &&
        location.map((location) => (
          <View key={location.id}>
            <Text>{convert.capitalise(location.location)}</Text>
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
