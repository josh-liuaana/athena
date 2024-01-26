import { View, Text, StyleSheet, Pressable, Image } from 'react-native'

export default function Tomes({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/athena-favicon-color.png')}
      />
      <Text style={styles.title}>Tomes</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.buttonLeft]}
          onPress={() => navigation.navigate('Characters')}
        >
          <Text style={styles.buttonText}>Characters</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonRight]}
          onPress={() => navigation.navigate('Places')}
        >
          <Text style={styles.buttonText}>Locations</Text>
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
  logo: {
    height: 75,
    width: 75,
    margin: 15,
  },
  title: {
    fontFamily: 'vibes',
    fontSize: 70,
    width: '100%',
    textAlign: 'center',
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
    fontFamily: 'caveat',
  },
})
