import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore'

export async function fetchCharacters() {
  console.log('fetching characters...')
  const db = getFirestore()
  const peopleCol = collection(db, 'people')
  const peopleSnapshot = await getDocs(peopleCol)
  const peopleList = []

  peopleSnapshot.docs.map((doc) =>
    peopleList.push({ ...doc.data(), id: doc.id })
  )
  console.log('retrieved characters')
  return peopleList
}

export async function postCharacter(newCharacterObject) {
  const db = getFirestore()

  // --- includes auto blank fields for db input --- //
  const updatedCharacterObject = {
    ...newCharacterObject,
    affiliations: [],
    aliases: [],
    books: [],
    relationships: {},
    universe: '',
  }

  try {
    console.log('adding character...')
    const res = await addDoc(collection(db, 'people'), updatedCharacterObject)
    console.log('character added:', res.id)
    return res.id
  } catch (err) {
    console.log(err)
  }
}

export async function updateCharacter(characterInfo) {
  const db = getFirestore()
  console.log('api function param', characterInfo)
  try {
    console.log('updating character...')
    const characterRef = doc(db, 'people', characterInfo.id)
    await updateDoc(characterRef, characterInfo)
    console.log('character updated')
  } catch (err) {
    console.error(err)
  }
}
