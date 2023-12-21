import { StyleSheet, Text, View } from 'react-native'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'

export default function Places() {
  useEffect(() => {
    async function getDb() {
      const db = getFirestore()
      const placesCol = collection(db, 'places')
      const placesSnapshot = await getDocs(placesCol)
      const placesList = []

      placesSnapshot.docs.map((doc) =>
        placesList.push({ ...doc.data(), id: doc.id })
      )
      console.log(placesList)
    }
    getDb()
  }, [])

  return (
    <View style={styles.container}>
      <Text> PLACES</Text>
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
})
