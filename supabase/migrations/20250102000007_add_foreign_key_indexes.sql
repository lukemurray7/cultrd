create index if not exists idx_courses_topic_id on public.courses(topic_id);

create index if not exists idx_learning_paths_topic_id on public.learning_paths(topic_id);

create index if not exists idx_profiles_topic_id on public.profiles(topic_id);

