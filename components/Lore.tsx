import { View, Text, StyleSheet, Pressable } from 'react-native'

export default function Lore({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>New lore input</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AddBook')}
      >
        <Text style={styles.buttonText}>Add Book</Text>
      </Pressable>
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
  button: {
    textAlign: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'Caveat-Regular',
  },
})
