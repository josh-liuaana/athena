import { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'

import { TextInputComp } from '../@shared/TextInputComp'
import SubmitButton from '../@shared/SubmitButton'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { updateThunkCharacter } from '../../redux/characters/characterSlice'
import { showError } from '../../redux/error/errorSlice'

export default function EditCharacter({ togglePage }) {
  const dispatch = useAppDispatch()
  const character = useAppSelector((state) => state.characters.activeCharacter)

  const [newName, setNewName] = useState(character.name)
  const [newEthnicity, setNewEthnicity] = useState(character.ethnicity)
  const [newCity, setNewCity] = useState(character.city)

  const [newAffiliation, setNewAffiliation] = useState('')
  const [newAlias, setNewAlias] = useState('')
  const [newRelationship, setNewRelationship] = useState({
    relation: '',
    name: '',
  })

  const { affiliations, aliases, relationships, id } = character

  const submitNewInformation = (): void => {
    const updateData = {
      affiliations: [...affiliations],
      aliases: [...aliases],
      relationships: { ...relationships },
      name: newName,
      ethnicity: newEthnicity,
      city: newCity,
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

    try {
      dispatch(updateThunkCharacter(updateData, id))
      Alert.alert('character updated')
    } catch (err) {
      dispatch(
        showError({
          errorTechnical: err.message,
          errorMessage: `Can't update character at the moment, try again later`,
        })
      )
    } finally {
      togglePage()
    }
  }

  return (
    <View style={styles.container}>
      <TextInputComp
        func={(name) => setNewName(name)}
        value={newName}
        label="Name"
        style={{ width: '80%' }}
      />
      <TextInputComp
        func={(race) => setNewEthnicity(race)}
        value={newEthnicity}
        label="Race"
        style={{ width: '80%' }}
      />
      <TextInputComp
        func={(city) => setNewCity(city)}
        value={newCity}
        label="City"
        style={{ width: '80%' }}
      />
      {/* Below here is safe */}
      <TextInputComp
        func={(affiliation) => setNewAffiliation(affiliation)}
        value={newAffiliation}
        label="Affiliations"
        style={{ width: '80%' }}
      />
      <TextInputComp
        func={(alias) => setNewAlias(alias)}
        value={newAlias}
        label="Alias"
        style={{ width: '80%' }}
      />
      <TextInputComp
        func={(relation) =>
          setNewRelationship({ ...newRelationship, relation })
        }
        value={newRelationship.relation}
        label="Type of Relationship"
        style={{ width: '80%' }}
      />
      <TextInputComp
        func={(name) => setNewRelationship({ ...newRelationship, name })}
        value={newRelationship.name}
        label="Relations Name"
        style={{ width: '80%' }}
      />

      <SubmitButton
        buttonText="Submit"
        clickHandleFunction={submitNewInformation}
        disabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    gap: 5,
  },
})
