# MemeFlow

A meme browsing interface built with Next.js. Users can flip through memes one at a time,
filter by genre, and react with like/dislike/save/share controls.

## Current status

This project is in early development. The front-end shell — layout, styling, and
interactive components — is in place and running against sample data. The backend
(database, authentication, real uploads) has not been built yet.

### Implemented
- Home page with a single-meme viewer (previous/next navigation, keyboard arrow support)
- Genre filter pills (dark-humor, sarcastic, pun, metaphorical, tech)
- Like / dislike / save / share controls on each meme card, with animated transitions
- Header, footer, and a floating upload button (the upload button currently opens a
  placeholder modal — it does not upload anything yet)
- Tailwind CSS design system with a dark theme and neon accent colors
- Framer Motion transitions between memes

### Not implemented yet
- Real data: meme content is currently hardcoded sample data in `components/MemeCard.tsx`
- Database and backend (Supabase is installed as a dependency but not wired up)
- Authentication / accounts
- Meme uploads
- Admin analytics dashboard
- Automated tests
- Continuous integration

These are being worked through in order — see [Roadmap](#roadmap) below.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | lucide-react |
| Planned database/auth | Supabase (Postgres + Auth + Storage) |
| Planned hosting | Vercel |

## Getting started

### Prerequisites
- Node.js 18+

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

```bash
npm run dev      # start the development server
npm run build    # production build
npm start        # run a production build
npm run lint     # run ESLint
npm run format   # format the codebase with Prettier
```

## Project structure

```
memeflow-web/
├── app/
│   ├── globals.css     # Tailwind entry point and global styles
│   ├── layout.tsx      # root layout, fonts, page metadata
│   └── page.tsx        # home page
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── GenreFilter.tsx
│   ├── MemeCard.tsx    # meme viewer; currently reads hardcoded sample data
│   └── UploadFAB.tsx   # floating upload button; modal is a placeholder
└── public/
    └── logo.svg
```

## Roadmap

1. Connect a real database (Supabase) so memes are no longer hardcoded
2. Add authentication so users can save/like memes as themselves
3. Implement the upload flow
4. Add an admin dashboard for basic engagement stats
5. Add automated tests and a CI pipeline
6. Deploy to Vercel

## License

MIT
