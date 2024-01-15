import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import EditCharacter from './EditCharacter'

export default function SingleCharacter({ route }) {
  const [showCharacter, setShowCharacter] = useState(true)
  const { characterInfo } = route.params
  const {
    affiliations,
    aliases,
    books,
    city,
    ethnicity,
    name,
    relationships,
    universe,
  } = characterInfo

  const relationshipType = Object.keys(relationships)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      {showCharacter ? (
        <View>
          {books.join() !== '' && (
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>Books:</Text>
              <Text style={styles.information}>{books.join(', ')}</Text>
            </View>
          )}
          {city !== '' && (
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>City:</Text>
              <Text style={styles.information}>{city}</Text>
            </View>
          )}
          {ethnicity !== '' && (
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>Race:</Text>
              <Text style={styles.information}>{ethnicity}</Text>
            </View>
          )}
          {universe !== '' && (
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>Universe:</Text>
              <Text style={styles.information}>{universe}</Text>
            </View>
          )}
          {aliases.join() !== '' && (
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>Aliases:</Text>
              <Text style={styles.information}>{aliases.join(', ')}</Text>
            </View>
          )}
          {affiliations.join() !== '' && (
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>Affiliations:</Text>
              <Text style={styles.information}>{affiliations.join(', ')}</Text>
            </View>
          )}
          {relationshipType.length !== 0 && (
            <View>
              <Text style={styles.category}>Relationships:</Text>
              {relationshipType.map((relationship, idx) => (
                <View style={styles.categoryContainer} key={idx}>
                  <Text style={styles.information}>
                    {relationship}: {relationships[relationship]}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ) : (
        <EditCharacter />
      )}
      <View style={styles.updatesContainer}>
        <Pressable
          style={styles.editButton}
          onPress={() => setShowCharacter(!showCharacter)}
        >
          <Text>{showCharacter ? 'Update' : 'Back to lore'}</Text>
        </Pressable>
      </View>
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
  },
  editButton: {
    backgroundColor: '#dbe2cc',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'black',
    elevation: 4,
    shadowColor: '#171D0B',
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
    fontFamily: 'Caveat-Regular',
    fontSize: 35,
    textAlign: 'center',
  },
  information: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    textAlign: 'center',
    color: '#5a712c',
  },
})
