import { View, Text, StyleSheet } from 'react-native'

import { auth } from '../../firebase.config'

export default function EditProfile() {
  const user = auth.currentUser

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user.displayName}</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Text style={styles.text}>
        Member since: {user.metadata.creationTime}
      </Text>
      <Text style={styles.text}>
        Last log in {user.metadata.lastSignInTime}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
})
