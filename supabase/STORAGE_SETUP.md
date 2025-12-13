# Supabase Storage Setup for Course Images

## Overview

Course images are stored in Supabase Storage and served via CDN. Topic icons are bundled in the app and do not need to be stored in Supabase Storage.

## Storage Bucket Configuration

### Step 1: Create the Bucket

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Name: `course-images`
5. **Public bucket**: Enable this option (required for CDN access)
6. Click **Create bucket**

### Step 2: Configure Storage Policies

After creating the bucket, set up the following policies:

#### Public Read Access Policy

```sql
-- Allow public read access to all files in course-images bucket
CREATE POLICY "Public read access on course-images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'course-images');
```

#### Authenticated Write Access Policy

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated write access on course-images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'course-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update files
CREATE POLICY "Authenticated update access on course-images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'course-images' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated delete access on course-images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'course-images' 
  AND auth.role() = 'authenticated'
);
```

### Step 3: File Organization

Upload course images to the following structure:

```
course-images/
└── courses/
    ├── {course-id}.jpg
    ├── {course-id}.png
    └── ...
```

### Step 4: CDN URL Format

Once uploaded, images are accessible via CDN at:

```
https://{project-ref}.supabase.co/storage/v1/object/public/course-images/courses/{course-id}.{ext}
```

Example:
```
https://etmdylaxhgtxqbtyzstr.supabase.co/storage/v1/object/public/course-images/courses/abc123.jpg
```

### Step 5: Upload Images

You can upload images via:
- Supabase Dashboard (Storage → course-images → Upload)
- Supabase Storage API
- Supabase Client SDK

Example using Supabase JS client:

```typescript
const { data, error } = await supabase.storage
  .from('course-images')
  .upload(`courses/${courseId}.jpg`, imageFile, {
    cacheControl: '3600',
    upsert: false
  });

if (data) {
  const { data: urlData } = supabase.storage
    .from('course-images')
    .getPublicUrl(`courses/${courseId}.jpg`);
  
  // Store urlData.publicUrl in courses.image_url column
}
```

## Notes

- **File size limit**: Recommended max 5MB per image
- **Allowed formats**: JPEG, PNG, WebP
- **Topic icons**: These are bundled in the app (`app/utils/topicImages.ts`) and do not need to be uploaded to storage
- **Image optimization**: Consider using Supabase Image Transformations for on-the-fly resizing/optimization

