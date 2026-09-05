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
-- Demo social state: likes, stars, member notes.
-- Publishable key can read/write these while auth is still local.

create table if not exists public.house_likes (
  member_id text not null,
  person_id text not null,
  primary key (member_id, person_id)
);

create table if not exists public.house_favorites (
  member_id text not null,
  person_id text not null,
  primary key (member_id, person_id)
);

create table if not exists public.house_chats (
  id text primary key,
  a_id text not null,
  b_id text not null,
  lines jsonb not null default '[]'
);

alter table public.house_likes enable row level security;
alter table public.house_favorites enable row level security;
alter table public.house_chats enable row level security;
alter table public.house_introductions enable row level security;
alter table public.house_concierge enable row level security;

drop policy if exists "demo likes" on public.house_likes;
create policy "demo likes" on public.house_likes for all using (true) with check (true);

drop policy if exists "demo favorites" on public.house_favorites;
create policy "demo favorites" on public.house_favorites for all using (true) with check (true);

drop policy if exists "demo chats" on public.house_chats;
create policy "demo chats" on public.house_chats for all using (true) with check (true);

drop policy if exists "demo introductions" on public.house_introductions;
create policy "demo introductions" on public.house_introductions for all using (true) with check (true);

drop policy if exists "demo concierge" on public.house_concierge;
create policy "demo concierge" on public.house_concierge for all using (true) with check (true);

drop policy if exists "public members are readable when authenticated" on public.house_members;
create policy "public members readable" on public.house_members for select using (true);
-- Apply after 0001 + 0002. Photos live in the Next app at /images/people/{id}.jpg

