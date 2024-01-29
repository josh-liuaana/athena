import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { auth } from '../firebase.config'
import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { Button, TextInput } from 'react-native-paper'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  const handleSignUp = async () => {
    try {
      Alert.alert(
        'register redirect, disabled until better functionality set up'
      )
      // await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        mode="outlined"
        label="Email"
        autoCapitalize="none"
        onChangeText={(email) => setEmail(email)}
        selectionColor="#171D0B"
        outlineColor="#DBE2CC"
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
        value={password}
        onChangeText={(password) => setPassword(password)}
        selectionColor="#171D0B"
        outlineColor="#DBE2CC"
        activeOutlineColor="#5a712c"
        textColor="#171D0B"
        style={styles.textInput}
        autoCapitalize="none"
      />
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <View style={styles.gfbContainer}>
        <Button
          icon="google"
          mode="contained"
          onPress={() => Alert.alert('Google login')}
          buttonColor="#DB4437"
        >
          Google
        </Button>
        <Button
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
        <Text style={styles.registerText} onPress={handleSignUp}>
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
