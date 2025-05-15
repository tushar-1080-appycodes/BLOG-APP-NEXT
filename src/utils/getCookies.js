"use server"
import { cookies } from "next/headers";

export async function getCookies() {
    const _ = await cookies()

    return _
}