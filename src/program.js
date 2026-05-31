// ─────────────────────────────────────────────────────────────
// THE PROGRAM — 8-week protocol, starts 01 June 2026
// ─────────────────────────────────────────────────────────────

export const START_DATE = new Date(2026, 5, 1); // June 1 2026 (month is 0-indexed)
export const TOTAL_DAYS = 56;

// Guiding principles surfaced through the program
export const PRINCIPLES = {
  kaizen: "Kaizen — 改善 — one small improvement, every single day.",
};

// 56 quotes — a mix of motivational, stoic, and educational/growth principles.
// One per day, paired with a short principle tag.
export const QUOTES = [
  { q: "The journey of a thousand miles begins with a single step.", a: "Lao Tzu", tag: "Day One" },
  { q: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", a: "Aristotle", tag: "Habit" },
  { q: "It is not that we have a short time to live, but that we waste a lot of it.", a: "Seneca", tag: "Time" },
  { q: "Continuous improvement is better than delayed perfection.", a: "Mark Twain", tag: "Kaizen" },
  { q: "Discipline is choosing between what you want now and what you want most.", a: "Abraham Lincoln", tag: "Discipline" },
  { q: "The man who moves a mountain begins by carrying away small stones.", a: "Confucius", tag: "Kaizen" },
  { q: "You do not rise to the level of your goals. You fall to the level of your systems.", a: "James Clear", tag: "Systems" },
  { q: "He who has a why to live can bear almost any how.", a: "Friedrich Nietzsche", tag: "Purpose" },
  { q: "The body achieves what the mind believes.", a: "Napoleon Hill", tag: "Mindset" },
  { q: "Fall seven times, stand up eight.", a: "Japanese Proverb", tag: "Resilience" },
  { q: "What stands in the way becomes the way.", a: "Marcus Aurelius", tag: "Obstacle" },
  { q: "Small disciplines repeated with consistency lead to great achievements.", a: "John Maxwell", tag: "Consistency" },
  { q: "The successful warrior is the average man, with laser-like focus.", a: "Bruce Lee", tag: "Focus" },
  { q: "Do not wait; the time will never be just right.", a: "Napoleon Hill", tag: "Action" },
  { q: "Knowing is not enough; we must apply. Willing is not enough; we must do.", a: "Goethe", tag: "Execution" },
  { q: "Energy and persistence conquer all things.", a: "Benjamin Franklin", tag: "Persistence" },
  { q: "The best way to predict the future is to create it.", a: "Peter Drucker", tag: "Ownership" },
  { q: "A river cuts through rock not because of its power, but its persistence.", a: "Jim Watkins", tag: "Persistence" },
  { q: "Mastery is not a function of genius or talent. It is a function of time and intense focus.", a: "Robert Greene", tag: "Mastery" },
  { q: "Hardships often prepare ordinary people for an extraordinary destiny.", a: "C.S. Lewis", tag: "Growth" },
  { q: "You will never always be motivated. You must learn to be disciplined.", a: "Unknown", tag: "Discipline" },
  { q: "The mind is everything. What you think you become.", a: "Buddha", tag: "Mindset" },
  { q: "Don't count the days, make the days count.", a: "Muhammad Ali", tag: "Intention" },
  { q: "Compound interest is the eighth wonder of the world.", a: "Albert Einstein", tag: "Compounding" },
  { q: "If you are working on something exciting, it will keep you motivated.", a: "Steve Jobs", tag: "Purpose" },
  { q: "Strength does not come from winning. Your struggles develop your strengths.", a: "Arnold Schwarzenegger", tag: "Strength" },
  { q: "The secret of getting ahead is getting started.", a: "Mark Twain", tag: "Action" },
  { q: "Quality is not an act, it is a habit.", a: "Aristotle", tag: "Quality" },
  { q: "Halfway. The man who removes a mountain begins with one small stone — and has not stopped.", a: "Adapted, Confucius", tag: "Halfway" },
  { q: "Waste no more time arguing what a good man should be. Be one.", a: "Marcus Aurelius", tag: "Action" },
  { q: "Motivation gets you going, but discipline keeps you growing.", a: "John Maxwell", tag: "Discipline" },
  { q: "The expert in anything was once a beginner.", a: "Helen Hayes", tag: "Growth" },
  { q: "We suffer more often in imagination than in reality.", a: "Seneca", tag: "Stoicism" },
  { q: "Success is the sum of small efforts repeated day in and day out.", a: "Robert Collier", tag: "Consistency" },
  { q: "Be not afraid of going slowly, be afraid only of standing still.", a: "Chinese Proverb", tag: "Kaizen" },
  { q: "The cave you fear to enter holds the treasure you seek.", a: "Joseph Campbell", tag: "Courage" },
  { q: "Discipline equals freedom.", a: "Jocko Willink", tag: "Discipline" },
  { q: "What you do every day matters more than what you do once in a while.", a: "Gretchen Rubin", tag: "Consistency" },
  { q: "An investment in knowledge pays the best interest.", a: "Benjamin Franklin", tag: "Learning" },
  { q: "The first step toward change is awareness. The second is acceptance.", a: "Nathaniel Branden", tag: "Awareness" },
  { q: "Courage is not the absence of fear, but the triumph over it.", a: "Nelson Mandela", tag: "Courage" },
  { q: "Patience and perseverance have a magical effect.", a: "John Quincy Adams", tag: "Patience" },
  { q: "You miss 100% of the shots you don't take.", a: "Wayne Gretzky", tag: "Action" },
  { q: "Take care of your body. It's the only place you have to live.", a: "Jim Rohn", tag: "Health" },
  { q: "Either you run the day or the day runs you.", a: "Jim Rohn", tag: "Ownership" },
  { q: "Out of difficulties grow miracles.", a: "Jean de La Bruyère", tag: "Resilience" },
  { q: "The only way to do great work is to love what you do.", a: "Steve Jobs", tag: "Purpose" },
  { q: "Perseverance is not a long race; it is many short races one after another.", a: "Walter Elliot", tag: "Persistence" },
  { q: "Done is better than perfect.", a: "Sheryl Sandberg", tag: "Execution" },
  { q: "The future depends on what you do today.", a: "Mahatma Gandhi", tag: "Action" },
  { q: "Stars can't shine without darkness.", a: "Unknown", tag: "Resilience" },
  { q: "Work hard in silence, let your success be the noise.", a: "Frank Ocean", tag: "Focus" },
  { q: "Great things are done by a series of small things brought together.", a: "Vincent van Gogh", tag: "Kaizen" },
  { q: "If you want to go fast, go alone. If you want to go far, go together.", a: "African Proverb", tag: "Vision" },
  { q: "The harder the conflict, the greater the triumph.", a: "George Washington", tag: "Triumph" },
  { q: "What we plant in the soil of contemplation, we shall reap in the harvest of action.", a: "Meister Eckhart", tag: "Final Day" },
];

// The daily checklist, grouped by section.
// `id` keys are stable — used for storage. Don't rename them.
export const SECTIONS = [
  {
    title: "Morning",
    accent: true,
    items: [
      { id: "wake", label: "Wake same time — no snooze" },
      { id: "meditate_am", label: "5 min meditation / mindfulness" },
      { id: "journal_am", label: "Journal (physical): gratitude · intention · reframe" },
      { id: "mobility", label: "10 min mobility / flexibility flow" },
      { id: "groom", label: "Grooming — shaved, hair tidy" },
      { id: "sun", label: "Sunscreen — build the tan, don't burn" },
    ],
  },
  {
    title: "Mind & Discipline",
    items: [
      { id: "no_alcohol", label: "Zero alcohol — non-negotiable" },
      { id: "no_porn", label: "No porn — urge → 2-min reset" },
      { id: "positivity", label: "3 positive / growth-mindset notes" },
      { id: "breath", label: "Midday breath reset (2 min)" },
    ],
  },
  {
    title: "Body — Training",
    items: [
      { id: "cardio", label: "Cardio — run / row / swim / HIIT" },
      { id: "strength", label: "Strength — push / pull / legs" },
      { id: "endurance", label: "Endurance finisher" },
      { id: "stretch_pm", label: "Evening stretch (10 min)" },
    ],
  },
  {
    title: "AA Launch",
    accent: true,
    items: [
      { id: "aa_work", label: "30–60 min — one concrete launch task" },
      { id: "save_launch", label: "Log AA Launch fund contribution" },
      { id: "save_runway", label: "Log 6-month runway contribution" },
    ],
  },
  {
    title: "Learn & Accredit",
    items: [
      { id: "reading", label: "20–30 min reading / education" },
      { id: "accred", label: "15–30 min accreditation study (rotate)" },
      { id: "photo", label: "Photo / video — 1+ shot (camera / drone)" },
    ],
  },
  {
    title: "Evening Close-out",
    items: [
      { id: "log_metrics", label: "Final calorie + step tally logged" },
      { id: "journal_pm", label: "Journal (physical): 1 win, 1 lesson" },
      { id: "meditate_pm", label: "5 min wind-down" },
      { id: "plan_tomorrow", label: "Set tomorrow's #1 task" },
    ],
  },
];

// Numeric metrics tracked per day (stored as free text values)
export const METRICS = [
  { id: "calories", label: "Calories", target: "3300" },
  { id: "steps", label: "Steps", target: "10,000" },
  { id: "water", label: "Water (L)", target: "—" },
  { id: "sleep", label: "Sleep (h)", target: "—" },
];

export const TOTAL_CHECK_ITEMS = SECTIONS.reduce((n, s) => n + s.items.length, 0);
