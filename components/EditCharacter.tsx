import { View, Text, StyleSheet, Alert, Pressable } from 'react-native'

export default function EditCharacter() {
  return (
    <View style={styles.container}>
      <Text>EditCharacter</Text>
      <View style={styles.updatesContainer}>
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
          <Text>Delete</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updatesContainer: {
    flexDirection: 'row',

    borderWidth: 2,
    borderColor: 'blue',
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
})
