# Database Migrations

This directory contains SQL migration files for the Supabase database schema.

## Migration Files

### `20250112000000_create_courses_tables.sql`

Creates the courses database schema:

- **topics** table - Main topic categories (History, Economics, Philosophy, etc.)
- **subtopics** table - Subcategories within topics
- **courses** table - Individual courses with image URLs

Includes:
- Foreign key relationships with CASCADE delete
- Indexes for performance (slug uniqueness, display order sorting)
- Row Level Security (RLS) policies:
  - Public read access for all tables
  - Authenticated write access for all tables
- Triggers for auto-updating `updated_at` timestamps

## Applying Migrations

Migrations are applied using the Supabase MCP server. The migration files in this directory serve as:
- Version control for schema changes
- Documentation of database structure
- Reference for recreating the database

## Notes

- Topic icons are bundled in the app (`app/utils/topicImages.ts`) and do not need database storage
- Course images are stored in Supabase Storage (see `../STORAGE_SETUP.md`)
- The `update_updated_at_column()` function uses `SECURITY DEFINER` and `SET search_path = ''` for security

