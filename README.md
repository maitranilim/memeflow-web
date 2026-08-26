# MemeFlow

A meme browsing interface built with Next.js. Users can flip through memes one at a time,
filter by genre, and react with like/dislike/save/share controls.

## Current status

This project is in early development. The front-end shell — layout, styling, and
interactive components — is in place and running against sample data. The backend
(database, authentication, real uploads) has not been built yet.

### Implemented
- Home page with a single-meme viewer (previous/next navigation, keyboard arrow support)
- Genre filter pills that actually filter the visible memes (dark-humor, sarcastic, pun,
  metaphorical, tech)
- Like / dislike / save / share controls on each meme card, with animated transitions
- Header, footer, and a floating upload button (the upload button currently opens a
  placeholder modal — it does not upload anything yet); search and the admin/profile
  footer links are shown disabled with a "coming soon" label until those pages exist
- Tailwind CSS design system with a dark theme and neon accent colors
- Framer Motion transitions between memes
- Meme data is read from Supabase when it's configured (see [Database setup](#database-setup)),
  and falls back to built-in sample data otherwise
- A test suite (Vitest + React Testing Library) covering navigation, filtering, and the
  sample-data fallback
- Continuous integration (GitHub Actions): lint, test, and build run on every push and
  pull request against `main`

### Not implemented yet
- Authentication / accounts
- Meme uploads
- Like/dislike/save persisting to the database (the buttons currently only toggle locally)
- Admin analytics dashboard

These are being worked through in order — see [Roadmap](#roadmap) below.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | lucide-react |
| Database | Supabase (Postgres) — optional locally, falls back to sample data |
| Planned auth/storage | Supabase Auth + Storage |
| Planned hosting | Vercel |

## Getting started

### Prerequisites
- Node.js 18+

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). With no further setup, the app runs on
built-in sample data.

### Database setup (optional)

To use real data instead of the sample memes:

1. Create a [Supabase](https://supabase.com) project.
2. Run `supabase/migrations/0001_init.sql` against it (via the SQL editor in the Supabase
   dashboard, or the Supabase CLI) to create the `memes` table.
3. Optionally run `supabase/seed.sql` to add a few sample rows.
4. Copy `.env.example` to `.env.local` and fill in your project's URL and anon key
   (Supabase dashboard → Settings → API).
5. Restart the dev server.

### Available scripts

```bash
npm run dev      # start the development server
npm run build    # production build
npm start        # run a production build
npm run lint     # run ESLint
npm run format   # format the codebase with Prettier
npm test         # run the test suite once
npm run test:watch     # run tests in watch mode
npm run test:coverage  # run tests with a coverage report
```

## Project structure

```
memeflow-web/
├── app/
│   ├── globals.css     # Tailwind entry point and global styles
│   ├── layout.tsx      # root layout, fonts, page metadata
│   └── page.tsx        # home page; fetches memes server-side
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MemeExplorer.tsx # holds genre selection, filters memes for MemeCard
│   ├── GenreFilter.tsx
│   ├── MemeCard.tsx    # meme viewer
│   └── UploadFAB.tsx   # floating upload button; modal is a placeholder
├── lib/
│   ├── supabase.ts     # Supabase client (null when unconfigured)
│   ├── memes.ts        # fetches memes, falls back to sample data
│   └── types.ts
├── supabase/
│   ├── migrations/     # SQL schema
│   └── seed.sql        # sample rows
└── public/
    └── logo.svg
```

## Roadmap

1. Add authentication so users can save/like memes as themselves
2. Implement the upload flow
3. Persist like/dislike/save interactions to the database
4. Add an admin dashboard for basic engagement stats
5. Deploy to Vercel

## License

MIT
