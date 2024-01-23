import { createSlice } from '@reduxjs/toolkit'
import { fetchCharacters } from '../../apis/characters'

import { Person } from '../../models/types'

const initialState = [] as Person[]

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      return action.payload
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

export const { setCharacters } = characterSlice.actions
export default characterSlice.reducer
