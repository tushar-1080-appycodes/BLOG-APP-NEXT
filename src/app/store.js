import { configureStore } from '@reduxjs/toolkit'
import appSlice from '@/features/app/appSlice'
import blogSlice from '@/features/blog/blogSlice'

export const store = configureStore({
  reducer: {
    app: appSlice,
    blog: blogSlice,
  },
})