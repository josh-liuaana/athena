import { View, Text, StyleSheet, Pressable, Image } from 'react-native'

import appLogo from '../assets/images/athena-favicon-color.png'

export default function Tomes({ navigation }) {
  const handleNavigate = (page: 'Characters' | 'Books' | 'Places'): void => {
    navigation.navigate(page)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={appLogo} />
      <Text style={styles.title}>Tomes</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.topButtonContainer}>
          <Pressable
            style={[styles.button, styles.buttonTop]}
            onPress={() => handleNavigate('Characters')}
          >
            <Text style={styles.buttonText}>Characters</Text>
          </Pressable>
        </View>

        <View style={styles.bottomButtonsContainer}>
          <Pressable
            style={[styles.button, styles.buttonLeft]}
            onPress={() => handleNavigate('Books')}
          >
            <Text style={styles.buttonText}>Library</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonRight]}
            onPress={() => handleNavigate('Places')}
            disabled
          >
            <Text style={styles.buttonText}>Locations</Text>
          </Pressable>
        </View>
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
  topButtonContainer: {
    height: '50%',
  },
  bottomButtonsContainer: {
    height: '50%',
    flexDirection: 'row',
  },
  buttonTop: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    color: '#5a712c',
  },
  buttonContainer: {
    margin: 15,
    flex: 0.3,
    width: '80%',
  },
  button: {
    flex: 0.5,
    textAlign: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
    justifyContent: 'center',
  },
  buttonLeft: {
    borderBottomLeftRadius: 10,
  },
  buttonRight: {
    borderBottomRightRadius: 10,
    backgroundColor: 'grey',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'caveat',
  },
})
