import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native'

export default function Home({ navigation }) {
  const handleNavigate = (page) => {
    navigation.navigate(page)
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logo-no-background.png')}
      />
      <Text style={styles.subtitle}>The one stop lore shop</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.buttonLeft]}
          onPress={() => handleNavigate('Lore')}
        >
          <Text style={styles.buttonText}>New Lore</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonRight]}
          onPress={() => Alert.alert('tome navigation')}
        >
          <Text style={styles.buttonText}>Tomes</Text>
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
    fontSize: 50,
    fontFamily: 'Caveat-Regular',
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
