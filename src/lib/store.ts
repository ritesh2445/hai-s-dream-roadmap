import { useEffect, useState, useCallback } from "react";

export type WeekState = {
  done: Record<string, boolean>; // task ids
  reflection: string;
  mood: string;
  completed: boolean;
};

export type AppState = {
  startDate: string; // ISO
  xp: number;
  streak: number;
  lastCheckIn: string | null;
  weeks: Record<number, WeekState>;
  habits: Record<string, string[]>; // habitId -> ISO date strings completed
  moodEntries: { id: string; date: string; mood: string; note: string }[];
  milestones: Record<string, boolean>;
  unlockedLetters: number[];
  projects: Record<string, { progress: number; notes: string; deployed: boolean }>;
  settings: { theme: "dream" | "sunset" | "night"; mascot: "bunny" | "ghost" | "star"; sparkles: boolean };
};

const KEY = "hai-adventure-v1";

const defaultState: AppState = {
  startDate: new Date().toISOString(),
  xp: 0,
  streak: 0,
  lastCheckIn: null,
  weeks: {},
  habits: {},
  moodEntries: [],
  milestones: {},
  unlockedLetters: [0],
  projects: {},
  settings: { theme: "dream", mascot: "bunny", sparkles: true },
};

function load(): AppState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

let listeners: Array<(s: AppState) => void> = [];
let current: AppState | null = null;

function getState(): AppState {
  if (current === null) current = load();
  return current;
}

function setState(updater: (s: AppState) => AppState) {
  const next = updater(getState());
  current = next;
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l(next));
}

export function useAppState() {
  const [s, setS] = useState<AppState>(() => getState());
  useEffect(() => {
    const l = (n: AppState) => setS(n);
    listeners.push(l);
    setS(getState());
    return () => {
      listeners = listeners.filter((x) => x !== l);
    };
  }, []);
  const update = useCallback((u: (s: AppState) => AppState) => setState(u), []);
  return [s, update] as const;
}

export function addXP(amount: number) {
  setState((s) => ({ ...s, xp: s.xp + amount }));
}

export function levelFromXP(xp: number) {
  return Math.floor(Math.sqrt(xp / 25)) + 1;
}

export function daysSince(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}

export function checkInToday() {
  setState((s) => {
    const today = new Date().toDateString();
    if (s.lastCheckIn === today) return s;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const streak = s.lastCheckIn === yesterday ? s.streak + 1 : 1;
    return { ...s, lastCheckIn: today, streak, xp: s.xp + 5 };
  });
}
