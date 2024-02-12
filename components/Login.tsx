import { useState } from 'react'
import { View, Text, StyleSheet, Alert, Image } from 'react-native'

import { Button } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth'

import appLogo from '../assets/images/logo-no-background.png'

import { TextInputComp, PasswordInput } from './@shared/TextInputComp'

import { auth } from '../firebase.config'

import { homeStyles } from '../styles/styles'
import SubmitButton from './@shared/SubmitButton'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Image style={homeStyles.logo} source={appLogo} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInputComp
          func={(email) => setEmail(email)}
          value={email}
          label={'Email'}
        />
        <PasswordInput
          func={(password) => setPassword(password)}
          value={password}
          label="Password"
        />
        <SubmitButton
          disabled={false}
          buttonText="Sign in"
          clickHandleFunction={handleSignIn}
        />
      </View>
      <View style={styles.gfbContainer}>
        <Button
          disabled
          icon="google"
          mode="contained"
          onPress={() => Alert.alert('Google login')}
          buttonColor="#DB4437"
        >
          Google
        </Button>
        <Button
          disabled
          icon="facebook"
          mode="contained"
          onPress={() => Alert.alert('Facebook login')}
          buttonColor="#316FF6"
        >
          Facebook
        </Button>
      </View>
      <View style={styles.registerContainer}>
        <Text>Not registered yet?</Text>
        <Text
          style={styles.registerText}
          onPress={() => navigation.navigate('Register')}
        >
          Register
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DBE2CC',
  },
  title: {
    fontFamily: 'vibes',
    letterSpacing: 4,
    color: '#5a712c',
    fontSize: 70,
    width: '100%',
    textAlign: 'center',
  },
  inputContainer: {
    gap: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gfbContainer: {
    marginTop: 10,
    gap: 10,
  },
  registerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    marginLeft: 3,
    color: 'blue',
  },
})
