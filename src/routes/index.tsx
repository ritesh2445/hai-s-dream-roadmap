import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mascot } from "@/components/Mascot";
import { FloatingDoodles, Sparkles } from "@/components/Sparkles";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hai's Big Adventure ♡ — A cozy roadmap to a brand new life" },
      { name: "description", content: "A physics grad's gamified weekly study tracker and roadmap into machine learning, tech jobs, and moving abroad." },
      { property: "og:title", content: "Hai's Big Adventure ♡" },
      { property: "og:description", content: "A romanticised healing journey through coding, growth, and building a new life." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [s] = useAppState();
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingDoodles />
      {s.settings.sparkles && <Sparkles />}

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="font-display text-xl text-gradient">Hai's Big Adventure ♡</div>
        <Link
          to="/dashboard"
          className="rounded-full glass px-4 py-2 text-sm font-medium hover:scale-105 transition-transform"
        >
          Enter ♡
        </Link>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-12 md:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium"
          >
            <span className="animate-twinkle">✦</span> made with love · just for you
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl"
          >
            Hai's Big <span className="text-gradient">Adventure</span> <span className="inline-block animate-wiggle">♡</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-5 max-w-xl text-lg text-foreground/80"
          >
            A physics grad's roadmap to machine learning, tech jobs, and a brand new life.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-3 max-w-xl italic text-foreground/70"
          >
            "You don't have to become perfect overnight, baby. Just show up a little every day."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/dashboard"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-300 via-rose-300 to-violet-300 px-7 py-3.5 text-base font-semibold text-white shadow-soft transition-transform hover:scale-[1.04]"
            >
              <span className="relative z-10">Start My Journey ✨</span>
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <Link
              to="/roadmap"
              className="rounded-full glass px-5 py-3 text-sm font-medium hover:scale-105 transition-transform"
            >
              peek the roadmap →
            </Link>
          </motion.div>

          {/* progress strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 glass rounded-3xl p-4"
          >
            <div className="flex items-center justify-between text-xs font-medium text-foreground/70">
              <span>52-week journey</span>
              <span>1% in · 99% to dream ♡</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "4%" }}
                transition={{ duration: 1.4, delay: 1.1 }}
                className="h-full bg-gradient-to-r from-pink-400 via-violet-400 to-sky-400"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center"
        >
          <div className="absolute inset-0 rounded-[40%] bg-gradient-to-br from-pink-200/70 via-violet-200/60 to-sky-200/70 blur-3xl" />
          <div className="relative">
            <Mascot size={220} />
          </div>
          {/* floating cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -left-2 top-6 glass-strong rounded-2xl px-3 py-2 text-xs font-medium"
          >
            ✿ Week 1 unlocked
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -right-2 bottom-10 glass-strong rounded-2xl px-3 py-2 text-xs font-medium"
          >
            🔥 streak +1
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute right-6 top-0 glass-strong rounded-2xl px-3 py-2 text-xs font-medium"
          >
            ✈ Amsterdam ♡
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "Cozy roadmap", d: "52 hand-written weeks. Tiny, kind, doable." },
            { t: "Boyfriend-coded", d: "Soft motivation, real progress, real love." },
            { t: "A new life", d: "Canada, NL, DE, SE, PT — your future is patient." },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-5 hover:-translate-y-1 transition-transform"
            >
              <div className="font-display text-lg">{c.t}</div>
              <p className="mt-1 text-sm text-foreground/70">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
