drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

create policy "Users can view their own profile"
  on public.profiles
  for select
  using ((select auth.uid()) = id);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  using ((select auth.uid()) = id);

drop policy if exists "Users can view their own course progress" on public.user_course_progress;
drop policy if exists "Users can insert their own course progress" on public.user_course_progress;
drop policy if exists "Users can update their own course progress" on public.user_course_progress;
drop policy if exists "Users can delete their own course progress" on public.user_course_progress;

create policy "Users can view their own course progress"
  on public.user_course_progress
  for select
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own course progress"
  on public.user_course_progress
  for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own course progress"
  on public.user_course_progress
  for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own course progress"
  on public.user_course_progress
  for delete
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can view their own chapter progress" on public.user_chapter_progress;
drop policy if exists "Users can insert their own chapter progress" on public.user_chapter_progress;
drop policy if exists "Users can update their own chapter progress" on public.user_chapter_progress;
drop policy if exists "Users can delete their own chapter progress" on public.user_chapter_progress;

create policy "Users can view their own chapter progress"
  on public.user_chapter_progress
  for select
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own chapter progress"
  on public.user_chapter_progress
  for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own chapter progress"
  on public.user_chapter_progress
  for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own chapter progress"
  on public.user_chapter_progress
  for delete
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can view their own path progress" on public.user_path_progress;
drop policy if exists "Users can insert their own path progress" on public.user_path_progress;
drop policy if exists "Users can update their own path progress" on public.user_path_progress;
drop policy if exists "Users can delete their own path progress" on public.user_path_progress;

create policy "Users can view their own path progress"
  on public.user_path_progress
  for select
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own path progress"
  on public.user_path_progress
  for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own path progress"
  on public.user_path_progress
  for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own path progress"
  on public.user_path_progress
  for delete
  using ((select auth.uid()) = user_id);

