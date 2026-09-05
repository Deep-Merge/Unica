import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import {
  seedApplications,
  seedConcierge,
  seedIntroductions,
  type Application,
  type ConciergeMessage,
  type Introduction,
} from "@/lib/demo-data";
import { nextScript } from "@/lib/moment/library";
import type { MomentDecision, MomentProgress } from "@/lib/moment/types";
import { memberFromEmail, personById } from "@/lib/people";
import {
  homeFor,
  nextAfterInterest,
  roleFromEmail,
  type PeerChat,
  type Session,
  type SocialMark,
} from "@/lib/demo-store";
import type { IntroStatus } from "@/lib/status";

export type HouseState = {
  introductions: Introduction[];
  messages: ConciergeMessage[];
  applications: Application[];
  likes: SocialMark[];
  favorites: SocialMark[];
  chats: PeerChat[];
};

const dir = join(process.cwd(), ".data");
const file = join(dir, "house.json");

function empty(): HouseState {
  return {
    introductions: seedIntroductions,
    messages: seedConcierge.map((item) => ({ ...item, memberId: "maya" })),
    applications: seedApplications,
    likes: [],
    favorites: [],
    chats: [],
  };
}

export function readHouse(): HouseState {
  try {
    if (!existsSync(file)) return empty();
    return { ...empty(), ...JSON.parse(readFileSync(file, "utf8")) };
  } catch {
    return empty();
  }
}

export function writeHouse(state: HouseState) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(file, JSON.stringify(state, null, 2));
}

export function sessionFromEmail(email: string): Session {
  const role = roleFromEmail(email);
  return {
    role,
    email,
    memberId: role === "member" ? memberFromEmail(email) : null,
  };
}

