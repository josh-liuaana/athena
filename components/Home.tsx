import { StyleSheet, Text, View } from 'react-native'
import Books from './Books'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Athena</Text>
      <Text>Your one stop lore shop for tracking people and places</Text>
      <Books />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
