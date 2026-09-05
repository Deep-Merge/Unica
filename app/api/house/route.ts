import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { applyHouseAction, readHouse, sessionFromEmail, writeHouse, type HouseState } from "@/lib/server/house-state";
import type { Session } from "@/lib/demo-store";

const COOKIE = "verenne_session";

export async function GET() {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  const session: Session | null = raw ? JSON.parse(raw) : null;
  return NextResponse.json({ session, ...readHouse() });
}

export async function POST(request: Request) {
  const body = await request.json();
  const jar = await cookies();

  if (body.type === "signIn") {
    const session = sessionFromEmail(String(body.email ?? ""));
    jar.set(COOKIE, JSON.stringify(session), { httpOnly: false, path: "/", sameSite: "lax" });
    return NextResponse.json({ session, ...readHouse() });
  }

  if (body.type === "signOut") {
    jar.delete(COOKIE);
    return NextResponse.json({ session: null, ...readHouse() });
  }

  const next = applyHouseAction(readHouse(), body);
  writeHouse(next);
  const raw = jar.get(COOKIE)?.value;
  const session: Session | null = raw ? JSON.parse(raw) : null;
  return NextResponse.json({ session, ...next } satisfies { session: Session | null } & HouseState);
}
