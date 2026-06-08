-- CMS media storage: public read, authenticated upload

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'cms-images',
    'cms-images',
    true,
    10485760,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
  ),
  (
    'cms-videos',
    'cms-videos',
    true,
    104857600,
    array['video/mp4', 'video/webm', 'video/quicktime']
  )
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public read cms-images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'cms-images');

create policy "Authenticated upload cms-images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'cms-images');

create policy "Authenticated update cms-images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'cms-images')
  with check (bucket_id = 'cms-images');

create policy "Authenticated delete cms-images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'cms-images');

create policy "Public read cms-videos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'cms-videos');

create policy "Authenticated upload cms-videos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'cms-videos');

create policy "Authenticated update cms-videos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'cms-videos')
  with check (bucket_id = 'cms-videos');

create policy "Authenticated delete cms-videos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'cms-videos');
