import { View, Text, StyleSheet } from 'react-native'

export default function Lore() {
  return (
    <View style={styles.container}>
      <Text>New lore input</Text>
      <View>
        <Text>FORM INFO TO PLUG IN</Text>
        <Text>Universe</Text>
        <Text>Book</Text>
        <Text>Place/Character</Text>
        <Text>if char: relationship</Text>
        <Text>if char: home city</Text>
        <Text>summary</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBE2CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
