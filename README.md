BarakaTrack IA

Monorepo: React (Vite) + Node/Express, TypeScript.

Local dev
1. Copy `backend/.env.example` to `backend/.env` and fill `DATABASE_URL` + `JWT_SECRET`.
2. Install deps: `npm install`
3. Start API: `npm run dev:api`
4. Start UI: `npm run dev`

Database (PostgreSQL + Prisma)
- Create a Neon database.
- Set `DATABASE_URL` in `backend/.env`.
- Run: `npm --workspace backend run prisma:generate`
- Run: `npm --workspace backend run prisma:migrate`

Auth
- Email + password (JWT).
- Token stored in `localStorage` key `bt_token`.
