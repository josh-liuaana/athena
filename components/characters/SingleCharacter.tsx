import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

import { Button, Dialog, FAB, Portal, Snackbar } from 'react-native-paper'

import EditCharacter from './EditCharacter'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import {
  deleteThunkCharacter,
  fetchThunkSingleCharacter,
} from '../../redux/characters/characterSlice'

import type { Person } from '../../models/types'

export default function SingleCharacter({ route, navigation }) {
  // ! Define state management and hooks
  const dispatch = useAppDispatch()
  const activeCharacter = useAppSelector(
    (state) => state.characters.activeCharacter
  ) as Person

  // ! Local state
  const [showCharacter, setShowCharacter] = useState(true)
  const [fabOpen, setFabOpen] = useState(false)
  const [snackbarVisible, setSnackbarVisible] = useState(true)
  const [dialogVisible, setDialogVisible] = useState(false)

  // ! Define constants/variables
  const id = route.params.characterInfo.id
  const relationshipType =
    activeCharacter.relationships && Object.keys(activeCharacter.relationships)

  // ! useEffects
  useEffect(() => {
    dispatch(fetchThunkSingleCharacter(id))
    setTimeout(() => setSnackbarVisible(false), 5000)
  }, [dispatch, id])

  // ! Event Handler & functions
  const togglePage = () => setShowCharacter(!showCharacter)

  const handleCharacterDelete = () => {
    dispatch(deleteThunkCharacter(id))
    Alert.alert('character deleted')
    navigation.navigate('Characters', { paramPropKey: 'paramPropValue' })
  }

  return (
    <Portal.Host>
      <View style={styles.container}>
        <Text style={styles.title}>{activeCharacter.name}</Text>

        {showCharacter ? (
          <View>
            <Text style={styles.category}>Books:</Text>
            {activeCharacter.books &&
              activeCharacter.books.map((book) => (
                <View key={book}>
                  <Button
                    onPress={() =>
                      Alert.alert(`Navigate to ${book} book information`)
                    }
                  >
                    <Text style={styles.information}>{book}</Text>
                  </Button>
                </View>
              ))}
            {activeCharacter.city && activeCharacter.city !== '' && (
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>City:</Text>
                <Text style={styles.information}>{activeCharacter.city}</Text>
              </View>
            )}
            {activeCharacter.ethnicity && activeCharacter.ethnicity !== '' && (
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>Race:</Text>
                <Text style={styles.information}>
                  {activeCharacter.ethnicity}
                </Text>
              </View>
            )}
            {activeCharacter.universe && activeCharacter.universe !== '' && (
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>Universe:</Text>
                <Text style={styles.information}>
                  {activeCharacter.universe}
                </Text>
              </View>
            )}
            {activeCharacter.aliases &&
              activeCharacter.aliases.join() !== '' && (
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>Aliases:</Text>
                  <Text style={styles.information}>
                    {activeCharacter.aliases.join(', ')}
                  </Text>
                </View>
              )}

            {activeCharacter.affiliations &&
              activeCharacter.affiliations.join() !== '' &&
              activeCharacter.affiliations.map((affiliation, idx) => (
                <View key={idx}>
                  <Text style={styles.category}>Affiliations:</Text>
                  <Button
                    onPress={() =>
                      Alert.alert(
                        `Navigate to ${affiliation} filtered characters`
                      )
                    }
                  >
                    <Text style={styles.information}>{affiliation}</Text>
                  </Button>
                </View>
              ))}

            {relationshipType && relationshipType.length !== 0 && (
              <View>
                <Text style={styles.category}>Relationships:</Text>
                {relationshipType.map((relationship, idx) => (
                  <View key={idx}>
                    <Button
                      onPress={() =>
                        Alert.alert(
                          `Navigate to ${activeCharacter.relationships[relationship]}'s character page`
                        )
                      }
                    >
                      <Text style={styles.information}>
                        {relationship}:{' '}
                        {activeCharacter.relationships[relationship]}
                      </Text>
                    </Button>
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          <EditCharacter togglePage={togglePage} />
        )}

        <FAB.Group
          open={fabOpen}
          visible
          icon="menu"
          onStateChange={() => setFabOpen(!fabOpen)}
          actions={[
            {
              icon: 'account-edit',
              label: `Edit`,
              onPress: () => setShowCharacter(false),
            },
            {
              icon: 'delete',
              label: `Delete`,
              onPress: () => setDialogVisible(true),
            },
            {
              label: `${activeCharacter.name}`,
              icon: 'human-handsup',
              onPress: () => setShowCharacter(true),
            },
            {
              icon: 'plus',
              label: 'Add New Character',
              onPress: () => Alert.alert('navigate to addChar'),
            },
            {
              icon: 'backburger',
              label: 'Back to characters',
              onPress: () => Alert.alert('navigate to characters'),
            },
          ]}
        />

        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Icon icon="delete" />
          <Dialog.Title>{`Delete ${activeCharacter.name}`}</Dialog.Title>
          <Dialog.Content>
            <Text>{`Are you sure want to delete ${activeCharacter.name}?\nThis action is permanent and cannot be reversed`}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleCharacterDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{
            label: 'Close',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          <Text style={{ color: 'white' }}>
            Click on a book
            {activeCharacter.affiliations &&
              activeCharacter.affiliations.length > 0 &&
              ', affiliation'}
            {activeCharacter.relationships &&
              Object.keys(activeCharacter.relationships).length > 0 &&
              ' or relationship'}{' '}
            to navigate to a new page
          </Text>
        </Snackbar>
      </View>
    </Portal.Host>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dbe2cc',
  },
  title: {
    fontFamily: 'vibes',
    fontSize: 70,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  categoryContainer: {
    flexDirection: 'column',
    padding: 4,
  },
  category: {
    fontFamily: 'caveat',
    fontSize: 30,
    textAlign: 'center',
  },
  information: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    textAlign: 'center',
    color: '#5a712c',
  },
})
