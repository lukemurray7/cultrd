alter table public.profiles
add column current_streak integer not null default 0 check (current_streak >= 0),
add column last_streak_date date;

