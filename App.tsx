import { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Provider } from 'react-redux'

import { User, onAuthStateChanged } from 'firebase/auth'
import { useFonts } from 'expo-font'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from './components/Home'
import Lore from './components/Lore'
import Tomes from './components/Tomes'
import Characters from './components/characters/Characters'
import Places from './components/locations/Places'
import Books from './components/books/Books'
import AddBook from './components/books/AddBook'
import AddCharacter from './components/characters/AddCharacter'
import SingleCharacter from './components/characters/SingleCharacter'
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/user/UserProfile'
import Information from './components/Information'

import { auth } from './firebase.config'

import { store } from './redux/store'
import { PaperProvider } from 'react-native-paper'

const TomesStack = createNativeStackNavigator()

function TomesStackScreen() {
  return (
    <TomesStack.Navigator>
      <TomesStack.Screen
        name="TomesHome"
        component={Tomes}
        options={{ title: 'TomesHome', headerShown: false }}
      />
      <TomesStack.Screen
        name="Characters"
        component={Characters}
        options={{ title: 'Characters', headerShown: false }}
      />
      <TomesStack.Screen
        name="SingleCharacter"
        component={SingleCharacter}
        options={{ title: 'SingleCharacter', headerShown: false }}
      />
      <TomesStack.Screen
        name="Places"
        component={Places}
        options={{ title: 'Places', headerShown: false }}
      />
      <TomesStack.Screen
        name="Books"
        component={Books}
        options={{ title: 'Books', headerShown: false }}
      />
    </TomesStack.Navigator>
  )
}

const LoreStack = createNativeStackNavigator()

function LoreStackScreen() {
  return (
    <LoreStack.Navigator>
      <LoreStack.Screen
        name="LoreHome"
        component={Lore}
        options={{ title: 'LoreHome', headerShown: false }}
      />
      <LoreStack.Screen
        name="AddBook"
        component={AddBook}
        options={{ title: 'AddBook', headerShown: false }}
      />
      <LoreStack.Screen
        name="AddCharacter"
        component={AddCharacter}
        options={{ title: 'AddCharacter', headerShown: false }}
      />
      {/* <LoreStack.Screen name="AddLocation" component={AddLocation} /> */}
    </LoreStack.Navigator>
  )
}

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({
    caveat: require('./assets/fonts/Caveat-Regular.ttf'),
    vibes: require('./assets/fonts/GreatVibes-Regular.ttf'),
  })

  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])

  const handleLongPress = (tabPressed) => {
    if (tabPressed === 'tomes') {
      Alert.alert(
        'Navigate here to find all the lore and knowledge you have added to your tomes'
      )
    } else if (tabPressed === 'lore') {
      Alert.alert(
        'Navigate here if you have new information to add to your tomes of knowledge'
      )
    }
  }

  if (!fontsLoaded) return null

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          {user ? (
            <Tab.Navigator
              initialRouteName="Home"
              backBehavior="history"
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                  let iconName

                  if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline'
                  } else if (route.name === 'Tomes') {
                    iconName = focused ? 'book' : 'book-outline'
                  } else if (route.name === 'User') {
                    iconName = focused ? 'person' : 'person-outline'
                  } else if (route.name === 'Information') {
                    iconName = focused
                      ? 'information-circle'
                      : 'information-circle-outline'
                  } else if (route.name === 'Lore') {
                    iconName = focused ? 'add-circle' : 'add'
                  }
                  return <Ionicons name={iconName} size={30} color={color} /> // consider icon size
                },
                tabBarActiveTintColor: '#171D0B',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: styles.bottomTabStyle,
                tabBarShowLabel: false,
                tabBarBadgeStyle: { backgroundColor: 'red' },
              })}
            >
              <Tab.Screen
                name="Information"
                component={Information}
                options={{ title: 'Information', headerShown: false }}
              />
              <Tab.Screen
                name="Tomes"
                component={TomesStackScreen}
                options={{ title: 'Tomes', headerShown: false }}
                listeners={{
                  tabLongPress: () => handleLongPress('tomes'),
                }}
              />
              <Tab.Screen
                name="Home"
                component={Home}
                options={{ title: 'Home', headerShown: false }}
              />
              <Tab.Screen
                name="Lore"
                component={LoreStackScreen}
                options={{ title: 'Lore', headerShown: false }}
                listeners={{
                  tabLongPress: () => handleLongPress('lore'),
                }}
              />
              <Tab.Screen
                name="User"
                component={UserProfile}
                options={{
                  title: 'User',
                  headerShown: false,
                }}
              />
            </Tab.Navigator>
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
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  title: 'User logged out - register form',
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: '#5a712c',
    height: 60,
  },
})
