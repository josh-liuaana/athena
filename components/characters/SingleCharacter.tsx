import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

import { Button, FAB, Snackbar } from 'react-native-paper'

import EditCharacter from './EditCharacter'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { fetchThunkSingleCharacter } from '../../redux/characters/characterSlice'

import type { Person } from '../../models/types'

export default function SingleCharacter({ route, navigation }) {
  const dispatch = useAppDispatch()
  const activeCharacter = useAppSelector(
    (state) => state.characters.activeCharacter
  ) as Person

  const [showCharacter, setShowCharacter] = useState(true)

  const id = route.params.characterInfo.id

  useEffect(() => {
    dispatch(fetchThunkSingleCharacter(id))
    setTimeout(() => setVisible(false), 5000)
  }, [dispatch, id])

  const togglePage = () => setShowCharacter(!showCharacter)

  const relationshipType =
    activeCharacter.relationships && Object.keys(activeCharacter.relationships)

  const [visible, setVisible] = useState(true)

  // const onToggleSnackBar = () => setVisible(!visible)

  const onDismissSnackBar = () => setVisible(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activeCharacter.name}</Text>
      <FAB
        icon={showCharacter ? 'human-edit' : 'keyboard-backspace'}
        style={styles.fab}
        onPress={togglePage}
        color={'#5a712c'}
        rippleColor={'#5a712c'}
      />

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
              <Text style={styles.information}>{activeCharacter.universe}</Text>
            </View>
          )}
          {activeCharacter.aliases && activeCharacter.aliases.join() !== '' && (
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
        <EditCharacter togglePage={togglePage} navigation={navigation} />
      )}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}
      >
        <Text style={{ color: 'white' }}>
          Click on a book
          {activeCharacter.affiliations.length > 0 && ', affiliation'}
          {Object.keys(activeCharacter.relationships).length > 0 &&
            ' or relationship'}{' '}
          to navigate to a new page
        </Text>
      </Snackbar>
    </View>
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
