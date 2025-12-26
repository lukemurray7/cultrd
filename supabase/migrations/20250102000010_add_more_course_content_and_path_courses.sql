create extension if not exists "uuid-ossp";

do $$
declare
  course_2_id uuid;
  course_3_id uuid;
  course_4_id uuid;
  course_5_id uuid;
  course_6_id uuid;
  course_eh_1_id uuid;
  course_eh_3_id uuid;
  course_ac_1_id uuid;
  course_ac_2_id uuid;
  
  path_economics_101_id uuid;
  path_modern_stoicism_id uuid;
  path_ancient_history_id uuid;
  path_global_culture_id uuid;
  path_political_theory_id uuid;
begin

select id into course_2_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-2');
select id into course_3_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-3');
select id into course_4_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-4');
select id into course_5_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-5');
select id into course_6_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-6');
select id into course_eh_1_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-eh-1');
select id into course_eh_3_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-eh-3');
select id into course_ac_1_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-ac-1');
select id into course_ac_2_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-ac-2');

select id into path_economics_101_id from public.learning_paths where id = uuid_generate_v5(uuid_ns_url(), 'path-path-economics-101');
select id into path_modern_stoicism_id from public.learning_paths where id = uuid_generate_v5(uuid_ns_url(), 'path-path-modern-stoicism');
select id into path_ancient_history_id from public.learning_paths where id = uuid_generate_v5(uuid_ns_url(), 'path-path-ancient-history');
select id into path_global_culture_id from public.learning_paths where id = uuid_generate_v5(uuid_ns_url(), 'path-path-global-culture');
select id into path_political_theory_id from public.learning_paths where id = uuid_generate_v5(uuid_ns_url(), 'path-path-political-theory');

insert into public.chapters (id, course_id, title, "order", duration) values
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-2-ch1'), course_2_id, 'Impressionism: Breaking the Rules', 1, 8),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-2-ch2'), course_2_id, 'Cubism: Seeing in Multiple Dimensions', 2, 7),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-2-ch3'), course_2_id, 'Abstract Expressionism: Emotion on Canvas', 3, 6),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-2-ch4'), course_2_id, 'Pop Art: Art Meets Consumer Culture', 4, 5),
  
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-3-ch1'), course_3_id, 'The Iron Curtain Descends', 1, 10),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-3-ch2'), course_3_id, 'Proxy Wars and Global Tensions', 2, 9),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-3-ch3'), course_3_id, 'The Space Race', 3, 8),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-3-ch4'), course_3_id, 'Détente and the End of an Era', 4, 7),
  
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-4-ch1'), course_4_id, 'Understanding Market Forces', 1, 6),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-4-ch2'), course_4_id, 'Price Elasticity', 2, 5),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-4-ch3'), course_4_id, 'Market Equilibrium', 3, 4),
  
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-5-ch1'), course_5_id, 'The Stoic Mindset', 1, 5),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-5-ch2'), course_5_id, 'Dichotomy of Control', 2, 5),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-5-ch3'), course_5_id, 'Applying Stoicism Today', 3, 5),
  
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-6-ch1'), course_6_id, 'What is CRISPR?', 1, 3),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-6-ch2'), course_6_id, 'The Science Behind Gene Editing', 2, 3),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-6-ch3'), course_6_id, 'Ethical Considerations', 3, 2),
  
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-eh-1-ch1'), course_eh_1_id, 'The Birth of Humanism', 1, 12),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-eh-1-ch2'), course_eh_1_id, 'Artistic Revolution', 2, 11),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-eh-1-ch3'), course_eh_1_id, 'Scientific Discovery', 3, 11),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-eh-1-ch4'), course_eh_1_id, 'Legacy and Impact', 4, 11),
  
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-eh-3-ch1'), course_eh_3_id, 'The Age of Reason', 1, 11),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-eh-3-ch2'), course_eh_3_id, 'Philosophes and Their Ideas', 2, 10),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-eh-3-ch3'), course_eh_3_id, 'Impact on Modern Thought', 3, 11),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-eh-3-ch4'), course_eh_3_id, 'Enlightenment and Revolution', 4, 10),
  
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-ac-1-ch1'), course_ac_1_id, 'The Roman Republic', 1, 14),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-ac-1-ch2'), course_ac_1_id, 'The Rise of Empire', 2, 14),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-ac-1-ch3'), course_ac_1_id, 'Pax Romana', 3, 14),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-ac-1-ch4'), course_ac_1_id, 'Decline and Fall', 4, 14),
  
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-ac-2-ch1'), course_ac_2_id, 'Athenian Democracy', 1, 12),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-ac-2-ch2'), course_ac_2_id, 'Socratic Method', 2, 13),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-ac-2-ch3'), course_ac_2_id, 'Plato and Aristotle', 3, 12),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-course-ac-2-ch4'), course_ac_2_id, 'Hellenistic Influence', 4, 12)
on conflict (id) do nothing;

