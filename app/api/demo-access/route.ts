import { NextResponse } from "next/server";

const DEMO_CODE = process.env.DEMO_ACCESS_CODE;
const COOKIE_NAME = "collective_demo_access";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code = String(body?.code ?? "").trim();

    if (code !== DEMO_CODE) {
      return NextResponse.json(
        { success: false, message: "Invalid code" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true });

    res.cookies.set(COOKIE_NAME, "granted", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return res;
  } catch {
    return NextResponse.json(
      { success: false, message: "Bad request" },
      { status: 400 }
    );
  }
}