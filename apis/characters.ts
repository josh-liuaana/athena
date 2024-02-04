import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'

import { db } from '../firebase.config'

import {
  Character,
  RawCharacterData,
  UpdateCharacterData,
} from '../models/types'

export async function fetchCharacters(): Promise<Character[]> {
  try {
    const characterCollection = collection(db, 'people')
    const characterSnapshot = await getDocs(
      query(characterCollection, orderBy('name', 'asc'))
    )
    const characterList = []

    characterSnapshot.docs.map((doc) =>
      characterList.push({ ...doc.data(), id: doc.id })
    )

    return characterList
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function fetchSingleCharacter(id: string): Promise<Character> {
  try {
    const updatedCharacter = await getDoc(doc(db, 'people', id))
    return { ...updatedCharacter.data(), id } as Character
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function postCharacter(
  newCharacterObject: RawCharacterData
): Promise<string> {
  // --- includes auto blank fields for db input so update can push and add--- //
  const updatedCharacterObject = {
    ...newCharacterObject,
    affiliations: [],
    aliases: [],
    relationships: {},
    dateAdded: Date.now(),
  }

  try {
    const res = await addDoc(collection(db, 'people'), updatedCharacterObject)
    return res.id
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function updateCharacter(
  characterInfo: UpdateCharacterData,
  id: string
): Promise<Character> {
  try {
    const characterRef = doc(db, 'people', id)
    await updateDoc(characterRef, characterInfo)
    const updatedCharacter = await getDoc(doc(db, 'people', id))
    return { ...updatedCharacter.data(), id } as Character
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function deleteCharacter(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'people', id))
  } catch (err) {
    throw new Error(err.message)
  }
}
