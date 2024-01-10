import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'

export default function CharacterCard({ characterInfo }) {
  const { name, id, universe } = characterInfo
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => Alert.alert(`Navigate to ${name} at id: ${id}`)}
      >
        <Text style={styles.characterName}>{name}</Text>
        <Text style={styles.universe}>{universe}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5a712c',
    width: '80%',
    height: 80,
    marginVertical: 10,
    elevation: 10,
    shadowColor: 'black',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterName: {
    fontFamily: 'Caveat-Regular',
    fontSize: 40,
    color: '#DBE2CC',
  },
  universe: {
    fontSize: 18,
    color: '#DBE2CC',
  },
})
