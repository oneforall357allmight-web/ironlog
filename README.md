# IRONLOG 🏋️

**Premium Gym Tracker + Social Hub**

Track workouts, analyze performance, share progress with friends.

![IRONLOG](https://img.shields.io/badge/IRONLOG-Track.Analyze.Dominate-c2956a?style=for-the-badge&labelColor=0c0b0a)

## Features

- **250+ Exercise Database** — Chest, back, shoulders, arms, legs, core, cardio (boxing, swimming, soccer, etc.)
- **Custom Routines** — Build daily routines, assign to any day of the week
- **Live Workout Tracking** — Log sets, reps, weight with previous session comparison for progressive overload
- **Smart Rest Timer** — Configurable rest periods with Critical Mode that alerts you when resting too long
- **Post-Workout Analysis** — Graded session review with muscle heatmap, volume stats, and actionable tips
- **Dashboard** — Weekly/monthly/all-time stats, volume trends, progressive overload tracking
- **Social Hub** — Post workouts with photos, follow friends, like & comment
- **Bilingual** — Full English & French support
- **Multi-User** — Email-based accounts with forgot password
- **Mobile-First** — Designed for phone use at the gym

## Quick Start

### Option 1: Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/ironlog.git
cd ironlog
npm install
npm run dev
```

Open `http://localhost:5173` on your phone (same WiFi) or computer.

### Option 2: Deploy Free on Vercel (Recommended — shareable link)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
3. Click **"Add New Project"** → Import your `ironlog` repo
4. Click **Deploy** (zero config needed)
5. Get your live URL like `ironlog-yourusername.vercel.app`
6. Share that link with friends!

### Option 3: Deploy Free on Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → Sign in with GitHub
3. Click **"Add new site"** → Import from Git → Select repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click Deploy

### Option 4: Deploy on GitHub Pages

```bash
npm run build
```

Then push the `dist/` folder to a `gh-pages` branch, or use the [gh-pages](https://www.npmjs.com/package/gh-pages) npm package.

## Install as Phone App (PWA)

Once deployed, open the URL on your phone:

- **iPhone**: Tap Share → "Add to Home Screen"
- **Android**: Tap the browser menu → "Add to Home Screen" or "Install App"

It will look and feel like a native app — full screen, no browser bar.

## Tech Stack

- React 18 + Vite
- Zero backend — all data stored in browser localStorage
- PWA-ready with manifest

## How Data Works

- Each user's data (routines, workout history, settings) is stored in the browser's localStorage
- Social hub posts are stored in shared localStorage (visible to all users on the same device/browser)
- **For true multi-device social features**, you'd need to add a backend (Firebase, Supabase, etc.) — happy to help with that if you want to take it further

## Adding Your Own Exercises

Go to Settings → Custom Exercises → Add Custom Exercise. You can add anything: boxing, kickboxing, rope jumping, swimming, soccer, or whatever fits your routine.

## License

MIT — do whatever you want with it.
