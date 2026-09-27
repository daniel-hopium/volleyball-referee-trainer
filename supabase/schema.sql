-- Fortschritt pro Nutzer, eine Zeile mit dem kompletten Stand als JSON.
-- Einmal im Supabase-Dashboard unter "SQL Editor" ausführen.
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Row Level Security: Ohne diese Regeln könnte jeder mit dem öffentlichen Key alle Zeilen lesen.
alter table public.progress enable row level security;

create policy "Eigenen Fortschritt lesen" on public.progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Eigenen Fortschritt anlegen" on public.progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Eigenen Fortschritt ändern" on public.progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
