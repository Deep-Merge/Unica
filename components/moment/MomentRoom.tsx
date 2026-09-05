"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Mark } from "@/components/brand/Mark";
import { useDemo } from "@/components/demo/DemoProvider";
import { MomentIcon } from "@/components/moment/MomentIcons";
import { PhotoCard } from "@/components/moment/PhotoCard";
import { Button } from "@/components/ui/Button";
import { appRoutes } from "@/lib/brand";
import { otherOf, personById, people } from "@/lib/demo-data";
import {
  choiceById,
  eveningLine,
  postcardLine,
  readReveal,
  scriptById,
  sparkReveal,
} from "@/lib/moment/library";
import type { MomentChoice, MomentDecision } from "@/lib/moment/types";

type Stage =
  | "invite"
  | "spark"
  | "spark-reveal"
  | "read"
  | "read-reveal"
  | "finish"
  | "create-reveal"
  | "postcard"
  | "mutual"
  | "closed";

function initialStage(progress?: { spark?: string; read?: string; finish?: string; decision?: MomentDecision }): Stage {
  if (progress?.decision === "meet") return "mutual";
  if (progress?.decision === "decline") return "closed";
  if (progress?.finish) return "create-reveal";
  if (progress?.read) return "read-reveal";
  if (progress?.spark) return "spark-reveal";
  return "invite";
}

