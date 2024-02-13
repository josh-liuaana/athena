import { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Alert, Image } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import {
  deleteThunkBook,
  updateCurrentThunkBook,
} from '../../redux/books/booksSlice'
import EditBook from './EditBook'

export default function BookCard({ book, navigation }) {
  const dispatch = useAppDispatch()
  const currentId = useAppSelector((state) => state.books.current.id)

  const { author, title, isCurrent, id, cover } = book
  const [currentlyEditing, setCurrentlyEditing] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const handleCardPress = () => {
    setCurrentlyEditing(!currentlyEditing)
    setShowEditForm(false)
  }

  const handleDelete = () => {
    dispatch(deleteThunkBook(id))
    Alert.alert('book deleted')
    navigation.navigate('Books', { paramPropKey: 'paramPropValue' })
  }

  const handleUpdateCurrent = () => {
    dispatch(updateCurrentThunkBook({ isCurrent: true }, id, currentId))
    setCurrentlyEditing(false)
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
      <Pressable
        style={currentlyEditing ? styles.cardEditing : styles.card}
        onPress={handleCardPress}
      >
        {!currentlyEditing && (
          <Image style={styles.image} source={{ uri: cover }} />
        )}
        <View
          style={
            currentlyEditing
              ? styles.infoContainerEditing
              : styles.infoContainer
          }
        >
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
          <View style={styles.editContainer}>
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
                  {isCurrent === true
                    ? 'Finished reading'
                    : 'Mark as currently reading'}
                </Text>
              </Pressable>
            </View>

            {showEditForm && (
              <EditBook book={book} setCurrentlyEditing={setCurrentlyEditing} />
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
  image: {
    height: '100%',
    width: 75,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    position: 'absolute',
    left: 0,
  },
  infoContainer: {
    width: '75%',
    position: 'absolute',
    right: 10,
  },
  infoContainerEditing: {
    width: '100%',
  },
  editContainer: {
    width: '100%',
  },
  card: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  cardEditing: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
  editButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
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
  titleText: {
    fontFamily: 'vibes',
    fontSize: 33,
    color: '#DBE2CC',
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
})
