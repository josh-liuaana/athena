import { View, Text, StyleSheet } from 'react-native'

export default function Information() {
  return (
    <View style={styles.container}>
      <Text>Information component</Text>
      <Text>Cheeky how to use guide</Text>
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
