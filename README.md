# 🎨 Funky UI Playground

A **React + Vite** frontend-only project focused entirely on creative UI, animations, and playful interactions. No backend, no database, no API — just pure browser fun!

## ✨ Features

- **20 Unique Pages** — Each with its own theme, layout, and animations
- **Animated Login** — Door-opening success animation + cartoon squash failure effect
- **5 Visual Themes** — Neon, Cyberpunk, Retro, Pastel, Comic — switchable on the fly
- **Chaos Mode** — Toggle that amplifies all animations for extra wobble
- **Framer Motion** — Rich page transitions, hover effects, staggered entrances
- **Confetti Bursts** — Celebrations on achievements and special moments
- **Cursor Follower** — A playful dot that follows your mouse
- **Easter Eggs** — Hidden interactions throughout the app
- **Responsive** — Works on desktop and mobile

## 🖥️ Pages

| # | Page | Description |
|---|------|-------------|
| 1 | **Login** | Fake auth (password must match user ID) with door animation |
| 2 | **Dashboard** | Animated stats, quick nav tiles, activity feed |
| 3 | **Neon Profile** | Avatar with rotating rings, stat bars, editable bio |
| 4 | **Game Settings** | Toggle levers, animated sliders, vibe mode selector |
| 5 | **Achievements** | Unlock badges, progress bars, claim animations |
| 6 | **Error Playground** | Custom error cards with silly break animations |
| 7 | **Chat Mockup** | Fake messaging with typing indicator & emoji reactions |
| 8 | **Music Vibes** | Rotating album art, equalizer, playlist cards |
| 9 | **Leaderboard** | Animated podium, score counters, ranking list |
| 10 | **Meme Gallery** | Card grid with like/share/save interactions |
| 11 | **Fantasy Shop** | Funny products, add-to-cart animation, checkout panel |
| 12 | **Notifications** | Animated alerts, toast playground, badge counters |
| 13 | **Theme Lab** | Switch between 5 visual themes with smooth transitions |
| 14 | **Loading Museum** | Gallery of 10 custom loaders with fullscreen preview |
| 15 | **Secret Room** | Puzzle interactions, easter egg reveals, glow effects |
| 16 | **Task Board** | Kanban-style board with click-to-move cards |
| 17 | **Weather UI** | Animated sun/rain/storm/snow scenes (mock data) |
| 18 | **Social Feed** | Story rings, reaction bar, floating action button |
| 19 | **Fun Form Lab** | Bouncing checkboxes, magnetic buttons, animated inputs |
| 20 | **Grand Finale** | Full confetti, fireworks, stats, magic door logout |

## 🛠️ Tech Stack

- **React 19** + **Vite 6**
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion** — Animation library
- **React Router** — Client-side routing
- **react-confetti** — Celebration effects
- **react-icons** — Icon library

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/sharmarahulrs726/Rahul_UI_fun.git
cd Rahul_UI_fun

# Install dependencies
npm install

# Start dev server
npm run dev
```

**Login:** Enter any User ID. Password must **exactly match** the User ID.

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sharmarahulrs726/Rahul_UI_fun)

Or connect your GitHub repo to Vercel manually:
1. Go to [vercel.com](https://vercel.com)
2. Import your `Rahul_UI_fun` repository
3. Vercel auto-detects Vite — just deploy
4. Done!

### GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that auto-deploys to GitHub Pages on every push to `main`.

**Important:** You must enable Pages in your repo settings **before** running the workflow, or you'll get a `"Not Found"` error.

**Setup steps:**
1. Push the repo to `https://github.com/sharmarahulrs726/Rahul_UI_fun`
2. Go to repo **Settings → Pages** (in GitHub UI)
3. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
4. Go to the **Actions** tab — the workflow will run automatically
5. After it completes, your site is live at `https://sharmarahulrs726.github.io/Rahul_UI_fun/`

> ⚠️ If you see `"HttpError: Not Found"`, it means Pages is not enabled yet. Complete step 2-3 above, then re-run the workflow from the Actions tab.

Or deploy manually (requires enabling Pages first):
```bash
npm run deploy:gh-pages
```

## 📁 Project Structure

```
src/
├── animations/      # Framer Motion variants and transitions
├── components/
│   ├── auth/        # Login door, squash effect
│   ├── effects/     # Confetti, cursor, floating shapes, toasts
│   ├── layout/      # Navbar, sidebar, page transitions
│   └── ui/          # Button, Card, Badge, Modal, Toggle, ProgressBar
├── context/         # Auth, Theme providers
├── data/            # Mock data for all pages
├── hooks/           # useAuth, useTheme, useConfetti
├── layouts/         # Main layout with routing
├── pages/           # 20 page components
└── styles/          # Theme definitions
```

## 🎨 Theming

Switch between 5 themes in the **Theme Lab** (page 13) or via the dropdown in the sidebar:

| Theme | Colors |
|-------|--------|
| 🌃 Neon Nights | Pink, purple, cyan on dark |
| 🤖 Dark Cyberpunk | Gold, magenta, green on black |
| 🕹️ Retro Arcade | Orange, red, gold on dark |
| 🍬 Pastel Candy | Soft pink, lavender, mint |
| 💥 Comic Mode | Red, yellow, blue on dark |

## 🎮 Chaos Mode

Toggle **Chaos Mode** in the navbar to amplify all animations — wobbles intensify, elements move faster, everything gets a little unhinged. Perfect for when you need extra fun.

## 🤫 Easter Eggs

- Click the 🦄 unicorn on the login page
- Find all hidden items in the Secret Room
- Try the "PANIC BUTTON" on the Error Playground page

---

Built with 💖 for the love of creative frontend.
