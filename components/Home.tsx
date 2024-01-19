import { signOut } from 'firebase/auth'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { auth } from '../firebaseConfig'

export default function Home({ navigation }) {
  const handleNavigate = (page) => {
    navigation.navigate(page)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logo-no-background.png')}
      />
      <Text style={styles.subtitle}>scientia et intellectus</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.topButtonContainer}>
          <Pressable
            style={[styles.button, styles.buttonTop]}
            onPress={() => handleNavigate('Tomes')}
          >
            <Text style={styles.buttonText}>Tomes</Text>
          </Pressable>
        </View>

        <View style={styles.bottomButtonsContainer}>
          <Pressable
            style={[styles.button, styles.buttonLeft]}
            onPress={() => handleNavigate('Lore')}
          >
            <Text style={styles.buttonText}>Add Lore</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonRight]}
            onPress={() => handleNavigate('Books')}
          >
            <Text style={styles.buttonText}>Library</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Pressable onPress={handleLogout}>
          <Icon style={styles.icon} name="logout" />
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
    height: 200,
    width: 203,
    margin: 15,
  },

  subtitle: {
    textAlign: 'center',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 60,
    fontFamily: 'vibes',
    letterSpacing: 3,
    color: '#5a712c',
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
    marginTop: 20,
    fontSize: 60,
  },
})
