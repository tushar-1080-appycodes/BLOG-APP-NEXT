import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export default function middleware(request) {
    if (request.cookies.get('user_Email')) {        
        return NextResponse.redirect(new URL('/blogs', request.url))
    }
    else {

        return NextResponse.redirect(new URL('/logIn', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/',
}