import { useState } from 'react'
import { View, Text, StyleSheet, Alert, Image, Keyboard } from 'react-native'

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { Portal, Modal, Button } from 'react-native-paper'

import appLogo from '../assets/images/logo-no-background.png'

import SubmitButton from './@shared/SubmitButton'
import { TextInputComp, PasswordInput } from './@shared/TextInputComp'
import Error from './Error'

import { auth } from '../firebase.config'

import { useAppDispatch, useAppSelector } from '../hooks/redux'

import { showError } from '../redux/error/errorSlice'

import { homeStyles } from '../styles/styles'
import { validateEmail } from '../models/utils'

export default function Login({ navigation }) {
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.error)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')

  const handleSignIn = async () => {
    Keyboard.dismiss()
    if (validateEmail(email) === null) {
      return Alert.alert('enter a valid email')
    }
    try {
      setIncorrectCount(0)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setIncorrectCount(incorrectCount + 1)
      if (incorrectCount >= 2) {
        Alert.alert(
          'Strike 3, You have one more attempt before you will need to reset your password?'
        )
      } else {
        dispatch(
          showError({
            errorTechnical: err.message,
            errorMessage: 'Incorrect login credentials, please try again',
          })
        )
      }
    }
  }

  const resetPassword = () => {
    Alert.alert('Check your email to reset your password')
    setEmail('')
    setPassword('')
    sendPasswordResetEmail(auth, email)
    setShowResetPassword(false)
  }

  return (
    <Portal>
      <View style={styles.container}>
        {error && <Error />}
        <Image style={homeStyles.logo} source={appLogo} />
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInputComp
            func={(email) => setEmail(email)}
            value={email}
            label={'Email'}
            style={{ width: '80%' }}
          />
          <PasswordInput
            func={(password) => setPassword(password)}
            value={password}
            label="Password"
          />
          {incorrectCount >= 4 && (
            <SubmitButton
              disabled={false}
              buttonText="Send password reset email"
              clickHandleFunction={() => setShowResetPassword(true)}
            />
          )}
          <SubmitButton
            disabled={incorrectCount >= 3}
            buttonText="Sign in"
            clickHandleFunction={handleSignIn}
          />
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
      <Modal
        visible={showResetPassword}
        onDismiss={() => setShowResetPassword(false)}
        contentContainerStyle={styles.containerStyle}
      >
        <Text>Enter email to reset</Text>
        <TextInputComp
          func={(email) => setResetEmail(email)}
          value={resetEmail}
          label="Email"
          style={{ width: '80%' }}
        />

        <View style={styles.resetModal}>
          <Button onPress={() => resetPassword()}>Send</Button>
          <Button onPress={() => setShowResetPassword(false)}>Cancel</Button>
        </View>
      </Modal>
    </Portal>
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
  resetModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '80%',
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
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    height: 175,
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    gap: 5,
  },
})
