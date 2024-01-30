import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { auth } from '../firebase.config'
import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'
import { TextInput } from 'react-native-paper'
import { validateEmail } from '../models/utils'

export default function Register() {
  const [newUser, setNewUser] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

  const [displayNameValidated, setDisplayNameValidated] = useState(true)
  const [emailValidated, setEmailValidated] = useState(true)
  const [passwordValidated, setPasswordValidated] = useState(true)
  const [confirmPasswordValidated, setConfirmPasswordValidated] = useState(true)

  const handleRegister = async () => {
    setDisplayNameValidated(true)
    setEmailValidated(true)
    setPasswordValidated(true)
    setConfirmPasswordValidated(true)
    if (newUser.displayName.length < 2 || newUser.displayName.length > 30) {
      Alert.alert('enter a display name between 2 and 30 characters')
      setDisplayNameValidated(false)
    } else if (validateEmail(newUser.email) === null) {
      Alert.alert('enter a valid email')
      setEmailValidated(false)
    } else if (newUser.password.length < 6) {
      Alert.alert('password too short')
      setPasswordValidated(false)
    } else if (newUser.password !== newUser.confirmPassword) {
      Alert.alert('passwords do not match')
      setConfirmPasswordValidated(false)
    } else {
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
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.textInput}
        value={newUser.displayName}
        mode="outlined"
        label="Display Name"
        autoCapitalize="none"
        onChangeText={(displayName) => setNewUser({ ...newUser, displayName })}
        selectionColor="#171D0B"
        outlineColor={displayNameValidated ? '#DBE2CC' : 'red'}
        activeOutlineColor="#5a712c"
        textColor="#171D0B"
      />
      <TextInput
        style={styles.textInput}
        value={newUser.email}
        mode="outlined"
        label="Email"
        autoCapitalize="none"
        onChangeText={(email) => setNewUser({ ...newUser, email })}
        selectionColor="#171D0B"
        outlineColor={emailValidated ? '#DBE2CC' : 'red'}
        activeOutlineColor="#5a712c"
        textColor="#171D0B"
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry={hidePassword}
        right={
          <TextInput.Icon
            icon="eye"
            style={styles.icon}
            rippleColor="#DBE2CC"
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
        value={newUser.password}
        onChangeText={(password) => setNewUser({ ...newUser, password })}
        selectionColor="#171D0B"
        outlineColor={passwordValidated ? '#DBE2CC' : 'red'}
        activeOutlineColor="#5a712c"
        textColor="#171D0B"
        style={styles.textInput}
        autoCapitalize="none"
      />
      {newUser.password.length < 6 && newUser.password.length >= 1 && (
        <Text>Password needs to be at least 6 characters</Text>
      )}
      <TextInput
        mode="outlined"
        label="Confirm Password"
        secureTextEntry={hideConfirmPassword}
        right={
          <TextInput.Icon
            icon="eye"
            style={styles.icon}
            rippleColor="#DBE2CC"
            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
          />
        }
        value={newUser.confirmPassword}
        onChangeText={(confirmPassword) =>
          setNewUser({ ...newUser, confirmPassword })
        }
        selectionColor="#171D0B"
        outlineColor={
          confirmPasswordValidated ||
          (newUser.password !== newUser.confirmPassword &&
            newUser.confirmPassword.length >= 1)
            ? '#DBE2CC'
            : 'red'
        }
        activeOutlineColor={
          newUser.password !== newUser.confirmPassword &&
          newUser.confirmPassword.length >= newUser.password.length
            ? 'red'
            : '#5a712c'
        }
        textColor="#171D0B"
        style={styles.textInput}
        autoCapitalize="none"
      />
      {newUser.password !== newUser.confirmPassword &&
        newUser.confirmPassword.length >= 1 && (
          <Text>Passwords do not match</Text>
        )}
      <Pressable style={styles.button} onPress={handleRegister}>
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
    backgroundColor: '#DBE2CC',
  },
  title: {
    fontFamily: 'caveat',
    fontSize: 70,
    width: '100%',
    textAlign: 'center',
  },
  textInput: {
    width: '75%',
    height: 60,
    marginVertical: 5,
    fontSize: 25,
  },
  icon: {
    marginTop: 15,
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
    fontFamily: 'caveat',
  },
})