insert into public.house_members (id, first_name, age, city_area, photo_path, intention, traits, visibility, verified, path, about, why, difference, moment_hint) values
('maya','Maya',32,'West of the river','/images/people/maya.jpg','A long-term relationship','{Measured,Warm,Private}','private',true,'woman-seeking-man','I work in architecture. I like evenings that do not ask me to perform.','','','quiet'),
('elena','Elena',31,'The old quarter','/images/people/elena.jpg','A life partnership','{Precise,Dry humour,Loyal}','public',true,'woman-seeking-man','I restore paintings.','She treats attention as a scarce material.','She keeps a quieter social life than you sometimes want.','quiet'),
('nora','Nora',34,'Near the gardens','/images/people/nora.jpg','A long-term relationship','{Curious,Warm,Independent}','public',true,'woman-seeking-man','I edit documentary films.','She is interested in ordinary Tuesdays.','She is away more often than a settled week easily holds.','travel'),
('iris','Iris',29,'East ridge','/images/people/iris.jpg','Marriage','{Direct,Kind,Family-minded}','public',true,'woman-seeking-man','I run a small ceramics studio.','She is ready to build something lasting.','She is closer to wanting children than you have said out loud.','food'),
('hana','Hana',36,'By the water','/images/people/hana.jpg','A life partnership','{Calm,Exact,Witty}','public',true,'woman-seeking-man','I practise law and keep Fridays empty.','She protects time the way you do.','She is less spontaneous than your better weekends.','quiet'),
('lucia','Lucia',33,'The old quarter','/images/people/lucia.jpg','A long-term relationship','{Musical,Warm,Considered}','public',true,'woman-seeking-man','I teach piano.','You share a preference for atmosphere over spectacle.','She is more at ease in a group than you usually are.','playful'),
('claire','Claire',38,'West of the river','/images/people/claire.jpg','A life partnership','{Grounded,Private,Generous}','public',true,'woman-seeking-man','I design gardens.','She makes things slowly.','Her days are quieter than your present week allows.','quiet'),
('amara','Amara',30,'Near the gardens','/images/people/amara.jpg','A long-term relationship','{Thoughtful,Playful,Steady}','public',true,'woman-seeking-man','I write for a journal and keep a serious kitchen.','She has humour that does not need an audience.','She is more social at a table than on a dance floor.','food'),
('sienna','Sienna',35,'East ridge','/images/people/sienna.jpg','Marriage','{Intentional,Warm,Clear}','public',true,'woman-seeking-man','I work in publishing.','She takes language seriously.','She would like to be married sooner than a long courtship prefers.','quiet'),
('viola','Viola',28,'By the water','/images/people/viola.jpg','A long-term relationship','{Curious,Independent,Kind}','public',true,'woman-seeking-man','I work in conservation.','She can travel without turning a person into a postcard.','She needs more solitude than a full social week easily gives.','travel'),
('priya','Priya',37,'West of the river','/images/people/priya.jpg','A life partnership','{Measured,Witty,Loyal}','public',true,'woman-seeking-man','I run a research lab.','She wants fewer people, known well.','Her work weeks are longer than a leisurely courtship assumes.','food'),
('wren','Wren',32,'The old quarter','/images/people/wren.jpg','A long-term relationship','{Private,Warm,Exact}','private',true,'woman-seeking-man','Private profile.','','','quiet'),
('julian','Julian',33,'West of the river','/images/people/julian.jpg','A life partnership','{Intentional,Warm,Curious}','public',true,'man-seeking-woman','I edit books. I cook on Sundays.','You both want a quieter life.','He prefers quieter evenings than you sometimes do.','quiet'),
('marcus','Marcus',36,'East ridge','/images/people/marcus.jpg','Marriage','{Steady,Dry humour,Family-minded}','public',true,'man-seeking-woman','I run a small workshop.','Shared wish for a household.','He is ready for children sooner than you have said.','food'),
('daniel','Daniel',34,'Near the gardens','/images/people/daniel.jpg','A long-term relationship','{Considered,Musical,Loyal}','public',true,'man-seeking-woman','I teach, and I keep Fridays.','You both protect your weekends.','He is more social in groups than you are.','playful'),
('thomas','Thomas',38,'By the water','/images/people/thomas.jpg','A life partnership','{Calm,Exact,Kind}','public',true,'man-seeking-woman','I design gardens.','A shared preference for making things slowly.','He lives more quietly than your present week allows.','quiet'),
('owen','Owen',31,'The old quarter','/images/people/owen.jpg','A long-term relationship','{Curious,Grounded,Warm}','public',true,'man-seeking-woman','I cook for a living.','He understands food as care.','His work nights run later than a quiet household prefers.','food'),
('felix','Felix',39,'West of the river','/images/people/felix.jpg','A life partnership','{Measured,Witty,Loyal}','public',true,'man-seeking-woman','I practise architecture.','He notices rooms the way you do.','He is slower to decide than your patience sometimes likes.','quiet'),
('adrian','Adrian',35,'East ridge','/images/people/adrian.jpg','Marriage','{Direct,Generous,Steady}','public',true,'man-seeking-woman','I run a family firm.','He is clear about wanting a life.','He is more conventional about weekends than you are.','food'),
('nico','Nico',29,'By the water','/images/people/nico.jpg','A long-term relationship','{Playful,Kind,Independent}','public',true,'man-seeking-woman','I photograph still lives.','He has humour without cruelty.','He is away more than a settled February easily holds.','travel'),
('rafael','Rafael',37,'Near the gardens','/images/people/rafael.jpg','A life partnership','{Musical,Warm,Considered}','public',true,'man-seeking-woman','I conduct.','He understands atmosphere.','Performance weeks make him less available.','playful'),
('leo','Leo',32,'The old quarter','/images/people/leo.jpg','A long-term relationship','{Curious,Calm,Honest}','public',true,'man-seeking-woman','I write history.','He is serious about ordinary days.','His social energy arrives in bursts.','quiet'),
('james','James',35,'East ridge','/images/people/james.jpg','Marriage','{Direct,Generous,Grounded}','private',true,'man-seeking-woman','Private profile.','','','food')
on conflict (id) do nothing;
