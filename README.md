# ARISE — The All-in-One Robotics Education Platform

ARISE is a comprehensive robotics education platform that takes students from **CAD design** to **visual programming** to **simulation in a virtual environment** and **augmented reality** — all in one place.

## 🌐 Live Site

[www.arisesim.com](https://www.arisesim.com)

## 📖 Our Story

ARISE started with the **Scarborough STEM Alliance (SSA)**, a non-profit that hosted over **100 workshops globally**, impacting **1,000+ youth** with free hands-on STEM and robotics education. We discovered that a single workshop isn't enough — robotics is an iterative process where you learn by doing and failing hundreds of times. Physical robotics kits (like LEGO Spike Prime) cost **$500–$1,000**, creating a massive barrier for students and schools in low-income areas.

**ARISE is the solution.** A platform where drag-and-drop simplicity meets professional-grade simulation, making robotics education accessible to everyone.

<!-- ## 🚀 Pages

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` | Hero page with video background, ARISE logo, and "Launch Now" CTA |
| **Learn** | `/learn` | Company story and interactive timeline (Ideate → Development → Beta Launch → Commercialization → Pilots Kickoff) |
| **Download** | `/download` | Download links for Windows 10/11 and macOS (Apple Silicon) |
| **Account** | `/account` | Authentication (Google OAuth + email/password) and user profile |
| **Projects** | `/projects` | Showcase of design projects and partnerships |

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) (App Router + Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI + shadcn/ui
- **Auth:** [Supabase Auth](https://supabase.com/auth) (Google OAuth + email/password)
- **Database:** [Supabase PostgreSQL](https://supabase.com) with Row Level Security
- **Fonts:** Geist Sans, Geist Mono, Instrument Serif
- **Animations:** Framer Motion + CSS animations -->

<!-- ## 🔐 Authentication

- **Google OAuth** — Sign in with Google, configured via Supabase Auth Providers
- **Email + Password** — Sign up and sign in with email (no email verification required)
- **Profiles table** — Every authenticated user is automatically synced to a `profiles` table in the database with their name, email, avatar, and auth provider
- **Middleware** — Session refresh on every request via `middleware.ts` -->

<!-- ## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Landing page (video background hero)
│   ├── layout.tsx            # Root layout (fonts, metadata)
│   ├── globals.css           # Global styles & animations
│   ├── account/page.tsx      # Auth & profile page
│   ├── auth/callback/route.ts # OAuth callback handler
│   ├── download/page.tsx     # Platform download page
│   ├── learn/page.tsx        # Company story & timeline
│   └── projects/page.tsx     # Projects showcase
├── components/ui/            # Reusable UI components (Button, Card, Input)
├── lib/
│   └── supabase/
│       ├── client.ts         # Browser Supabase client
│       └── server.ts         # Server Supabase client
├── middleware.ts              # Supabase session refresh middleware
├── scripts/
│   └── seed-users.mjs        # Bulk user seeding script
├── supabase/
│   └── migrations/
│       └── 001_create_profiles.sql  # Profiles table + triggers
└── public/                    # Static assets (logos, images, downloads)
``` -->

<!-- ## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables** — Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. **Run the database migration** — In Supabase SQL Editor, run:
   ```
   supabase/migrations/001_create_profiles.sql
   ```

4. **Enable Google OAuth** — In Supabase Dashboard → Authentication → Providers → Google, add your Google Client ID and Secret.

5. **Start the dev server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) -->

## 📊 Milestones

| Phase | Date | Highlights |
|-------|------|------------|
| Ideate | May 2025 | Proof of concept, viable tech stack |
| Development | June 2025 | 100 on waitlist, 20 school LOIs |
| Beta Launch | July 2025 | 4,500 site visits, 85 beta testers |
| Commercialization | Aug 2025 | Classroom dashboard, SSO pilot ready, 5 schools queued |
| Pilots Kickoff | Sep 2025 | 6-week cohorts with 50+ teachers, 70%+ WAU targets |

## 📝 License

Private — All rights reserved.
