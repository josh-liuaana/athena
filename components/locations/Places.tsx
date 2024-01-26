import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Location } from '../../models/types'
import { fetchLocations } from '../../apis/locations'

export default function Places() {
  const [location, setLocation] = useState<Location[]>()

  useEffect(() => {
    async function getDb() {
      const locationData = await fetchLocations()
      setLocation(locationData)
    }
    getDb()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Locations</Text>
      <TextInput
        style={styles.input}
        onSubmitEditing={() => Alert.alert('function to come')}
        placeholder="Search for location..."
      />
      {location &&
        location.map((location) => (
          <View key={location.id}>
            <Text>{location.location}</Text>
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
    fontFamily: 'caveat',
    fontSize: 70,
  },
})
