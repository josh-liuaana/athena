import { StyleSheet, Text, View } from 'react-native'
import { initializeApp } from 'firebase/app'
import Books from './components/Books'

const firebaseConfig = {
  apiKey: 'AIzaSyAC4In-oSxGzp738krP-KSOOaXEjvxL0Ls',
  authDomain: 'lore-81319.firebaseapp.com',
  projectId: 'lore-81319',
  storageBucket: 'lore-81319.appspot.com',
  messagingSenderId: '99101299935',
  appId: '1:99101299935:web:72e7f366d67e69a662456a',
  measurementId: 'G-YY2YG2T1CH',
}

initializeApp(firebaseConfig)

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
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
