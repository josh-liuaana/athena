import { createSlice } from '@reduxjs/toolkit'
import {} from '../../apis/characters'

import { Person } from '../../models/types'

const initialState = [] as Person[]

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
})

// * -- ASYNC THUNKS -- * //

export const {} = characterSlice.actions
export default characterSlice.reducer
