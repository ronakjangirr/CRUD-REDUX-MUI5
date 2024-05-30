import { configureStore } from '@reduxjs/toolkit'
import formDetailSlice from '../features/formDetailSlice'

export const store = configureStore({

    reducer: {
        formDetail: formDetailSlice             // giving key "show" to showData 
    },
  })
  