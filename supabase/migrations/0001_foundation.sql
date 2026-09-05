-- Verenne backend: Postgres + RLS. The app never writes introduction status
-- except through the transition rules in lib (later: RPC / edge function).

create extension if not exists "pgcrypto";

create type public.user_role as enum ('member', 'matchmaker', 'admin');
create type public.account_status as enum ('registered', 'email_pending', 'active', 'suspended', 'closed', 'deleted');
create type public.visibility as enum ('public', 'private');
create type public.intro_status as enum (
  'ai_suggested',
  'matchmaker_review',
  'matchmaker_approved',
  'first_member_pending',
  'second_member_pending',
  'mutual_interest_confirmed',
  'profiles_released',
  'introduction_scheduled',
  'introduction_completed',
  'follow_up_pending',
  'ongoing_connection',
  'no_mutual_fit',
  'successful_match',
  'closed',
  'expired'
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'member',
  account_status public.account_status not null default 'registered',
  preferred_name text,
  created_at timestamptz not null default now()
);

create table public.member_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  first_name text,
  age integer check (age is null or age >= 21),
  city text,
  path text,
  intention text,
  about text,
  visibility public.visibility not null default 'private',
  verified boolean not null default false
);

create table public.profile_photos (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.member_profiles (id) on delete cascade,
  storage_path text not null,
  approved boolean not null default false
);

create table public.matchmaker_assignments (
  member_id uuid not null references public.profiles (id) on delete cascade,
  matchmaker_id uuid not null references public.profiles (id) on delete cascade,
  primary key (member_id, matchmaker_id)
);

create table public.introductions (
  id uuid primary key default gen_random_uuid(),
  a_id uuid not null references public.profiles (id),
  b_id uuid not null references public.profiles (id),
  for_member_id uuid not null references public.profiles (id),
  status public.intro_status not null default 'matchmaker_review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.interest_decisions (
  id uuid primary key default gen_random_uuid(),
  introduction_id uuid not null references public.introductions (id) on delete cascade,
  member_id uuid not null references public.profiles (id),
  accepted boolean not null,
  created_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  age integer not null check (age >= 21),
  city text,
  path text,
  intention text,
  note text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table public.concierge_messages (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles (id) on delete cascade,
  from_house boolean not null default false,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id),
  action text not null,
  entity text not null,
  entity_id uuid,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.member_profiles enable row level security;
alter table public.profile_photos enable row level security;
alter table public.introductions enable row level security;
alter table public.interest_decisions enable row level security;
alter table public.applications enable row level security;
alter table public.concierge_messages enable row level security;
alter table public.audit_logs enable row level security;

create policy "own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "own member profile" on public.member_profiles
  for select using (user_id = auth.uid());

create policy "own introductions" on public.introductions
  for select using (auth.uid() in (a_id, b_id, for_member_id));

create policy "own concierge" on public.concierge_messages
  for select using (member_id = auth.uid());
