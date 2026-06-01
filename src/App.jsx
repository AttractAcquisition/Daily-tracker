import { useState, useEffect, useMemo, useRef } from "react";
import {
  QUOTES, SECTIONS, TOTAL_DAYS, TOTAL_SCORE, PRINCIPLES,
} from "./program";
import {
  loadState, saveState, dateForDay, todayIndex, formatDate,
  isDayComplete, dayScore, currentStreak, longestStreak, weekProgress, weekOf,
} from "./storage";
import "./App.css";

export default function App() {
  const [state, setState] = useState(loadState);
  const [dayIndex, setDayIndex] = useState(todayIndex);
  const [celebrate, setCelebrate] = useState(false);
  const prevComplete = useRef(isDayComplete(state[todayIndex()]));

  useEffect(() => saveState(state), [state]);

  const day = state[dayIndex] || { checks: {} };
  const date = formatDate(dateForDay(dayIndex));
  const quote = QUOTES[dayIndex] || QUOTES[0];

  const score = useMemo(() => dayScore(day), [day]);
  const complete = score >= TOTAL_SCORE;

  useEffect(() => {
    if (complete && !prevComplete.current) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 2600);
      prevComplete.current = true;
      return () => clearTimeout(t);
    }
    prevComplete.current = complete;
  }, [complete]);

  const streak = currentStreak(state, dayIndex);
  const best = longestStreak(state);
  const weekDone = weekProgress(state, dayIndex);
  const week = weekOf(dayIndex) + 1;

  function toggle(itemId) {
    setState((s) => {
      const d = s[dayIndex] || { checks: {} };
      const checks = { ...d.checks, [itemId]: !d.checks?.[itemId] };
      return { ...s, [dayIndex]: { ...d, checks } };
    });
  }

  function selectOption(options, chosenId) {
    setState((s) => {
      const d = s[dayIndex] || { checks: {} };
      const checks = { ...d.checks };
      const alreadySelected = checks[chosenId];
      options.forEach((opt) => { checks[opt.id] = false; });
      if (!alreadySelected) checks[chosenId] = true;
      return { ...s, [dayIndex]: { ...d, checks } };
    });
  }

  function setJournal(value) {
    setState((s) => {
      const d = s[dayIndex] || { checks: {} };
      return { ...s, [dayIndex]: { ...d, journal: value } };
    });
  }

  function go(delta) {
    const next = Math.min(TOTAL_DAYS - 1, Math.max(0, dayIndex + delta));
    setDayIndex(next);
    prevComplete.current = isDayComplete(state[next]);
  }

  const pct = Math.round((score / TOTAL_SCORE) * 100);

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
        <div className="progress-lbl">{score} / {TOTAL_SCORE} {complete ? "\u00b7 day closed \u2713" : ""}</div>
      </div>

      <main className="grid">
        {SECTIONS.map((section) => (
          <section className={"card" + (section.accent ? " accent" : "")} key={section.title}>
            <h2 className="card-title">{section.title}</h2>
            {section.type === "singleSelect" ? (
              <div className="single-select">
                {section.options.map((opt) => {
                  const selected = !!day.checks?.[opt.id];
                  return (
                    <button
                      key={opt.id}
                      className={"select-pill" + (selected ? " selected" : "")}
                      onClick={() => selectOption(section.options, opt.id)}
                    >
                      {selected && <span className="pill-check">{"\u2713"}</span>}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <>
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
                {section.journalField && (
                  <textarea
                    className="morning-journal"
                    placeholder={"Morning journal \u2014 thoughts, intentions, reframes\u2026"}
                    value={day.journal || ""}
                    onChange={(e) => setJournal(e.target.value)}
                  />
                )}
              </>
            )}
          </section>
        ))}
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
