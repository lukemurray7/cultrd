-- Enable RLS on all content tables
alter table public.topics enable row level security;
alter table public.subtopics enable row level security;
alter table public.courses enable row level security;
alter table public.chapters enable row level security;
alter table public.slides enable row level security;
alter table public.course_subtopics enable row level security;
alter table public.learning_paths enable row level security;
alter table public.learning_path_courses enable row level security;

-- Allow public read access (anyone can view content)
create policy "Public can view topics"
  on public.topics
  for select
  using (true);

create policy "Public can view subtopics"
  on public.subtopics
  for select
  using (true);

create policy "Public can view courses"
  on public.courses
  for select
  using (true);

create policy "Public can view chapters"
  on public.chapters
  for select
  using (true);

create policy "Public can view slides"
  on public.slides
  for select
  using (true);

create policy "Public can view course_subtopics"
  on public.course_subtopics
  for select
  using (true);

create policy "Public can view learning_paths"
  on public.learning_paths
  for select
  using (true);

create policy "Public can view learning_path_courses"
  on public.learning_path_courses
  for select
  using (true);

-- Restrict write access - no public writes allowed
-- Admin policies can be added later if needed for content management
-- For now, only service role can write (via migrations/admin tools)

