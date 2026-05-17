# Hintro

A frontend dashboard application built with React and Vite.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Zustand (state management)
- React Router DOM (routing)
- Axios (API calls)
- Lucide React (icons)

## Features

- Login page with email/password
- Dashboard with call session stats (Total Sessions, Average Duration, AI Used, Last Session)
- Recent calls list grouped by date
- Feedback modal with star rating
- Feedback history with table view
- Sidebar navigation with active state
- User switching (u1 - empty state, u2 - with data)
- Logout confirmation modal
- Mobile responsive layout

## Mock API

The app uses a mock API with two users:

- `u1` - returns empty/zero data
- `u2` - returns randomized active data

API endpoints:

- `GET /api/auth/profile` - user profile
- `GET /api/auth/dashboard` - dashboard data
- `GET /api/call-sessions/stats` - call session statistics
- `GET /api/call-sessions?limit=N` - recent call history

User is identified via `x-user-id` header.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
  pages/
    Login.jsx           - Login page with email/password form
    Dashboard.jsx       - Main dashboard layout with sidebar state management
  components/
    LeftNavbar.jsx      - Sidebar navigation (slide-over on mobile)
    TopNavbar.jsx       - Top bar (responsive: hamburger on mobile, full bar on desktop)
    MainPage.jsx        - Dashboard content: stats cards, recent calls
    FeedbackHistory.jsx - Feedback table (desktop) / cards (mobile)
    FeedbackModal.jsx   - Star rating feedback modal with thank you screen
    ProfileDropdown.jsx - Avatar dropdown with user switch and logout modal
    icons/              - Custom SVG icon components
  store/
    authStore.js        - Zustand store for auth state and API methods
  api/
    axios.js            - Axios instance with base URL config
  assets/
    avatar.png          - Profile avatar image
```

## How It Works

1. Open the app - you land on the Login page.
2. Click Login - logs in as user `u1` (empty state) by default.
3. On the Dashboard, use the profile dropdown (top-right) to switch between `u1` and `u2`.
4. `u1` shows empty/zero stats and no recent calls.
5. `u2` shows randomized stats, recent calls grouped by date, and populated data.
6. Click "Feedback" in the sidebar to open the feedback modal.
7. Submit feedback with a star rating and optional description.
8. Click "Feedback History" to view all submitted feedbacks (stored in localStorage).
9. On mobile (below 768px), the sidebar becomes a slide-over panel toggled by the hamburger menu.

## Deployment

Configured for Vercel deployment. The `vercel.json` handles SPA routing rewrites.

To deploy on Vercel:

1. Push code to GitHub.
2. Import the repo on vercel.com.
3. Set root directory to `hintro`.
4. Framework preset: Vite.
5. Build command: `npm run build`.
6. Output directory: `dist`.
