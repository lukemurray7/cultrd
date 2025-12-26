# Phase 2: Seed Database and Update Query Hooks

## Overview

Seed the database with mock data from the application, then update all query hooks to fetch from Supabase instead of using mocks. This includes transforming database results to match existing TypeScript types.

## Data Mapping Strategy

### ID Strategy
- Use deterministic UUIDs based on string IDs from mocks (using `uuid_generate_v5` with a namespace)
- This allows predictable IDs for testing and ensures relationships are maintained
- Alternative: Generate new UUIDs and maintain a mapping table (more complex)

### Data Structure Mapping

1. **Topics** (`constants/topics.ts` → `topics` table)
   - Direct mapping: id, label, color_key
   - Note: image_url will be null (images are local assets)

2. **Subtopics** (`mockCoursesByTopic` → `subtopics` table)
   - Extract from nested structure in `mockCoursesByTopic`
   - Each topic has multiple subtopics
   - Need to assign order based on array position

3. **Courses** (Multiple sources → `courses` table)
   - Sources: `mockFeaturedCourse`, `mockTrendingCourses`, `mockRecommendedCourses`, `mockLibraryCourses`, `mockCoursesByTopic`
   - Map: id, title, description, category, imageUrl → image_url, duration, lessons, totalChapters
   - Flags: is_featured, is_trending, is_recommended
   - Note: `lessons` and `total_chapters` will be calculated from chapters

4. **Chapters** (From courses → `chapters` table)
   - Extract from `chapters` array in each course
   - Map: id, title, duration, order
   - Link to course via course_id

5. **Slides** (`mockCourseContent` → `slides` table)
   - Extract from `chapters[].slides[]` in courseContent
   - Map all slide types: text, text_image, quote, quote_image, image_only
   - Map: id, type, order, content, author, media_url, media_type, caption

6. **Course-Subtopics** (`mockCoursesByTopic` → `course_subtopics` table)
   - Link courses to their subtopics based on nested structure

7. **Learning Paths** (`mockPaths` → `learning_paths` table)
   - Map: id, title, description, category, imageUrl → image_url
   - Set is_path_of_the_week flag
   - Note: total_courses and total_duration will be calculated

8. **Learning Path Courses** (`mockPaths[].courses` → `learning_path_courses` table)
   - Link paths to courses using course IDs
   - Maintain order from array

## Implementation Tasks

### Task 1: Create Seed Data Migration

Create `supabase/migrations/[timestamp]_seed_mock_data.sql`:

1. **Insert Topics**
   - Insert all topics from `constants/topics.ts`
   - Use text IDs: "history", "economics", "philosophy", "culture", "music", "politics", "science"

2. **Insert Subtopics**
   - Extract subtopics from `mockCoursesByTopic` structure
   - Create subtopics for each topic (e.g., "European History", "World Wars" for history)
   - Assign order based on array position

3. **Insert Courses**
   - Collect all unique courses from all mock sources
   - Use deterministic UUIDs: `uuid_generate_v5(uuid_ns_url(), 'course-' || course_id)`
   - Set flags: is_featured, is_trending, is_recommended based on source
   - Calculate duration from chapters

4. **Insert Chapters**
   - For each course, insert its chapters
   - Use deterministic UUIDs: `uuid_generate_v5(uuid_ns_url(), 'chapter-' || chapter_id)`
   - Set order based on array position

5. **Insert Slides**
   - For each chapter in `mockCourseContent`, insert slides
   - Use deterministic UUIDs: `uuid_generate_v5(uuid_ns_url(), 'slide-' || slide_id)`
   - Map slide types correctly
   - Set order based on array position

6. **Insert Course-Subtopic Relationships**
   - Link courses to subtopics based on `mockCoursesByTopic` structure

7. **Insert Learning Paths**
   - Insert paths from `mockPathOfTheWeek`, `mockContinueLearningPaths`, `mockExplorePaths`
   - Use deterministic UUIDs for paths
   - Set is_path_of_the_week flag

8. **Insert Learning Path Courses**
   - Link paths to courses using course UUIDs
   - Maintain order from courses array

### Task 2: Create Helper Functions for Data Transformation

Create `lib/utils/dbTransformers.ts`:
- `transformCourse(courseRow, chapters?, progress?)` - Transform DB course to Course type
- `transformCourseContent(courseRow, chaptersWithSlides)` - Transform to CourseContent type
- `transformPath(pathRow, courses?, progress?)` - Transform to LearningPath/LearningPathProgress
- `transformChapter(chapterRow, slides?, isCompleted?)` - Transform to Chapter/ChapterContent

### Task 3: Update courses.ts Query Hooks

Update `lib/queries/courses.ts`:

1. **useFeaturedCourse()**
   - Query: `supabase.from('courses').select('*, chapters(*, order)').eq('is_featured', true).limit(1).single()`
   - Join with user_course_progress for progress
   - Transform to FeaturedCourse type

2. **useTrendingCourses()**
   - Query: `supabase.from('courses').select('*, chapters(*)').eq('is_trending', true).order('created_at')`
   - Join with user_course_progress
   - Transform to Course[]

