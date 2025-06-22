import { NextRequest, NextResponse } from 'next/server'
 
const allowedOrigins = ['https://osu.in.th', 'https://xn--73cf8ayb.xn--o3cw4h']
 
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
 
export function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin)

  console.log(`CORS Middleware: Origin header = '${origin}' → ${isAllowedOrigin ? 'allowed' : 'not allowed'}`)
 
  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS'
 
  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }
 
  // Handle simple requests
  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', allowedOrigins[0])
  if (!origin) {
    // Probably a same-origin or non-browser request
    return NextResponse.next()
  }
  else if ( origin && !isAllowedOrigin )
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 })
 
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
 
  return response
}
 
export const config = {
  matcher: '/api/:path*',
}