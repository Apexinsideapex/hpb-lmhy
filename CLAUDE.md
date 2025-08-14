# JobTracker Pro - Project Overview

## Project Structure

This project consists of a **Python FastAPI backend** and a **Next.js 15 React frontend** for job application tracking and management.

```
hpb-lmhy/
├── backend/              # Python FastAPI backend
│   ├── main.py          # FastAPI app entry point
│   ├── cv_parser.py     # CV/resume parsing functionality
│   └── requirements.txt # Python dependencies
├── frontend/
│   └── my-app/          # Next.js 15 application
└── frontend_bak/        # Backup of previous frontend
```

## Frontend Technology Stack

The frontend has been completely overhauled with modern technologies:

### Core Technologies
- **Next.js 15.2.4** with App Router
- **React 19** with TypeScript
- **Tailwind CSS 4.1.12** for styling
- **shadcn/ui** component library (New York style)

### UI Framework & Components
- **Radix UI** primitives for accessibility
- **Lucide React** icons
- **Recharts** for data visualization
- **Class Variance Authority** for component variants

### Key Dependencies
```json
{
  "next": "15.2.4",
  "react": "^19.0.0",
  "tailwindcss": "^4.1.12",
  "@radix-ui/react-*": "Various components",
  "recharts": "^2.15.4",
  "lucide-react": "^0.539.0"
}
```

## Application Features

### Pages & Routes
- `/` - Main dashboard (protected, redirects to landing if not authenticated)
- `/landing` - Landing page with marketing content
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page  
- `/applications` - Job applications management
- `/contacts` - Contact management
- `/analytics` - Analytics dashboard
- `/onboarding` - User onboarding flow

### Components Architecture
The app uses a comprehensive component structure:

**Analytics Components:**
- Analytics metrics and charts
- Application trends visualization
- Response rate tracking
- Source analytics
- Time to response metrics

**Core Components:**
- Dashboard with statistics
- Kanban board for application tracking
- Job application forms and cards
- Contact management system
- Navigation (desktop & mobile)
- Quick actions panel
- Recent activity feed

**Mobile Optimizations:**
- Mobile-specific Kanban board
- Mobile navigation
- Mobile-optimized forms
- Touch-friendly interfaces

### Design System

**Theme:** Dark "stealth startup" aesthetic
- Deep dark backgrounds (oklch(0.12 0 0))
- Bright white text (oklch(0.98 0 0))
- Indigo primary color (oklch(0.64 0.18 264))
- Custom CSS animations and glow effects

**Typography:**
- Geist Sans for headings
- Geist Mono for code/data elements

**Responsive Design:**
- Mobile-first approach
- Breakpoints for sm/lg screens
- Touch-friendly button sizes

## Development Commands

```bash
# Frontend development
cd frontend/my-app
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run lint         # Run ESLint
npm start           # Start production server

# Backend development  
cd backend
python main.py       # Start FastAPI server
```

## Authentication & State Management

- Uses localStorage for demo authentication
- Client-side routing protection
- Onboarding flow with reminder system
- Session persistence across page reloads

## Key Features Implemented

1. **Job Application Tracking** - Full CRUD operations
2. **Analytics Dashboard** - Charts and metrics visualization  
3. **Contact Management** - Professional network tracking
4. **Responsive Design** - Mobile and desktop optimized
5. **Onboarding Flow** - Multi-step user setup
6. **Search & Filtering** - Advanced application filtering
7. **Goal Tracking** - Weekly job search goals
8. **Dark Theme** - Modern startup aesthetic

The frontend represents a complete overhaul with modern React patterns, comprehensive TypeScript support, and a polished user experience suitable for professional job tracking needs.