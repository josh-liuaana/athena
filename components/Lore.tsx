import { View, Text, StyleSheet, Pressable, Alert, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'

export default function Lore({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/athena-favicon-color.png')}
      />
      <Text style={styles.title}>Add Lore</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.topButtonContainer}>
          <Pressable
            style={[styles.button, styles.buttonTop]}
            onPress={() => navigation.navigate('AddBook')}
          >
            <Icon style={styles.icon} name="book" size={60} />
          </Pressable>
        </View>
        <View style={styles.bottomButtonsContainer}>
          <Pressable
            style={[styles.button, styles.buttonLeft]}
            onPress={() => Alert.alert('Character')}
          >
            <Icon style={styles.icon} name="person" size={60} />
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonRight]}
            onPress={() => Alert.alert('Location')}
          >
            <Icon style={styles.icon} name="location" size={60} />
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
  logo: {
    height: 75,
    width: 75,
    margin: 15,
  },
  title: {
    fontFamily: 'Caveat-Regular',
    fontSize: 70,
    width: '100%',
    textAlign: 'center',
  },

  buttonContainer: {
    flex: 0.35,
    width: '80%',
  },
  topButtonContainer: {
    height: '50%',
  },
  bottomButtonsContainer: {
    height: '50%',
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    flex: 0.5,
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
  },

  buttonTop: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonLeft: {
    borderBottomLeftRadius: 10,
  },
  buttonRight: {
    borderBottomRightRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'Caveat-Regular',
  },
  icon: {
    color: '#DBE2CC',
    textAlign: 'center',
  },
})
