# CLAUDE.md - AI Assistant Guide for lauren-app

## Project Overview

**lauren-app** is an interactive therapy application designed for three distinct user types: kids, parents, and clinicians. The app provides gamified therapy exercises, progress tracking, and communication tools to support pediatric therapy programs (PT, OT, Speech Therapy).

**Owner:** Lauren Gaunt
**Repository:** https://github.com/tannergodarzi/lauren-app
**Purpose:** Multi-role therapy management platform with engaging UX for children

## Tech Stack

- **Framework:** Next.js 16.0.7 (App Router)
- **Language:** TypeScript 5.9.3
- **UI Library:** React 19.2.1
- **Styling:** Tailwind CSS 4.1.17
- **Icons:** Lucide React 0.556.0
- **Node Types:** @types/node 24.10.1

## Directory Structure

```
lauren-app/
├── app/
│   ├── components/          # Shared components
│   │   ├── CharacterBuddy/  # Kid-facing character component
│   │   └── ModeToggle/      # Mode switcher (kid/parent/clinician)
│   ├── views/               # Feature-based view components
│   │   ├── kid/             # Kid-facing views
│   │   │   ├── KidHomeView/
│   │   │   ├── KidMissionView/
│   │   │   └── KidCelebrationView/
│   │   ├── parent/          # Parent dashboard views
│   │   │   ├── ParentHomeView/
│   │   │   ├── ParentExercisesView/
│   │   │   ├── ParentMessagesView/
│   │   │   └── ParentSettingsView/
│   │   └── clinician/       # Clinician portal views
│   │       ├── ClinicianHomeView/
│   │       ├── ClinicianPatientDetailView/
│   │       ├── ClinicianAssignExercisesView/
│   │       └── ClinicianBillingView/
│   ├── globals.css          # Global styles & Tailwind imports
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main app entry point (TherapyApp)
│   └── types.ts             # TypeScript type definitions
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Architecture & Patterns

### Application Architecture

This is a **single-page application (SPA)** with client-side state management:

1. **Entry Point:** `app/page.tsx` contains the main `TherapyApp` component
2. **Mode System:** Three distinct modes (kid/parent/clinician) with separate view hierarchies
3. **View Routing:** Custom view-based routing using state (not Next.js file-based routing)
4. **State Management:** React hooks (`useState`) for local state management
5. **Data Storage:** Currently using hardcoded mock data (patients, missions, weeklyData)

### Component Pattern

All view components follow a consistent pattern:

```typescript
// Example structure for a view component
interface ViewNameProps {
  // Props definition
  data: SomeType;
  setView: (view: string) => void;
}

export const ViewName = ({ data, setView }: ViewNameProps) => (
  <div className="...">
    {/* Component JSX */}
  </div>
);
```

### Index File Exports

Each view directory contains an `index.tsx` for the component and parent directories have `index.ts` for barrel exports:

```typescript
// app/views/kid/index.ts
export { KidHomeView } from './KidHomeView';
export { KidMissionView } from './KidMissionView';
export { KidCelebrationView } from './KidCelebrationView';
```

## Key Conventions

### File Naming

- **Components:** PascalCase with descriptive names (e.g., `KidHomeView`, `ModeToggle`)
- **Directories:** Component directories match component names exactly
- **Index files:** Always named `index.tsx` for components, `index.ts` for barrel exports
- **Types:** Centralized in `app/types.ts`

### Component Organization

1. **Shared Components:** `app/components/` - reusable across modes
2. **View Components:** `app/views/{mode}/` - mode-specific screens
3. **One component per directory** with its own `index.tsx`
4. **Barrel exports** at parent level for clean imports

### Import Paths

- Use path alias `@/` for root-level imports
- Example: `import { KidHomeView } from '@/app/views/kid';`
- Path mapping configured in `tsconfig.json`: `"@/*": ["./*"]`

### TypeScript Conventions

- **Strict mode enabled** in tsconfig.json
- **Interface over type** for object shapes (see `app/types.ts`)
- **Explicit prop types** for all components
- **No implicit any** - all types must be defined

## Type System

Current type definitions in `app/types.ts`:

```typescript
export interface Patient {
  id: number;
  name: string;
  age: number;
  compliance: number;      // Percentage 0-100
  lastActivity: string;    // Human-readable string
  streak: number;          // Days
  alerts: number;          // Count
  therapyType: string;     // e.g., "PT, Speech"
}

