-- Merge services-page and home-services into a single services collection

insert into public.site_content (id, data)
select 'services', data
from public.site_content
where id = 'services-page'
on conflict (id) do update
  set data = excluded.data,
      updated_at = now();

delete from public.site_content
where id in ('services-page', 'home-services');
