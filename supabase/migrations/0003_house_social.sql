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
