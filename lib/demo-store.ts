import {
  seedApplications,
  seedConcierge,
  seedIntroductions,
  type Application,
  type ConciergeMessage,
  type Introduction,
  type Role,
} from "@/lib/demo-data";
import type { IntroStatus } from "@/lib/status";

export type Session = { role: Role; email: string; memberId: string | null };

export type SocialMark = { memberId: string; personId: string };

export type ChatLine = { id: string; from: string; body: string; at: string };

export type PeerChat = {
  id: string;
  aId: string;
  bId: string;
  lines: ChatLine[];
};

export type DemoState = {
  session: Session | null;
  introductions: Introduction[];
  messages: ConciergeMessage[];
  applications: Application[];
  likes: SocialMark[];
  favorites: SocialMark[];
  chats: PeerChat[];
};

const KEY = "verenne-demo-v3";

export function emptyState(): DemoState {
  return {
    session: null as Session | null,
    introductions: seedIntroductions,
    messages: seedConcierge,
    applications: seedApplications,
    likes: [],
    favorites: [],
    chats: [],
  };
}

export function loadState(): DemoState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyState();
    return { ...emptyState(), ...JSON.parse(raw) };
  } catch {
    return emptyState();
  }
}

export function saveState(state: DemoState) {
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function roleFromEmail(email: string): Role {
  const value = email.toLowerCase();
  if (value.includes("admin")) return "admin";
  if (value.includes("clara") || value.includes("desk") || value.includes("match")) return "matchmaker";
  return "member";
}

export function homeFor(role: Role) {
  if (role === "admin") return "/admin";
  if (role === "matchmaker") return "/desk";
  return "/home";
}

export function hasMark(list: SocialMark[] | undefined, memberId: string, personId: string) {
  return (list ?? []).some((item) => item.memberId === memberId && item.personId === personId);
}

export function toggleMark(list: SocialMark[] | undefined, memberId: string, personId: string) {
  const current = list ?? [];
  if (hasMark(current, memberId, personId)) {
    return current.filter((item) => !(item.memberId === memberId && item.personId === personId));
  }
  return [...current, { memberId, personId }];
}

export function chatBetween(chats: PeerChat[] | undefined, memberId: string, personId: string) {
  const id = [memberId, personId].sort().join("-");
  return (chats ?? []).find((item) => item.id === id);
}

export function nextAfterInterest(status: IntroStatus): IntroStatus {
  if (status === "matchmaker_approved" || status === "first_member_pending") return "second_member_pending";
  if (status === "second_member_pending") return "mutual_interest_confirmed";
  return status;
}
