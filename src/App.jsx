import { useState, useEffect, useMemo, useRef } from "react";
import {
  QUOTES, SECTIONS, METRICS, TOTAL_DAYS, TOTAL_CHECK_ITEMS, PRINCIPLES,
} from "./program";
import {
  loadState, saveState, dateForDay, todayIndex, formatDate,
  isDayComplete, currentStreak, longestStreak, weekProgress, weekOf,
} from "./storage";
import "./App.css";

export default function App() {
  const [state, setState] = useState(loadState);
  const [dayIndex, setDayIndex] = useState(todayIndex);
  const [celebrate, setCelebrate] = useState(false);
  const prevComplete = useRef(isDayComplete(state[todayIndex()], TOTAL_CHECK_ITEMS));

  useEffect(() => saveState(state), [state]);

  const day = state[dayIndex] || { checks: {}, metrics: {} };
  const date = formatDate(dateForDay(dayIndex));
  const quote = QUOTES[dayIndex] || QUOTES[0];

  const doneCount = useMemo(
    () => Object.values(day.checks || {}).filter(Boolean).length,
    [day]
  );
  const complete = doneCount >= TOTAL_CHECK_ITEMS;

  useEffect(() => {
    if (complete && !prevComplete.current) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 2600);
      prevComplete.current = true;
      return () => clearTimeout(t);
    }
    prevComplete.current = complete;
  }, [complete]);

  const streak = currentStreak(state, TOTAL_CHECK_ITEMS, dayIndex);
  const best = longestStreak(state, TOTAL_CHECK_ITEMS);
  const weekDone = weekProgress(state, TOTAL_CHECK_ITEMS, dayIndex);
  const week = weekOf(dayIndex) + 1;

  function toggle(itemId) {
    setState((s) => {
      const d = s[dayIndex] || { checks: {}, metrics: {} };
      const checks = { ...d.checks, [itemId]: !d.checks?.[itemId] };
      return { ...s, [dayIndex]: { ...d, checks } };
    });
  }

  function setMetric(metricId, value) {
    setState((s) => {
      const d = s[dayIndex] || { checks: {}, metrics: {} };
      const metrics = { ...d.metrics, [metricId]: value };
      return { ...s, [dayIndex]: { ...d, metrics } };
    });
  }

  function go(delta) {
    const next = Math.min(TOTAL_DAYS - 1, Math.max(0, dayIndex + delta));
    setDayIndex(next);
    prevComplete.current = isDayComplete(state[next], TOTAL_CHECK_ITEMS);
  }

  const pct = Math.round((doneCount / TOTAL_CHECK_ITEMS) * 100);

  return (
    <div className="page">
      {celebrate && <Celebration streak={streak} />}

      <header className="masthead">
        <div className="mast-left">
          <div className="kicker">Attract Acquisition &middot; Road to Launch</div>
          <h1 className="title">The Daily Protocol</h1>
        </div>
        <div className="mast-right">
          <div className="stat">
            <span className="stat-num">{streak}</span>
            <span className="stat-lbl">day streak{streak === best && best > 0 ? " \u00b7 best" : ""}</span>
          </div>
          <div className="stat">
            <span className="stat-num">{weekDone}<span className="stat-den">/7</span></span>
            <span className="stat-lbl">week {week}</span>
          </div>
        </div>
      </header>

      <section className="quote">
        <span className="quote-tag">{quote.tag}</span>
        <blockquote>&ldquo;{quote.q}&rdquo;</blockquote>
        <cite>&mdash; {quote.a}</cite>
      </section>

      <nav className="daybar">
        <button className="nav-btn" onClick={() => go(-1)} disabled={dayIndex === 0} aria-label="Previous day">&lsaquo;</button>
        <div className="day-meta">
          <div className="day-num">Day {dayIndex + 1} <span className="day-of">of {TOTAL_DAYS}</span></div>
          <div className="day-date">{date.weekday}, {date.day} {date.month} {date.year}</div>
        </div>
        <button className="nav-btn" onClick={() => go(1)} disabled={dayIndex === TOTAL_DAYS - 1} aria-label="Next day">&rsaquo;</button>
      </nav>

      <div className="progress-wrap">
        <div className="progress-track">
          <div className={"progress-fill" + (complete ? " full" : "")} style={{ width: pct + "%" }} />
        </div>
        <div className="progress-lbl">{doneCount} / {TOTAL_CHECK_ITEMS} {complete ? "\u00b7 day closed \u2713" : ""}</div>
      </div>

      <main className="grid">
        {SECTIONS.map((section) => (
          <section className={"card" + (section.accent ? " accent" : "")} key={section.title}>
            <h2 className="card-title">{section.title}</h2>
            <ul>
              {section.items.map((item) => {
                const on = !!day.checks?.[item.id];
                return (
                  <li key={item.id} className={on ? "checked" : ""} onClick={() => toggle(item.id)}>
                    <span className={"box" + (on ? " on" : "")}>{on ? "\u2713" : ""}</span>
                    <span className="lbl">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="card metrics-card">
          <h2 className="card-title">Daily Metrics</h2>
          <div className="metrics">
            {METRICS.map((m) => (
              <label className="metric" key={m.id}>
                <span className="metric-lbl">{m.label}</span>
                <input
                  className="metric-in"
                  inputMode="numeric"
                  placeholder={m.target}
                  value={day.metrics?.[m.id] || ""}
                  onChange={(e) => setMetric(m.id, e.target.value)}
                />
                <span className="metric-target">/ {m.target}</span>
              </label>
            ))}
          </div>
          <p className="journal-note">
            &#9998; Journal &amp; reflections go in your physical notebook &mdash; pen on paper.
          </p>
        </section>
      </main>

      <footer className="footer">
        <span className="kaizen">{PRINCIPLES.kaizen}</span>
        <span className="best">Longest streak: {best} days</span>
      </footer>
    </div>
  );
}

function Celebration({ streak }) {
  return (
    <div className="celebrate">
      <div className="celebrate-card">
        <div className="celebrate-mark">&#10003;</div>
        <div className="celebrate-title">Day Closed</div>
        <div className="celebrate-sub">
          {streak > 1 ? `${streak} days in a row. The compound is working.` : "One small step. Kaizen."}
        </div>
      </div>
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className="confetti" style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 0.4}s`,
          background: i % 3 === 0 ? "#00E5C3" : i % 3 === 1 ? "#07100E" : "#c9a227",
        }} />
      ))}
    </div>
  );
}