export function MomentRoom({ id }: { id: string }) {
  const router = useRouter();
  const { introductions, ready, saveMoment, decideMoment, memberId } = useDemo();
  const intro = introductions.find((item) => item.id === id);
  const me = personById(memberId) ?? people[0];
  const other = intro ? personById(otherOf(intro, memberId)) : undefined;
  const progress = intro?.moment;
  const script = scriptById(progress?.scriptId ?? "lisbon-evening");

  const [stage, setStage] = useState<Stage>("invite");
  const [booted, setBooted] = useState(false);
  const [picked, setPicked] = useState<string | undefined>();

  useEffect(() => {
    if (!ready || booted) return;
    setStage(initialStage(progress));
    setBooted(true);
  }, [ready, booted, progress]);

  const chapter =
    stage === "invite" || stage === "spark" || stage === "spark-reveal"
      ? 1
      : stage === "read" || stage === "read-reveal"
        ? 2
        : 3;

  const sparkChoice = choiceById(script.spark, progress?.spark);
  const readChoice = choiceById(script.read, progress?.read);
  const settingChoice = choiceById(script.settings, progress?.setting);
  const finishChoice = choiceById(script.finishes, progress?.finish);
  const partnerSpark = choiceById(script.spark, script.partner.spark);
  const partnerSunday = choiceById(script.read, script.partner.sunday);
  const partnerSetting = choiceById(script.settings, script.partner.setting);

  const evening = useMemo(() => {
    if (!progress?.setting || !progress.finish) return "";
    return eveningLine(progress.setting, progress.finish, other?.firstName ?? "They");
  }, [progress?.setting, progress?.finish, other?.firstName]);

  if (!ready) return <div className="min-h-screen bg-charcoal" />;
  if (!intro || !other || !progress) {
    return (
      <main className="grid min-h-screen place-items-center bg-ivory px-6">
        <p className="text-muted">This Moment is no longer available.</p>
      </main>
    );
  }

  const introId = intro.id;
  const otherName = other.firstName;

  function go(next: Stage) {
    setPicked(undefined);
    setStage(next);
  }

  function choose(field: "spark" | "read" | "setting" | "finish", value: string, next: Stage) {
    saveMoment(introId, { [field]: value });
    setPicked(undefined);
    setStage(next);
  }

  function decide(decision: MomentDecision) {
    decideMoment(introId, decision);
    if (decision === "meet") setStage("mutual");
    else if (decision === "decline") setStage("closed");
    else setStage("invite");
  }

  return (
    <main className="relative min-h-[100svh] bg-charcoal text-ivory">
      {stage === "invite" ? (
        <Invite
          image={script.inviteImage}
          title={script.title}
          me={me.firstName}
          other={other.firstName}
          photos={[me.photo, other.photo]}
          onBegin={() => go("spark")}
        />
      ) : null}

      {stage === "spark" ? (
        <ChoiceStage
          chapter={1}
          chapterName="Spark"
          me={me}
          other={other}
          prompt={script.sparkPrompt}
          choices={script.spark}
          picked={picked}
          onPick={setPicked}
          action="Continue"
          onContinue={() => picked && choose("spark", picked, "spark-reveal")}
        />
      ) : null}

      {stage === "spark-reveal" && sparkChoice && partnerSpark ? (
        <RevealStage
          chapter={1}
          image={sparkChoice.image}
          kicker={progress.spark === script.partner.spark ? "Something aligned here" : "Two beginnings"}
          title={sparkReveal(progress.spark ?? "", script.partner.spark, other.firstName)}
          note={`${me.firstName} · ${sparkChoice.title}. ${other.firstName} · ${partnerSpark.title}.`}
          action="Next chapter"
          onContinue={() => go("read")}
        />
      ) : null}

      {stage === "read" ? (
        <ChoiceStage
          chapter={2}
          chapterName="Read me"
          me={me}
          other={other}
          prompt={`${other.firstName} ${script.readPrompt}`}
          choices={script.read}
          picked={picked}
          onPick={setPicked}
          action="See what they chose"
          onContinue={() => picked && choose("read", picked, "read-reveal")}
        />
      ) : null}

      {stage === "read-reveal" && readChoice && partnerSunday ? (
        <RevealStage
          chapter={2}
          image={partnerSunday.image}
          kicker={progress.read === script.partner.sunday ? "You read them correctly" : "A small surprise"}
          title={readReveal(progress.read ?? "", script.partner.sunday, other.firstName)}
          note={`You guessed ${readChoice.title.toLowerCase()}. ${other.firstName} chose ${partnerSunday.title.toLowerCase()}.`}
          action="Create together"
          onContinue={() => {
            saveMoment(introId, { setting: script.partner.setting });
            go("finish");
          }}
        />
      ) : null}

      {stage === "finish" && partnerSetting ? (
        <ChoiceStage
          chapter={3}
          chapterName="Create"
          me={me}
          other={other}
          prompt={`${other.firstName} chose ${partnerSetting.title.toLowerCase()}. ${script.finishPrompt}`}
          choices={script.finishes}
          picked={picked}
          onPick={setPicked}
          action="Reveal the evening"
          onContinue={() => picked && choose("finish", picked, "create-reveal")}
        />
      ) : null}

      {stage === "create-reveal" && settingChoice && finishChoice ? (
        <RevealStage
          chapter={3}
          image={finishChoice.image}
          kicker="You made this"
          title={evening}
          note={`${other.firstName} chose the setting. You brought the last detail. The house wrote the evening.`}
          action="Open your postcard"
          onContinue={() => go("postcard")}
        />
      ) : null}

      {stage === "postcard" && sparkChoice && settingChoice && finishChoice ? (
        <Postcard
          me={me}
          other={other}
          scriptTitle={script.title}
          line={postcardLine(sparkChoice.id, settingChoice.id, finishChoice.id)}
          image={script.postcardImage}
          icons={[sparkChoice.icon, settingChoice.icon, finishChoice.icon]}
          note={script.matchmakerNote}
          encoreUsed={progress.encoreUsed}
          onDecide={decide}
        />
      ) : null}

      {stage === "mutual" ? (
        <EndScreen
          image={script.postcardImage}
          kicker="It’s mutual"
          title="Your concierge will help arrange something that feels comfortable for both of you."
          action="Return to introductions"
          onAction={() => router.push(appRoutes.introductions)}
        />
      ) : null}

      {stage === "closed" ? (
        <EndScreen
          image={script.inviteImage}
          kicker="This chapter"
          title="This introduction will not be moving forward."
          action="Return home"
          onAction={() => router.push(appRoutes.home)}
        />
      ) : null}

      {stage !== "invite" && stage !== "mutual" && stage !== "closed" && stage !== "postcard" ? (
        <p className="pointer-events-none absolute bottom-5 left-0 right-0 text-center text-[11px] tracking-[0.18em] text-ivory/40 uppercase">
          Answers stay sealed until both of you have chosen · Chapter {chapter} of 3
        </p>
      ) : null}
    </main>
  );
}

