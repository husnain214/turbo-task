# Designflow

A client portal built for design businesses that want a structured, opinionated workflow — not another freeform kanban board.

Clients submit unlimited tasks. Only one is worked on at a time. Every task runs in 2-day cycles with a clear review and revision loop. No drag-and-drop chaos, no ambiguous statuses.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square)

---

## The Problem

Most project management tools give clients too much freedom — tasks get shuffled around, priorities change randomly, and it's impossible to maintain a focused working rhythm.

Designflow enforces a simple rule: **one active task at a time**. Everything else waits in a queue. The freelancer controls the pace. The client controls the priority order.

---

## How It Works

```
Queue → Active → In Review → Completed
                     ↑           |
                     └── Revision (restarts 2-day cycle)
```

1. Clients add unlimited tasks to the queue and order them by priority
2. One task is activated at a time — the database enforces this at the constraint level
3. Each active task runs on a 2-day work cycle
4. The freelancer submits work → client reviews → approves or requests revision
5. Each revision triggers a new 2-day cycle and is tracked in the revision history
6. Approved tasks move to Completed

---

## Features

### Client Portal
- Create projects and organize tasks into a prioritized queue
- Activate one task at a time from the queue
- Review submitted work, request revisions, or approve and complete
- View active task, queue size, revision count, and completed tasks at a glance
- Multi-user support per account — admins have full control, members can comment and upload

### Task Management
- Title, description, attachments, and comment thread per task
- Full revision history with cycle timestamps
- Deadline countdown for active tasks
- Drag-to-reorder within the queue (priority only — no free movement across columns)

### Admin Dashboard
- Overview of all clients and their active tasks
- Tasks waiting on the freelancer vs waiting on the client
- Subscription status per client

### Infrastructure
- Automated notifications for task started, work submitted, revision requested, and task approved
- Stripe integration for subscription management
- Row Level Security enforced at the database level — clients can only access their own data

---

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR + server actions in one project |
| Database + Auth | Supabase (Postgres + RLS) | Built-in auth, row-level security, realtime |
| Hosting | Vercel | Zero-config Next.js deployment |
| Styling | Tailwind CSS + shadcn/ui | Consistent, accessible components |
| Payments | Stripe | Industry standard subscription management |
| Email | Resend | Simple transactional email |
| Drag and drop | dnd-kit | Headless, accessible reordering |
| Validation | Zod | Schema validation on forms and server actions |

---

## Project Structure

```
app/
  (auth)/
    login/
    signup/
  (dashboard)/
    layout.tsx          # Sidebar + auth guard
    page.tsx            # Dashboard home
    projects/
      page.tsx          # Projects list
      new/
        page.tsx        # Create project
      [projectId]/
        page.tsx        # Project board (task columns)

components/
  projects/
    project-card.tsx
  tasks/
    create-task-dialog.tsx
    task-card.tsx
    task-column.tsx

lib/
  supabase/
    client.ts           # Browser client
    server.ts           # Server client
    get-profile.ts      # Cached profile helper
  actions/
    projects.ts         # Server actions for projects
    tasks.ts            # Server actions for tasks
  zod/
    projects.ts         # Validation schemas
    tasks.ts

types/
  database.types.ts     # Auto-generated from Supabase
  projects.ts           # App-level types
```

---

## Database Schema

```
clients
  └── users (admin | member)
  └── projects
        └── tasks (queue | active | in_review | completed)
              └── task_revisions
              └── task_comments
              └── task_attachments
```

**Key constraint:** A partial unique index on `tasks(client_id) WHERE status = 'active'` enforces the one-active-task rule at the database level — not just the application layer.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Stripe](https://stripe.com) account (for payments)
- A [Resend](https://resend.com) account (for email)

### 1. Clone and install

```bash
git clone https://github.com/yourusername/designflow.git
cd designflow
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
RESEND_API_KEY=your_resend_api_key
```

### 3. Set up the database

Run the following SQL files in order in your Supabase SQL Editor:

```
supabase/
  01_tables.sql       # Create all tables
  02_indexes.sql      # Partial unique index for active task rule
  03_triggers.sql     # updated_at trigger + new user handler
  04_rls.sql          # Row Level Security policies
```

### 4. Generate TypeScript types

```bash
npm run types
```

This pulls your schema from Supabase and generates `types/database.types.ts`.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run types     # Regenerate Supabase TypeScript types
npm run lint      # Run ESLint
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `STRIPE_SECRET_KEY` | Stripe secret key for payment processing |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `RESEND_API_KEY` | Resend API key for transactional email |

---

## Roadmap

- [ ] Stripe subscription integration
- [ ] Email notifications via Resend
- [ ] Drag-to-reorder queue with dnd-kit
- [ ] File attachments via Supabase Storage
- [ ] Admin dashboard with client overview
- [ ] Mobile responsive layout

---
