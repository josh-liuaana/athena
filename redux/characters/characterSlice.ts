import { createSlice } from '@reduxjs/toolkit'
import {
  deleteCharacter,
  fetchCharacters,
  fetchSingleCharacter,
  postCharacter,
  updateCharacter,
} from '../../apis/characters'

import { Person } from '../../models/types'

const initialState = {
  characterList: [] as Person[],
  activeCharacter: {} as Person,
}

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      return {
        characterList: action.payload,
        activeCharacter: state.activeCharacter,
      }
    },
    setActiveCharacter: (state, action) => {
      return {
        characterList: state.characterList,
        activeCharacter: action.payload,
      }
    },
    addCharacter: (state, action) => {
      return {
        characterList: [...state.characterList, action.payload],
        activeCharacter: state.activeCharacter,
      }
    },
    delCharacter: (state, action) => {
      const newCharList = state.characterList.filter(
        (character) => character.id !== action.payload.id
      )
      return {
        characterList: newCharList,
        activeCharacter: state.activeCharacter,
      }
    },
    updCharacter: (state, action) => {
      return {
        characterList: state.characterList,
        activeCharacter: action.payload,
      }
    },
  },
})

export function fetchThunkCharacters() {
  return async (dispatch) => {
    const res = await fetchCharacters()
    dispatch(setCharacters(res))
  }
}

export function fetchThunkSingleCharacter(id) {
  return async (dispatch) => {
    const res = await fetchSingleCharacter(id)
    dispatch(setActiveCharacter(res))
    //
  }
}

export function postThunkCharacter(newCharacterInfo) {
  return async (dispatch) => {
    const res = await postCharacter(newCharacterInfo)
    dispatch(addCharacter({ ...newCharacterInfo, id: res }))
  }
}

export function deleteThunkCharacter(id) {
  return async (dispatch) => {
    await deleteCharacter(id)
    dispatch(delCharacter(id))
  }
}

export function updateThunkCharacter(newCharacterInfo, id) {
  return async (dispatch) => {
    try {
      const updatedCharacter = await updateCharacter(newCharacterInfo, id)
      dispatch(updCharacter(updatedCharacter))
    } catch (err) {
      console.error('error inside thunk call:', err.message)
    }
  }
}

export const {
  setCharacters,
  addCharacter,
  delCharacter,
  updCharacter,
  setActiveCharacter,
} = characterSlice.actions
export default characterSlice.reducer
