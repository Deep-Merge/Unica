"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PersonCard } from "@/components/app/PersonCard";
import { useDemo } from "@/components/demo/DemoProvider";
import { appRoutes } from "@/lib/brand";
import { availableFor, isOnline, personById } from "@/lib/people";

const intentions = ["any", "A long-term relationship", "A life partnership", "Marriage"] as const;
const views = ["all", "liked", "starred", "online"] as const;
const PAGE_SIZE = 12;

export function AvailableGallery() {
  const { introductions, memberId, isLiked, isFavorited } = useDemo();
  const [intention, setIntention] = useState<(typeof intentions)[number]>("any");
  const [view, setView] = useState<(typeof views)[number]>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [shown, setShown] = useState(true);
  const top = useRef<HTMLElement>(null);
  const viewer = personById(memberId);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return availableFor(viewer).filter((person) => {
      if (intention !== "any" && person.intention !== intention) return false;
      if (view === "liked" && !isLiked(person.id)) return false;
      if (view === "starred" && !isFavorited(person.id)) return false;
      if (view === "online" && !isOnline(person.id)) return false;
      if (q && !`${person.firstName} ${person.city} ${person.intention}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [viewer, intention, view, query, isLiked, isFavorited]);

  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const slice = list.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [intention, view, query]);

  function go(next: number) {
    const target = Math.min(pages, Math.max(1, next));
    if (target === safePage) return;
    setShown(false);
    window.setTimeout(() => {
      setPage(target);
      setShown(true);
      top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  }

  return (
    <section ref={top}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1">
          {intentions.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setIntention(value)}
              className={`h-9 px-3.5 text-[12px] tracking-[0.04em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                intention === value ? "bg-oxblood text-ivory" : "text-muted hover:text-charcoal"
              }`}
            >
              {value === "any" ? "All" : value.replace("A ", "")}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1">
            {views.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setView(value)}
                className={`h-9 px-3 text-[12px] tracking-[0.04em] capitalize transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  view === value ? "text-charcoal" : "text-muted hover:text-charcoal"
                }`}
              >
                {value}
                {view === value ? <span className="mt-1 block h-px bg-brass" /> : <span className="mt-1 block h-px bg-transparent" />}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a name"
            className="h-9 w-36 border border-transparent bg-field px-3 text-[13px] text-charcoal outline-none transition-colors duration-300 placeholder:text-muted/55 focus:border-oxblood/35 focus:bg-ivory sm:w-44"
          />
        </div>
      </div>

      <p className="mt-5 text-[12px] tracking-[0.08em] text-muted uppercase">
        {list.length} available · page {safePage} of {pages}
      </p>

      {list.length === 0 ? (
        <p className="mt-12 max-w-md text-[15px] leading-relaxed text-muted">
          No one in this room matches that yet. Open All, or try another name.
        </p>
      ) : (
        <div
          className={`mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-5 ${shown ? "gallery-in" : "gallery-out"}`}
        >
          {slice.map((person, index) => (
            <div key={`${person.id}-${safePage}`} style={{ animationDelay: `${index * 40}ms` }} className="gallery-card">
              <PersonCard
                person={person}
                href={`${appRoutes.discover}/${person.id}`}
                pending={introductions.some((item) => item.forMemberId === memberId && (item.aId === person.id || item.bId === person.id))}
              />
            </div>
          ))}
        </div>
      )}

      {pages > 1 ? (
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pages">
          <button
            type="button"
            onClick={() => go(safePage - 1)}
            disabled={safePage <= 1}
            className="h-10 px-4 text-[13px] text-muted transition-colors duration-300 hover:text-charcoal disabled:opacity-30"
          >
            Previous
          </button>
          {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => go(number)}
              className={`h-10 min-w-10 px-3 text-[13px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                number === safePage ? "bg-oxblood text-ivory" : "text-muted hover:text-charcoal"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go(safePage + 1)}
            disabled={safePage >= pages}
            className="h-10 px-4 text-[13px] text-muted transition-colors duration-300 hover:text-charcoal disabled:opacity-30"
          >
            Next
          </button>
        </nav>
      ) : null}
    </section>
  );
}
