-- LinkedFolio bootstrap schema for a new Supabase project
-- Run this whole file once in Supabase SQL Editor.

create extension if not exists pgcrypto;

-- Shared timestamp trigger helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- Tables ----------

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  preview_image text,
  is_premium boolean not null default false,
  tier text not null default 'free' check (tier in ('free', 'pro', 'enterprise')),
  created_at timestamptz not null default now()
);

create unique index if not exists templates_name_key on public.templates (name);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  username text unique,
  template_id uuid references public.templates (id) on delete set null,
  linkedin_connected boolean not null default false,
  published boolean not null default false,
  is_private boolean not null default false,
  updated_at timestamptz default now(),
  created_at timestamptz default now(),
  avatar_url text,
  bio text,
  phone text,
  website text,
  linkedin_url text,
  github_url text,
  twitter_url text,
  instagram_url text,
  achievements jsonb default '[]'::jsonb,
  certificates jsonb default '[]'::jsonb,
  is_premium boolean not null default false,
  is_admin boolean not null default false,
  plan_type text not null default 'free' check (plan_type in ('free', 'pro', 'enterprise')),
  visit_count integer default 0 check (visit_count >= 0)
);

create index if not exists profiles_published_idx on public.profiles (published);
create index if not exists profiles_template_idx on public.profiles (template_id);

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  hashed_password text not null,
  full_name text,
  username text,
  linkedin_id text,
  gmail_id text,
  last_login timestamptz
);

create table if not exists public.portfolio_templates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  description text,
  is_free boolean not null default true,
  preview_image_url text,
  template_structure jsonb,
  pricing_tier text not null default 'free' check (pricing_tier in ('free', 'pro', 'premium'))
);

create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null unique,
  description text,
  price numeric(10,2),
  validity_months integer,
  can_use_pro boolean not null default false,
  can_use_premium boolean not null default false
);

create table if not exists public.user_portfolios (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users (id) on delete cascade,
  template_id uuid not null references public.templates (id) on delete restrict,
  portfolio_url_slug text not null unique,
  portfolio_data jsonb,
  published_at timestamptz,
  subscription_expiry_date date,
  active_subscription_plan_id uuid references public.pricing_plans (id) on delete set null
);

create index if not exists user_portfolios_user_idx on public.user_portfolios (user_id);

create table if not exists public.user_profile_data (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users (id) on delete cascade,
  personal_info jsonb,
  education jsonb[],
  experience jsonb[],
  skills text[],
  projects jsonb[],
  linkedin_sync_enabled boolean default false,
  linkedin_last_synced timestamptz
);

create unique index if not exists user_profile_data_user_key on public.user_profile_data (user_id);

create table if not exists public.payment_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  upi_reference_id text not null,
  amount numeric(10,2) not null,
  plan_type text not null check (plan_type in ('pro', 'enterprise')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  verified_by uuid references auth.users (id) on delete set null,
  verification_notes text
);

create index if not exists payment_requests_user_idx on public.payment_requests (user_id);
create index if not exists payment_requests_status_idx on public.payment_requests (status);

create table if not exists public.linkedin_sync_tokens (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users (id) on delete cascade,
  access_token text,
  refresh_token text,
  expires_at timestamptz
);

create unique index if not exists linkedin_sync_tokens_user_key on public.linkedin_sync_tokens (user_id);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  company text not null,
  location text,
  start_date date not null,
  end_date date,
  current boolean not null default false,
  description text[],
  created_at timestamptz default now()
);

create index if not exists experiences_profile_idx on public.experiences (profile_id);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  institution text not null,
  degree text not null,
  field_of_study text,
  start_date date not null,
  end_date date,
  current boolean not null default false,
  description text,
  created_at timestamptz default now()
);

create index if not exists education_profile_idx on public.education (profile_id);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  description text,
  url text,
  image_url text,
  technologies text[],
  created_at timestamptz default now(),
  current boolean default false,
  category text
);

create index if not exists projects_profile_idx on public.projects (profile_id);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  level integer,
  created_at timestamptz default now(),
  category text
);

create index if not exists skills_profile_idx on public.skills (profile_id);

-- ---------- Functions ----------

create or replace function public.is_admin(user_id_input uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = user_id_input
      and p.is_admin = true
  );
$$;

