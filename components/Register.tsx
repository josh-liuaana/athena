import { useState } from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'

import appLogo from '../assets/images/logo-no-background.png'

import SubmitButton from './@shared/SubmitButton'
import { PasswordInput, TextInputComp } from './@shared/TextInputComp'

import { auth } from '../firebase.config'

import { validateEmail } from '../models/utils'

export default function Register({ navigation }) {
  const [newUser, setNewUser] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const validateUserInput = () => {
    if (newUser.displayName.length < 2 || newUser.displayName.length > 30) {
      Alert.alert('Enter a display name between 2 and 30 characters')
    } else if (validateEmail(newUser.email) === null) {
      Alert.alert('Enter a valid email')
    } else if (newUser.password.length < 6) {
      Alert.alert('Password too short')
    } else if (newUser.password !== newUser.confirmPassword) {
      Alert.alert('Passwords do not match')
    } else {
      handleRegister()
    }
  }

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      )
      await updateProfile(auth.currentUser, {
        displayName: newUser.displayName,
      })
      await sendEmailVerification(auth.currentUser)
      Alert.alert('Email verification sent, check your email inbox')
    } catch (err) {
      throw new Error(err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={appLogo} />
      <Text style={styles.title}>Register</Text>
      <TextInputComp
        func={(displayName) => setNewUser({ ...newUser, displayName })}
        value={newUser.displayName}
        label="Display Name"
        style={{ width: '80%', backgroundColor: 'white' }}
      />
      <TextInputComp
        func={(email) => setNewUser({ ...newUser, email })}
        value={newUser.email}
        label="Email"
        style={{ width: '80%', backgroundColor: 'white' }}
      />
      <PasswordInput
        func={(password) => setNewUser({ ...newUser, password })}
        value={newUser.password}
        label="Password"
      />
      {newUser.password.length < 6 && newUser.password.length >= 1 && (
        <Text style={{ color: 'red' }}>
          Password needs to be at least 6 characters
        </Text>
      )}
      <PasswordInput
        func={(confirmPassword) => setNewUser({ ...newUser, confirmPassword })}
        value={newUser.confirmPassword}
        label="Confirm Password"
      />
      {newUser.password !== newUser.confirmPassword &&
        newUser.confirmPassword.length >= 1 && (
          <Text style={{ color: 'red' }}>Passwords do not match</Text>
        )}
      <SubmitButton
        buttonText="Register"
        clickHandleFunction={validateUserInput}
        disabled={false}
      />
      <View style={styles.loginContainer}>
        <Text>Already registered?</Text>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Logged out')}
        >
          Log in
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
    gap: 5,
  },
  logo: {
    height: 200,
    width: 203,
    margin: 15,
  },
  title: {
    fontFamily: 'vibes',
    fontSize: 70,
    width: '100%',
    textAlign: 'center',
    color: '#5a712c',
  },
  loginContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    marginLeft: 3,
    color: 'blue',
  },
})
