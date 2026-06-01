import { START_DATE, TOTAL_DAYS } from "./program";
import { supabase, USER_ID } from "./supabaseClient";

// Bumped from v1 — scoring model changed (5-point), single-select sections added
const KEY = "aa-tracker-v2";

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

// Scores a day 0–5: body, learn, morning, mind, evening each worth 1 point
export function dayScore(dayData) {
  const checks = dayData?.checks || {};
  const bodySelected  = ['cardio', 'strength', 'stretch_yoga'].some(id => checks[id]);
  const learnSelected = ['reading', 'accred', 'photo'].some(id => checks[id]);
  const morningDone   = ['wake', 'meditate_am', 'journal_am'].every(id => checks[id]);
  const mindDone      = ['no_alcohol', 'no_porn', 'positivity', 'breath'].every(id => checks[id]);
  const eveningDone   = ['groom', 'journal_pm', 'meditate_pm', 'plan_tomorrow'].every(id => checks[id]);
  return [bodySelected, learnSelected, morningDone, mindDone, eveningDone].filter(Boolean).length;
}

// A day is complete when all 5 scoring conditions are met
export function isDayComplete(dayData) {
  return dayScore(dayData) >= 5;
}

// Current consecutive streak ending at or before `uptoIndex`
export function currentStreak(state, uptoIndex) {
  let streak = 0;
  for (let i = uptoIndex; i >= 0; i--) {
    if (isDayComplete(state[i])) streak++;
    else break;
  }
  return streak;
}

// Longest streak across whole program
export function longestStreak(state) {
  let best = 0, run = 0;
  for (let i = 0; i < TOTAL_DAYS; i++) {
    if (isDayComplete(state[i])) {
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
export function weekProgress(state, dayIndex) {
  const w = weekOf(dayIndex);
  let count = 0;
  for (let i = w * 7; i < w * 7 + 7 && i < TOTAL_DAYS; i++) {
    if (isDayComplete(state[i])) count++;
  }
  return count;
}

// ── Supabase persistence ──────────────────────────────────────

// Fetch all days for this user; returns state object keyed by day_index, or null on error.
// Falls back gracefully — caller keeps localStorage state if this returns null.
export async function loadRemoteState() {
  try {
    const { data, error } = await supabase
      .from('tracker_days')
      .select('day_index, data')
      .eq('user_id', USER_ID);
    if (error) throw error;
    const state = {};
    for (const row of data) state[row.day_index] = row.data;
    return state;
  } catch (err) {
    console.warn('Supabase load failed, using localStorage cache:', err.message);
    return null;
  }
}

// Upsert one day's data; fire-and-forget (logs on failure, localStorage always has the copy).
export async function upsertDay(dayIndex, dayData) {
  try {
    const { error } = await supabase
      .from('tracker_days')
      .upsert(
        { user_id: USER_ID, day_index: dayIndex, data: dayData },
        { onConflict: 'user_id,day_index' },
      );
    if (error) throw error;
  } catch (err) {
    console.warn(`Supabase upsert day ${dayIndex} failed (saved locally):`, err.message);
  }
}
