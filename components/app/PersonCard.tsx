"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PresenceDot } from "@/components/app/PresenceDot";
import { useDemo } from "@/components/demo/DemoProvider";
import { IconChat, IconHeart, IconStar } from "@/components/icons";
import { isOnline, type Person } from "@/lib/people";

export function PersonCard({
  person,
  href,
  pending = false,
}: {
  person: Person;
  href: string;
  pending?: boolean;
}) {
  const { isLiked, isFavorited, toggleLike, toggleFavorite, openChat } = useDemo();
  const liked = isLiked(person.id);
  const starred = isFavorited(person.id);
  const online = isOnline(person.id);

  return (
    <article className="group tile bg-cream">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Link href={href} className="absolute inset-0 block">
          <Image src={person.photo} alt="" fill className="img-zoom object-cover object-[50%_16%]" sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw" />
        </Link>
        {person.verified ? (
          <span className="pointer-events-none absolute top-3 left-3 text-[10px] tracking-[0.18em] text-ivory/90 uppercase">Verified</span>
        ) : null}
        <PresenceDot online={online} className="absolute top-3 right-3" />
        <div className="absolute right-2.5 bottom-2.5 flex gap-1.5">
          <TileAction
            label={liked ? `Unlike ${person.firstName}` : `Like ${person.firstName}`}
            active={liked}
            tone="heart"
            onClick={() => toggleLike(person.id)}
          >
            <IconHeart filled={liked} />
          </TileAction>
          <TileAction
            label={starred ? `Unstar ${person.firstName}` : `Star ${person.firstName}`}
            active={starred}
            tone="star"
            onClick={() => toggleFavorite(person.id)}
          >
            <IconStar filled={starred} />
          </TileAction>
          <TileAction label={`Chat with ${person.firstName}`} onClick={() => openChat(person.id)}>
            <IconChat />
          </TileAction>
        </div>
      </div>
      <Link href={href} className="block px-3.5 py-3.5">
        <h2 className="flex items-center gap-2 font-serif text-[22px] leading-none text-charcoal">
          {person.firstName}, {person.age}
          <PresenceDot online={online} size="sm" className="ring-cream" />
        </h2>
        <p className="mt-1.5 text-[12px] text-muted">
          {person.city} · {person.intention.replace("A ", "")}
        </p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink">{person.why ?? person.about}</p>
        {pending ? <p className="mt-2 text-[11px] text-muted">Introduction held</p> : null}
      </Link>
    </article>
  );
}

function TileAction({
  label,
  active,
  tone,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  tone?: "heart" | "star";
  onClick: () => void;
  children: ReactNode;
}) {
  const color = active ? (tone === "star" ? "text-brass" : "text-oxblood") : "text-charcoal";
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className={`tile-action flex h-9 w-9 items-center justify-center bg-ivory/94 shadow-[0_1px_8px_rgba(31,27,24,0.12)] backdrop-blur-sm ${color} ${active ? "is-on" : ""}`}
    >
      {children}
    </button>
  );
}