function Pair({ me, other }: { me: string; other: string }) {
  return (
    <div className="flex -space-x-2">
      <Image src={me} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover ring-2 ring-charcoal" />
      <Image src={other} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover ring-2 ring-charcoal" />
    </div>
  );
}

function ChoiceStage({
  chapter,
  chapterName,
  me,
  other,
  prompt,
  choices,
  picked,
  onPick,
  action,
  onContinue,
}: {
  chapter: number;
  chapterName: string;
  me: { firstName: string; photo: string };
  other: { firstName: string; photo: string };
  prompt: string;
  choices: MomentChoice[];
  picked?: string;
  onPick: (id: string) => void;
  action: string;
  onContinue: () => void;
}) {
  return (
    <section className="min-h-[100svh] bg-ivory text-charcoal">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href={appRoutes.home}>
          <Mark tone="dark" />
        </Link>
        <p className="text-[11px] tracking-[0.22em] text-muted uppercase">
          {chapterName} · {chapter} of 3
        </p>
        <Pair me={me.photo} other={other.photo} />
      </header>
      <div className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <p className="rise kicker">{me.firstName} + {other.firstName}</p>
        <h1 className="rise mt-4 max-w-3xl font-serif text-[34px] leading-[1.08] sm:text-[44px]" style={{ animationDelay: "120ms" }}>
          {prompt}
        </h1>
        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {choices.map((choice, index) => (
            <div key={choice.id} className="rise" style={{ animationDelay: `${180 + index * 80}ms` }}>
              <PhotoCard choice={choice} selected={picked === choice.id} onSelect={() => onPick(choice.id)} />
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button onClick={onContinue} disabled={!picked}>
            {action}
          </Button>
        </div>
      </div>
    </section>
  );
}

function RevealStage({
  chapter,
  image,
  kicker,
  title,
  note,
  action,
  onContinue,
}: {
  chapter: number;
  image: string;
  kicker: string;
  title: string;
  note: string;
  action: string;
  onContinue: () => void;
}) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image src={image} alt="" fill priority className="hero-kenburns object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,12,10,0.82),rgba(16,12,10,0.28))]" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-end px-6 pb-24 sm:px-10">
        <p className="rise text-[11px] tracking-[0.28em] text-ivory/60 uppercase">Chapter {chapter} · {kicker}</p>
        <h2 className="rise mt-5 font-serif text-[36px] leading-[1.08] sm:text-[48px]" style={{ animationDelay: "160ms" }}>
          {title}
        </h2>
        <p className="rise mt-5 max-w-lg text-[15px] leading-relaxed text-ivory/72" style={{ animationDelay: "280ms" }}>
          {note}
        </p>
        <div className="rise mt-10" style={{ animationDelay: "400ms" }}>
          <Button variant="light" onClick={onContinue}>
            {action}
          </Button>
        </div>
      </div>
    </section>
  );
}

function Invite({
  image,
  title,
  me,
  other,
  photos,
  onBegin,
}: {
  image: string;
  title: string;
  me: string;
  other: string;
  photos: [string, string];
  onBegin: () => void;
}) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image src={image} alt="" fill priority className="hero-kenburns object-cover object-[50%_40%]" sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,12,10,0.78),rgba(16,12,10,0.25))]" />
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-7 sm:px-10">
        <Link href={appRoutes.home}>
          <Mark />
        </Link>
        <p className="text-[11px] tracking-[0.22em] text-ivory/60 uppercase">A private Moment</p>
      </header>
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-end px-6 pb-20 sm:px-10">
        <div className="rise flex items-center gap-3">
          <Pair me={photos[0]} other={photos[1]} />
          <MomentIcon name="spark" className="text-brass" />
        </div>
        <p className="rise mt-6 text-[11px] tracking-[0.32em] text-ivory/70 uppercase">A Moment is waiting</p>
        <h1 className="rise mt-4 font-serif text-[48px] leading-[0.98] sm:text-[72px]" style={{ animationDelay: "160ms" }}>
          {me} + {other}
        </h1>
        <p className="rise mt-5 max-w-md font-serif text-[26px] leading-snug text-ivory/88" style={{ animationDelay: "280ms" }}>
          {title}.
        </p>
        <p className="rise mt-4 max-w-md text-[16px] leading-relaxed text-ivory/72" style={{ animationDelay: "400ms" }}>
          Three small choices. One story you create together.
        </p>
        <div className="rise mt-10" style={{ animationDelay: "520ms" }}>
          <Button variant="light" onClick={onBegin}>
            Begin the evening
          </Button>
        </div>
      </div>
    </section>
  );
}

