import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
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

  const togglePage = () => {
    setShowCharacter(!showCharacter)
  }

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
          <View style={styles.updatesContainer}>
            <Pressable style={styles.editButton} onPress={togglePage}>
              <Icon name="account-edit" style={styles.icon} />
            </Pressable>
          </View>
        </View>
      ) : (
        <EditCharacter characterInfo={characterInfo} togglePage={togglePage} />
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
    fontFamily: 'Caveat-Regular',
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
