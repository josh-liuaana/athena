import { createSlice } from '@reduxjs/toolkit'
import {
  deleteCharacter,
  fetchCharacters,
  postCharacter,
} from '../../apis/characters'

import { Person } from '../../models/types'

const initialState = [] as Person[]

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      return action.payload
    },
    addCharacter: (state, action) => {
      return [...state, action.payload]
    },
    delCharacter: (state, action) => {
      return state.filter((character) => character.id !== action.payload.id)
    },
  },
})

export function fetchThunkCharacters() {
  return async (dispatch) => {
    const res = await fetchCharacters()
    dispatch(setCharacters(res))
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

export const { setCharacters, addCharacter, delCharacter } =
  characterSlice.actions
export default characterSlice.reducer
