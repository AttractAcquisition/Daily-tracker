import { START_DATE, TOTAL_DAYS } from "./program";

const KEY = "aa-tracker-v1";

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked — fail silently */
  }
}

// Date for a given 0-indexed program day
export function dateForDay(dayIndex) {
  const d = new Date(START_DATE);
  d.setDate(d.getDate() + dayIndex);
  return d;
}

// Which program day is "today"? Returns 0..TOTAL_DAYS-1, or null if outside range.
export function todayIndex() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = new Date(START_DATE);
  start.setHours(0, 0, 0, 0);
  const diff = Math.round((now - start) / 86400000);
  if (diff < 0) return 0;
  if (diff >= TOTAL_DAYS) return TOTAL_DAYS - 1;
  return diff;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export function formatDate(d) {
  return {
    weekday: DAY_NAMES[d.getDay()],
    day: d.getDate(),
    month: MONTHS[d.getMonth()],
    year: d.getFullYear(),
  };
}

// Count completed (all checkboxes) days. A day "counts" when every item is checked.
export function isDayComplete(dayData, totalItems) {
  if (!dayData || !dayData.checks) return false;
  const done = Object.values(dayData.checks).filter(Boolean).length;
  return done >= totalItems;
}

// Current consecutive streak ending at or before `uptoIndex`
export function currentStreak(state, totalItems, uptoIndex) {
  let streak = 0;
  for (let i = uptoIndex; i >= 0; i--) {
    if (isDayComplete(state[i], totalItems)) streak++;
    else break;
  }
  return streak;
}

// Longest streak across whole program
export function longestStreak(state, totalItems) {
  let best = 0, run = 0;
  for (let i = 0; i < TOTAL_DAYS; i++) {
    if (isDayComplete(state[i], totalItems)) {
      run++;
      best = Math.max(best, run);
    } else run = 0;
  }
  return best;
}

// Week (0-indexed) for a program day
export function weekOf(dayIndex) {
  return Math.floor(dayIndex / 7);
}

// x/7 for the week containing dayIndex
export function weekProgress(state, totalItems, dayIndex) {
  const w = weekOf(dayIndex);
  let count = 0;
  for (let i = w * 7; i < w * 7 + 7 && i < TOTAL_DAYS; i++) {
    if (isDayComplete(state[i], totalItems)) count++;
  }
  return count;
}
