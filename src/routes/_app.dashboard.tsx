import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Mascot } from "@/components/Mascot";
import { useAppState, daysSince, levelFromXP, checkInToday } from "@/lib/store";
import { ROADMAP, HABITS } from "@/lib/roadmap";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard · Hai's Big Adventure ♡" }] }),
});

function StatCard({ label, value, hint, gradient }: { label: string; value: string | number; hint?: string; gradient: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-3xl p-5 shadow-soft ${gradient}`}
    >
      <div className="relative z-10">
        <div className="text-xs font-medium text-foreground/70">{label}</div>
        <div className="mt-1 font-display text-4xl">{value}</div>
        {hint && <div className="mt-1 text-xs text-foreground/60">{hint}</div>}
      </div>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
    </motion.div>
  );
}

function Dashboard() {
  const [s] = useAppState();
  useEffect(() => { checkInToday(); }, []);

  const days = daysSince(s.startDate);
  const level = levelFromXP(s.xp);
  const xpForNext = (level) ** 2 * 25;
  const xpFromPrev = (level - 1) ** 2 * 25;
  const xpPct = Math.round(((s.xp - xpFromPrev) / Math.max(1, xpForNext - xpFromPrev)) * 100);

  const completedWeeks = Object.values(s.weeks).filter((w) => w.completed).length;
  const weeklyPct = Math.round((completedWeeks / 52) * 100);

  const today = new Date().toDateString();
  const todaysHabits = HABITS.filter((h) => s.habits[h.id]?.includes(today)).length;

  const currentWeek = Math.min(52, Math.max(1, Math.floor(days / 7) + 1));
  const next = ROADMAP[currentWeek - 1];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">welcome back, Hai ♡</h1>
          <p className="text-sm text-foreground/70 mt-1">day {days + 1} of your beautiful, dramatic, doable little adventure.</p>
        </div>
        <Link to="/planner" className="rounded-full bg-gradient-to-r from-pink-300 to-violet-300 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:scale-105 transition">
          open today's week →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Streak" value={`${s.streak} 🔥`} hint="keep showing up" gradient="bg-gradient-to-br from-pink-200/80 to-rose-200/80" />
        <StatCard label="Days coding" value={days + 1} hint="since day one ♡" gradient="bg-gradient-to-br from-violet-200/80 to-purple-200/80" />
        <StatCard label="XP" value={s.xp} hint={`lvl ${level} · ${Math.max(0, xpPct)}% to next`} gradient="bg-gradient-to-br from-sky-200/80 to-cyan-200/80" />
        <StatCard label="Weeks done" value={`${completedWeeks}/52`} hint={`${weeklyPct}% of the journey`} gradient="bg-gradient-to-br from-amber-200/80 to-pink-200/80" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass-strong rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-foreground/60">this week</div>
              <h2 className="font-display text-2xl mt-1">Week {next.week} · {next.title}</h2>
              <p className="text-sm text-foreground/70 mt-1">{next.phaseName} · {next.topic}</p>
            </div>
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-pink-200 to-violet-200 font-display text-2xl">
              {next.week}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {(["learn", "practice", "build"] as const).map((k) => (
              <div key={k} className="rounded-2xl bg-white/60 p-3">
                <div className="text-xs font-semibold uppercase text-foreground/60">{k}</div>
                <ul className="mt-1.5 space-y-1 text-sm">
                  {next[k].map((t) => <li key={t}>· {t}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs font-medium text-foreground/70">
              <span>journey progress</span>
              <span>{weeklyPct}%</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(2, weeklyPct)}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-pink-400 via-violet-400 to-sky-400"
              />
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-3xl p-6">
          <Mascot />
          <div className="mt-5 rounded-2xl bg-gradient-to-br from-pink-100/80 to-violet-100/80 p-4">
            <div className="text-xs uppercase tracking-wider text-foreground/60">habits today</div>
            <div className="mt-2 font-display text-3xl">{todaysHabits}/{HABITS.length}</div>
            <Link to="/habits" className="mt-2 inline-block text-xs font-semibold underline-offset-4 hover:underline">
              tap to tick today →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { to: "/roadmap", t: "Roadmap", e: "✦" },
          { to: "/mood", t: "Mood journal", e: "☁" },
          { to: "/projects", t: "Projects", e: "✧" },
          { to: "/letters", t: "Love letters", e: "✉" },
        ].map((q) => (
          <Link key={q.to} to={q.to} className="glass rounded-3xl p-5 hover:-translate-y-1 transition-transform">
            <div className="text-3xl">{q.e}</div>
            <div className="font-display text-lg mt-2">{q.t}</div>
            <div className="text-xs text-foreground/70 mt-1">open →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
