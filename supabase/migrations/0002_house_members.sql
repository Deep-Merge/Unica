-- House members: the Available room. String slugs match the app catalog.
-- When real auth arrives, map house_members.id to profiles via user_id.

create table if not exists public.house_members (
  id text primary key,
  first_name text not null,
  age integer not null check (age >= 21),
  city_area text not null,
  photo_path text not null,
  intention text not null,
  traits text[] not null default '{}',
  visibility public.visibility not null default 'private',
  verified boolean not null default false,
  path text not null,
  about text not null,
  why text,
  difference text,
  moment_hint text,
  created_at timestamptz not null default now()
);

alter table public.house_members enable row level security;

create policy "public members are readable when authenticated"
  on public.house_members
  for select
  using (visibility = 'public');

create table if not exists public.house_introductions (
  id text primary key,
  a_id text not null references public.house_members (id),
  b_id text not null references public.house_members (id),
  for_member_id text not null references public.house_members (id),
  status public.intro_status not null default 'matchmaker_review',
  moment jsonb,
  created_at date not null default current_date
);

alter table public.house_introductions enable row level security;

create table if not exists public.house_concierge (
  id text primary key,
  member_id text not null references public.house_members (id),
  from_house boolean not null default false,
  body text not null,
  at text not null default 'Just now',
  created_at timestamptz not null default now()
);

alter table public.house_concierge enable row level security;
