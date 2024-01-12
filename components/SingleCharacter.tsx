import { View, Text, StyleSheet } from 'react-native'

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
    fontFamily: 'Caveat-Regular',
    fontSize: 50,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    fontFamily: 'Caveat-Regular',
    fontSize: 25,
  },
  information: {
    fontFamily: 'sans-serif',
    fontSize: 15,
  },
})