function Postcard({
  me,
  other,
  scriptTitle,
  line,
  image,
  icons,
  note,
  encoreUsed,
  onDecide,
}: {
  me: { firstName: string };
  other: { firstName: string };
  scriptTitle: string;
  line: string;
  image: string;
  icons: Array<"wine" | "tram" | "music" | "croissant" | "compass" | "book" | "moon" | "key" | "pin" | "circles" | "envelope" | "spark" | "plate" | "camera">;
  note: string;
  encoreUsed: boolean;
  onDecide: (decision: MomentDecision) => void;
}) {
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <section className="min-h-[100svh] bg-[#f3eee4] text-charcoal">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href={appRoutes.home}>
          <Mark tone="dark" />
        </Link>
        <p className="text-[11px] tracking-[0.22em] text-muted uppercase">Keepsake</p>
      </header>
      <article className="rise mx-auto max-w-3xl px-6 pb-24 sm:px-10">
        <div className="overflow-hidden bg-ivory shadow-[0_24px_80px_rgba(31,27,24,0.08)]">
          <div className="relative aspect-[16/9]">
            <Image src={image} alt="" fill className="object-cover" sizes="720px" />
          </div>
          <div className="px-7 py-8 sm:px-10 sm:py-10">
            <p className="text-[11px] tracking-[0.28em] text-muted uppercase">
              {me.firstName} + {other.firstName}’s First Moment
            </p>
            <h2 className="mt-4 font-serif text-[34px] leading-[1.08] sm:text-[42px]">{line}</h2>
            <p className="mt-3 text-[14px] text-muted">
              {scriptTitle} · {today}
            </p>
            <div className="mt-6 flex gap-5 text-brass">
              {icons.map((icon) => (
                <MomentIcon key={icon} name={icon} />
              ))}
            </div>
            <p className="mt-8 border-t border-line pt-6 text-[14px] leading-relaxed text-ink">{note}</p>
          </div>
        </div>

        <p className="mt-12 font-serif text-[28px] leading-snug">Would you enjoy doing something like this together?</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => onDecide("meet")}>Yes, I’d like to meet</Button>
          {!encoreUsed ? (
            <Button variant="ghost" onClick={() => onDecide("encore")}>
              One more Moment first
            </Button>
          ) : null}
          <Button variant="ghost" onClick={() => onDecide("decline")}>
            Not quite for me
          </Button>
        </div>
        <p className="mt-5 text-[13px] text-muted">
          Neither of you will see the other’s answer unless interest is mutual.
        </p>
      </article>
    </section>
  );
}

function EndScreen({
  image,
  kicker,
  title,
  action,
  onAction,
}: {
  image: string;
  kicker: string;
  title: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-black/62" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-6 text-center">
        <p className="rise text-[11px] tracking-[0.28em] text-ivory/70 uppercase">{kicker}</p>
        <h2 className="rise mt-5 font-serif text-[40px] leading-[1.08] sm:text-[52px]" style={{ animationDelay: "140ms" }}>
          {title}
        </h2>
        <div className="rise mt-10" style={{ animationDelay: "280ms" }}>
          <Button variant="light" onClick={onAction}>
            {action}
          </Button>
        </div>
      </div>
    </section>
  );
}
