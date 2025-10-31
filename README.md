# MemeFlow 🎭

> A modern, futuristic social meme viewer and sharing platform with real-time analytics

## 🌟 Overview

MemeFlow is a production-ready MVP social meme application that allows users to browse, filter, interact with, and share memes in a sleek, professional interface. Users can navigate through memes one at a time with smooth animations, filter by genre, like/dislike, save favorites, and share content. The platform includes a powerful real-time analytics dashboard for monitoring user engagement and trending content.

## ✨ Key Features

### User Experience
- **Single Meme Viewing**: Browse memes one at a time with previous/next navigation
- **Genre Filtering**: Filter by dark-humor, sarcastic, pun, metaphorical, and tech categories
- **Interactive Engagement**: Like, dislike, save (bookmark), and share memes
- **Smooth Animations**: Framer Motion-powered transitions and preloading for seamless UX
- **Responsive Design**: Mobile-first, fully responsive layout with keyboard navigation support
- **User Authentication**: Supabase Auth with email/password and social sign-ins
- **Meme Upload**: Authenticated users can upload new memes with images and captions

### Admin Analytics Dashboard (`/admin`)
- **Real-time Updates**: Live data streaming via Supabase Realtime
- **Total Saves Counter**: Track bookmark activity across all memes
- **Top 10 Memes**: View most-liked memes with thumbnails and counts
- **Likes by Genre**: Visual charts showing engagement per category
- **Active Users**: Real-time count of users active in the last 5 minutes
- **Protected Access**: Admin-only page with user role verification

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: React 18
- **Fonts**: Google Fonts (Inter + Orbitron)

### Backend & Infrastructure
- **Database**: Supabase Postgres
- **Real-time**: Supabase Realtime subscriptions
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (image bucket)
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions + Vercel integration

### Design System
- **Color Palette**:
  - Background: `#0b1020` (dark)
  - Primary Accent: `#00d4c9` (neon teal)
  - Secondary Accent: `#ff4db6` (neon magenta)
- **Typography**: Inter (body) + Orbitron (headings)
- **Aesthetic**: Futuristic, professional, clean spacing with subtle neon accents

## 🗄 Database Schema

### Tables

#### `memes`
```sql
id              uuid PRIMARY KEY DEFAULT uuid_generate_v4()
title           text NOT NULL
image_path      text NOT NULL
caption         text
genre           text CHECK (genre IN ('dark-humor', 'sarcastic', 'pun', 'metaphorical', 'tech'))
created_at      timestamptz DEFAULT now()
likes_count     integer DEFAULT 0
saves_count     integer DEFAULT 0
```

#### `interactions`
```sql
id              uuid PRIMARY KEY DEFAULT uuid_generate_v4()
user_id         uuid REFERENCES auth.users(id)
meme_id         uuid REFERENCES memes(id)
type            text CHECK (type IN ('like', 'save', 'dislike'))
created_at      timestamptz DEFAULT now()
```

#### `users`
Standard Supabase Auth table with custom metadata:
```json
{
  "is_admin": true/false
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/maitranilim/memeflow-web.git
cd memeflow-web
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. **Set up Supabase**
- Create a new Supabase project
- Run the database migration scripts (in `/supabase` directory)
- Create a storage bucket named `meme-images` with public read access
- Seed the database with demo memes (see seeding section below)

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open the app**

Navigate to [http://localhost:3000](http://localhost:3000)

### Database Seeding

To seed the database with 10 demo memes:

```bash
npm run seed
```

This will:
- Upload 10 placeholder images to Supabase Storage
- Create 10 meme entries across all 5 genres
- Set up a demo admin user

## 📋 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test

# Seed database
npm run seed

# Format code with Prettier
npm run format
```

## 🔐 Demo Credentials

**Demo User Account**:
- Email: `demo@memeflow.app`
- Password: `MemeFlow2025!`

**Admin Account**:
- Email: `admin@memeflow.app`
- Password: `AdminMeme2025!`
- Access: Full admin dashboard at `/admin`

## 🌐 Deployment

### Vercel Deployment

1. **Connect to GitHub**
- Import the `memeflow-web` repository in Vercel
- Select the `main` branch for production

2. **Configure Environment Variables**

Add the following in Vercel project settings:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

3. **Deploy**
- Vercel will automatically build and deploy
- Build command: `npm run build`
- Output directory: `.next` (default)

### Post-Deployment

1. Verify environment variables are set correctly
2. Test authentication flow
3. Verify Supabase Realtime connections
4. Seed production database if needed
5. Test admin dashboard real-time updates

## 📁 Project Structure

```
memeflow-web/
├── app/                    # Next.js app router
│   ├── admin/             # Admin analytics dashboard
│   ├── api/               # API routes & serverless functions
│   ├── profile/           # User profile & saved memes
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page (meme viewer)
├── components/            # React components
│   ├── MemeCard.tsx      # Main meme display component
│   ├── GenreFilter.tsx   # Genre selection pills
│   ├── AuthModal.tsx     # Sign-in/sign-up modal
│   ├── UploadModal.tsx   # Meme upload interface
│   └── analytics/        # Admin dashboard components
├── lib/                   # Utilities & configurations
│   ├── supabase.ts       # Supabase client setup
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Helper functions
├── public/                # Static assets
│   ├── logo.svg          # MemeFlow logo
│   └── favicon.ico       # Favicon
├── supabase/             # Database migrations & seeds
│   ├── migrations/       # SQL migration files
│   └── seed.sql          # Demo data seeding script
└── styles/               # Global styles
    └── globals.css       # Tailwind imports & custom styles
```

## 🔒 Security Best Practices

- **Service Role Key**: Never expose in client code; only use in serverless API routes
- **Row Level Security**: Supabase RLS policies protect user data
- **Input Validation**: Client and server-side validation on all forms
- **Image Upload**: File type and size restrictions (max 5MB, images only)
- **Admin Access**: Protected routes with user role verification

## 🧪 Testing

Basic test skeleton included for critical utilities:

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```

## 🎯 Future Enhancements

### Short-term
- Comments system on memes
- User profiles with follower/following
- Meme collections/playlists
- Advanced search and filtering

### Medium-term
- Content moderation tools
- Reporting system for inappropriate content
- User reputation/karma system
- Meme creation tools (built-in editor)

### Long-term
- Monetization: Premium features, creator subscriptions
- Mobile apps (React Native)
- AI-powered meme recommendations
- Meme contests and challenges
- Creator analytics and insights

## 📊 Analytics & Monitoring

- **Real-time Dashboard**: `/admin` route with live Supabase Realtime subscriptions
- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Console logging and error boundaries
- **User Metrics**: Active users, engagement rates, popular content

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- **Supabase**: Backend-as-a-Service platform
- **Vercel**: Deployment and hosting
- **Next.js**: React framework
- **Framer Motion**: Animation library
- **Tailwind CSS**: Utility-first CSS framework

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@memeflow.app
- Documentation: [docs.memeflow.app](https://docs.memeflow.app)

---

**Built with ❤️ by the MemeFlow Team**

*Last updated: October 2025*
