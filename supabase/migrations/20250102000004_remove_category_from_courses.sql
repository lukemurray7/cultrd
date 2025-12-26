-- Remove category field from courses table
-- Category will be derived from course_subtopics -> subtopics -> topics relationship

alter table public.courses drop column category;

