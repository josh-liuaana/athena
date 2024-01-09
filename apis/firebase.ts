import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { Alert } from 'react-native'

export async function addCharacter(newCharacterObject) {
  const db = getFirestore()
  console.log(newCharacterObject)
  const updatedCharacterObject = {
    ...newCharacterObject,
    affiliations: [],
    aliases: [],
    books: [],
    relationships: {},
    universe: '',
  }
  try {
    const res = await addDoc(collection(db, 'people'), updatedCharacterObject)
    Alert.alert('New character has been added successfully')
    return res.id
  } catch (err) {
    console.log(err)
  }
}
