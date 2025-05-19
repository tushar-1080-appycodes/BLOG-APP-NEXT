"use server"

import { cookies } from "next/headers"

export async function getCookies(key) {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(key)
  console.log("Cookie read:", cookie)
  return cookie.value
}

export async function setCookies({ key, value }) {
  const cookieStore = await cookies()
  cookieStore.set(key, value, { httpOnly: true })
  console.log(`Cookie set: ${key} = ${value}`)
}
