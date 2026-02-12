# LinkedFolio V2

LinkedFolio is a portfolio builder platform where users can create, customize, preview, and publish professional portfolio pages with free and premium templates.

## Features

- Email authentication with Supabase
- Public pages: Home, Features, Pricing, About, Contact
- User dashboard with profile editor
- Template selection
- Portfolio preview and publish controls
- Resume generator
- Payment request flow (for premium upgrades)
- Admin dashboard for users and payment approvals
- Public portfolio rendering by username and user ID
- Plan-based template access (free/pro/enterprise)

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- React Router
- TanStack React Query
- Supabase (Auth + Postgres + RLS)
- Framer Motion + GSAP

## Project Structure

```text
src/
  components/
  context/
  hooks/
  integrations/supabase/
  lib/
  pages/
    auth/
    dashboard/
    payment/
    admin/
    portfolio/
    public/
supabase/
  config.toml
  schema.sql
```

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/Deekshith14/LinkedFolio.git
cd LinkedFolio
npm install
```

### 2. Configure Supabase

Create a Supabase project and run the bootstrap schema:

1. Open Supabase SQL Editor
2. Run `supabase/schema.sql`
3. Configure Auth URL settings:
- `Site URL`: `http://localhost:8080`
- Add redirect URL: `http://localhost:8080`

### 3. Set Supabase Credentials

Update Supabase URL and anon key in:

- `src/lib/supabase.ts`
- `src/integrations/supabase/client.ts`

### 4. Start Development Server

```bash
npm run dev
```

App runs at `http://localhost:8080`.

## Available Scripts

- `npm run dev` - Start local dev server
- `npm run build` - Type-check and create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Database Notes

- The schema includes a trigger (`handle_new_user`) that auto-creates a profile row after signup.
- Do not insert a duplicate profile row from client signup flow.
- Plan upgrades can be set manually for demo:

```sql
update public.profiles
set plan_type = 'pro', is_premium = true, updated_at = now()
where email = 'user@example.com';
```

## Deployment

This project is ready to deploy on Netlify/Vercel as a static frontend.

Before deployment:

- Ensure Supabase project has all tables/policies from `supabase/schema.sql`
- Set correct production `Site URL` and redirect URLs in Supabase Auth settings
- Use production Supabase project URL and anon key

## Troubleshooting

- `504 (Outdated Optimize Dep)` in dev:
  - Clear Vite cache: delete `node_modules/.vite`
  - Restart with `npm run dev -- --force`
- Supabase column errors:
  - Your DB schema is missing expected columns
  - Re-run required migration SQL from `supabase/schema.sql`

## License

This project is for educational and portfolio use.
