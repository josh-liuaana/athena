import { initializeApp } from 'firebase/app'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './components/Home'
import Input from './components/Lore'

const firebaseConfig = {
  apiKey: 'AIzaSyAC4In-oSxGzp738krP-KSOOaXEjvxL0Ls',
  authDomain: 'lore-81319.firebaseapp.com',
  projectId: 'lore-81319',
  storageBucket: 'lore-81319.appspot.com',
  messagingSenderId: '99101299935',
  appId: '1:99101299935:web:72e7f366d67e69a662456a',
  measurementId: 'G-YY2YG2T1CH',
}

initializeApp(firebaseConfig)

const Stack = createNativeStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({
    'Caveat-Regular': require('./assets/fonts/Caveat-Regular.ttf'),
  })

  if (!fontsLoaded) return null

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Lore"
          component={Input}
          options={{
            title: 'Lore',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
