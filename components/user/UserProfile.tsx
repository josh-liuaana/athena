import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'

import { Banner, Portal, FAB, Icon, Avatar } from 'react-native-paper'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

import ErrorComp from '../Error'
import EditProfile from './EditProfile'

import { sendEmailVerification, signOut } from 'firebase/auth'

import { auth } from '../../firebase.config'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import { showError } from '../../redux/error/errorSlice'

import { createBookArray, mostCommonElement } from '../../models/utils'

export default function UserProfile() {
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.error)
  const books = useAppSelector((state) => state.books)
  const characters = useAppSelector((state) => state.characters)

  const [bannerVisible, setBannerVisible] = useState<boolean>()
  const [verificationPending, setVerificationPending] = useState(false)
  const [fabOpen, setFabOpen] = useState(false)
  const [bookCount, setBookCount] = useState({}) as any
  const [editing, setEditing] = useState(false)

  const user = auth.currentUser

  useEffect(() => {
    setBannerVisible(!user?.emailVerified)
    const bookArr = createBookArray(characters.characterList)
    const highestBookCount = mostCommonElement(bookArr)
    setBookCount(highestBookCount)
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      dispatch(
        showError({
          errorTechnical: err.message,
          errorMessage: 'Could not handle the log out, try again later',
        })
      )
    }
  }

  const handleResendVerificationEmail = () => {
    try {
      sendEmailVerification(auth.currentUser)
      setBannerVisible(false)
      setVerificationPending(true)
    } catch (err) {
      dispatch(
        showError({
          errorTechnical: err.message,
          errorMessage:
            'Something went wrong with you email verification, we are looking into it',
        })
      )
    }
  }

  return (
    <View style={styles.container}>
      {error && <ErrorComp />}
      <Portal>
        <Banner
          visible={bannerVisible}
          actions={[
            {
              label: 'Close',
              onPress: () => setBannerVisible(false),
            },
            {
              label: 'Resend Verification Email',
              onPress: () => handleResendVerificationEmail(),
            },
          ]}
          icon="gmail"
          style={{ paddingTop: 25 }}
        >
          Your Email account still hasn't been verified. Verify before you get
          locked out
        </Banner>
      </Portal>

      <Avatar.Text label={user.displayName.slice(0, 1)} />

      <Text style={styles.nameTitle}>{user.displayName}</Text>

      {editing ? (
        <EditProfile />
      ) : (
        <>
          <Text style={styles.information}>Your Lore count:</Text>
          <View style={styles.iconContainer}>
            <View>
              <IconAwesome style={styles.icon} name="book" size={47} />
              <Text style={styles.iconText}>{books.bookList.length}</Text>
            </View>
            <View>
              <IconMaterial style={styles.icon} name="human" size={47} />
              <Text style={styles.iconText}>
                {characters.characterList.length}
              </Text>
            </View>
            <View>
              <IconMaterial style={styles.icon} name="city" size={47} />
              <Text style={styles.iconText}>0</Text>
            </View>
          </View>

          <Text style={styles.category}>Current book:</Text>
          <Image style={styles.image} source={{ uri: books.current.cover }} />
          <Text style={styles.information}>
            {' '}
            {books.current.title} - {books.current.author}
          </Text>
          <Text style={styles.category}>Latest character:</Text>
          <Text style={styles.information}>
            {characters.characterList[0].name} -{' '}
            {characters.characterList[0].books[0]}
          </Text>
          <Text style={styles.category}>Book with the most characters: </Text>
          <Text style={styles.information}>
            {bookCount.highestBookCount} - {bookCount.max}
          </Text>
          {!user?.emailVerified && verificationPending && (
            <View>
              <Text> Verification pending </Text>
            </View>
          )}
        </>
      )}

      <FAB.Group
        open={fabOpen}
        visible
        icon="menu"
        onStateChange={() => setFabOpen(!fabOpen)}
        rippleColor="#5a712c"
        actions={[
          {
            icon: 'delete',
            label: `Delete`,
            onPress: () => Alert.alert("Hah nope, you're not leaving"),
          },
          {
            icon: 'account-edit',
            label: `User Information`,
            onPress: () => setEditing(true),
          },
          {
            icon: 'human',
            label: `Profile`,
            onPress: () => setEditing(false),
          },
          {
            icon: 'logout',
            label: `Log out`,
            onPress: () => handleLogout(),
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dbe2cc',
    gap: 15,
  },
  logo: {
    height: 100,
    width: 101,
    margin: 15,
  },
  logoEditing: {
    height: 75,
    width: 75,
  },
  nameTitle: {
    fontFamily: 'caveat',
    fontSize: 50,
    width: '80%',
    textAlign: 'center',
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
  image: {
    height: 150,
    width: 90,
  },
  icon: {
    color: '#5a712c',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  iconText: {
    fontSize: 30,
    textAlign: 'center',
  },
})
