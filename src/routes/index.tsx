import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mascot } from "@/components/Mascot";
import { FloatingDoodles, Sparkles } from "@/components/Sparkles";
import { supabase } from "@/lib/supabase";
import { useAuthContext } from "@/lib/auth-context";

export const Route = createFileRoute("/")(({
  component: AuthPage,
}));

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  // Redirect if already signed in
  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, loading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    setBusy(true);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else navigate({ to: "/dashboard" });
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setInfo("Check your email to confirm your account, then sign in ♡");
    }

    setBusy(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="h-8 w-8 rounded-full border-4 border-pink-300 border-t-violet-400"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingDoodles />
      <Sparkles />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-6 py-12 md:flex-row">
        {/* Left — branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-4 md:items-start"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-[40%] bg-gradient-to-br from-pink-200/70 via-violet-200/60 to-sky-200/70 blur-3xl" />
            <div className="relative">
              <Mascot size={160} />
            </div>
          </div>
          <h1 className="font-display text-5xl leading-tight text-gradient text-center md:text-left">
            Hai's Big<br />Adventure ♡
          </h1>
          <p className="max-w-xs text-center text-foreground/70 md:text-left">
            A cozy roadmap to machine learning, dream countries, and a brand new life.
          </p>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium"
          >
            <span className="animate-twinkle">✦</span> made with love · just for you
          </motion.div>
        </motion.div>

        {/* Right — auth form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full max-w-sm"
        >
          <div className="glass-strong rounded-3xl p-8 shadow-soft">
            {/* Tab switcher */}
            <div className="flex rounded-2xl bg-white/60 p-1 mb-6">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(""); setInfo(""); }}
                  className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${
                    mode === m
                      ? "bg-gradient-to-r from-pink-300 to-violet-300 text-white shadow-soft"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Sign up"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hai@example.com"
                    className="w-full rounded-xl bg-white/80 px-4 py-2.5 text-sm outline-none ring-pink-200 focus:ring-2 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-white/80 px-4 py-2.5 text-sm outline-none ring-pink-200 focus:ring-2 transition"
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-xl bg-rose-100 px-4 py-2.5 text-xs font-medium text-rose-700"
                  >
                    {error}
                  </motion.p>
                )}

                {info && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-xl bg-emerald-100 px-4 py-2.5 text-xs font-medium text-emerald-700"
                  >
                    {info}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-violet-300 py-3 text-sm font-semibold text-white shadow-soft transition hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {busy ? "✦ loading..." : mode === "signin" ? "Sign in ♡" : "Create account ✨"}
                </button>
              </motion.form>
            </AnimatePresence>

            <p className="mt-6 text-center text-[11px] text-foreground/50">
              your journey is safe with us · stored in supabase ♡
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
