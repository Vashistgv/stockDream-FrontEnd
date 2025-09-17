// app/api/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  console.log("logout triggered");
  const cookieStore = await cookies();
  cookieStore.set("auth_token", "", { expires: new Date(0) });
  return NextResponse.json({
    status: 200,
    body: { message: "Logout successful" },
  }); // Redirect after logout
}
