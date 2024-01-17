import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { deleteBook, updateBookDetails } from '../apis/books'

export default function BookCard({ book, navigation }) {
  const { author, title, isCurrent, id } = book
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [focus, setFocus] = useState(null)
  const [bookUpdateData, setBookUpdateData] = useState({
    title,
    author,
  })

  const handleCardPress = () => {
    setCurrentlyEditing(!currentlyEditing)
    setShowEditForm(false)
  }

  const handleDelete = () => {
    deleteBook(id)
    Alert.alert('book deleted')
    navigation.navigate('Books', { paramPropKey: 'paramPropValue' })
  }

  const handleUpdateDetails = () => {
    console.log(bookUpdateData)
    updateBookDetails(bookUpdateData, id)
  }

  const handleUpdateCurrent = () => {
    Alert.alert('update current pressed')
    // TODO
    // Need to go into the database and change current isCurrent book to false
    // Then need to change this book currently reading to true in db
    // Then need to toggle the Currently reading subtitle to new book
    // ? Will likely need to pass props up to Books so can re render with the new title
  }

  const customOnFocus = (focus) => {
    setFocus(focus)
  }
  const customOnBlur = () => {
    setFocus(null)
  }

  return (
    <View
      style={[
        styles.container,
        currentlyEditing
          ? showEditForm
            ? styles.activeEditFormContainer
            : styles.activeContainer
          : styles.inactiveContainer,
      ]}
    >
      <Pressable style={styles.card} onPress={handleCardPress}>
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.titleText,
              currentlyEditing ? { color: 'black' } : { color: 'white' },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.authorText,
              currentlyEditing ? { color: 'black' } : { color: 'white' },
            ]}
          >
            {author}
          </Text>
        </View>
        {currentlyEditing && (
          <View>
            <View style={styles.editButtonsContainer}>
              <Pressable
                style={[styles.editButton, styles.deleteButton]}
                onPress={() =>
                  Alert.alert(
                    `Are you sure you wish to delete ${title}`,
                    'This is permanent and cannot be reversed',
                    [
                      {
                        text: 'Delete',
                        onPress: () => handleDelete(),
                      },
                      {
                        text: 'Cancel',
                      },
                    ],
                    {
                      cancelable: true,
                    }
                  )
                }
              >
                <Icon style={styles.icon} name="delete" />
              </Pressable>
              <Pressable
                style={[styles.editButton, styles.updateButton]}
                onPress={() => setShowEditForm(!showEditForm)}
              >
                <Icon style={[styles.icon, { color: 'white' }]} name="edit" />
              </Pressable>
              <Pressable
                style={styles.editButton}
                onPress={handleUpdateCurrent}
              >
                <Text style={styles.currentlyReadingText}>
                  Mark as currently reading
                </Text>
              </Pressable>
            </View>
            {showEditForm && (
              <View style={styles.editFormContainer}>
                <TextInput
                  style={[
                    {
                      backgroundColor:
                        focus === 'newTitle' ? '#DBE2CC' : 'white',
                    },
                    { borderColor: focus === 'newTitle' ? 'white' : '#DBE2CC' },
                    styles.textInput,
                  ]}
                  autoCapitalize="words"
                  onFocus={() => customOnFocus('newTitle')}
                  onBlur={() => customOnBlur()}
                  placeholder="New title..."
                  value={bookUpdateData.title}
                  onChangeText={(newTitle) =>
                    setBookUpdateData({ ...bookUpdateData, title: newTitle })
                  }
                />
                <TextInput
                  style={[
                    {
                      backgroundColor:
                        focus === 'newAuthor' ? '#DBE2CC' : 'white',
                    },
                    {
                      borderColor: focus === 'newAuthor' ? 'white' : '#DBE2CC',
                    },
                    styles.textInput,
                  ]}
                  autoCapitalize="words"
                  onFocus={() => customOnFocus('newAuthor')}
                  onBlur={() => customOnBlur()}
                  placeholder="New author..."
                  value={bookUpdateData.author}
                  onChangeText={(newAuthor) =>
                    setBookUpdateData({ ...bookUpdateData, author: newAuthor })
                  }
                />
                <Pressable
                  style={styles.submitUpdateButton}
                  onPress={handleUpdateDetails}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 10,
    elevation: 10,
    shadowColor: 'black',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  activeContainer: {
    backgroundColor: '#DBE2CC',
    height: 160,
  },
  activeEditFormContainer: {
    backgroundColor: '#DBE2CC',
    height: 340,
  },
  inactiveContainer: {
    backgroundColor: '#5a712c',
    height: 110,
  },
  infoContainer: {},
  editButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#5a712c',
  },
  deleteButton: {
    backgroundColor: '#ffa7a7',
  },
  card: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  titleText: {
    fontFamily: 'vibes',
    fontSize: 33,
    color: '#DBE2CC',
    letterSpacing: 4,
    textAlign: 'center',
  },
  authorText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#DBE2CC',
  },
  icon: {
    fontSize: 15,
  },
  currentlyReadingText: {
    fontSize: 15,
  },
  textInput: {
    borderRadius: 7,
    borderWidth: 2,
    width: '100%',
    height: 45,
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 25,
    fontFamily: 'Caveat-Regular',
  },
  editFormContainer: {
    alignItems: 'center',
  },
  submitUpdateButton: {
    textAlign: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
    borderRadius: 7,
    width: '70%',
  },
  submitButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'Caveat-Regular',
  },
})
