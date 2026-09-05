import type { MomentProgress } from "@/lib/moment/types";
import type { IntroStatus } from "@/lib/status";
import { people as catalog, personById as findPerson } from "@/lib/people";

export type Role = "member" | "matchmaker" | "admin";
export type { Person } from "@/lib/people";
export const people = catalog;
export const personById = findPerson;

export type Introduction = {
  id: string;
  aId: string;
  bId: string;
  forMemberId: string;
  status: IntroStatus;
  createdAt: string;
  moment?: MomentProgress;
};

export type ConciergeMessage = {
  id: string;
  from: "member" | "house";
  body: string;
  at: string;
  memberId?: string;
};

export type Application = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  path: string;
  intention: string;
  note: string;
  status: "new" | "approved" | "changes" | "declined";
};

export const seedIntroductions: Introduction[] = [
  {
    id: "intro-julian",
    aId: "maya",
    bId: "julian",
    forMemberId: "maya",
    status: "first_member_pending",
    createdAt: "2026-09-02",
  },
  {
    id: "intro-marcus",
    aId: "maya",
    bId: "marcus",
    forMemberId: "maya",
    status: "second_member_pending",
    createdAt: "2026-08-28",
  },
  {
    id: "intro-daniel",
    aId: "maya",
    bId: "daniel",
    forMemberId: "maya",
    status: "introduction_scheduled",
    createdAt: "2026-08-20",
  },
  {
    id: "intro-thomas",
    aId: "maya",
    bId: "thomas",
    forMemberId: "maya",
    status: "mutual_interest_confirmed",
    createdAt: "2026-09-03",
    moment: { scriptId: "lisbon-evening", encoreUsed: false },
  },
];

export const seedConcierge: ConciergeMessage[] = [
  {
    id: "c1",
    from: "house",
    body: "Maya — Clara here. A Moment is waiting with Thomas. Don’t begin with an empty chat. Begin there. Julian remains today’s quieter introduction.",
    at: "This morning",
    memberId: "maya",
  },
  {
    id: "c2",
    from: "house",
    body: "Your consultation remains Thursday at 19:30. Come as you are. We will not make you perform.",
    at: "Yesterday",
    memberId: "maya",
  },
  {
    id: "c3",
    from: "house",
    body: "Julian — ten women are in Available this week. Read Clara’s note on each card. A request still comes to me, never to them.",
    at: "This morning",
    memberId: "julian",
  },
];

export const seedApplications: Application[] = [
  {
    id: "app-1",
    firstName: "Helen",
    lastName: "Voss",
    email: "helen@studio.com",
    age: 29,
    city: "The city",
    path: "woman-seeking-man",
    intention: "A long-term relationship",
    note: "I would like to be known before I am seen.",
    status: "new",
  },
  {
    id: "app-2",
    firstName: "Robert",
    lastName: "Lang",
    email: "robert@atelier.com",
    age: 41,
    city: "Nearby",
    path: "man-seeking-woman",
    intention: "Marriage",
    note: "I have no interest in an inbox.",
    status: "new",
  },
];

export const matchmaker = {
  id: "clara",
  name: "Clara",
  photo: "/images/people/clara.jpg",
  title: "Your matchmaker",
};

export function otherOf(intro: Introduction, memberId: string) {
  return intro.aId === memberId ? intro.bId : intro.aId;
}

export function greetingHour() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
