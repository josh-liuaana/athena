import { View, Text, StyleSheet } from 'react-native'

export default function EditProfile() {
  // name user name
  // update email
  // change password
  // delete account

  return (
    <View style={styles.container}>
      <Text>EditProfile</Text>
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
