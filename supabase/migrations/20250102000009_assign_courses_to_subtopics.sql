insert into public.course_subtopics (course_id, subtopic_id)
values
  ('d14f8a3e-106f-5ff2-a8d4-7e967106d188', 'bf6ea726-f97b-5211-a2e1-144ad18729ba'),
  ('328b764c-b04d-55f8-bee9-b1d8cedd468d', '623a5fe0-2daa-514e-9bfa-bdc1eaef8d37'),
  ('5a6ebc6e-6938-53a8-b601-b608b610b4e6', 'e903fb7c-677c-5701-8a4d-c17b0617c246'),
  ('09122d13-b29a-5940-9825-2e5080186120', 'acdbc68c-6246-5264-b20e-bc666c79a009'),
  ('f21608fb-0cb5-51d2-9b52-779eacf59d3d', 'ca3e95cd-ed2b-54a5-95aa-cbcd84a6e350'),
  ('af21c440-44fd-59b7-a481-eca52566abaf', '7211aaf5-67ad-5bd3-a9cb-81a9e15b28c0')
on conflict (course_id, subtopic_id) do nothing;

