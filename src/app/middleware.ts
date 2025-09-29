import { NextResponse, NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname
    const isPublicPath =path ==='/' 

    const access_token = request.cookies.get("token")?.value || ''
     
    if (isPublicPath && access_token){
       return NextResponse.redirect(new URL('/Dashboard', request.url))
    }

    if (!isPublicPath && !access_token){
       return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
  matcher: ['/'],
}    