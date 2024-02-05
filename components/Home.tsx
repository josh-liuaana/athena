import { useEffect } from 'react'
import { Text, View, Image, Pressable } from 'react-native'

import appLogo from '../assets/images/logo-no-background.png'
import { homeStyles } from '../styles/styles'

import { useAppDispatch } from '../hooks/redux'

import { fetchThunkCharacters } from '../redux/characters/characterSlice'
import { fetchThunkBooks } from '../redux/books/booksSlice'

export default function Home({ navigation }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchThunkCharacters())
    dispatch(fetchThunkBooks())
  })

  const handleNavigate = (page) => {
    navigation.navigate(page)
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
            onPress={() => handleNavigate('Information')}
          >
            <Text style={homeStyles.buttonText}>Info</Text>
          </Pressable>

          <Pressable
            style={[homeStyles.button, homeStyles.buttonRight]}
            onPress={() => handleNavigate('User')}
          >
            <Text style={homeStyles.buttonText}>User</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
