create extension if not exists "uuid-ossp";

do $$
declare
  topic_history_id text := 'history';
  topic_economics_id text := 'economics';
  topic_philosophy_id text := 'philosophy';
  topic_science_id text := 'science';
  topic_culture_id text := 'culture';
  topic_music_id text := 'music';
  topic_politics_id text := 'politics';
  
  course_wealth_inequality_id uuid;
  course_2_id uuid;
  course_3_id uuid;
  course_4_id uuid;
  course_5_id uuid;
  course_6_id uuid;
  
  path_renaissance_art_id uuid;
  path_economics_101_id uuid;
  path_modern_stoicism_id uuid;
  path_ancient_history_id uuid;
  path_global_culture_id uuid;
  path_political_theory_id uuid;
begin

insert into public.topics (id, label, color_key, image_url) values
  ('history', 'History', 'history', null),
  ('economics', 'Economics', 'economics', null),
  ('philosophy', 'Philosophy', 'philosophy', null),
  ('science', 'Science', 'science', null),
  ('culture', 'Culture', 'culture', null),
  ('music', 'Music', 'music', null),
  ('politics', 'Politics', 'politics', null)
on conflict (id) do nothing;

insert into public.courses (id, title, description, category, image_url, duration, is_featured, is_trending, is_recommended) values
  (uuid_generate_v5(uuid_ns_url(), 'course-wealth-inequality-101'), 'Wealth Inequality', 'A deep dive into the widening gap, the COVID-19 effect, and the future of the global economy.', 'Economics', 'https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=800&auto=format&fit=crop', 25, true, true, false),
  (uuid_generate_v5(uuid_ns_url(), 'course-2'), 'Modern Art Movements, this is a really long title that should be truncated', '', 'Art', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWDW5nCrCmmujKugk70eawdAt0y_8VcSPpvEMjsT9oo_EgkmIm2dHvFae58t365G0jBv8_Zn-HhYXxWOX1cHGPHPrZmv4UFF2AD6O2S-R3AVF8RW179bRThrHAX3zhxduFZFI9fRqXHbDQzO9kFzzkD4p8LzZvt6k3HgIF6UrC7wgsFhdPv3kuWkbR3d9Hhb6nHblfw8-xHlbR9NIO-S704_NGEFyX1XEuzvn1hwUYxxdYjzp2gTzBz_rLLBAVsVB8kghSycDv7d5E', 0, false, true, false),
  (uuid_generate_v5(uuid_ns_url(), 'course-3'), 'Cold War Geopolitics', '', 'History', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPMFHpQQ93RNsLXJo8ZWjqovXj29idGeOok4fLC4Ma-rMFA2BrDqDE4HDMdcCyu189rtus9hQ6TIKfLFFk8v7k3rL6TAaNzVjZEcXnlGP1kvmwbJ0BKTv1v4ZKgfkoFzEogHK2xqP0KznNuPCkzOTVTyEVKODApG1E5ujM74485EyTWTBlJP9gLFqa9TVLOzPOiWdwRbQja3UAPdRAjaCxtm6t4GBGlEjfRhl2R4sE7vOU1L7aII5bTP9AO3jQ7pks1ApmAn8plpv9', 0, false, true, false),
  (uuid_generate_v5(uuid_ns_url(), 'course-4'), 'Supply & Demand', '', 'Economics', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJwpEhNwM3-Jd0v-rVvTyRGrmCaSBIQMuWv926Bxlynio57bB_MzdUr50iFz4XeNoA3eL01ryAcylUxfVIarxCZYr2oUicaFy_VBU0QDiqGM4Z5oXrK6Z_O7zrE3D9h8f8MJ4_OL53BG4Z1HYwTmLjgXTvG398a_tExUCXRtSGJyG1nDbp12HeJ6Wcj40mEfB8yvYjcyFhc422PrQ_cqZkQUY6vjVy8Wl8oZrM6GtTKD22QEk1l8ny8cbc12v7MmB-lJjBsZCdu8nf', 0, false, false, true),
  (uuid_generate_v5(uuid_ns_url(), 'course-5'), 'Stoicism in Modern Life', 'How ancient wisdom can help you navigate modern stress.', 'Philosophy', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSJl-qLvznExOX21MrEsIkM6uZ19Q1J8-nBbxbtP36M5Unbo2MrtYx2gEA2n1MU9WebfwWHphpmuYaG3knKlXJZEybV55wha4Ngu78_EpMvgYGi04Z6YRsSazwx9CGEhi8ua5HctpsScER2UXzRWI0d_ZlgHvpqCc4HmDyGvlWfOvGYMTNe5818HUFAaisE6H3WLqffPsnFKLpIYsBfLaZQJ9gXSx0-H8gZZeJ8YFssRtPHpBYnoLlcdwOocqkw4tHFu-sEdFdB4eY', 15, false, false, true),
  (uuid_generate_v5(uuid_ns_url(), 'course-6'), 'CRISPR & Gene Editing', 'Understanding the future of human biology and ethics.', 'Science', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl9AkFDrPkVu9kE_S5sqhtazV1tqSZqKcHJTnvyf0FCpHEwvKB_RbGqkMK7ZD5NPTitC-FeYpPD1QxFTv5nqLy8cXMAAN1hKnlehklelrEF49TQNM3sfQ_vy8BgN34x-_8Dmbk6_uHPD5QViL_pv7qlAuxC4CC7P4SjppnOp9OxXi-s75-QUpEuHMapfH_aoKChKlSqQtomm6VlHGTtQ_z9GgmJkWsqvUV5yLfjYVXQaqO1PeSlGtpTYYwO-u8n39vxYo9IIfZ4ndK', 8, false, false, true),
  (uuid_generate_v5(uuid_ns_url(), 'course-eh-1'), 'The Renaissance Era', 'Exploring the cultural and artistic revolution of the Renaissance', 'History', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOY7WUPoYPR2giHfrtpS0SjcJYJC1eL3oOw5psDJFS123S_egD3tPZLlWNS9M8aKyjEs4QhRKGB1o8Mk7kUykMZK32AyXm114rWJyrPPRHa8pFb4XoJZqbM9v4dZ-yZmCYyTC3c_ZKjlgcgeArjGni0vjw11xgxOhKT1uOktu5DnbMg2CCi-abNtJvSNnWfoALDsRdaL-hu6WilSZzE4Q6hy1yswNwpRAyY8-r4T_3uy_dRr0VwjoT1cd1IXsSs_NVr5jrYd7HjyiU', 45, false, false, false),
  (uuid_generate_v5(uuid_ns_url(), 'course-eh-3'), 'The Age of Enlightenment', 'Intellectual movements that shaped modern Western thought', 'History', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPMFHpQQ93RNsLXJo8ZWjqovXj29idGeOok4fLC4Ma-rMFA2BrDqDE4HDMdcCyu189rtus9hQ6TIKfLFFk8v7k3rL6TAaNzVjZEcXnlGP1kvmwbJ0BKTv1v4ZKgfkoFzEogHK2xqP0KznNuPCkzOTVTyEVKODApG1E5ujM74485EyTWTBlJP9gLFqa9TVLOzPOiWdwRbQja3UAPdRAjaCxtm6t4GBGlEjfRhl2R4sE7vOU1L7aII5bTP9AO3jQ7pks1ApmAn8plpv9', 42, false, false, false),
  (uuid_generate_v5(uuid_ns_url(), 'course-ac-1'), 'Ancient Rome: Rise and Fall', 'The empire that dominated the Mediterranean world', 'History', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOY7WUPoYPR2giHfrtpS0SjcJYJC1eL3oOw5psDJFS123S_egD3tPZLlWNS9M8aKyjEs4QhRKGB1o8Mk7kUykMZK32AyXm114rWJyrPPRHa8pFb4XoJZqbM9v4dZ-yZmCYyTC3c_ZKjlgcgeArjGni0vjw11xgxOhKT1uOktu5DnbMg2CCi-abNtJvSNnWfoALDsRdaL-hu6WilSZzE4Q6hy1yswNwpRAyY8-r4T_3uy_dRr0VwjoT1cd1IXsSs_NVr5jrYd7HjyiU', 56, false, false, false),
  (uuid_generate_v5(uuid_ns_url(), 'course-ac-2'), 'Ancient Greece: Democracy and Philosophy', 'The birthplace of Western civilization', 'History', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPMFHpQQ93RNsLXJo8ZWjqovXj29idGeOok4fLC4Ma-rMFA2BrDqDE4HDMdcCyu189rtus9hQ6TIKfLFFk8v7k3rL6TAaNzVjZEcXnlGP1kvmwbJ0BKTv1v4ZKgfkoFzEogHK2xqP0KznNuPCkzOTVTyEVKODApG1E5ujM74485EyTWTBlJP9gLFqa9TVLOzPOiWdwRbQja3UAPdRAjaCxtm6t4GBGlEjfRhl2R4sE7vOU1L7aII5bTP9AO3jQ7pks1ApmAn8plpv9', 49, false, false, false)
on conflict (id) do nothing;

select id into course_wealth_inequality_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-wealth-inequality-101');
select id into course_2_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-2');
select id into course_3_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-3');
select id into course_4_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-4');
select id into course_5_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-5');
select id into course_6_id from public.courses where id = uuid_generate_v5(uuid_ns_url(), 'course-6');

insert into public.chapters (id, course_id, title, "order", duration) values
  (uuid_generate_v5(uuid_ns_url(), 'chapter-ch_1'), course_wealth_inequality_id, 'The Big Picture', 1, 5),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-ch_2'), course_wealth_inequality_id, 'The COVID-19 Acceleration', 2, 5),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-ch_3'), course_wealth_inequality_id, 'The Cost of Opportunity', 3, 5),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-ch_4'), course_wealth_inequality_id, 'Erosion of Democracy', 4, 5),
  (uuid_generate_v5(uuid_ns_url(), 'chapter-ch_5'), course_wealth_inequality_id, 'Pathways to Change', 5, 5)
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
  ('s1_1', 'ch_1', 'text', 1, 'Wealth inequality refers to the unequal distribution of assets in a population. This includes everything from savings and stocks to real estate.', null, null, null, null),
  ('s1_2', 'ch_1', 'text_image', 2, 'Globally, the richest 10% own 76% of all wealth, while the bottom 50% own just 2%.', null, 'https://images.unsplash.com/photo-1611974714851-4820613297a1?q=80&w=800', 'image', null),
  ('s1_3', 'ch_1', 'quote', 3, 'Inequality is the root of social ills.', 'Pope Francis', null, null, null),
  ('s1_4', 'ch_1', 'image_only', 4, null, null, 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=800', 'image', 'The visual representation of the wealth pyramid is steeper than ever.'),
  ('s1_5', 'ch_1', 'text', 5, 'Income is what you earn; Wealth is what you keep. The gap in wealth is almost always wider than the gap in income.', null, null, null, null),
  ('s1_6', 'ch_1', 'quote_image', 6, 'The top 0.1% have as much wealth as the bottom 90% in the United States.', 'Bernie Sanders', 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800', 'image', null),
  ('s1_7', 'ch_1', 'text', 7, 'This isn''t just about ''rich people.'' It''s about how the structure of the economy favors capital over labor.', null, null, null, null),
  ('s1_8', 'ch_1', 'text_image', 8, 'Historical data shows that inequality often leads to periods of high social unrest.', null, 'https://images.unsplash.com/photo-1573163226840-00431be7a275?q=80&w=800', 'image', null),
  ('s1_9', 'ch_1', 'quote', 9, 'Capitalism without competition isn''t capitalism; it''s exploitation.', 'Joe Biden', null, null, null),
  ('s1_10', 'ch_1', 'image_only', 10, null, null, 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?q=80&w=800', 'image', 'Stock market growth often benefits only the top tier of asset holders.'),
  ('s1_11', 'ch_1', 'text', 11, 'When the cost of living outpaces wage growth, the middle class begins to vanish.', null, null, null, null),
  ('s1_12', 'ch_1', 'quote_image', 12, 'The problem isn''t that people are getting rich, it''s that everyone else is getting stuck.', 'Economic Analyst', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800', 'image', null),
  ('s2_1', 'ch_2', 'text', 1, 'The 2020 pandemic was a ''black swan'' event that shifted wealth at a speed never seen before in human history.', null, null, null, null),
  ('s2_2', 'ch_2', 'text_image', 2, 'While millions lost their jobs, the world''s billionaires saw their wealth increase by 50%.', null, 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=800', 'image', null),
  ('s2_3', 'ch_2', 'quote', 3, 'We are not all in the same boat. We are in the same storm, but some are in superyachts while others are clinging to debris.', 'Unknown', null, null, null),
  ('s2_4', 'ch_2', 'image_only', 4, null, null, 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=800', 'image', 'Empty streets for some, digital booms for others.'),
  ('s2_5', 'ch_2', 'text', 5, 'Tech giants like Amazon and Zoom saw their valuations explode as the physical world shut down.', null, null, null, null),
  ('s2_6', 'ch_2', 'quote_image', 6, 'The pandemic created a new billionaire every 26 hours.', 'Oxfam', 'https://images.unsplash.com/photo-1618044733300-9472154093ee?q=80&w=800', 'image', null),
  ('s2_7', 'ch_2', 'text', 7, 'Low-wage workers, particularly in the service industry, were hit the hardest by both health risks and economic loss.', null, null, null, null),
  ('s2_8', 'ch_2', 'text_image', 8, 'The ''K-Shaped'' recovery: Tech and finance went UP, while tourism and retail went DOWN.', null, 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800', 'image', null),
  ('s2_9', 'ch_2', 'quote', 9, 'Crisis is a catalyst for the concentration of power.', 'Economist Insight', null, null, null),
  ('s2_10', 'ch_2', 'image_only', 10, null, null, 'https://images.unsplash.com/photo-1584931423298-c576fda54bd2?q=80&w=800', 'image', 'The digital divide became a survival divide.'),
  ('s2_11', 'ch_2', 'text', 11, 'Government stimulus helped, but much of that liquidity ended up back in the stock market, further inflating asset prices.', null, null, null, null),
  ('s2_12', 'ch_2', 'quote_image', 12, 'The rich stayed home and got richer; the poor went to work and got sick.', 'Public Health Report', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800', 'image', null),
  ('s3_1', 'ch_3', 'text', 1, 'Inequality isn''t just a number. It determines who gets to be an inventor, a doctor, or an entrepreneur.', null, null, null, null),
  ('s3_2', 'ch_3', 'text_image', 2, 'High-income families can invest significantly more in ''Enrichment Expenditures'' for their children.', null, 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800', 'image', null),
  ('s3_3', 'ch_3', 'quote', 3, 'Talent is universal; opportunity is not.', 'Nicholas Kristof', null, null, null),
  ('s3_4', 'ch_3', 'image_only', 4, null, null, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800', 'image', 'Education is the ladder, but the rungs are moving further apart.'),
  ('s3_5', 'ch_3', 'text', 5, 'When the bottom 50% cannot afford higher education, the entire economy loses out on potential innovation.', null, null, null, null),
  ('s3_6', 'ch_3', 'quote_image', 6, 'A child''s zip code shouldn''t determine their destiny.', 'Social Justice Advocate', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800', 'image', null),
  ('s3_7', 'ch_3', 'text', 7, 'Inequality also impacts physical health. Stress from financial instability reduces life expectancy by years.', null, null, null, null),
  ('s3_8', 'ch_3', 'text_image', 8, 'The ''Wealth Gap'' is often a ''Health Gap''—cleaner air, better food, and lower stress are bought.', null, 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800', 'image', null),
  ('s3_9', 'ch_3', 'quote', 9, 'The greatest waste in the world is the difference between what we are and what we could become.', 'Ben Herbster', null, null, null),
  ('s3_10', 'ch_3', 'image_only', 10, null, null, 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=800', 'image', 'Community investment is the only way to bridge the gap.'),
  ('s3_11', 'ch_3', 'text', 11, 'When a small group controls all resources, they also control the ''entry points'' to the market.', null, null, null, null),
  ('s3_12', 'ch_3', 'quote_image', 12, 'True freedom is impossible without economic security.', 'Franklin D. Roosevelt', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800', 'image', null),
  ('s4_1', 'ch_4', 'text', 1, 'How does wealth affect your vote? In many systems, money isn''t just currency—it''s speech.', null, null, null, null),
  ('s4_2', 'ch_4', 'text_image', 2, 'Lobbying efforts by the ultra-wealthy often lead to policies that favor capital over people.', null, 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800', 'image', null),
  ('s4_3', 'ch_4', 'quote', 3, 'The end of democracy and the defeat of the American Revolution will occur when government falls into the hands of lending institutions and moneyed incorporations.', 'Thomas Jefferson', null, null, null),
  ('s4_4', 'ch_4', 'image_only', 4, null, null, 'https://images.unsplash.com/photo-1541872703-74c5e443d1fe?q=80&w=800', 'image', 'The halls of power are often lined with gold.'),
  ('s4_5', 'ch_4', 'text', 5, 'When people feel the ''system is rigged,'' they lose faith in democratic institutions and turn to populism.', null, null, null, null),
  ('s4_6', 'ch_4', 'quote_image', 6, 'Concentrated wealth is a direct threat to the principle of ''one person, one vote.''', 'Political Scientist', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800', 'image', null),
  ('s4_7', 'ch_4', 'text', 7, 'Tax havens allow the ultra-wealthy to opt-out of the social contract that everyone else has to follow.', null, null, null, null),
  ('s4_8', 'ch_4', 'text_image', 8, 'An estimated $20 trillion is hidden in offshore accounts, away from public funding.', null, 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800', 'image', null),
  ('s4_9', 'ch_4', 'quote', 9, 'Justice is not for sale, but it is often out of reach.', 'Legal Aid Expert', null, null, null),
  ('s4_10', 'ch_4', 'image_only', 10, null, null, 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800', 'image', 'The scales of justice require balance.'),
  ('s4_11', 'ch_4', 'text', 11, 'Stabilizing democracy requires re-balancing the economic scales to ensure everyone has a stake.', null, null, null, null),
  ('s4_12', 'ch_4', 'quote_image', 12, 'A house divided against itself cannot stand.', 'Abraham Lincoln', 'https://images.unsplash.com/photo-1503917988258-f19772007ee5?q=80&w=800', 'image', null),
  ('s5_1', 'ch_5', 'text', 1, 'The good news? Inequality is not a law of nature. It can be changed through intentional policy.', null, null, null, null),
  ('s5_2', 'ch_5', 'text_image', 2, 'Closing tax loopholes and implementing a global minimum corporate tax are the first steps.', null, 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=800', 'image', null),
  ('s5_3', 'ch_5', 'quote', 3, 'The history of the 20th century shows that we can reduce inequality without destroying growth.', 'Thomas Piketty', null, null, null),
  ('s5_4', 'ch_5', 'image_only', 4, null, null, 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800', 'image', 'Collaborative economies are rising.'),
  ('s5_5', 'ch_5', 'text', 5, 'Universal Basic Income (UBI) and strengthened labor unions are being reconsidered as vital tools.', null, null, null, null),
  ('s5_6', 'ch_5', 'quote_image', 6, 'We need an economy that serves humanity, not the other way around.', 'Economic Reformer', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800', 'image', null),
  ('s5_7', 'ch_5', 'text', 7, 'Employee-owned businesses and cooperatives share the wealth generated by workers directly with those workers.', null, null, null, null),
  ('s5_8', 'ch_5', 'text_image', 8, 'Investments in green energy can create millions of high-paying, middle-class jobs.', null, 'https://images.unsplash.com/photo-1466611653911-954ff21caafc?q=80&w=800', 'image', null),
  ('s5_9', 'ch_5', 'quote', 9, 'The best way to predict the future is to create it.', 'Peter Drucker', null, null, null),
  ('s5_10', 'ch_5', 'image_only', 10, null, null, 'https://images.unsplash.com/photo-1521791136364-758a4d31793a?q=80&w=800', 'image', 'Handshakes that mean shared prosperity.'),
  ('s5_11', 'ch_5', 'text', 11, 'By participating in local politics and demanding transparency, citizens can reclaim the economic narrative.', null, null, null, null),
  ('s5_12', 'ch_5', 'quote_image', 12, 'It always seems impossible until it''s done.', 'Nelson Mandela', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800', 'image', null)
) as slide_data(id, chapter_id, type, "order", content, author, media_url, media_type, caption)
on conflict (id) do nothing;

insert into public.learning_paths (id, title, description, category, image_url, is_path_of_the_week) values
  (uuid_generate_v5(uuid_ns_url(), 'path-path-renaissance-art'), 'Mastering Renaissance Art', 'Explore the artistic revolution that transformed Europe', 'Art', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOY7WUPoYPR2giHfrtpS0SjcJYJC1eL3oOw5psDJFS123S_egD3tPZLlWNS9M8aKyjEs4QhRKGB1o8Mk7kUykMZK32AyXm114rWJyrPPRHa8pFb4XoJZqbM9v4dZ-yZmCYyTC3c_ZKjlgcgeArjGni0vjw11xgxOhKT1uOktu5DnbMg2CCi-abNtJvSNnWfoALDsRdaL-hu6WilSZzE4Q6hy1yswNwpRAyY8-r4T_3uy_dRr0VwjoT1cd1IXsSs_NVr5jrYd7HjyiU', true),
  (uuid_generate_v5(uuid_ns_url(), 'path-path-economics-101'), 'Economics 101', 'Invisible forces shaping the world', 'Economics', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJwpEhNwM3-Jd0v-rVvTyRGrmCaSBIQMuWv926Bxlynio57bB_MzdUr50iFz4XeNoA3eL01ryAcylUxfVIarxCZYr2oUicaFy_VBU0QDiqGM4Z5oXrK6Z_O7zrE3D9h8f8MJ4_OL53BG4Z1HYwTmLjgXTvG398a_tExUCXRtSGJyG1nDbp12HeJ6Wcj40mEfB8yvYjcyFhc422PrQ_cqZkQUY6vjVy8Wl8oZrM6GtTKD22QEk1l8ny8cbc12v7MmB-lJjBsZCdu8nf', false),
  (uuid_generate_v5(uuid_ns_url(), 'path-path-modern-stoicism'), 'Modern Stoicism', 'Applying ancient wisdom today', 'Philosophy', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSJl-qLvznExOX21MrEsIkM6uZ19Q1J8-nBbxbtP36M5Unbo2MrtYx2gEA2n1MU9WebfwWHphpmuYaG3knKlXJZEybV55wha4Ngu78_EpMvgYGi04Z6YRsSazwx9CGEhi8ua5HctpsScER2UXzRWI0d_ZlgHvpqCc4HmDyGvlWfOvGYMTNe5818HUFAaisE6H3WLqffPsnFKLpIYsBfLaZQJ9gXSx0-H8gZZeJ8YFssRtPHpBYnoLlcdwOocqkw4tHFu-sEdFdB4eY', false),
  (uuid_generate_v5(uuid_ns_url(), 'path-path-ancient-history'), 'Ancient History', 'Exploring the foundations of human civilization', 'History', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPMFHpQQ93RNsLXJo8ZWjqovXj29idGeOok4fLC4Ma-rMFA2BrDqDE4HDMdcCyu189rtus9hQ6TIKfLFFk8v7k3rL6TAaNzVjZEcXnlGP1kvmwbJ0BKTv1v4ZKgfkoFzEogHK2xqP0KznNuPCkzOTVTyEVKODApG1E5ujM74485EyTWTBlJP9gLFqa9TVLOzPOiWdwRbQja3UAPdRAjaCxtm6t4GBGlEjfRhl2R4sE7vOU1L7aII5bTP9AO3jQ7pks1ApmAn8plpv9', false),
  (uuid_generate_v5(uuid_ns_url(), 'path-path-global-culture'), 'Global Culture', 'Understanding diverse societies and traditions', 'Culture', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWDW5nCrCmmujKugk70eawdAt0y_8VcSPpvEMjsT9oo_EgkmIm2dHvFae58t365G0jBv8_Zn-HhYXxWOX1cHGPHPrZmv4UFF2AD6O2S-R3AVF8RW179bRThrHAX3zhxduFZFI9fRqXHbDQzO9kFzzkD4p8LzZvt6k3HgIF6UrC7wgsFhdPv3kuWkbR3d9Hhb6nHblfw8-xHlbR9NIO-S704_NGEFyX1XEuzvn1hwUYxxdYjzp2gTzBz_rLLBAVsVB8kghSycDv7d5E', false),
  (uuid_generate_v5(uuid_ns_url(), 'path-path-political-theory'), 'Political Theory', 'Foundational ideas in political thought', 'Politics', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJwpEhNwM3-Jd0v-rVvTyRGrmCaSBIQMuWv926Bxlynio57bB_MzdUr50iFz4XeNoA3eL01ryAcylUxfVIarxCZYr2oUicaFy_VBU0QDiqGM4Z5oXrK6Z_O7zrE3D9h8f8MJ4_OL53BG4Z1HYwTmLjgXTvG398a_tExUCXRtSGJyG1nDbp12HeJ6Wcj40mEfB8yvYjcyFhc422PrQ_cqZkQUY6vjVy8Wl8oZrM6GtTKD22QEk1l8ny8cbc12v7MmB-lJjBsZCdu8nf', false)
on conflict (id) do nothing;

select id into path_renaissance_art_id from public.learning_paths where id = uuid_generate_v5(uuid_ns_url(), 'path-path-renaissance-art');
select id into path_economics_101_id from public.learning_paths where id = uuid_generate_v5(uuid_ns_url(), 'path-path-economics-101');
select id into path_modern_stoicism_id from public.learning_paths where id = uuid_generate_v5(uuid_ns_url(), 'path-path-modern-stoicism');
select id into path_ancient_history_id from public.learning_paths where id = uuid_generate_v5(uuid_ns_url(), 'path-path-ancient-history');
select id into path_global_culture_id from public.learning_paths where id = uuid_generate_v5(uuid_ns_url(), 'path-path-global-culture');
select id into path_political_theory_id from public.learning_paths where id = uuid_generate_v5(uuid_ns_url(), 'path-path-political-theory');

insert into public.learning_path_courses (path_id, course_id, "order") 
select 
  path_renaissance_art_id,
  uuid_generate_v5(uuid_ns_url(), 'course-2'),
  0
union all select path_renaissance_art_id, uuid_generate_v5(uuid_ns_url(), 'course-eh-1'), 1
union all select path_renaissance_art_id, uuid_generate_v5(uuid_ns_url(), 'course-eh-3'), 2
union all select path_renaissance_art_id, uuid_generate_v5(uuid_ns_url(), 'course-ac-1'), 3
union all select path_renaissance_art_id, uuid_generate_v5(uuid_ns_url(), 'course-ac-2'), 4
on conflict (path_id, course_id) do nothing;

end $$;

