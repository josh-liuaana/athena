import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'

export async function fetchCharacters() {
  console.log('fetching characters...')
  const db = getFirestore()
  const peopleCol = collection(db, 'people')
  const peopleSnapshot = await getDocs(query(peopleCol, orderBy('name', 'asc')))
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
  try {
    console.log('updating character...')
    const characterRef = doc(db, 'people', characterInfo.id)
    await updateDoc(characterRef, characterInfo)
    console.log('character updated')
  } catch (err) {
    console.error(err)
  }
}

export async function deleteCharacter(id) {
  const db = getFirestore()
  try {
    console.log('deleting character...')
    await deleteDoc(doc(db, 'people', id))
    console.log('character deleted')
  } catch (err) {
    console.error(err)
  }
}
