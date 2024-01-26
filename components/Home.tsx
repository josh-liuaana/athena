import { Text, View, Image, Pressable } from 'react-native'

import { signOut } from 'firebase/auth'
import Icon from 'react-native-vector-icons/AntDesign'

import appLogo from '../assets/images/logo-no-background.png'

import { auth } from '../firebase.config'

import { homeStyles } from '../styles/styles'

export default function Home({ navigation }) {
  const handleNavigate = (page) => {
    navigation.navigate(page)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  return (
    <View style={homeStyles.container}>
      <Image style={homeStyles.logo} source={appLogo} />
      <Text style={homeStyles.subtitle}>scientia et intellectus</Text>

      <View style={homeStyles.buttonContainer}>
        <View style={homeStyles.topButtonContainer}>
          <Pressable
            style={[homeStyles.button, homeStyles.buttonTop]}
            onPress={() => handleNavigate('Tomes')}
          >
            <Text style={homeStyles.buttonText}>Tomes</Text>
          </Pressable>
        </View>

        <View style={homeStyles.bottomButtonsContainer}>
          <Pressable
            style={[homeStyles.button, homeStyles.buttonLeft]}
            onPress={() => handleNavigate('Lore')}
          >
            <Text style={homeStyles.buttonText}>Add Lore</Text>
          </Pressable>

          <Pressable
            style={[homeStyles.button, homeStyles.buttonRight]}
            onPress={() => handleNavigate('Books')}
          >
            <Text style={homeStyles.buttonText}>Library</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Pressable onPress={handleLogout}>
          <Icon style={homeStyles.icon} name="logout" />
        </Pressable>
      </View>
    </View>
  )
}
