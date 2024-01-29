import { View, Text, StyleSheet, Button, Alert, Pressable } from 'react-native'

import { signOut } from 'firebase/auth'

import Icon from 'react-native-vector-icons/AntDesign'

import { auth } from '../../firebase.config'
import React from 'react'
import { homeStyles } from '../../styles/styles'

export default function UserProfile() {
  const user = auth.currentUser

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hello ~username~</Text>
      <Text>{user.email}</Text>
      {!user.emailVerified && (
        <View>
          <Text style={{ color: 'red' }}>
            Email address not yet verified, please verify
          </Text>
          <Button
            title="Resend verification email"
            onPress={() => Alert.alert('not quite there yet')}
          />
        </View>
      )}
      <Text>User information blah blah</Text>
      <Button
        title="Update User Information"
        onPress={() => Alert.alert('User update form')}
      />
      <View>
        <Pressable onPress={handleLogout}>
          <Icon style={homeStyles.icon} name="logout" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
