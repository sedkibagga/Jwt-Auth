import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Ensure you have imported goalReducer if you are using it
    // goals: goalReducer,
  },
})

export default store;