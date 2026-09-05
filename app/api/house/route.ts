import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { applyHouseAction, readHouse, sessionFromEmail, writeHouse, type HouseState } from "@/lib/server/house-state";
import type { Session } from "@/lib/demo-store";
import { loadHouseFromSupabase, saveHouseToSupabase } from "@/lib/supabase/house";

const COOKIE = "verenne_session";

async function houseNow(): Promise<HouseState> {
  const local = readHouse();
  try {
    const remote = await loadHouseFromSupabase();
    if (!remote) return local;
    return { ...local, ...remote };
  } catch {
    return local;
  }
}

export async function GET() {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  const session: Session | null = raw ? JSON.parse(raw) : null;
  return NextResponse.json({ session, ...(await houseNow()) });
}

export async function POST(request: Request) {
  const body = await request.json();
  const jar = await cookies();

  if (body.type === "signIn") {
    const session = sessionFromEmail(String(body.email ?? ""));
    jar.set(COOKIE, JSON.stringify(session), { httpOnly: false, path: "/", sameSite: "lax" });
    return NextResponse.json({ session, ...(await houseNow()) });
  }

  if (body.type === "signOut") {
    jar.delete(COOKIE);
    return NextResponse.json({ session: null, ...(await houseNow()) });
  }

  const next = applyHouseAction(await houseNow(), body);
  writeHouse(next);
  try {
    await saveHouseToSupabase(next);
  } catch {
    /* local file still holds the house until SQL is applied */
  }
  const raw = jar.get(COOKIE)?.value;
  const session: Session | null = raw ? JSON.parse(raw) : null;
  return NextResponse.json({ session, ...next } satisfies { session: Session | null } & HouseState);
}
