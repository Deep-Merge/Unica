"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { PresenceDot } from "@/components/app/PresenceDot";
import { useDemo } from "@/components/demo/DemoProvider";
import { IconClose } from "@/components/icons";
import { chatBetween } from "@/lib/demo-store";
import { isOnline, personById } from "@/lib/people";

export function ChatDock() {
  const { chatOpen, chatPeerId, closeChat, openChat, chats, memberId, sendChat } = useDemo();
  const [body, setBody] = useState("");

  const threads = useMemo(() => {
    return (chats ?? [])
      .filter((item) => item.aId === memberId || item.bId === memberId)
      .map((item) => {
        const peerId = item.aId === memberId ? item.bId : item.aId;
        return { ...item, peerId, peer: personById(peerId), last: item.lines.at(-1) };
      })
      .filter((item) => item.peer);
  }, [chats, memberId]);

  const peer = chatPeerId ? personById(chatPeerId) : undefined;
  const thread = chatPeerId ? chatBetween(chats, memberId, chatPeerId) : undefined;

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!chatPeerId || !body.trim()) return;
    sendChat(chatPeerId, body);
    setBody("");
  }

  return (
    <div className={`fixed inset-0 z-40 ${chatOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <button
        type="button"
        aria-label="Close messages"
        className={`dock-veil absolute inset-0 bg-charcoal/20 ${chatOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeChat}
      />
      <aside
        className={`dock-panel absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col border-l border-line bg-ivory shadow-[-16px_0_40px_rgba(31,27,24,0.08)] ${
          chatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex h-[76px] items-center gap-3 border-b border-line px-5">
          {peer ? (
            <>
              <button type="button" className="text-[12px] text-muted hover:text-charcoal" onClick={() => openChat()}>
                All
              </button>
              <Image src={peer.photo} alt="" width={36} height={36} className="h-9 w-9 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-serif text-[22px] leading-none text-charcoal">
                  {peer.firstName}
                  <PresenceDot online={isOnline(peer.id)} size="sm" />
                </p>
                <p className="mt-1 text-[11px] tracking-[0.08em] text-muted uppercase">
                  {isOnline(peer.id) ? "Online" : "Offline"}
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1">
              <p className="text-[11px] tracking-[0.28em] text-muted uppercase">Messages</p>
              <p className="mt-1 font-serif text-[26px] leading-none text-charcoal">Notes</p>
            </div>
          )}
          <button type="button" aria-label="Close messages" className="text-muted hover:text-charcoal" onClick={closeChat}>
            <IconClose />
          </button>
        </header>

        {peer ? (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {(thread?.lines ?? []).length === 0 ? (
                <p className="text-[14px] leading-relaxed text-muted">
                  A private note to {peer.firstName}. This is not an introduction — Clara still holds that door.
                </p>
              ) : (
                thread?.lines.map((line) => {
                  const mine = line.from === memberId;
                  return (
                    <article
                      key={line.id}
                      className={`max-w-[85%] border px-4 py-3 ${
                        mine ? "ml-auto border-oxblood/20 bg-cream" : "border-line bg-ivory"
                      }`}
                    >
                      <p className="text-[11px] tracking-[0.14em] text-muted uppercase">
                        {mine ? "You" : peer.firstName} · {line.at}
                      </p>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-ink">{line.body}</p>
                    </article>
                  );
                })
              )}
            </div>
            <form onSubmit={onSubmit} className="border-t border-line p-4">
              <div className="flex gap-2">
                <input
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder={`Write to ${peer.firstName}`}
                  className="h-11 flex-1 border border-transparent bg-field px-4 text-[14px] text-charcoal outline-none placeholder:text-muted/55 focus:border-oxblood/35 focus:bg-ivory"
                />
                <button type="submit" className="h-11 bg-oxblood px-4 text-[13px] text-ivory">
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {threads.length === 0 ? (
              <p className="px-5 py-8 text-[14px] leading-relaxed text-muted">
                No notes yet. Open someone in Available and tap the conversation mark.
              </p>
            ) : (
              threads.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openChat(item.peerId)}
                  className="flex w-full items-center gap-3 border-b border-line px-5 py-4 text-left hover:bg-cream"
                >
                  <div className="relative">
                    <Image src={item.peer!.photo} alt="" width={44} height={44} className="h-11 w-11 object-cover" />
                    <PresenceDot online={isOnline(item.peerId)} size="sm" className="absolute right-0 bottom-0" />
                  </div>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-serif text-[20px] text-charcoal">{item.peer!.firstName}</span>
                      <span className="text-[11px] text-muted">{item.last?.at}</span>
                    </span>
                    <span className="mt-1 block truncate text-[13px] text-muted">{item.last?.body}</span>
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