create or replace function public.increment_visit_count(profile_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set visit_count = coalesce(visit_count, 0) + 1
  where id::text = profile_id;
end;
$$;

create or replace function public.can_user_access_template(user_id_input text, template_id_input text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  user_plan text;
  template_tier text;
begin
  select coalesce(p.plan_type, 'free')
  into user_plan
  from public.profiles p
  where p.id::text = user_id_input;

  select coalesce(t.tier, 'free')
  into template_tier
  from public.templates t
  where t.id::text = template_id_input;

  if template_tier is null then
    return false;
  end if;

  if template_tier = 'free' then
    return true;
  end if;

  if template_tier = 'pro' then
    return user_plan in ('pro', 'enterprise');
  end if;

  if template_tier = 'enterprise' then
    return user_plan = 'enterprise';
  end if;

  return false;
end;
$$;

-- Create a profile automatically for each new auth user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    plan_type,
    linkedin_connected,
    published,
    is_premium,
    is_admin,
    is_private
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    'free',
    false,
    false,
    false,
    false,
    false
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- ---------- Updated At Triggers ----------

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists payment_requests_set_updated_at on public.payment_requests;
create trigger payment_requests_set_updated_at
before update on public.payment_requests
for each row
execute function public.set_updated_at();

-- ---------- RLS ----------

alter table public.templates enable row level security;
alter table public.profiles enable row level security;
alter table public.users enable row level security;
alter table public.portfolio_templates enable row level security;
alter table public.pricing_plans enable row level security;
alter table public.user_portfolios enable row level security;
alter table public.user_profile_data enable row level security;
alter table public.payment_requests enable row level security;
alter table public.linkedin_sync_tokens enable row level security;
alter table public.experiences enable row level security;
alter table public.education enable row level security;
alter table public.projects enable row level security;
alter table public.skills enable row level security;

drop policy if exists templates_select_all on public.templates;
create policy templates_select_all on public.templates
for select
using (true);

drop policy if exists templates_mutate_admin on public.templates;
create policy templates_mutate_admin on public.templates
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists profiles_select_public_or_owner on public.profiles;
create policy profiles_select_public_or_owner on public.profiles
for select
using (
  published = true
  or id = auth.uid()
  or public.is_admin(auth.uid())
);

drop policy if exists profiles_insert_self_or_admin on public.profiles;
create policy profiles_insert_self_or_admin on public.profiles
for insert
with check (
  id = auth.uid()
  or public.is_admin(auth.uid())
);

drop policy if exists profiles_update_self_or_admin on public.profiles;
create policy profiles_update_self_or_admin on public.profiles
for update
using (
  id = auth.uid()
  or public.is_admin(auth.uid())
)
with check (
  id = auth.uid()
  or public.is_admin(auth.uid())
);

drop policy if exists profiles_delete_admin_only on public.profiles;
create policy profiles_delete_admin_only on public.profiles
for delete
using (public.is_admin(auth.uid()));

drop policy if exists users_owner_or_admin on public.users;
create policy users_owner_or_admin on public.users
for all
using (
  id = auth.uid()
  or public.is_admin(auth.uid())
)
with check (
  id = auth.uid()
  or public.is_admin(auth.uid())
);

drop policy if exists portfolio_templates_select_all on public.portfolio_templates;
create policy portfolio_templates_select_all on public.portfolio_templates
for select
using (true);

drop policy if exists portfolio_templates_mutate_admin on public.portfolio_templates;
create policy portfolio_templates_mutate_admin on public.portfolio_templates
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists pricing_plans_select_all on public.pricing_plans;
create policy pricing_plans_select_all on public.pricing_plans
for select
using (true);

drop policy if exists pricing_plans_mutate_admin on public.pricing_plans;
create policy pricing_plans_mutate_admin on public.pricing_plans
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists user_portfolios_owner_or_admin on public.user_portfolios;
create policy user_portfolios_owner_or_admin on public.user_portfolios
for all
using (
  user_id = auth.uid()
  or public.is_admin(auth.uid())
)
with check (
  user_id = auth.uid()
  or public.is_admin(auth.uid())
);

drop policy if exists user_profile_data_owner_or_admin on public.user_profile_data;
create policy user_profile_data_owner_or_admin on public.user_profile_data
for all
using (
  user_id = auth.uid()
  or public.is_admin(auth.uid())
)
with check (
  user_id = auth.uid()
  or public.is_admin(auth.uid())
);

drop policy if exists payment_requests_select_owner_or_admin on public.payment_requests;
create policy payment_requests_select_owner_or_admin on public.payment_requests
for select
using (
  user_id = auth.uid()
  or public.is_admin(auth.uid())
);

drop policy if exists payment_requests_insert_owner_or_admin on public.payment_requests;
create policy payment_requests_insert_owner_or_admin on public.payment_requests
for insert
with check (
  user_id = auth.uid()
  or public.is_admin(auth.uid())
);

drop policy if exists payment_requests_update_admin on public.payment_requests;
create policy payment_requests_update_admin on public.payment_requests
for update
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists payment_requests_delete_admin on public.payment_requests;
create policy payment_requests_delete_admin on public.payment_requests
for delete
using (public.is_admin(auth.uid()));

drop policy if exists linkedin_sync_tokens_owner_or_admin on public.linkedin_sync_tokens;
create policy linkedin_sync_tokens_owner_or_admin on public.linkedin_sync_tokens
for all
using (
  user_id = auth.uid()
  or public.is_admin(auth.uid())
)
with check (
  user_id = auth.uid()
  or public.is_admin(auth.uid())
);

drop policy if exists experiences_select_public_or_owner on public.experiences;
create policy experiences_select_public_or_owner on public.experiences
for select
using (
  exists (
    select 1
    from public.profiles p
    where p.id = experiences.profile_id
      and (
        p.published = true
        or p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
);

drop policy if exists experiences_mutate_owner_or_admin on public.experiences;
create policy experiences_mutate_owner_or_admin on public.experiences
for all
using (
  exists (
    select 1
    from public.profiles p
    where p.id = experiences.profile_id
      and (
        p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = experiences.profile_id
      and (
        p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
);

drop policy if exists education_select_public_or_owner on public.education;
create policy education_select_public_or_owner on public.education
for select
using (
  exists (
    select 1
    from public.profiles p
    where p.id = education.profile_id
      and (
        p.published = true
        or p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
);

drop policy if exists education_mutate_owner_or_admin on public.education;
create policy education_mutate_owner_or_admin on public.education
for all
using (
  exists (
    select 1
    from public.profiles p
    where p.id = education.profile_id
      and (
        p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = education.profile_id
      and (
        p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
);

drop policy if exists projects_select_public_or_owner on public.projects;
create policy projects_select_public_or_owner on public.projects
for select
using (
  exists (
    select 1
    from public.profiles p
    where p.id = projects.profile_id
      and (
        p.published = true
        or p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
);

drop policy if exists projects_mutate_owner_or_admin on public.projects;
create policy projects_mutate_owner_or_admin on public.projects
for all
using (
  exists (
    select 1
    from public.profiles p
    where p.id = projects.profile_id
      and (
        p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = projects.profile_id
      and (
        p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
);

drop policy if exists skills_select_public_or_owner on public.skills;
create policy skills_select_public_or_owner on public.skills
for select
using (
  exists (
    select 1
    from public.profiles p
    where p.id = skills.profile_id
      and (
        p.published = true
        or p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
);

drop policy if exists skills_mutate_owner_or_admin on public.skills;
create policy skills_mutate_owner_or_admin on public.skills
for all
using (
  exists (
    select 1
    from public.profiles p
    where p.id = skills.profile_id
      and (
        p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
)
with check (
  exists (
    select 1
    from public.profiles p
    where p.id = skills.profile_id
      and (
        p.id = auth.uid()
        or public.is_admin(auth.uid())
      )
  )
);

-- ---------- Seed Data ----------

insert into public.templates (id, name, description, is_premium, tier)
values
  ('a6367315-3772-48cf-8e47-8ce1939e6d64', 'free1', 'Default free template', false, 'free'),
  ('87a762bd-5dd8-49a9-a134-a2c3f98d90e0', 'free2', 'Second free template', false, 'free'),
  ('dd03cc41-fb3d-4d3f-8fdd-4c7ae36eb3ae', 'pro1', 'Professional template', true, 'pro'),
  ('0480b20a-e6da-4f8e-b450-e6b72e09804a', 'enterprise1', 'Enterprise template', true, 'enterprise')
on conflict (id) do update
set
  name = excluded.name,
  description = excluded.description,
  is_premium = excluded.is_premium,
  tier = excluded.tier;

insert into public.pricing_plans (name, description, price, validity_months, can_use_pro, can_use_premium)
values
  ('free', 'Basic free plan', 0, 12, false, false),
  ('pro', 'Pro subscription plan', 499, 1, true, false),
  ('enterprise', 'Enterprise subscription plan', 1499, 1, true, true)
on conflict (name) do update
set
  description = excluded.description,
  price = excluded.price,
  validity_months = excluded.validity_months,
  can_use_pro = excluded.can_use_pro,
  can_use_premium = excluded.can_use_premium;
