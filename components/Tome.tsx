import { View, Text, StyleSheet, Pressable } from 'react-native'

export default function Tomes({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Tomes</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.buttonLeft]}
          onPress={() => navigation.navigate('People')}
        >
          <Text style={styles.buttonText}>People</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonRight]}
          onPress={() => navigation.navigate('Places')}
        >
          <Text style={styles.buttonText}>Places</Text>
        </Pressable>
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
  buttonContainer: {
    margin: 15,
    flexDirection: 'row',
  },
  button: {
    flex: 0.5,
    textAlign: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
  },
  buttonLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'Caveat-Regular',
  },
})
