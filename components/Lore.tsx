import { View, Text, StyleSheet, Pressable, Alert, Image } from 'react-native'

import appLogo from '../assets/images/athena-favicon-color.png'
import Icon from 'react-native-vector-icons/Octicons'

export default function Lore({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={appLogo} />
      <Text style={styles.title}>Add Lore</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.topButtonContainer}>
          <Pressable
            style={[styles.button, styles.buttonTop]}
            onPress={() => navigation.navigate('AddCharacter')}
          >
            <Icon style={styles.icon} name="person" size={47} />
          </Pressable>
        </View>

        <View style={styles.bottomButtonsContainer}>
          <Pressable
            style={[styles.button, styles.buttonLeft]}
            onPress={() => navigation.navigate('AddBook')}
          >
            <Icon style={styles.icon} name="book" size={47} />
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonRight]}
            onPress={() => Alert.alert('Add Location functionality to come')}
          >
            <Icon style={styles.icon} name="location" size={47} />
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
    fontSize: 40,
    fontFamily: 'caveat',
  },
  icon: {
    color: '#DBE2CC',
    textAlign: 'center',
  },
})
