create or replace function public.update_course_progress_on_chapter_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_course_id uuid;
  v_chapter_order integer;
  v_total_chapters integer;
  v_completed_count integer;
  v_progress_percentage integer;
  v_next_chapter_order integer;
begin
  select course_id, "order" into v_course_id, v_chapter_order
  from public.chapters
  where id = coalesce(new.chapter_id, old.chapter_id);
  
  if v_course_id is null then
    return coalesce(new, old);
  end if;
  
  select count(*)::integer into v_total_chapters
  from public.chapters
  where course_id = v_course_id;
  
  if v_total_chapters = 0 then
    return coalesce(new, old);
  end if;
  
  select count(*)::integer into v_completed_count
  from public.user_chapter_progress ucp
  join public.chapters c on c.id = ucp.chapter_id
  where ucp.user_id = coalesce(new.user_id, old.user_id)
    and ucp.is_completed = true
    and c.course_id = v_course_id;
  
  v_progress_percentage := round((v_completed_count::numeric / v_total_chapters::numeric) * 100);
  
  if v_progress_percentage > 100 then
    v_progress_percentage := 100;
  end if;
  
  select coalesce(max(c."order"), 0) + 1 into v_next_chapter_order
  from public.user_chapter_progress ucp
  join public.chapters c on c.id = ucp.chapter_id
  where ucp.user_id = coalesce(new.user_id, old.user_id)
    and ucp.is_completed = true
    and c.course_id = v_course_id;
  
  if v_next_chapter_order > v_total_chapters then
    v_next_chapter_order := v_total_chapters;
  end if;
  
  if v_next_chapter_order < 1 then
    v_next_chapter_order := 1;
  end if;
  
  insert into public.user_course_progress (
    user_id,
    course_id,
    progress_percentage,
    current_chapter_order,
    last_accessed_at
  )
  values (
    coalesce(new.user_id, old.user_id),
    v_course_id,
    v_progress_percentage,
    v_next_chapter_order,
    now()
  )
  on conflict (user_id, course_id)
  do update set
    progress_percentage = excluded.progress_percentage,
    current_chapter_order = excluded.current_chapter_order,
    last_accessed_at = excluded.last_accessed_at;
  
  return coalesce(new, old);
end;
$$;

create trigger update_course_progress_on_chapter_completion
  after insert or update of is_completed on public.user_chapter_progress
  for each row
  when (new.is_completed = true)
  execute procedure public.update_course_progress_on_chapter_change();

