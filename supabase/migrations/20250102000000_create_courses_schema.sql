create extension if not exists "uuid-ossp";
create extension if not exists "moddatetime";

create table public.topics (
  id text primary key,
  label text not null,
  color_key text not null,
  image_url text
);

create table public.subtopics (
  id uuid primary key default uuid_generate_v4(),
  topic_id text not null references public.topics(id) on delete cascade,
  title text not null,
  description text not null,
  "order" integer not null default 0
);

create table public.courses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  category text not null check (category in ('Economics', 'Art', 'History', 'Philosophy', 'Science', 'Culture', 'Music', 'Politics', 'For You')),
  image_url text not null,
  duration integer not null default 0,
  lessons integer not null default 0,
  total_chapters integer not null default 0,
  is_featured boolean not null default false,
  is_trending boolean not null default false,
  is_recommended boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.chapters (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  "order" integer not null,
  duration integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.slides (
  id uuid primary key default uuid_generate_v4(),
  chapter_id uuid not null references public.chapters(id) on delete cascade,
  type text not null check (type in ('text', 'text_image', 'quote', 'quote_image', 'image_only')),
  "order" integer not null,
  content text,
  author text,
  media_url text,
  media_type text check (media_type in ('image', 'video')),
  caption text,
  created_at timestamptz not null default now()
);

create table public.course_subtopics (
  course_id uuid not null references public.courses(id) on delete cascade,
  subtopic_id uuid not null references public.subtopics(id) on delete cascade,
  primary key (course_id, subtopic_id)
);

create table public.learning_paths (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  category text not null,
  image_url text not null,
  total_courses integer not null default 0,
  total_duration integer not null default 0,
  is_path_of_the_week boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.learning_path_courses (
  path_id uuid not null references public.learning_paths(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  "order" integer not null default 0,
  primary key (path_id, course_id)
);

create index idx_subtopics_topic_id on public.subtopics(topic_id);
create index idx_chapters_course_id on public.chapters(course_id);
create index idx_chapters_course_order on public.chapters(course_id, "order");
create index idx_slides_chapter_id on public.slides(chapter_id);
create index idx_slides_chapter_order on public.slides(chapter_id, "order");
create index idx_course_subtopics_course_id on public.course_subtopics(course_id);
create index idx_course_subtopics_subtopic_id on public.course_subtopics(subtopic_id);
create index idx_learning_path_courses_path_id on public.learning_path_courses(path_id);
create index idx_learning_path_courses_course_id on public.learning_path_courses(course_id);
create index idx_courses_featured on public.courses(is_featured) where is_featured = true;
create index idx_courses_trending on public.courses(is_trending) where is_trending = true;
create index idx_courses_recommended on public.courses(is_recommended) where is_recommended = true;
create index idx_learning_paths_path_of_week on public.learning_paths(is_path_of_the_week) where is_path_of_the_week = true;

create trigger update_courses_updated_at
  before update on public.courses
  for each row
  execute procedure moddatetime(updated_at);

create trigger update_learning_paths_updated_at
  before update on public.learning_paths
  for each row
  execute procedure moddatetime(updated_at);

create or replace function update_course_chapter_counts()
returns trigger
language plpgsql
as $$
begin
  update public.courses
  set
    total_chapters = (
      select count(*)::integer
      from public.chapters
      where course_id = coalesce(new.course_id, old.course_id)
    ),
    lessons = (
      select count(*)::integer
      from public.chapters
      where course_id = coalesce(new.course_id, old.course_id)
    )
  where id = coalesce(new.course_id, old.course_id);
  return coalesce(new, old);
end;
$$;

create trigger update_course_counts_on_chapter_change
  after insert or update or delete on public.chapters
  for each row
  execute procedure update_course_chapter_counts();

create or replace function update_learning_path_counts()
returns trigger
language plpgsql
as $$
declare
  path_uuid uuid;
begin
  path_uuid := coalesce(new.path_id, old.path_id);
  
  update public.learning_paths
  set
    total_courses = (
      select count(*)::integer
      from public.learning_path_courses
      where path_id = path_uuid
    ),
    total_duration = (
      select coalesce(sum(c.duration), 0)::integer
      from public.learning_path_courses lpc
      join public.courses c on c.id = lpc.course_id
      where lpc.path_id = path_uuid
    )
  where id = path_uuid;
  
  return coalesce(new, old);
end;
$$;

create trigger update_path_counts_on_course_change
  after insert or update or delete on public.learning_path_courses
  for each row
  execute procedure update_learning_path_counts();

create or replace function update_path_counts_on_course_duration_change()
returns trigger
language plpgsql
as $$
begin
  update public.learning_paths
  set
    total_duration = (
      select coalesce(sum(c.duration), 0)::integer
      from public.learning_path_courses lpc
      join public.courses c on c.id = lpc.course_id
      where lpc.path_id = learning_paths.id
    )
  where id in (
    select path_id
    from public.learning_path_courses
    where course_id = new.id
  );
  return new;
end;
$$;

create trigger update_path_counts_on_course_duration_change
  after update of duration on public.courses
  for each row
  when (old.duration is distinct from new.duration)
  execute procedure update_path_counts_on_course_duration_change();

