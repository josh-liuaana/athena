import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { auth } from '../firebaseConfig'
import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      console.log('firebase auth response', res)
      navigation.navigate('Home')
    } catch (err) {
      console.error(err)
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res)
      navigation.navigate('Home')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        placeholder="Email..."
        autoCapitalize="none"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        value={password}
        placeholder="Password..."
        autoCapitalize="none"
        onChangeText={(password) => setPassword(password)}
      />
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Caveat-Regular',
    fontSize: 70,
    width: '100%',
    textAlign: 'center',
  },
  textInput: {
    margin: 5,
    borderRadius: 7,
    borderWidth: 2,
    width: '75%',
    height: 60,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 30,
    fontFamily: 'Caveat-Regular',
  },
  button: {
    textAlign: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
    borderRadius: 10,
    width: '40%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'Caveat-Regular',
  },
})
