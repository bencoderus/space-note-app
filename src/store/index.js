import { configureStore } from '@reduxjs/toolkit'
import { noteReducer } from '../note/store'

export const store = configureStore({
  reducer: {
    note: noteReducer
  },
})