3. **useRecommendedCourses()**
   - Query: `supabase.from('courses').select('*, chapters(*)').eq('is_recommended', true).order('created_at')`
   - Join with user_course_progress
   - Transform to Course[]

4. **useLibraryCourses()**
   - Query: `supabase.from('courses').select('*, chapters(*), user_course_progress(*)').eq('user_course_progress.user_id', userId)`
   - Filter to only courses with progress
   - Transform to Course[] with progress

5. **useCourse(courseId)**
   - Query: `supabase.from('courses').select('*, chapters(*)').eq('id', courseId).single()`
   - Join with user_course_progress
   - Transform to Course

6. **useCoursesByTopic(topicId)**
   - Query: Join courses → course_subtopics → subtopics → topics
   - Filter by topic_id
   - Group by subtopic
   - Transform to TopicCourses structure

7. **useCoursesBySubtopic(subtopicId)**
   - Query: Join courses → course_subtopics → subtopics
   - Filter by subtopic_id
   - Transform to Subtopic structure

8. **useAllCoursesByTopic()**
   - Query all topics with their subtopics and courses
   - Transform to TopicCourses[]

### Task 4: Update courseContent.ts Query Hooks

Update `lib/queries/courseContent.ts`:

1. **useCourseContent(courseId)**
   - Query: `supabase.from('courses').select('*, chapters(*, slides(*))').eq('id', courseId).single()`
   - Join with user_chapter_progress to mark chapters as completed
   - Order chapters by order, slides by order
   - Transform to CourseContent type

### Task 5: Update paths.ts Query Hooks

Update `lib/queries/paths.ts`:

1. **usePathOfTheWeek()**
   - Query: `supabase.from('learning_paths').select('*, learning_path_courses(course_id, order, courses(*))').eq('is_path_of_the_week', true).single()`
   - Transform to PathOfTheWeek

2. **useContinueLearningPaths()**
   - Query: `supabase.from('learning_paths').select('*, learning_path_courses(course_id, order), user_path_progress(*)').eq('user_path_progress.user_id', userId)`
   - Filter to paths with progress
   - Transform to LearningPathProgress[]

3. **useExplorePaths()**
   - Query: `supabase.from('learning_paths').select('*, learning_path_courses(course_id, order)').neq('is_path_of_the_week', true)`
   - Exclude paths user has progress on
   - Transform to LearningPath[]

4. **usePath(pathId)**
   - Query: `supabase.from('learning_paths').select('*, learning_path_courses(course_id, order, courses(*)), user_path_progress(*)').eq('id', pathId).single()`
   - Transform to LearningPath or LearningPathProgress based on progress

5. **useAllUserPaths()**
   - Query: `supabase.from('learning_paths').select('*, learning_path_courses(course_id, order), user_path_progress(*)').eq('user_path_progress.user_id', userId)`
   - Transform to LearningPathProgress[]

6. **usePathCourses(courseIds)**
   - Query: `supabase.from('courses').select('*, chapters(*)').in('id', courseIds)`
   - Transform to Course[]
   - Maintain order from courseIds array

### Task 6: Handle Loading and Error States

Ensure all query hooks:
- Return proper loading states (`isLoading` from TanStack Query)
- Handle errors gracefully
- Return null/empty arrays appropriately
- Use proper TypeScript types

### Task 7: Update Components (if needed)

Verify components handle:
- Loading states properly
- Null/undefined data gracefully
- Progress calculations correctly

## Key Considerations

1. **Deterministic UUIDs**: Use `uuid_generate_v5` with namespace to create predictable UUIDs from string IDs
2. **Progress Calculation**: Calculate progress from user progress tables, not from course data
3. **Ordering**: Maintain order from mock data arrays using `order` columns
4. **Relationships**: Ensure foreign keys are properly linked using deterministic UUIDs
5. **Type Safety**: Transform database rows to match existing TypeScript types exactly
6. **Performance**: Use efficient queries with proper joins and indexes
7. **User Context**: All user-specific queries need `auth.uid()` for RLS

## Files to Create/Modify

**New Files:**
- `supabase/migrations/[timestamp]_seed_mock_data.sql` - Seed data migration
- `lib/utils/dbTransformers.ts` - Data transformation utilities

**Modified Files:**
- `lib/queries/courses.ts` - Replace all mocks with Supabase queries
- `lib/queries/courseContent.ts` - Replace mocks with Supabase queries
- `lib/queries/paths.ts` - Replace mocks with Supabase queries

**Optional (for cleanup):**
- Remove or deprecate mock files after migration is verified

## Testing Checklist

- [ ] Seed data migration runs successfully
- [ ] All courses are seeded correctly
- [ ] All chapters and slides are linked properly
- [ ] Learning paths are created with correct course relationships
- [ ] Featured/trending/recommended flags work
- [ ] Progress queries return correct data
- [ ] Loading states work in components
- [ ] Error handling works correctly
- [ ] Type transformations match expected types

