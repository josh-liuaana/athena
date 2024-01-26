import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.config'
import { Provider } from 'react-redux'

import { store } from './redux/store'

import Home from './components/Home'
import Lore from './components/Lore'
import Tomes from './components/Tome'
import Characters from './components/characters/Characters'
import Places from './components/locations/Places'
import Books from './components/books/Books'
import AddBook from './components/books/AddBook'
import AddCharacter from './components/characters/AddCharacter'
import SingleCharacter from './components/characters/SingleCharacter'
import Login from './components/Login'

const Stack = createNativeStackNavigator()

// ! SET UP REDUX FOR FRONT END STATE MANAGEMENT

export default function App() {
  const [fontsLoaded] = useFonts({
    'Caveat-Regular': require('./assets/fonts/Caveat-Regular.ttf'),
    vibes: require('./assets/fonts/GreatVibes-Regular.ttf'),
  })

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])
  if (!fontsLoaded) return null

  return (
    <Provider store={store}>
      <NavigationContainer>
        {user ? (
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
              component={Lore}
              options={{
                title: 'Lore',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Tomes"
              component={Tomes}
              options={{
                title: 'Tomes',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Books"
              component={Books}
              options={{
                title: 'Books',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Characters"
              component={Characters}
              options={{
                title: 'Characters',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Places"
              component={Places}
              options={{
                title: 'Places',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddBook"
              component={AddBook}
              options={{
                title: 'AddBook',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddCharacter"
              component={AddCharacter}
              options={{
                title: 'AddCharacter',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SingleCharacter"
              component={SingleCharacter}
              options={{
                title: 'SingleCharacter',
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Logged out"
              component={Login}
              options={{
                title: 'User logged out - login form',
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  )
}
