"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { people } from "@/lib/demo-data";
import type { Application } from "@/lib/demo-data";
import { emptyState, hasMark, homeFor, toggleMark, type DemoState } from "@/lib/demo-store";
import { memberFromEmail } from "@/lib/people";
import type { MomentDecision, MomentProgress } from "@/lib/moment/types";

type DemoContextValue = DemoState & {
  ready: boolean;
  memberId: string;
  signIn: (email: string) => string;
  signOut: () => void;
  requestIntroduction: (personId: string) => void;
  declineIntroduction: (id: string) => void;
  confirmInterest: (id: string) => void;
  approveIntroduction: (id: string) => void;
  releaseProfiles: (id: string) => void;
  scheduleIntroduction: (id: string) => void;
  saveMoment: (id: string, patch: Partial<MomentProgress>) => void;
  decideMoment: (id: string, decision: MomentDecision) => void;
  sendConcierge: (body: string) => void;
  addApplication: (application: Application) => void;
  setApplicationStatus: (id: string, status: Application["status"]) => void;
  chatOpen: boolean;
  chatPeerId: string | null;
  openChat: (personId?: string) => void;
  closeChat: () => void;
  toggleLike: (personId: string) => void;
  toggleFavorite: (personId: string) => void;
  sendChat: (personId: string, body: string) => void;
  isLiked: (personId: string) => boolean;
  isFavorited: (personId: string) => boolean;
};

const DemoContext = createContext<DemoContextValue | null>(null);

async function house(payload?: object): Promise<DemoState> {
  const response = await fetch("/api/house", {
    method: payload ? "POST" : "GET",
    headers: payload ? { "Content-Type": "application/json" } : undefined,
    body: payload ? JSON.stringify(payload) : undefined,
  });
  return response.json();
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(emptyState);
  const [ready, setReady] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPeerId, setChatPeerId] = useState<string | null>(null);

  useEffect(() => {
    house()
      .then((next) => setState(next))
      .finally(() => setReady(true));
  }, []);

  const memberId = state.session?.memberId ?? (state.session?.role === "member" ? memberFromEmail(state.session.email) : "julian");

  const api = useMemo<DemoContextValue>(
    () => ({
      ...state,
      ready,
      memberId,
      signIn(email) {
        void house({ type: "signIn", email }).then(setState);
        const role = email.toLowerCase().includes("admin")
          ? "admin"
          : email.toLowerCase().includes("clara") || email.toLowerCase().includes("desk") || email.toLowerCase().includes("match")
            ? "matchmaker"
            : "member";
        return homeFor(role);
      },
      signOut() {
        void house({ type: "signOut" }).then(setState);
      },
      requestIntroduction(personId) {
        if (!people.some((person) => person.id === personId)) return;
        void house({ type: "request", memberId, personId }).then(setState);
      },
      declineIntroduction(id) {
        void house({ type: "decline", id }).then(setState);
      },
      confirmInterest(id) {
        void house({ type: "confirm", id }).then(setState);
      },
      approveIntroduction(id) {
        void house({ type: "approve", id }).then(setState);
      },
      releaseProfiles(id) {
        void house({ type: "release", id }).then(setState);
      },
      scheduleIntroduction(id) {
        void house({ type: "schedule", id }).then(setState);
      },
      saveMoment(id, patch) {
        void house({ type: "saveMoment", id, patch }).then(setState);
      },
      decideMoment(id, decision) {
        void house({ type: "decideMoment", id, decision }).then(setState);
      },
      sendConcierge(body) {
        void house({ type: "concierge", memberId, body }).then(setState);
      },
      addApplication(application) {
        void house({ type: "application", application }).then(setState);
      },
      setApplicationStatus(id, status) {
        void house({ type: "applicationStatus", id, status }).then(setState);
      },
      likes: state.likes ?? [],
      favorites: state.favorites ?? [],
      chats: state.chats ?? [],
      chatOpen,
      chatPeerId,
      openChat(personId) {
        setChatPeerId(personId ?? null);
        setChatOpen(true);
      },
      closeChat() {
        setChatOpen(false);
        setChatPeerId(null);
      },
      toggleLike(personId) {
        setState((prev) => ({ ...prev, likes: toggleMark(prev.likes, memberId, personId) }));
        void house({ type: "toggleLike", memberId, personId }).then(setState);
      },
      toggleFavorite(personId) {
        setState((prev) => ({ ...prev, favorites: toggleMark(prev.favorites, memberId, personId) }));
        void house({ type: "toggleFavorite", memberId, personId }).then(setState);
      },
      sendChat(personId, body) {
        void house({ type: "chat", memberId, personId, body }).then(setState);
      },
      isLiked(personId) {
        return hasMark(state.likes, memberId, personId);
      },
      isFavorited(personId) {
        return hasMark(state.favorites, memberId, personId);
      },
    }),
    [ready, state, memberId, chatOpen, chatPeerId],
  );

  return <DemoContext.Provider value={api}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("useDemo must be used within DemoProvider");
  return value;
}
