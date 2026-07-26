# MediaForge Pro

**Professional Universal Video & Audio Downloader**

Download HD videos and audio from TikTok, YouTube, Instagram, and Facebook. No watermarks, no signup, 100% free.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL via Supabase + Prisma ORM |
| Cache | Redis (falls back to in-memory) |
| Auth | JWT (admin dashboard only) |
| i18n | i18next — EN, ES, AR, FR, DE, ZH, JA, UR |
| PWA | vite-plugin-pwa + Workbox |

---

## Quick Start

### 1. Clone & install

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in your Supabase + JWT values

# Frontend
cd ../frontend
npm install --legacy-peer-deps
cp .env.example .env   # fill in VITE_SUPABASE_URL / ANON_KEY
```

### 2. Set up the database

Create a project on [Supabase](https://supabase.com), copy the **Connection String (URI)** from  
Settings → Database → Connection string, and paste it as `DATABASE_URL` in `backend/.env`.

Then run migrations:

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

### 3. Run in development

```bash
# Terminal 1 — backend (http://localhost:5000)
cd backend
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd frontend
npm run dev
```

The frontend proxy is pre-configured to forward `/api` requests to the backend.

---

## Environment Variables

### Backend (`backend/.env`)

| Key | Description |
|---|---|
| `PORT` | API port (default 5000) |
| `DATABASE_URL` | Supabase PostgreSQL connection string |
| `JWT_SECRET` | Secret for signing admin JWTs |
| `ADMIN_EMAIL` | Seeded admin email |
| `ADMIN_PASSWORD` | Seeded admin password |
| `REDIS_URL` | Optional Redis URL (leave blank for in-memory) |
| `FRONTEND_URL` | CORS origin (default http://localhost:5173) |
| `IP_HASH_SALT` | Salt for hashing IPs (change in production) |

### Frontend (`frontend/.env`)

| Key | Description |
|---|---|
| `VITE_API_URL` | Backend base URL |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |

---

## Admin Dashboard

Navigate to `/admin` and sign in with the credentials set in `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

Features:
- Download statistics by platform
- Full download history with search/filter
- Redis cache flush

---

## Project Structure

```
mediaforge-pro/
├── backend/
│   ├── prisma/schema.prisma       # DB models
│   └── src/
│       ├── extractors/            # One module per platform
│       ├── services/              # Business logic
│       ├── controllers/           # Request handlers
│       ├── routes/                # Route definitions
│       ├── middleware/            # Auth, rate limit, validate
│       ├── utils/                 # Cache, hash, logger
│       └── index.ts               # App entry point
└── frontend/
    └── src/
        ├── components/
        │   ├── download/          # URL input, result card
        │   ├── home/              # Hero, platforms, features, FAQ
        │   ├── layout/            # Navbar, footer
        │   └── ui/                # Button, Card, Badge, Skeleton
        ├── pages/                 # Route-level pages + admin
        ├── hooks/                 # useDownload, useTheme
        ├── lib/                   # api.ts, utils.ts
        └── i18n.ts                # i18next setup
```

---

## Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build
# Deploy dist/ to Vercel — set VITE_* env vars in project settings
```

Set Vercel's **Root Directory** to `frontend` and add `VITE_API_URL` with the
public URL of the deployed downloader API (for example, `https://api.example.com`).
Deploy the downloader backend on a container host such as Render, Railway, or a
VPS: HD media downloads need `yt-dlp`, FFmpeg, temporary disk space, and may
run longer than Vercel Functions allow. Set that backend's `FRONTEND_URL` to
your Vercel domain to allow browser requests.

### Backend → Docker on VPS

```bash
cd backend
docker build -t mediaforge-api .
docker run -d -p 5000:5000 --env-file .env mediaforge-api
```

Point Nginx to `localhost:5000` for `/api` and serve the Vite `dist/` for the SPA.

---

## License

MIT © Nexora Technologies
