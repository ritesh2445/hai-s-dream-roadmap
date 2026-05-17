import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ROADMAP } from "@/lib/roadmap";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/_app/roadmap")({
  component: Roadmap,
});

const PHASE_META = {
  1: { name: "Foundation", sub: "Months 1–3 · Python, data, maths", grad: "from-pink-200 to-rose-200" },
  2: { name: "Machine Learning Core", sub: "Months 4–7 · ML, DL, NLP, deploy", grad: "from-violet-200 to-purple-200" },
  3: { name: "Launch & Relocation", sub: "Months 8–12 · MLOps, jobs, visa ♡", grad: "from-sky-200 to-cyan-200" },
} as const;

function Roadmap() {
  const [s] = useAppState();
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-4xl">The roadmap ✦</h1>
        <p className="text-foreground/70 mt-1">three phases, fifty-two weeks, one new life.</p>
      </header>

      {[1, 2, 3].map((p) => {
        const meta = PHASE_META[p as 1 | 2 | 3];
        const weeks = ROADMAP.filter((w) => w.phase === p);
        const done = weeks.filter((w) => s.weeks[w.week]?.completed).length;
        return (
          <section key={p} className="space-y-4">
            <div className={`glass-strong rounded-3xl p-6 bg-gradient-to-r ${meta.grad}`}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider">Phase {p}</div>
                  <h2 className="font-display text-3xl">{meta.name}</h2>
                  <p className="text-sm opacity-80 mt-1">{meta.sub}</p>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl">{done}/{weeks.length}</div>
                  <div className="text-xs opacity-70">weeks done</div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {weeks.map((w, i) => {
                const ws = s.weeks[w.week];
                const completed = ws?.completed;
                return (
                  <motion.div
                    key={w.week}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 8) * 0.04 }}
                  >
                    <Link
                      to="/planner"
                      search={{ week: w.week }}
                      className={`block h-full rounded-2xl p-4 transition-all hover:-translate-y-1 ${
                        completed
                          ? "bg-gradient-to-br from-emerald-100/80 to-teal-100/80 ring-2 ring-emerald-200"
                          : "glass hover:shadow-soft"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/60">week {w.week}</span>
                        {completed && <span className="text-xs">✓ done ♡</span>}
                      </div>
                      <div className="font-display text-lg leading-tight mt-1">{w.title}</div>
                      <div className="text-xs text-foreground/70 mt-1">{w.topic}</div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
