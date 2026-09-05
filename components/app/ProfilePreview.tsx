"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PresenceDot } from "@/components/app/PresenceDot";
import { useDemo } from "@/components/demo/DemoProvider";
import { IconChat, IconHeart, IconStar } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { appRoutes } from "@/lib/brand";
import { personById } from "@/lib/demo-data";
import { availableFor, isOnline } from "@/lib/people";

export function ProfilePreview({ id }: { id: string }) {
  const person = personById(id);
  const router = useRouter();
  const {
    introductions,
    requestIntroduction,
    sendConcierge,
    memberId,
    isLiked,
    isFavorited,
    toggleLike,
    toggleFavorite,
    openChat,
  } = useDemo();
  const liked = isLiked(id);
  const starred = isFavorited(id);
  const online = isOnline(id);

  if (!person || person.visibility !== "public") {
    return <p className="text-muted">This profile is not available to browse.</p>;
  }

  const existing = introductions.find(
    (item) => item.forMemberId === memberId && (item.aId === person.id || item.bId === person.id),
  );
  const room = availableFor(personById(memberId));
  const index = room.findIndex((item) => item.id === person.id);
  const previous = index > 0 ? room[index - 1] : undefined;
  const next = index >= 0 && index < room.length - 1 ? room[index + 1] : undefined;

  return (
    <article className="page-enter grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-[520px] overflow-hidden">
        <Image src={person.photo} alt="" fill className="object-cover object-[50%_18%]" sizes="45vw" />
        <PresenceDot online={online} className="absolute top-4 right-4 ring-2" />
      </div>
      <div>
        <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Available</p>
        <h1 className="mt-3 flex items-center gap-3 font-serif text-[44px] text-charcoal">
          {person.firstName}, {person.age}
          <PresenceDot online={online} />
        </h1>
        <p className="mt-2 text-[15px] text-muted">
          {person.city} · {person.intention}
          <span className="ml-2 text-[12px] tracking-[0.08em] uppercase">{online ? "Online" : "Offline"}</span>
        </p>
        <p className="mt-6 text-[16px] leading-relaxed text-ink">{person.why ?? person.about}</p>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">{person.about}</p>
        <p className="mt-4 text-[14px] text-muted">{person.traits.join(" · ")}</p>
        {person.difference ? (
          <p className="mt-4 text-[14px] leading-relaxed text-muted">A possible difference: {person.difference}</p>
        ) : null}
        <p className="mt-8 text-[13px] leading-relaxed text-muted">
          A fuller profile is released only after mutual interest. Clara will ask them separately. They will not see that you asked.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={liked}
            onClick={() => toggleLike(person.id)}
            className={`tile-action flex h-11 items-center gap-2 border px-4 text-[13px] ${liked ? "border-oxblood/30 text-oxblood is-on" : "border-line text-charcoal"}`}
          >
            <IconHeart filled={liked} />
            {liked ? "Liked" : "Like"}
          </button>
          <button
            type="button"
            aria-pressed={starred}
            onClick={() => toggleFavorite(person.id)}
            className={`tile-action flex h-11 items-center gap-2 border px-4 text-[13px] ${starred ? "border-brass text-brass is-on" : "border-line text-charcoal"}`}
          >
            <IconStar filled={starred} />
            {starred ? "Starred" : "Star"}
          </button>
          <button
            type="button"
            onClick={() => openChat(person.id)}
            className="tile-action flex h-11 items-center gap-2 border border-line px-4 text-[13px] text-charcoal"
          >
            <IconChat />
            Chat
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {existing ? (
            <Button onClick={() => router.push(`${appRoutes.introductions}/${existing.id}`)}>View introduction</Button>
          ) : (
            <Button
              onClick={() => {
                requestIntroduction(person.id);
                router.push(appRoutes.requests);
              }}
            >
              Request an introduction
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => {
              sendConcierge(`Clara — a note about ${person.firstName}. I would like your view before I decide.`);
              router.push(appRoutes.concierge);
            }}
          >
            Write to Clara about {person.firstName}
          </Button>
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          {previous ? (
            <button
              type="button"
              onClick={() => router.push(`${appRoutes.discover}/${previous.id}`)}
              className="text-[13px] text-muted transition-colors duration-300 hover:text-charcoal"
            >
              ← {previous.firstName}
            </button>
          ) : (
            <span />
          )}
          <p className="text-[11px] tracking-[0.12em] text-muted uppercase">
            {index + 1} of {room.length}
          </p>
          {next ? (
            <button
              type="button"
              onClick={() => router.push(`${appRoutes.discover}/${next.id}`)}
              className="text-[13px] text-muted transition-colors duration-300 hover:text-charcoal"
            >
              {next.firstName} →
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </article>
  );
}
