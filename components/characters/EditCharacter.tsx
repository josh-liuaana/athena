import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  deleteThunkCharacter,
  updateThunkCharacter,
} from '../../redux/characters/characterSlice'

interface Relationship {
  relation: string
  name: string
}

export default function EditCharacter({ togglePage, navigation }) {
  const dispatch = useAppDispatch()
  const character = useAppSelector((state) => state.characters.activeCharacter)

  const { affiliations, aliases, name, relationships, id } = character

  const [focus, setFocus] = useState(null)
  const [newAffiliation, setNewAffiliation] = useState('')
  const [newAlias, setNewAlias] = useState('')
  const [newRelationship, setNewRelationship] = useState<Relationship>({
    relation: '',
    name: '',
  })

  const customOnFocus = (focus) => {
    setFocus(focus)
  }
  const customOnBlur = () => {
    setFocus(null)
  }

  const submitNewInformation = async () => {
    const updateData = {
      affiliations: [...affiliations],
      aliases: [...aliases],
      relationships: { ...relationships },
    }
    if (newAffiliation !== '') {
      updateData.affiliations.push(newAffiliation)
    }
    if (newAlias !== '') {
      updateData.aliases.push(newAlias)
    }
    if (newRelationship.relation !== '') {
      updateData.relationships[newRelationship.relation] = newRelationship.name
    }

    dispatch(updateThunkCharacter(updateData, id))
    Alert.alert('character updated')
    togglePage()
  }

  const handleCharacterDelete = () => {
    dispatch(deleteThunkCharacter(id))
    Alert.alert('character deleted')
    navigation.navigate('People', { paramPropKey: 'paramPropValue' })
  }

  return (
    <View style={styles.container}>
      <View style={styles.topButtonContainer}>
        <Pressable
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert(
              `Are you sure you want to delete ${name}?`,
              'This is permanent and cannot be reversed',
              [
                {
                  text: 'Delete',
                  onPress: () => handleCharacterDelete(),
                },
                {
                  text: 'Cancel',
                },
              ],
              {
                cancelable: true,
              }
            )
          }
        >
          <Icon name="delete" />
        </Pressable>
        <Pressable style={styles.backButton} onPress={() => togglePage()}>
          <Icon name="doubleleft" />
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Affiliations..."
          onFocus={() => customOnFocus('affiliations')}
          onBlur={() => customOnBlur()}
          style={[
            {
              backgroundColor: focus === 'affiliations' ? '#DBE2CC' : 'white',
            },
            { borderColor: focus === 'affiliations' ? 'white' : '#DBE2CC' },
            styles.textInput,
          ]}
          autoCapitalize="words"
          autoCorrect={false}
          enterKeyHint="done"
          onChangeText={(affiliation) => setNewAffiliation(affiliation)}
        />
        <TextInput
          placeholder="Aliases..."
          onFocus={() => customOnFocus('aliases')}
          onBlur={() => customOnBlur()}
          style={[
            { backgroundColor: focus === 'aliases' ? '#DBE2CC' : 'white' },
            { borderColor: focus === 'aliases' ? 'white' : '#DBE2CC' },
            styles.textInput,
          ]}
          autoCapitalize="words"
          autoCorrect={false}
          enterKeyHint="done"
          onChangeText={(alias) => setNewAlias(alias)}
        />
        <TextInput
          placeholder="Type of relation..."
          onFocus={() => customOnFocus('relationships')}
          onBlur={() => customOnBlur()}
          style={[
            {
              backgroundColor: focus === 'relationships' ? '#DBE2CC' : 'white',
            },
            { borderColor: focus === 'relationships' ? 'white' : '#DBE2CC' },
            styles.textInput,
          ]}
          autoCapitalize="words"
          autoCorrect={false}
          enterKeyHint="done"
          onChangeText={(relation) =>
            setNewRelationship({ ...newRelationship, relation })
          }
        />
        <TextInput
          placeholder="Relations name..."
          onFocus={() => customOnFocus('relationName')}
          onBlur={() => customOnBlur()}
          style={[
            {
              backgroundColor: focus === 'relationName' ? '#DBE2CC' : 'white',
            },
            { borderColor: focus === 'relationName' ? 'white' : '#DBE2CC' },
            styles.textInput,
          ]}
          autoCapitalize="words"
          autoCorrect={false}
          enterKeyHint="done"
          onChangeText={(name) =>
            setNewRelationship({ ...newRelationship, name })
          }
        />
      </View>

      <View style={styles.submitContainer}>
        <Pressable style={styles.submitButton} onPress={submitNewInformation}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },

  topButtonContainer: {
    flexDirection: 'row',
    width: '50%',
    gap: 10,
    // borderWidth: 1,
    // borderColor: 'green',

    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: '#ffa7a7',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    // width: '20%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#171D0B',
  },
  backButton: {
    backgroundColor: '#dbe2cc',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    // width: '20%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#171D0B',
  },

  inputContainer: {
    width: '100%',
  },
  textInput: {
    margin: 5,
    borderRadius: 7,
    borderWidth: 2,
    height: 60,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 30,
    fontFamily: 'Caveat-Regular',
  },

  submitContainer: {
    width: '75%',
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    textAlign: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
  },
  submitText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Caveat-Regular',
  },
})
