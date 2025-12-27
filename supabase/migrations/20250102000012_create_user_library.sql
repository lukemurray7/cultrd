create table public.user_library (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  path_id uuid references public.learning_paths(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (course_id is not null and path_id is null) or
    (course_id is null and path_id is not null)
  ),
  unique (user_id, course_id, path_id)
);

create index idx_user_library_user_id on public.user_library(user_id);
create index idx_user_library_course_id on public.user_library(course_id);
create index idx_user_library_path_id on public.user_library(path_id);
create index idx_user_library_user_course on public.user_library(user_id, course_id) where course_id is not null;
create index idx_user_library_user_path on public.user_library(user_id, path_id) where path_id is not null;

alter table public.user_library enable row level security;

create policy "Users can view their own library"
  on public.user_library
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own library items"
  on public.user_library
  for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own library items"
  on public.user_library
  for delete
  using (auth.uid() = user_id);

create trigger update_user_library_updated_at
  before update on public.user_library
  for each row
  execute procedure moddatetime(updated_at);

