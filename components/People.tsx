import { StyleSheet, View, Text } from 'react-native'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'

export default function People() {
  useEffect(() => {
    async function getDb() {
      const db = getFirestore()
      const peopleCol = collection(db, 'people')
      const peopleSnapshot = await getDocs(peopleCol)
      const peopleList = []

      peopleSnapshot.docs.map((doc) =>
        peopleList.push({ ...doc.data(), id: doc.id })
      )
      console.log(peopleList)
    }
    getDb()
  }, [])

  return (
    <View style={styles.container}>
      <Text> PEEPS </Text>
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
