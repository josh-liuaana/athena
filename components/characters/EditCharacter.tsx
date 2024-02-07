import { useState } from 'react'
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native'

import TextInputComp from '../@shared/TextInputComp'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { updateThunkCharacter } from '../../redux/characters/characterSlice'

interface Relationship {
  relation: string
  name: string
}

export default function EditCharacter({ togglePage }) {
  const dispatch = useAppDispatch()
  const character = useAppSelector((state) => state.characters.activeCharacter)

  const [newAffiliation, setNewAffiliation] = useState('')
  const [newAlias, setNewAlias] = useState('')
  const [newRelationship, setNewRelationship] = useState<Relationship>({
    relation: '',
    name: '',
  })

  const { affiliations, aliases, relationships, id } = character

  const submitNewInformation = () => {
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

  return (
    <View style={styles.container}>
      <TextInputComp
        func={(affiliation) => setNewAffiliation(affiliation)}
        value={newAffiliation}
        label="Affiliations"
      />
      <TextInputComp
        func={(alias) => setNewAlias(alias)}
        value={newAlias}
        label="Alias"
      />
      <TextInputComp
        func={(relation) =>
          setNewRelationship({ ...newRelationship, relation })
        }
        value={newRelationship.relation}
        label="Type of Relationship"
      />
      <TextInputComp
        func={(name) => setNewRelationship({ ...newRelationship, name })}
        value={newRelationship.name}
        label="Relations Name"
      />

      <Pressable style={styles.submitButton} onPress={submitNewInformation}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    gap: 5,
  },
  submitButton: {
    textAlign: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
    borderRadius: 10,
    width: '40%',
  },
  submitText: {
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'caveat',
    fontSize: 40,
  },
})
