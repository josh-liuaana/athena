import { createSlice } from '@reduxjs/toolkit'
import { fetchCharacters, postCharacter } from '../../apis/characters'

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
      console.log('current state', state)
      console.log('new payload', action.payload)
      return [...state, action.payload]
    },
  },
})

// * -- ASYNC THUNKS -- * //

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

export const { setCharacters, addCharacter } = characterSlice.actions
export default characterSlice.reducer
