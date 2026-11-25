begin;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  type text not null check (type in ('hoc_thu','kiem_tra_dau_vao','tu_van')),
  parent_name text not null check (char_length(parent_name) between 2 and 80),
  phone text not null check (char_length(phone) between 9 and 15),
  student_name text check (char_length(student_name) <= 80),
  grade int check (grade between 1 and 9),
  school_level text check (school_level in ('tieu_hoc','thcs')),
  school text check (char_length(school) <= 120),
  subjects text[] not null default '{}',
  learning_mode text check (learning_mode in ('truc_tiep','online')),
  preferred_date date,
  preferred_time text check (char_length(preferred_time) <= 80),
  note text check (char_length(note) <= 500),
  status text not null default 'moi'
    check (status in ('moi','da_lien_he','da_xep_lich','da_hoc_thu','da_nhap_hoc','huy')),
  admin_note text
);
create index if not exists registrations_created_at_idx on public.registrations (created_at desc);

-- Danh sách tài khoản quản trị
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists trg_registrations_updated on public.registrations;
create trigger trg_registrations_updated before update on public.registrations
for each row execute function public.set_updated_at();

alter table public.registrations enable row level security;
alter table public.admins enable row level security;

-- Khách chỉ được THÊM các cột form; không đọc được, không tự đặt status/admin_note
revoke all on public.registrations from anon, authenticated;
revoke all on public.admins from anon, authenticated;
grant insert (type, parent_name, phone, student_name, grade, school_level, school, subjects, learning_mode, preferred_date, preferred_time, note)
  on public.registrations to anon, authenticated;
grant select, update, delete on public.registrations to authenticated;
grant select on public.admins to authenticated;

drop policy if exists "public can insert" on public.registrations;
create policy "public can insert" on public.registrations
  for insert to anon, authenticated with check (status = 'moi' and admin_note is null);

-- Chỉ admin được xem / sửa / xóa
drop policy if exists "admin select" on public.registrations;
create policy "admin select" on public.registrations for select to authenticated using (public.is_admin());
drop policy if exists "admin update" on public.registrations;
create policy "admin update" on public.registrations for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin delete" on public.registrations;
create policy "admin delete" on public.registrations for delete to authenticated using (public.is_admin());
drop policy if exists "admin read self" on public.admins;
create policy "admin read self" on public.admins for select to authenticated using (user_id = auth.uid());

commit;

-- Thêm tài khoản quản trị (chạy sau khi đã tạo user trong Supabase Auth):
-- insert into public.admins (user_id) select id from auth.users where email = 'luongngocthai2811@gmail.com';
