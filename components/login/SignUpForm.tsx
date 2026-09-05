"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { IconEye, IconEyeOff } from "@/components/icons";
import { routes } from "@/lib/brand";
import { createHouseClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const firstName = String(data.get("firstName") ?? "").trim();

    if (!isSupabaseConfigured()) {
      setError("The house is not connected to Supabase yet. Restart the server after adding the key.");
      return;
    }
    if (password.length < 8) {
      setError("Use at least eight characters.");
      return;
    }

    setSubmitting(true);
    const client = createHouseClient();
    if (!client) {
      setSubmitting(false);
      setError("The house is not connected to Supabase yet.");
      return;
    }

    const origin = window.location.origin;
    const { error: next } = await client.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}${routes.login}`,
        data: { first_name: firstName, preferred_name: firstName },
      },
    });
    setSubmitting(false);
    if (next) {
      setError(next.message);
      return;
    }
    setSent(email);
  }

  if (sent) {
    return (
      <div className="mx-auto w-full max-w-[420px]">
        <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Confirm your address</p>
        <h1 className="mt-3 font-serif text-[40px] leading-[1.08] text-charcoal">A letter is on its way.</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          We sent a confirmation to <span className="text-charcoal">{sent}</span>. Open it, then sign in. Until you confirm, the house will not admit the account.
        </p>
        <Link href={routes.login} className="mt-8 inline-block text-[14px] text-oxblood">
          Return to sign in
        </Link>
      </div>
    );
  }

  return (
    <form className="mx-auto w-full max-w-[420px]" onSubmit={onSubmit}>
      <p className="rise text-[11px] font-medium uppercase tracking-[0.28em] text-muted" style={{ animationDelay: "180ms" }}>
        Create an account
      </p>
      <h1 className="rise mt-3 font-serif text-[44px] leading-[1.05] text-charcoal sm:text-[52px]" style={{ animationDelay: "280ms" }}>
        Begin with Unica
      </h1>
      <p className="rise mt-3 text-[15px] leading-relaxed text-muted" style={{ animationDelay: "380ms" }}>
        This creates your private account. Membership still goes through an application.
      </p>

      <div className="rise mt-10 space-y-5" style={{ animationDelay: "480ms" }}>
        <label className="block">
          <span className="mb-2 block text-[13px] text-ink">First name</span>
          <input
            name="firstName"
            autoComplete="given-name"
            required
            className="h-12 w-full rounded-[var(--radius-sm)] border border-transparent bg-field px-4 text-[15px] text-charcoal outline-none focus:border-oxblood/35 focus:bg-ivory"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[13px] text-ink">Email address</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@studio.com"
            className="h-12 w-full rounded-[var(--radius-sm)] border border-transparent bg-field px-4 text-[15px] text-charcoal outline-none placeholder:text-muted/55 focus:border-oxblood/35 focus:bg-ivory"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[13px] text-ink">Password</span>
          <span className="relative block">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="At least eight characters"
              className="h-12 w-full rounded-[var(--radius-sm)] border border-transparent bg-field px-4 pr-12 text-[15px] text-charcoal outline-none placeholder:text-muted/55 focus:border-oxblood/35 focus:bg-ivory"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-charcoal"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <IconEyeOff /> : <IconEye />}
            </button>
          </span>
        </label>
      </div>

      {error ? <p className="mt-4 text-[13px] text-oxblood">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 h-12 w-full rounded-[var(--radius)] bg-oxblood text-[15px] text-ivory transition-colors hover:bg-oxblood-deep disabled:opacity-70"
      >
        {submitting ? "Creating…" : "Create account"}
      </button>

      <p className="mt-8 text-center text-[13px] text-muted">
        Already have an account?{" "}
        <Link href={routes.login} className="text-charcoal underline decoration-charcoal/20 hover:decoration-charcoal">
          Sign in
        </Link>
      </p>
    </form>
  );
}
