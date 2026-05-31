# The Daily Protocol — AA Tracker

A clean, paperback-style 56-day (8-week) daily tracker. Built with React + Vite,
designed for iPad 11", deploys to GitHub Pages via GitHub Actions.

Program runs **01 June 2026 → 26 July 2026**. Each day has a motivational/educational
quote, a six-section checklist, numeric metrics, a streak counter, and a weekly x/7.
Journaling is intentionally kept on paper — the app only prompts for it.

## Deploy to GitHub Pages

1. Create a new GitHub repo and push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Daily Protocol tracker"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every
   push to `main`. Your site goes live at `https://<you>.github.io/<repo>/`.

## Run locally
```bash
npm install
npm run dev      # local dev server
npm run build    # production build into /dist
```

## Notes
- Progress is saved in the browser via `localStorage` (key `aa-tracker-v1`). Use the
  same browser/device to keep your streak. Clearing browser data resets it.
- A day "completes" (counts toward the streak) when all checklist boxes are ticked.
- `base: './'` in `vite.config.js` keeps asset paths relative so it works under any repo name.

*Kaizen — 改善 — one small improvement, every single day.*
