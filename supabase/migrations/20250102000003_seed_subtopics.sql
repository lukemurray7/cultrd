create extension if not exists "uuid-ossp";

do $$
begin

insert into public.subtopics (id, topic_id, title, description, "order") values
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-european-history'), 'history', 'European History', 'From the Renaissance to modern Europe', 0),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-world-wars'), 'history', 'World Wars', 'Understanding the conflicts that shaped the modern world', 1),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-ancient-civilizations'), 'history', 'Ancient Civilizations', 'Exploring the foundations of human civilization', 2),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-american-history'), 'history', 'American History', 'The story of the United States from colonization to today', 3),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-macroeconomics'), 'economics', 'Macroeconomics', 'Understanding the economy at a national and global level', 0),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-microeconomics'), 'economics', 'Microeconomics', 'Individual markets and consumer behavior', 1),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-behavioral-economics'), 'economics', 'Behavioral Economics', 'Psychology meets economics', 2),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-ancient-philosophy'), 'philosophy', 'Ancient Philosophy', 'The foundations of Western thought', 0),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-modern-philosophy'), 'philosophy', 'Modern Philosophy', 'Enlightenment thinkers and beyond', 1),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-ethics'), 'philosophy', 'Ethics', 'Moral philosophy and right conduct', 2),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-biology'), 'science', 'Biology', 'The study of life and living organisms', 0),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-physics'), 'science', 'Physics', 'The fundamental laws of the universe', 1),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-chemistry'), 'science', 'Chemistry', 'The science of matter and its transformations', 2),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-astronomy'), 'science', 'Astronomy', 'Exploring the cosmos', 3),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-world-cultures'), 'culture', 'World Cultures', 'Exploring diverse societies and traditions', 0),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-cultural-studies'), 'culture', 'Cultural Studies', 'Analyzing culture, identity, and society', 1),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-music-history'), 'music', 'Music History', 'The evolution of musical expression', 0),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-music-theory'), 'music', 'Music Theory', 'Understanding the language of music', 1),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-political-theory'), 'politics', 'Political Theory', 'Foundational ideas in political thought', 0),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-international-relations'), 'politics', 'International Relations', 'Global politics and diplomacy', 1),
  (uuid_generate_v5(uuid_ns_url(), 'subtopic-comparative-politics'), 'politics', 'Comparative Politics', 'Comparing political systems across countries', 2)
on conflict (id) do nothing;

insert into public.course_subtopics (course_id, subtopic_id)
select
  uuid_generate_v5(uuid_ns_url(), 'course-wealth-inequality-101'),
  uuid_generate_v5(uuid_ns_url(), 'subtopic-macroeconomics')
union all select uuid_generate_v5(uuid_ns_url(), 'course-4'), uuid_generate_v5(uuid_ns_url(), 'subtopic-microeconomics')
union all select uuid_generate_v5(uuid_ns_url(), 'course-3'), uuid_generate_v5(uuid_ns_url(), 'subtopic-world-wars')
union all select uuid_generate_v5(uuid_ns_url(), 'course-eh-1'), uuid_generate_v5(uuid_ns_url(), 'subtopic-european-history')
union all select uuid_generate_v5(uuid_ns_url(), 'course-eh-3'), uuid_generate_v5(uuid_ns_url(), 'subtopic-european-history')
union all select uuid_generate_v5(uuid_ns_url(), 'course-ac-1'), uuid_generate_v5(uuid_ns_url(), 'subtopic-ancient-civilizations')
union all select uuid_generate_v5(uuid_ns_url(), 'course-ac-2'), uuid_generate_v5(uuid_ns_url(), 'subtopic-ancient-civilizations')
union all select uuid_generate_v5(uuid_ns_url(), 'course-5'), uuid_generate_v5(uuid_ns_url(), 'subtopic-ancient-philosophy')
union all select uuid_generate_v5(uuid_ns_url(), 'course-6'), uuid_generate_v5(uuid_ns_url(), 'subtopic-biology')
on conflict (course_id, subtopic_id) do nothing;

end $$;

