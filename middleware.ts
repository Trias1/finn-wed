import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // install dulu: npm i jwt-decode

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // ✅ Kalau ga ada token → tendang ke login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // decode JWT (tanpa verifikasi, cukup baca payload)
    const decoded: any = jwtDecode(token);

    // ⏰ Expired check (exp itu detik, jadi kali 1000)
    if (decoded.exp * 1000 < Date.now()) {
      return NextResponse.redirect(new URL("/login", req.url));
    }


  } catch (err) {
    console.error("Token invalid:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Lolos → lanjut
  return NextResponse.next();
}

// Middleware hanya jalan di /admin/*
export const config = {
  matcher: ["/admin/:path*"],
};
