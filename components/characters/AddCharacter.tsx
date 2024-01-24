import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  Image,
  Alert,
} from 'react-native'
import { useState, useRef } from 'react'

import { useAppDispatch } from '../../hooks/redux'
import { postThunkCharacter } from '../../redux/characters/characterSlice'

export default function AddCharacter({ navigation }) {
  const dispatch = useAppDispatch()
  const [newCharacter, setNewCharacter] = useState({
    city: '',
    ethnicity: '',
    name: '',
  })
  const [focus, setFocus] = useState(null)
  const citRef = useRef(null)
  const ethRef = useRef(null)

  const submitNewCharacter = async () => {
    await dispatch(postThunkCharacter(newCharacter))

    Alert.alert('Thanks for adding a new character')
    navigation.navigate('People')
  }

  const customOnFocus = (focus) => {
    setFocus(focus)
  }
  const customOnBlur = () => {
    setFocus(null)
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/athena-favicon-color.png')}
      />
      <Text style={styles.title}>Add Character</Text>
      {/* <Text>Adding to (import current book)</Text> */}
      <TextInput
        autoCapitalize="words"
        autoCorrect={false}
        enterKeyHint="next"
        onFocus={() => customOnFocus('name')}
        onBlur={() => customOnBlur()}
        value={newCharacter.name}
        placeholder="Name..."
        style={[
          { backgroundColor: focus === 'name' ? '#DBE2CC' : 'white' },
          { borderColor: focus === 'name' ? 'white' : '#DBE2CC' },
          styles.textInput,
        ]}
        onChangeText={(name) => setNewCharacter({ ...newCharacter, name })}
        onSubmitEditing={() => citRef.current.focus()}
      />
      <TextInput
        ref={citRef}
        autoCapitalize="words"
        autoCorrect={false}
        enterKeyHint="next"
        onFocus={() => customOnFocus('city')}
        onBlur={() => customOnBlur()}
        value={newCharacter.city}
        placeholder="Home..."
        style={[
          { backgroundColor: focus === 'city' ? '#DBE2CC' : 'white' },
          { borderColor: focus === 'city' ? 'white' : '#DBE2CC' },
          styles.textInput,
        ]}
        onChangeText={(city) => setNewCharacter({ ...newCharacter, city })}
        onSubmitEditing={() => ethRef.current.focus()}
      />
      <TextInput
        ref={ethRef}
        autoCapitalize="words"
        autoCorrect={false}
        enterKeyHint="done"
        onFocus={() => customOnFocus('ethnicity')}
        onBlur={() => customOnBlur()}
        value={newCharacter.ethnicity}
        placeholder="Race..."
        style={[
          { backgroundColor: focus === 'ethnicity' ? '#DBE2CC' : 'white' },
          { borderColor: focus === 'ethnicity' ? 'white' : '#DBE2CC' },
          styles.textInput,
        ]}
        onChangeText={(ethnicity) =>
          setNewCharacter({ ...newCharacter, ethnicity })
        }
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText} onPress={submitNewCharacter}>
          Submit
        </Text>
      </Pressable>
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
  textInput: {
    margin: 5,
    borderRadius: 7,
    borderWidth: 2,
    width: '75%',
    height: 60,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 30,
    fontFamily: 'Caveat-Regular',
  },
  button: {
    textAlign: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
    borderRadius: 10,
    width: '40%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'Caveat-Regular',
  },
})
