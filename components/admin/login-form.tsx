"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Could not sign in.");
      }
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-ivory/50 transition-colors hover:text-blue"
        >
          <ArrowLeft className="size-3.5" /> Back to the website
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-white">
              <Image
                src="/logo.jpg"
                alt="Omuga Services"
                fill
                sizes="44px"
                className="object-contain p-0.5"
              />
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl font-semibold tracking-[0.22em] text-ivory">
                OMUGA
              </span>
              <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.5em] text-blue">
                Admin
              </span>
            </div>
          </div>

          <h1 className="mt-8 font-serif text-2xl font-medium text-ivory">
            Sign in to manage your website
          </h1>
          <p className="mt-2 text-sm text-ivory/50">
            Only staff see this page. Add or remove images, videos and sounds.
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.3em] text-blue"
              >
                Username
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="h-12 rounded-xl bg-background/60 px-4 text-ivory focus-visible:border-blue/60"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.3em] text-blue"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="h-12 rounded-xl bg-background/60 px-4 text-ivory focus-visible:border-blue/60"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={busy || !username || !password}
              className="h-13 cursor-pointer rounded-full bg-blue text-[0.7rem] font-bold uppercase tracking-[0.28em] text-white transition-all duration-300 hover:bg-blue-light hover:blue-glow disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Lock className="size-4" />
              {busy ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}