export interface Mission {
  id: number;
  title: string;
  time: string;            // e.g., "5 min"
  type: string;            // e.g., "Physical Therapy"
  icon: string;            // Emoji
  color: string;           // Tailwind class (e.g., "bg-purple-500")
  description: string;
  instructions: string;
  clinicianNote: string;
  frequency: string;       // e.g., "Daily, morning"
}

export interface WeeklyData {
  day: string;             // e.g., "Mon"
  completed: number;       // Count
}
```

**When adding new types:** Always add to `app/types.ts` and export them.

## State Management

### Current State Structure (in app/page.tsx)

```typescript
const [mode, setMode] = useState('kid');                    // 'kid' | 'parent' | 'clinician'
const [view, setView] = useState('home');                   // View identifier string
const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
const [completedMissions, setCompletedMissions] = useState([1, 2]);  // Mission IDs
const [stars, setStars] = useState(47);                     // Total stars earned
const [streak] = useState(5);                               // Current streak days
```

### State Flow

1. **Mode changes** reset view to 'home'
2. **View transitions** are handled via `setView(viewName)`
3. **Patient selection** stores full Patient object in state
4. **Mission completion** updates `completedMissions` array and `stars` count

### Prop Drilling Pattern

Currently using **prop drilling** - state and setters passed down through component tree. When scaling:

- Consider React Context for shared state
- Consider state management library (Zustand, Redux) for complex flows
- Keep mode-specific state separate from shared state

## Styling Conventions

### Tailwind CSS Usage

- **Tailwind v4** with new `@theme` directive
- **Custom CSS variables** in `globals.css`:
  ```css
  @theme {
    --color-background: #ffffff;
    --color-foreground: #171717;
  }
  ```

### Design System Colors

**Mode-specific gradients:**
- Kid mode: `from-purple-500 to-pink-500`
- Parent mode: `from-purple-600 to-pink-600`
- Clinician mode: `from-blue-600 to-indigo-600`

**Therapy type colors:**
- Physical Therapy: `bg-purple-500`
- Speech Therapy: `bg-pink-500`

**UI patterns:**
- Rounded elements: `rounded-2xl`, `rounded-3xl`, `rounded-full`
- Shadows: `shadow-md`, `shadow-lg`, `shadow-xl`
- Hover effects: `hover:shadow-xl transition-all transform hover:scale-105`
- Active states: `active:scale-95`

### Responsive Design

- Mobile-first approach
- Use `min-h-screen` for full-height layouts
- Padding bottom (`pb-20`) for mobile navigation clearance
- Fixed positioning for mode toggle: `fixed top-4 right-4 z-50`

## Development Workflows

### Starting Development

```bash
npm run dev        # Start development server (Next.js dev mode)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Adding a New View

1. **Create directory:** `app/views/{mode}/{ViewName}/`
2. **Create component:** `app/views/{mode}/{ViewName}/index.tsx`
3. **Define interface:** Props interface with view navigation
4. **Export from barrel:** Add to `app/views/{mode}/index.ts`
5. **Import in page.tsx:** Add to imports
6. **Add view logic:** Add conditional rendering in mode block
7. **Add navigation:** Update other views to navigate to new view

Example:
```typescript
// 1. Create app/views/parent/ParentNewView/index.tsx
interface ParentNewViewProps {
  setView: (view: string) => void;
}

export const ParentNewView = ({ setView }: ParentNewViewProps) => (
  <div>New View Content</div>
);

// 2. Add to app/views/parent/index.ts
export { ParentNewView } from './ParentNewView';

// 3. Import and use in app/page.tsx
import { ParentNewView } from '@/app/views/parent';

// 4. Add in parent mode block
{view === 'new-view' && <ParentNewView setView={setView} />}
```

### Adding a New Shared Component

1. **Create directory:** `app/components/{ComponentName}/`
2. **Create component:** `app/components/{ComponentName}/index.tsx`
3. **Export directly:** No barrel export needed (import directly from component)
4. **Import where needed:** `import { ComponentName } from '@/app/components/ComponentName';`

### Modifying Types

1. **Edit:** `app/types.ts`
2. **Export interface:** `export interface TypeName { ... }`
3. **Update consumers:** TypeScript will show errors where updates needed
4. **Update mock data:** Update hardcoded data in `app/page.tsx` if applicable

## Common Tasks

### Adding a New Mission

Edit `app/page.tsx`, find the `missions` array:

