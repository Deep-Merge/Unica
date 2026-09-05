import type { HouseState } from "@/lib/server/house-state";
import { createHouseClient } from "@/lib/supabase/client";

export async function loadHouseFromSupabase(): Promise<Partial<HouseState> | null> {
  const client = createHouseClient();
  if (!client) return null;
  const [likes, favorites, chats, introductions] = await Promise.all([
    client.from("house_likes").select("member_id, person_id"),
    client.from("house_favorites").select("member_id, person_id"),
    client.from("house_chats").select("id, a_id, b_id, lines"),
    client.from("house_introductions").select("id, a_id, b_id, for_member_id, status, moment, created_at"),
  ]);
  if (likes.error && likes.error.code === "PGRST205") return null;
  return {
    likes: (likes.data ?? []).map((row) => ({ memberId: row.member_id, personId: row.person_id })),
    favorites: (favorites.data ?? []).map((row) => ({ memberId: row.member_id, personId: row.person_id })),
    chats: (chats.data ?? []).map((row) => ({
      id: row.id,
      aId: row.a_id,
      bId: row.b_id,
      lines: row.lines ?? [],
    })),
    introductions: (introductions.data ?? []).map((row) => ({
      id: row.id,
      aId: row.a_id,
      bId: row.b_id,
      forMemberId: row.for_member_id,
      status: row.status,
      createdAt: row.created_at,
      moment: row.moment ?? undefined,
    })),
  };
}

export async function saveHouseToSupabase(state: HouseState) {
  const client = createHouseClient();
  if (!client) return;
  const likes = state.likes.map((item) => ({ member_id: item.memberId, person_id: item.personId }));
  const favorites = state.favorites.map((item) => ({ member_id: item.memberId, person_id: item.personId }));
  const chats = state.chats.map((item) => ({ id: item.id, a_id: item.aId, b_id: item.bId, lines: item.lines }));
  const introductions = state.introductions.map((item) => ({
    id: item.id,
    a_id: item.aId,
    b_id: item.bId,
    for_member_id: item.forMemberId,
    status: item.status,
    moment: item.moment ?? null,
    created_at: item.createdAt,
  }));

  await Promise.all([
    client.from("house_likes").delete().neq("member_id", ""),
    client.from("house_favorites").delete().neq("member_id", ""),
    client.from("house_chats").delete().neq("id", ""),
    client.from("house_introductions").delete().neq("id", ""),
  ]);
  if (likes.length) await client.from("house_likes").insert(likes);
  if (favorites.length) await client.from("house_favorites").insert(favorites);
  if (chats.length) await client.from("house_chats").insert(chats);
  if (introductions.length) await client.from("house_introductions").insert(introductions);
}
