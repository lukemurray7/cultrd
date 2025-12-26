create extension if not exists "uuid-ossp";
create extension if not exists "moddatetime";

create table public.user_course_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  progress_percentage integer not null default 0 check (progress_percentage >= 0 and progress_percentage <= 100),
  current_chapter_order integer,
  last_accessed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table public.user_chapter_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  chapter_id uuid not null references public.chapters(id) on delete cascade,
  is_completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, chapter_id)
);

create table public.user_path_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  path_id uuid not null references public.learning_paths(id) on delete cascade,
  courses_completed integer not null default 0 check (courses_completed >= 0),
  progress_percentage integer not null default 0 check (progress_percentage >= 0 and progress_percentage <= 100),
  last_accessed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, path_id)
);

create index idx_user_course_progress_user_id on public.user_course_progress(user_id);
create index idx_user_course_progress_course_id on public.user_course_progress(course_id);
create index idx_user_course_progress_user_course on public.user_course_progress(user_id, course_id);
create index idx_user_chapter_progress_user_id on public.user_chapter_progress(user_id);
create index idx_user_chapter_progress_chapter_id on public.user_chapter_progress(chapter_id);
create index idx_user_chapter_progress_user_chapter on public.user_chapter_progress(user_id, chapter_id);
create index idx_user_path_progress_user_id on public.user_path_progress(user_id);
create index idx_user_path_progress_path_id on public.user_path_progress(path_id);
create index idx_user_path_progress_user_path on public.user_path_progress(user_id, path_id);

alter table public.user_course_progress enable row level security;
alter table public.user_chapter_progress enable row level security;
alter table public.user_path_progress enable row level security;

create policy "Users can view their own course progress"
  on public.user_course_progress
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own course progress"
  on public.user_course_progress
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own course progress"
  on public.user_course_progress
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own course progress"
  on public.user_course_progress
  for delete
  using (auth.uid() = user_id);

create policy "Users can view their own chapter progress"
  on public.user_chapter_progress
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own chapter progress"
  on public.user_chapter_progress
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own chapter progress"
  on public.user_chapter_progress
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own chapter progress"
  on public.user_chapter_progress
  for delete
  using (auth.uid() = user_id);

create policy "Users can view their own path progress"
  on public.user_path_progress
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own path progress"
  on public.user_path_progress
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own path progress"
  on public.user_path_progress
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own path progress"
  on public.user_path_progress
  for delete
  using (auth.uid() = user_id);

create trigger update_user_course_progress_updated_at
  before update on public.user_course_progress
  for each row
  execute procedure moddatetime(updated_at);

create trigger update_user_chapter_progress_updated_at
  before update on public.user_chapter_progress
  for each row
  execute procedure moddatetime(updated_at);

create trigger update_user_path_progress_updated_at
  before update on public.user_path_progress
  for each row
  execute procedure moddatetime(updated_at);