```typescript
const missions: Mission[] = [
  // Add new mission object
  {
    id: 5,  // Increment ID
    title: 'New Exercise',
    time: '7 min',
    type: 'Physical Therapy',
    icon: '🏃',
    color: 'bg-purple-500',
    description: '...',
    instructions: '...',
    clinicianNote: 'Prescribed by ...',
    frequency: 'Daily'
  },
];
```

### Adding a New Patient

Edit `app/page.tsx`, find the `patients` array:

```typescript
const patients: Patient[] = [
  // Add new patient object
  {
    id: 6,
    name: 'New Patient',
    age: 7,
    compliance: 80,
    lastActivity: '1 hour ago',
    streak: 3,
    alerts: 0,
    therapyType: 'PT'
  },
];
```

### Changing Mode Colors

Edit the `ModeToggle` component gradient classes:

```typescript
// app/components/ModeToggle/index.tsx
className={`... ${
  mode === 'mode-name'
    ? 'bg-gradient-to-r from-color-600 to-color-600 text-white'
    : '...'
}`}
```

### Adding Icons

1. Import from lucide-react: `import { IconName } from 'lucide-react';`
2. Use as component: `<IconName className="w-5 h-5 text-color-500" />`
3. Common icons in use: Star, Trophy, Flame, CheckCircle, Circle, and mode-specific icons

## Important Notes for AI Assistants

### Mock Data Awareness

⚠️ **Current data is hardcoded** - No backend integration yet. When adding features:
- Add data to appropriate constant array in `app/page.tsx`
- Keep data structure consistent with existing types
- Plan for future API integration (avoid tight coupling to mock data)

### Navigation System

⚠️ **Custom view system, not Next.js routing:**
- Views are switched via `setView(viewName)` state updates
- No `next/navigation` or `next/router` in use
- URL does not change between views
- For future routing, consider Next.js App Router dynamic routes

### Client Components Only

⚠️ **Entire app is client-side:**
- `'use client'` directive at top of `page.tsx`
- No Server Components in use currently
- No server actions or API routes yet
- Future: Consider Server Components for data fetching

### TypeScript Strictness

✅ **Strict mode is enabled:**
- Always provide types for props
- No `any` types - use proper interfaces
- TypeScript errors must be resolved before committing

### Code Style

✅ **Consistency matters:**
- Use existing patterns for new components
- Follow directory structure conventions
- Match naming conventions exactly
- Use Tailwind classes, avoid inline styles
- Prefer functional components with hooks

### Testing & Quality

⚠️ **No testing framework configured yet:**
- No Jest, Vitest, or testing library
- Manual testing required
- Future: Add testing framework (recommend Vitest + Testing Library)

### Git Workflow

- **Branch:** Work on feature branches (e.g., `claude/feature-name`)
- **Commits:** Clear, descriptive commit messages
- **Push:** Use `git push -u origin <branch-name>`

### Accessibility Considerations

⚠️ **Limited accessibility features currently:**
- Add ARIA labels when adding interactive elements
- Ensure keyboard navigation works
- Consider screen reader experience, especially for kid mode
- Use semantic HTML elements

## Future Enhancements to Consider

When working on this codebase, keep these potential improvements in mind:

1. **Backend Integration:**
   - API routes in `app/api/`
   - Database integration (consider Prisma + PostgreSQL)
   - Authentication system (NextAuth.js or Clerk)

2. **State Management:**
   - Replace prop drilling with Context or Zustand
   - Persist state to localStorage/session storage
   - Sync state with backend

3. **Routing:**
   - Migrate to Next.js file-based routing
   - Add URL parameters for deep linking
   - Support browser back/forward navigation

4. **Testing:**
   - Unit tests for components
   - Integration tests for user flows
   - E2E tests with Playwright

5. **Performance:**
   - Code splitting for each mode
   - Lazy loading for views
   - Image optimization

6. **Features:**
   - Real-time updates (WebSockets or Server-Sent Events)
   - Notifications system
   - Analytics and progress tracking
   - Video/audio integration for exercises

## Questions or Clarifications

When working on this codebase:

1. **Before adding dependencies:** Check if functionality can be achieved with existing stack
2. **Before changing architecture:** Discuss significant structural changes
3. **Before modifying types:** Verify impact across all views
4. **Before adding views:** Confirm they fit within existing mode structure

---

**Last Updated:** 2026-01-07
**Version:** 1.0.0
**Maintained for:** AI assistants working with claude-code
