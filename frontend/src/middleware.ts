import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest, res: NextResponse) => {

    const userCookie = req.cookies.get('userData')?.value;
    
    const user = userCookie ? JSON.parse(userCookie) : null;

    const verifyAuth = ['/login', '/register'];
    const protectedPath = ['/dashboard'];
    const adminPath = ['/admin/users', '/admin/tournaments'];
    const tournamentDetailPath = /^\/tournaments\/\d+$/;

    if (user && verifyAuth.some(path => req.nextUrl.pathname.startsWith(path))) return NextResponse.redirect(new URL('/', req.url));

    if (!user && protectedPath.some(path => req.nextUrl.pathname.startsWith(path))) return NextResponse.redirect(new URL('/', req.url));

    if (user && user.role !== 'admin' && adminPath.some(path => req.nextUrl.pathname.startsWith(path))) return NextResponse.redirect(new URL('/', req.url));

    if (!user && tournamentDetailPath.test(req.nextUrl.pathname)) return NextResponse.redirect(new URL('/tournaments', req.url));

    NextResponse.next();

};

export const config = {
    matcher: ['/login', '/register', '/dashboard', '/admin/users', '/admin/tournaments', '/tournaments/:path*'],
};