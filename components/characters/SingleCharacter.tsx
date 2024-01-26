import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, Button } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EditCharacter from './EditCharacter'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchThunkSingleCharacter } from '../../redux/characters/characterSlice'
import { Person } from '../../models/types'

export default function SingleCharacter({ route, navigation }) {
  const dispatch = useAppDispatch()
  const activeCharacter = useAppSelector(
    (state) => state.characters.activeCharacter
  ) as Person
  const state = useAppSelector((state) => state.characters)

  const [showCharacter, setShowCharacter] = useState(true)
  const id = route.params.characterInfo.id

  useEffect(() => {
    console.log('loading state')
    dispatch(fetchThunkSingleCharacter(id))
    console.log('finished loading')
  }, [dispatch, id])

  const togglePage = () => {
    setShowCharacter(!showCharacter)
  }

  const relationshipType =
    activeCharacter.relationships && Object.keys(activeCharacter.relationships)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activeCharacter.name}</Text>
      <Button
        onPress={() => console.log(state)}
        title="Print Current Character Redux Store"
      />

      {showCharacter ? (
        <View>
          {activeCharacter.books && activeCharacter.books.join() !== '' && (
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>Books:</Text>
              <Text style={styles.information}>
                {activeCharacter.books.join(', ')}
              </Text>
            </View>
          )}
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
            activeCharacter.affiliations.join() !== '' && (
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>Affiliations:</Text>
                <Text style={styles.information}>
                  {activeCharacter.affiliations.join(', ')}
                </Text>
              </View>
            )}
          {relationshipType && relationshipType.length !== 0 && (
            <View>
              <Text style={styles.category}>Relationships:</Text>
              {relationshipType.map((relationship, idx) => (
                <View style={styles.categoryContainer} key={idx}>
                  <Text style={styles.information}>
                    {relationship}:{' '}
                    {activeCharacter.relationships[relationship]}
                  </Text>
                </View>
              ))}
            </View>
          )}
          <View style={styles.updatesContainer}>
            <Pressable style={styles.editButton} onPress={togglePage}>
              <Icon name="account-edit" style={styles.icon} />
            </Pressable>
          </View>
        </View>
      ) : (
        <EditCharacter
          // characterInfo={activeCharacter}
          togglePage={togglePage}
          navigation={navigation}
        />
      )}
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

  updatesContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  editButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  icon: {
    color: '#5a712c',
    fontSize: 30,
  },
  deleteButton: {
    backgroundColor: '#d11a2a',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'black',
  },
  categoryContainer: {
    flexDirection: 'column',
    padding: 4,
  },
  category: {
    fontFamily: 'caveat',
    fontSize: 40,
    textAlign: 'center',
  },
  information: {
    fontFamily: 'sans-serif',
    fontSize: 25,
    textAlign: 'center',
    color: '#5a712c',
  },
})
