create schema if not exists extensions;

drop extension if exists moddatetime;

create extension if not exists "moddatetime" with schema extensions;

alter function extensions.moddatetime(text) set search_path = '';

drop trigger if exists update_courses_updated_at on public.courses;
drop trigger if exists update_learning_paths_updated_at on public.learning_paths;
drop trigger if exists update_user_course_progress_updated_at on public.user_course_progress;
drop trigger if exists update_user_chapter_progress_updated_at on public.user_chapter_progress;
drop trigger if exists update_user_path_progress_updated_at on public.user_path_progress;

create trigger update_courses_updated_at
  before update on public.courses
  for each row
  execute procedure extensions.moddatetime(updated_at);

create trigger update_learning_paths_updated_at
  before update on public.learning_paths
  for each row
  execute procedure extensions.moddatetime(updated_at);

create trigger update_user_course_progress_updated_at
  before update on public.user_course_progress
  for each row
  execute procedure extensions.moddatetime(updated_at);

create trigger update_user_chapter_progress_updated_at
  before update on public.user_chapter_progress
  for each row
  execute procedure extensions.moddatetime(updated_at);

create trigger update_user_path_progress_updated_at
  before update on public.user_path_progress
  for each row
  execute procedure extensions.moddatetime(updated_at);

create or replace function public.update_course_chapter_counts()
returns trigger
language plpgsql
security definer
set search_path = ''
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

create or replace function public.update_learning_path_counts()
returns trigger
language plpgsql
security definer
set search_path = ''
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

create or replace function public.update_path_counts_on_course_duration_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.learning_paths lp
  set
    total_duration = (
      select coalesce(sum(c.duration), 0)::integer
      from public.learning_path_courses lpc
      join public.courses c on c.id = lpc.course_id
      where lpc.path_id = lp.id
    )
  where id in (
    select path_id
    from public.learning_path_courses
    where course_id = new.id
  );
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

