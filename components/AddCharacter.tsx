import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native'
import { useState } from 'react'
import { addCharacter } from '../apis/firebase'

export default function AddCharacter({ navigation }) {
  const [newCharacter, setNewCharacter] = useState({
    city: '',
    ethnicity: '',
    name: '',
  })

  const submitNewCharacter = async () => {
    await addCharacter(newCharacter)
    // TODO include current book and universe into newChar object
    navigation.navigate('People')
    // TODO redirect to individual character page
    // * options here about adding optional characteristics - affiliations, aliases, relationships
  }

  return (
    <View style={styles.container}>
      <Text>Add Character</Text>
      <Text>Adding to (import current book)</Text>
      <TextInput
        placeholder="Name..."
        onChangeText={(name) => setNewCharacter({ ...newCharacter, name })}
      />
      <TextInput
        placeholder="Home..."
        onChangeText={(city) => setNewCharacter({ ...newCharacter, city })}
      />
      <TextInput
        placeholder="Race..."
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
  button: {
    textAlign: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'Caveat-Regular',
  },
})
