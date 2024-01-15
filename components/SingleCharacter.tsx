import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'

export default function SingleCharacter({ route }) {
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
      <View>
        <Pressable
          style={styles.editButton}
          onPress={() =>
            Alert.alert(
              'Update form triggered',
              'Functionality will be to navigate to an update form',
              [{ text: 'Cancel' }],
              { cancelable: true }
            )
          }
        >
          <Text>Edit {name}</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert(
              `Are you sure you want to delete ${name}?`,
              'This is permanent and cannot be reversed',
              [
                {
                  text: 'Delete',
                  onPress: () => Alert.alert(`Bye bye ${name}`),
                },
                {
                  text: 'Cancel',
                  onPress: () => Alert.alert('Phew, close call'),
                },
              ],
              {
                cancelable: true,
              }
            )
          }
        >
          <Text>Delete {name}</Text>
        </Pressable>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>Books:</Text>
        <Text style={styles.information}>{books.join(', ')}</Text>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>City:</Text>
        <Text style={styles.information}>{city}</Text>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>Race:</Text>
        <Text style={styles.information}>{ethnicity}</Text>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>Universe:</Text>
        <Text style={styles.information}>{universe}</Text>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>Aliases:</Text>
        <Text style={styles.information}>{aliases.join(', ')}</Text>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>Affiliations:</Text>
        <Text style={styles.information}>{affiliations.join(', ')}</Text>
      </View>
      <Text style={styles.category}>Relationships:</Text>
      {relationshipType.map((relationship, idx) => (
        <View style={styles.categoryContainer} key={idx}>
          <Text style={styles.information}>
            {relationship}: {relationships[relationship]}
          </Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'vibes',
    fontSize: 70,

    // borderWidth: 1,
    // borderColor: 'black',
  },
  editButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'black',
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

    // borderWidth: 1,
    // borderColor: 'red',
  },
  category: {
    fontFamily: 'Caveat-Regular',
    fontSize: 25,
    textAlign: 'center',

    // borderWidth: 1,
    // borderColor: 'green',
  },
  information: {
    fontFamily: 'sans-serif',
    fontSize: 15,
    textAlign: 'center',
    color: '#5a712c',

    // borderWidth: 1,
    // borderColor: 'blue',
  },
})
