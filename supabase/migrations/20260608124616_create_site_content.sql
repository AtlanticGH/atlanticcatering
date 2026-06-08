-- Atlantic Catering CMS: site_content table + RLS policies

create table public.site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "Public read access"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

create policy "Authenticated insert"
  on public.site_content
  for insert
  to authenticated
  with check (true);

create policy "Authenticated update"
  on public.site_content
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated delete"
  on public.site_content
  for delete
  to authenticated
  using (true);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger site_content_updated_at
  before update on public.site_content
  for each row
  execute function public.set_site_content_updated_at();
