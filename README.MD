## Prerequisites
- Node.js 18+ (macOS/Linux/Windows)
- npm 9+

## Quick Start
1) Install deps and seed the database:
```bash
npm run setup
```

2) Start the backend:
```bash
npm run dev:backend
# http://localhost:4000
```

3) Start the frontend:
```bash
npm run dev:frontend
# http://localhost:5173
```

Open the app in the browser. You should see:
- “Hack Jerry” and “Backend is working fine” fixed at the top‑left
- A list of tickets grouped by show and date

## What you’ll build
- Identify and fix any bugs or performance issues
- Add filters (by date/section), or sorting (by price)
- Add pagination or basic search

Keep it simple, readable, and focused.

## Project Structure
```
hack-jerry/
├─ backend/              # Express server + SQLite (db.sqlite)
│  ├─ server.js
│  ├─ db.js
│  └─ seed.js           # creates/seed tickets table
├─ frontend/             # Vite + React 18 + React Query
│  ├─ src/
│  │  ├─ main.jsx       # QueryClientProvider
│  │  ├─ App.jsx        # UI rendering + data fetching
│  │  └─ App.css        # styles
│  └─ index.html
└─ package.json          # workspace scripts
```

## Scripts
Root (run here):
- `npm run setup` — installs workspaces and seeds DB
- `npm run dev:backend` — starts Express with live‑reload (Node’s --watch)
- `npm run dev:frontend` — starts Vite dev server

Backend:
- `npm run dev` — dev server (http://localhost:4000)
- `npm run setup` — seeds SQLite (backend/db.sqlite)

Frontend:
- `npm run dev` — Vite dev (http://localhost:5173)

## API
- GET `/api/hello` → `{ "message": "Backend is working fine" }`
- GET `/api/tickets` → array of tickets

Ticket shape:
```json
{
  "id": 1,
  "price": 50,
  "section": "first",
  "count": 100,
  "date": "2025-12-01",
  "show_name": "Winter Gala"
}
```

## Database
- File: `backend/db.sqlite`
- Seeded on `npm run setup` via `backend/seed.js`
- Inspect with sqlite3:
```bash
sqlite3 backend/db.sqlite "SELECT * FROM tickets LIMIT 5;"
```

## Tech
- Frontend: React 18, React Query 5, Vite
- Backend: Express 5, SQLite (sqlite3)
- Live reload: Vite (frontend), `node --watch` (backend)