insert into public.slides (id, chapter_id, type, "order", content, author, media_url, media_type, caption) 
select 
  uuid_generate_v5(uuid_ns_url(), 'slide-' || slide_data.id),
  uuid_generate_v5(uuid_ns_url(), 'chapter-' || slide_data.chapter_id),
  slide_data.type,
  slide_data."order",
  slide_data.content,
  slide_data.author,
  slide_data.media_url,
  slide_data.media_type,
  slide_data.caption
from (values
  ('course-2-ch1-s1', 'course-2-ch1', 'text', 1, 'Impressionism emerged in France in the 1860s, challenging the rigid rules of academic painting.', null, null, null, null),
  ('course-2-ch1-s2', 'course-2-ch1', 'text_image', 2, 'Artists like Monet and Renoir painted outdoors, capturing fleeting moments of light and color.', null, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800', 'image', null),
  ('course-2-ch1-s3', 'course-2-ch1', 'quote', 3, 'I paint what I see, not what others want me to see.', 'Claude Monet', null, null, null),
  ('course-2-ch1-s4', 'course-2-ch1', 'image_only', 4, null, null, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800', 'image', 'Water Lilies by Claude Monet exemplifies the impressionist style.'),
  ('course-2-ch2-s1', 'course-2-ch2', 'text', 1, 'Cubism, pioneered by Picasso and Braque, broke objects into geometric shapes viewed from multiple angles.', null, null, null, null),
  ('course-2-ch2-s2', 'course-2-ch2', 'quote_image', 2, 'Art is a lie that makes us realize truth.', 'Pablo Picasso', 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=800', 'image', null),
  ('course-2-ch3-s1', 'course-2-ch3', 'text', 1, 'Abstract Expressionism emerged in post-war America, emphasizing emotion and spontaneity.', null, null, null, null),
  ('course-2-ch3-s2', 'course-2-ch3', 'quote', 2, 'The painting has a life of its own.', 'Jackson Pollock', null, null, null),
  ('course-2-ch4-s1', 'course-2-ch4', 'text', 1, 'Pop Art blurred the line between high art and popular culture, using imagery from advertising and media.', null, null, null, null),
  ('course-2-ch4-s2', 'course-2-ch4', 'quote_image', 2, 'In the future, everyone will be world-famous for 15 minutes.', 'Andy Warhol', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=800', 'image', null),
  
  ('course-3-ch1-s1', 'course-3-ch1', 'text', 1, 'The Cold War began immediately after World War II, dividing the world into two ideological camps.', null, null, null, null),
  ('course-3-ch1-s2', 'course-3-ch1', 'text_image', 2, 'Winston Churchill''s "Iron Curtain" speech marked the symbolic beginning of this era.', null, 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800', 'image', null),
  ('course-3-ch1-s3', 'course-3-ch1', 'quote', 3, 'From Stettin in the Baltic to Trieste in the Adriatic, an iron curtain has descended across the Continent.', 'Winston Churchill', null, null, null),
  ('course-3-ch2-s1', 'course-3-ch2', 'text', 1, 'Proxy wars in Korea, Vietnam, and Afghanistan became battlegrounds for superpower influence.', null, null, null, null),
  ('course-3-ch2-s2', 'course-3-ch2', 'text_image', 2, 'These conflicts allowed the US and USSR to compete without direct nuclear confrontation.', null, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800', 'image', null),
  ('course-3-ch3-s1', 'course-3-ch3', 'text', 1, 'The Space Race became a symbol of technological and ideological superiority.', null, null, null, null),
  ('course-3-ch3-s2', 'course-3-ch3', 'quote_image', 2, 'That''s one small step for man, one giant leap for mankind.', 'Neil Armstrong', 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=800', 'image', null),
  ('course-3-ch4-s1', 'course-3-ch4', 'text', 1, 'Détente in the 1970s eased tensions, but the Cold War only ended with the fall of the Berlin Wall in 1989.', null, null, null, null),
  
  ('course-4-ch1-s1', 'course-4-ch1', 'text', 1, 'Supply and demand are the fundamental forces that determine prices in a market economy.', null, null, null, null),
  ('course-4-ch1-s2', 'course-4-ch1', 'text_image', 2, 'When demand exceeds supply, prices rise. When supply exceeds demand, prices fall.', null, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', 'image', null),
  ('course-4-ch2-s1', 'course-4-ch2', 'text', 1, 'Price elasticity measures how sensitive consumers are to price changes.', null, null, null, null),
  ('course-4-ch3-s1', 'course-4-ch3', 'text', 1, 'Market equilibrium occurs when supply equals demand, creating a stable price point.', null, null, null, null),
  
  ('course-5-ch1-s1', 'course-5-ch1', 'text', 1, 'Stoicism teaches us to focus on what we can control and accept what we cannot.', null, null, null, null),
  ('course-5-ch1-s2', 'course-5-ch1', 'quote', 2, 'You have power over your mind - not outside events. Realize this, and you will find strength.', 'Marcus Aurelius', null, null, null),
  ('course-5-ch2-s1', 'course-5-ch2', 'text', 1, 'The dichotomy of control divides everything into two categories: what we control and what we don''t.', null, null, null, null),
  ('course-5-ch2-s2', 'course-5-ch2', 'quote_image', 2, 'We suffer more often in imagination than in reality.', 'Seneca', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800', 'image', null),
  ('course-5-ch3-s1', 'course-5-ch3', 'text', 1, 'Modern applications of Stoicism can help manage stress, improve decision-making, and build resilience.', null, null, null, null),
  
  ('course-6-ch1-s1', 'course-6-ch1', 'text', 1, 'CRISPR-Cas9 is a revolutionary gene-editing tool that allows precise modification of DNA.', null, null, null, null),
  ('course-6-ch1-s2', 'course-6-ch1', 'text_image', 2, 'It works like molecular scissors, cutting DNA at specific locations to add, remove, or replace genes.', null, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800', 'image', null),
  ('course-6-ch2-s1', 'course-6-ch2', 'text', 1, 'The technology has potential to cure genetic diseases, improve crops, and even combat climate change.', null, null, null, null),
  ('course-6-ch3-s1', 'course-6-ch3', 'text', 1, 'Ethical questions arise about gene editing in humans, designer babies, and unintended consequences.', null, null, null, null),
  ('course-6-ch3-s2', 'course-6-ch3', 'quote', 2, 'With great power comes great responsibility.', 'Voltaire', null, null, null),
  
  ('course-eh-1-ch1-s1', 'course-eh-1-ch1', 'text', 1, 'The Renaissance began in 14th-century Italy, marking a rebirth of classical learning and humanism.', null, null, null, null),
  ('course-eh-1-ch1-s2', 'course-eh-1-ch1', 'text_image', 2, 'Humanism emphasized the value of human achievement and the study of classical texts.', null, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=800', 'image', null),
  ('course-eh-1-ch2-s1', 'course-eh-1-ch2', 'text', 1, 'Artists like Leonardo da Vinci, Michelangelo, and Raphael created masterpieces that still inspire today.', null, null, null, null),
  ('course-eh-1-ch2-s2', 'course-eh-1-ch2', 'quote_image', 2, 'Learning never exhausts the mind.', 'Leonardo da Vinci', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800', 'image', null),
  ('course-eh-1-ch3-s1', 'course-eh-1-ch3', 'text', 1, 'Scientific discoveries challenged medieval beliefs, paving the way for modern science.', null, null, null, null),
  ('course-eh-1-ch4-s1', 'course-eh-1-ch4', 'text', 1, 'The Renaissance laid the foundation for the modern world, influencing art, science, and thought for centuries.', null, null, null, null),
  
  ('course-eh-3-ch1-s1', 'course-eh-3-ch1', 'text', 1, 'The Enlightenment, spanning the 17th and 18th centuries, championed reason, science, and individual rights.', null, null, null, null),
  ('course-eh-3-ch1-s2', 'course-eh-3-ch1', 'quote', 2, 'Dare to know! Have courage to use your own reason!', 'Immanuel Kant', null, null, null),
  ('course-eh-3-ch2-s1', 'course-eh-3-ch2', 'text', 1, 'Thinkers like Voltaire, Rousseau, and Locke challenged traditional authority and promoted freedom.', null, null, null, null),
  ('course-eh-3-ch3-s1', 'course-eh-3-ch3', 'text', 1, 'Enlightenment ideas influenced the American and French Revolutions, shaping modern democracy.', null, null, null, null),
  ('course-eh-3-ch4-s1', 'course-eh-3-ch4', 'text', 1, 'The movement emphasized separation of powers, religious tolerance, and the rights of citizens.', null, null, null, null),
  
  ('course-ac-1-ch1-s1', 'course-ac-1-ch1', 'text', 1, 'Rome began as a small city-state and grew into one of history''s greatest empires.', null, null, null, null),
  ('course-ac-1-ch1-s2', 'course-ac-1-ch1', 'text_image', 2, 'The Republic lasted nearly 500 years, establishing systems of law and governance still studied today.', null, 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800', 'image', null),
  ('course-ac-1-ch2-s1', 'course-ac-1-ch2', 'text', 1, 'Julius Caesar''s rise marked the transition from Republic to Empire.', null, null, null, null),
  ('course-ac-1-ch2-s2', 'course-ac-1-ch2', 'quote', 2, 'I came, I saw, I conquered.', 'Julius Caesar', null, null, null),
  ('course-ac-1-ch3-s1', 'course-ac-1-ch3', 'text', 1, 'The Pax Romana brought 200 years of relative peace and prosperity across the Mediterranean.', null, null, null, null),
  ('course-ac-1-ch4-s1', 'course-ac-1-ch4', 'text', 1, 'Economic troubles, barbarian invasions, and internal decay led to the empire''s eventual fall.', null, null, null, null),
  
  ('course-ac-2-ch1-s1', 'course-ac-2-ch1', 'text', 1, 'Athens developed the world''s first democracy, giving citizens unprecedented political power.', null, null, null, null),
  ('course-ac-2-ch1-s2', 'course-ac-2-ch1', 'quote', 2, 'Democracy is the worst form of government, except for all the others.', 'Winston Churchill', null, null, null),
  ('course-ac-2-ch2-s1', 'course-ac-2-ch2', 'text', 1, 'Socrates developed the method of questioning that remains fundamental to education today.', null, null, null, null),
  ('course-ac-2-ch2-s2', 'course-ac-2-ch2', 'quote_image', 2, 'The unexamined life is not worth living.', 'Socrates', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800', 'image', null),
  ('course-ac-2-ch3-s1', 'course-ac-2-ch3', 'text', 1, 'Plato founded the Academy, while Aristotle tutored Alexander the Great.', null, null, null, null),
  ('course-ac-2-ch4-s1', 'course-ac-2-ch4', 'text', 1, 'Greek ideas spread across the known world, influencing cultures for millennia.', null, null, null, null)
) as slide_data(id, chapter_id, type, "order", content, author, media_url, media_type, caption)
on conflict (id) do nothing;

insert into public.learning_path_courses (path_id, course_id, "order") 
select 
  path_economics_101_id,
  uuid_generate_v5(uuid_ns_url(), 'course-wealth-inequality-101'),
  0
union all select path_economics_101_id, uuid_generate_v5(uuid_ns_url(), 'course-4'), 1
union all select path_modern_stoicism_id, uuid_generate_v5(uuid_ns_url(), 'course-5'), 0
union all select path_ancient_history_id, uuid_generate_v5(uuid_ns_url(), 'course-ac-1'), 0
union all select path_ancient_history_id, uuid_generate_v5(uuid_ns_url(), 'course-ac-2'), 1
union all select path_global_culture_id, uuid_generate_v5(uuid_ns_url(), 'course-2'), 0
union all select path_global_culture_id, uuid_generate_v5(uuid_ns_url(), 'course-eh-1'), 1
union all select path_political_theory_id, uuid_generate_v5(uuid_ns_url(), 'course-3'), 0
union all select path_political_theory_id, uuid_generate_v5(uuid_ns_url(), 'course-eh-3'), 1
on conflict (path_id, course_id) do nothing;

update public.courses
set duration = (
  select coalesce(sum(duration), 0)
  from public.chapters
  where chapters.course_id = courses.id
)
where id in (
  course_2_id, course_3_id, course_4_id, course_5_id, course_6_id,
  course_eh_1_id, course_eh_3_id, course_ac_1_id, course_ac_2_id
);

end $$;

