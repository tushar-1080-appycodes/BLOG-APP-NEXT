import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/features/auth/authSlice'
import appSlice from '@/features/app/appSlice'
import blogSlice from '@/features/blog/blogSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
    blog: blogSlice,
  },
})