export function applyHouseAction(
  state: HouseState,
  action:
    | { type: "request"; memberId: string; personId: string }
    | { type: "decline"; id: string }
    | { type: "confirm"; id: string }
    | { type: "approve"; id: string }
    | { type: "release"; id: string }
    | { type: "schedule"; id: string }
    | { type: "saveMoment"; id: string; patch: Partial<MomentProgress> }
    | { type: "decideMoment"; id: string; decision: MomentDecision }
    | { type: "concierge"; memberId: string; body: string }
    | { type: "application"; application: Application }
    | { type: "applicationStatus"; id: string; status: Application["status"] }
    | { type: "toggleLike"; memberId: string; personId: string }
    | { type: "toggleFavorite"; memberId: string; personId: string }
    | { type: "chat"; memberId: string; personId: string; body: string },
): HouseState {
  if (action.type === "request") {
    const exists = state.introductions.some(
      (item) => item.forMemberId === action.memberId && (item.aId === action.personId || item.bId === action.personId),
    );
    if (exists) return state;
    return {
      ...state,
      introductions: [
        {
          id: `intro-${action.personId}-${Date.now()}`,
          aId: action.memberId,
          bId: action.personId,
          forMemberId: action.memberId,
          status: "matchmaker_review",
          createdAt: new Date().toISOString().slice(0, 10),
        },
        ...state.introductions,
      ],
    };
  }

  if (action.type === "decline") {
    return mapIntro(state, action.id, (item) => ({ ...item, status: "no_mutual_fit" as IntroStatus }));
  }
  if (action.type === "confirm") {
    return mapIntro(state, action.id, (item) => ({ ...item, status: nextAfterInterest(item.status) }));
  }
  if (action.type === "approve") {
    return mapIntro(state, action.id, (item) => ({ ...item, status: "first_member_pending" as IntroStatus }));
  }
  if (action.type === "release") {
    return mapIntro(state, action.id, (item) =>
      item.status === "mutual_interest_confirmed" ? { ...item, status: "profiles_released" as IntroStatus } : item,
    );
  }
  if (action.type === "schedule") {
    return mapIntro(state, action.id, (item) => ({ ...item, status: "introduction_scheduled" as IntroStatus }));
  }
  if (action.type === "saveMoment") {
    return mapIntro(state, action.id, (item) => ({
      ...item,
      moment: { scriptId: "lisbon-evening", encoreUsed: false, ...item.moment, ...action.patch },
    }));
  }
  if (action.type === "decideMoment") {
    const intro = state.introductions.find((item) => item.id === action.id);
    const scriptId = intro?.moment?.scriptId ?? "lisbon-evening";
    if (action.decision === "encore") {
      return mapIntro(state, action.id, (item) => ({
        ...item,
        moment: { scriptId: nextScript(scriptId).id, encoreUsed: true },
      }));
    }
    const status: IntroStatus = action.decision === "meet" ? "introduction_scheduled" : "no_mutual_fit";
    const house =
      action.decision === "meet"
        ? "It’s mutual. I will arrange something that feels comfortable for both of you — no numbers exchanged in this chapter."
        : "This introduction will not be moving forward. I have closed it quietly.";
    return {
      ...mapIntro(state, action.id, (item) => ({
        ...item,
        status,
        moment: {
          scriptId,
          encoreUsed: item.moment?.encoreUsed ?? false,
          ...item.moment,
          decision: action.decision,
          completedAt: new Date().toISOString().slice(0, 10),
        },
      })),
      messages: [
        ...state.messages,
        {
          id: `m-moment-${Date.now()}`,
          from: "house",
          body: house,
          at: "Just now",
          memberId: intro?.forMemberId,
        },
      ],
    };
  }
  if (action.type === "concierge") {
    const trimmed = action.body.trim();
    if (!trimmed) return state;
    return {
      ...state,
      messages: [
        ...state.messages,
        { id: `m-${Date.now()}`, from: "member", body: trimmed, at: "Just now", memberId: action.memberId },
        {
          id: `m-${Date.now()}-r`,
          from: "house",
          body: "Clara will read this. If an introduction needs changing, she will write to you — not the other person.",
          at: "Just now",
          memberId: action.memberId,
        },
      ],
    };
  }
  if (action.type === "application") {
    return { ...state, applications: [action.application, ...state.applications] };
  }
  if (action.type === "applicationStatus") {
    return {
      ...state,
      applications: state.applications.map((item) => (item.id === action.id ? { ...item, status: action.status } : item)),
    };
  }
  if (action.type === "toggleLike") {
    return { ...state, likes: toggleMark(state.likes ?? [], action.memberId, action.personId) };
  }
  if (action.type === "toggleFavorite") {
    return { ...state, favorites: toggleMark(state.favorites ?? [], action.memberId, action.personId) };
  }
  if (action.type === "chat") {
    const trimmed = action.body.trim();
    if (!trimmed) return state;
    const other = personById(action.personId);
    const reply = other
      ? `I received this. If we both still want to, Clara can hold an introduction — I would rather not rush.`
      : "I received this.";
    return { ...state, chats: upsertChat(state.chats ?? [], action.memberId, action.personId, trimmed, reply) };
  }
  return state;
}

function toggleMark(list: SocialMark[], memberId: string, personId: string) {
  const exists = list.some((item) => item.memberId === memberId && item.personId === personId);
  if (exists) return list.filter((item) => !(item.memberId === memberId && item.personId === personId));
  return [...list, { memberId, personId }];
}

function upsertChat(chats: PeerChat[], memberId: string, personId: string, body: string, reply: string): PeerChat[] {
  const id = [memberId, personId].sort().join("-");
  const now = "Just now";
  const incoming = [
    { id: `c-${Date.now()}`, from: memberId, body, at: now },
    { id: `c-${Date.now()}-r`, from: personId, body: reply, at: now },
  ];
  const found = chats.find((item) => item.id === id);
  if (found) {
    return chats.map((item) => (item.id === id ? { ...item, lines: [...item.lines, ...incoming] } : item));
  }
  return [...chats, { id, aId: memberId, bId: personId, lines: incoming }];
}

function mapIntro(state: HouseState, id: string, map: (item: Introduction) => Introduction): HouseState {
  return {
    ...state,
    introductions: state.introductions.map((item) => (item.id === id ? map(item) : item)),
  };
}

export { homeFor };
