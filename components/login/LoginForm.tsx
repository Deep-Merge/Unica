"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDemo } from "@/components/demo/DemoProvider";
import { IconApple, IconEye, IconEyeOff, IconGoogle } from "@/components/icons";
import { routes } from "@/lib/brand";
import { createHouseClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { signIn } = useDemo();

  function enter(email: string) {
    setSubmitting(true);
    const href = signIn(email);
    window.setTimeout(() => router.push(href), 400);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (isSupabaseConfigured() && password) {
      const client = createHouseClient();
      if (client) {
        setSubmitting(true);
        const { error: next } = await client.auth.signInWithPassword({ email, password });
        if (next) {
          setSubmitting(false);
          setError(next.message);
          return;
        }
        enter(email);
        return;
      }
    }

    enter(email || "julian@studio.com");
  }

  return (
    <form className="mx-auto w-full max-w-[420px]" onSubmit={onSubmit}>
      <p className="rise text-[11px] font-medium uppercase tracking-[0.28em] text-muted" style={{ animationDelay: "180ms" }}>
        Member space
      </p>
      <h1
        className="rise mt-3 font-serif text-[44px] leading-[1.05] text-charcoal sm:text-[52px]"
        style={{ animationDelay: "280ms" }}
      >
        Welcome back
      </h1>
      <p className="rise mt-3 text-[15px] leading-relaxed text-muted" style={{ animationDelay: "380ms" }}>
        Sign in to your private member space.
      </p>

      <div className="rise mt-10 space-y-5" style={{ animationDelay: "480ms" }}>
        <label className="block">
          <span className="mb-2 block text-[13px] text-ink">Email address</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="julian@studio.com"
            className="h-12 w-full rounded-[var(--radius-sm)] border border-transparent bg-field px-4 text-[15px] text-charcoal outline-none transition-colors placeholder:text-muted/55 focus:border-oxblood/35 focus:bg-ivory"
          />
        </label>

        <label className="block">
          <span className="mb-2 flex items-center justify-between text-[13px] text-ink">
            Password
            <Link href={routes.forgot} className="text-[12px] text-muted transition-colors hover:text-charcoal">
              Forgot password?
            </Link>
          </span>
          <span className="relative block">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="h-12 w-full rounded-[var(--radius-sm)] border border-transparent bg-field px-4 pr-12 text-[15px] text-charcoal outline-none transition-colors placeholder:text-muted/55 focus:border-oxblood/35 focus:bg-ivory"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted transition-colors hover:text-charcoal"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <IconEyeOff /> : <IconEye />}
            </button>
          </span>
        </label>
      </div>

      <div
        className="rise mt-5 flex items-center justify-between gap-4 text-[13px]"
        style={{ animationDelay: "560ms" }}
      >
        <label className="flex cursor-pointer items-center gap-2.5 text-ink">
          <input
            type="checkbox"
            name="remember"
            className="peer sr-only"
            defaultChecked
          />
          <span className="grid h-[15px] w-[15px] place-items-center rounded-[3px] border border-charcoal/25 bg-ivory transition-colors peer-checked:border-oxblood peer-checked:bg-oxblood peer-checked:[&_svg]:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-offset-2">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="opacity-0">
              <path d="M1 4l2.4 2.4L9 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Keep me signed in
        </label>
        <a href={routes.concierge} className="text-muted transition-colors hover:text-charcoal">
          Contact concierge
        </a>
      </div>

      {error ? <p className="mt-4 text-[13px] text-oxblood">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="rise mt-8 h-12 w-full rounded-[var(--radius)] bg-oxblood text-[15px] text-ivory transition-colors hover:bg-oxblood-deep disabled:opacity-70"
        style={{ animationDelay: "680ms" }}
      >
        {submitting ? "Signing in…" : "Sign in securely"}
      </button>

      <div className="rise mt-7 flex items-center gap-4" style={{ animationDelay: "780ms" }}>
        <span className="h-px flex-1 bg-line" />
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted">or</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="rise mt-5 grid grid-cols-2 gap-3" style={{ animationDelay: "860ms" }}>
        <button
          type="button"
          onClick={() => enter("julian@studio.com")}
          className="flex h-12 items-center justify-center gap-2.5 rounded-[var(--radius)] border border-line bg-ivory text-[13px] text-charcoal transition-colors hover:border-charcoal/25"
        >
          <IconGoogle />
          Google
        </button>
        <button
          type="button"
          onClick={() => enter("julian@studio.com")}
          className="flex h-12 items-center justify-center gap-2.5 rounded-[var(--radius)] border border-line bg-ivory text-[13px] text-charcoal transition-colors hover:border-charcoal/25"
        >
          <IconApple className="-mt-px text-charcoal" />
          Apple
        </button>
      </div>

      <p className="rise mt-8 text-center text-[13px] text-muted" style={{ animationDelay: "920ms" }}>
        <button type="button" onClick={() => enter("julian@studio.com")} className="text-charcoal underline decoration-charcoal/20 hover:decoration-charcoal">
          Enter as a man
        </button>
        <span className="mx-2 text-oat">·</span>
        <button type="button" onClick={() => enter("maya@studio.com")} className="text-charcoal underline decoration-charcoal/20 hover:decoration-charcoal">
          Enter as a woman
        </button>
      </p>
      <p className="rise mt-6 text-center text-[13px] text-muted" style={{ animationDelay: "960ms" }}>
        New to Unica?{" "}
        <Link href={routes.signup} className="text-charcoal underline decoration-charcoal/20 hover:decoration-charcoal">
          Create an account
        </Link>
        <span className="mx-2 text-oat">·</span>
        <Link href={routes.apply} className="text-charcoal underline decoration-charcoal/20 hover:decoration-charcoal">
          Apply
        </Link>
      </p>
    </form>
  );
}
