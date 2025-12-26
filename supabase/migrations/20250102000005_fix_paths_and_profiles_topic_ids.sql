-- Fix learning_paths: replace category with topic_id foreign key
alter table public.learning_paths add column topic_id text references public.topics(id) on delete restrict;

-- Set topic_id for existing paths based on category
-- Map category text to topic id
update public.learning_paths
set topic_id = case
  when category = 'Art' then 'culture'  -- Art maps to culture topic
  when category = 'Economics' then 'economics'
  when category = 'History' then 'history'
  when category = 'Philosophy' then 'philosophy'
  when category = 'Science' then 'science'
  when category = 'Culture' then 'culture'
  when category = 'Music' then 'culture'  -- Music maps to culture topic
  when category = 'Politics' then 'politics'
  else 'culture'  -- Default fallback
end;

-- Make topic_id required and drop category
alter table public.learning_paths alter column topic_id set not null;
alter table public.learning_paths drop column category;

-- Fix profiles: replace topic_ids array with topic_id single value
alter table public.profiles add column topic_id text references public.topics(id) on delete set null;

-- Set topic_id from first element of topic_ids array (if exists)
update public.profiles
set topic_id = topic_ids[1]
where array_length(topic_ids, 1) > 0;

-- Drop topic_ids array column
alter table public.profiles drop column topic_ids;

