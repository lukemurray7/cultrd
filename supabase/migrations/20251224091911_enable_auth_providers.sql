-- Enable email/password authentication
-- Note: Email/password auth is enabled by default in Supabase
-- This migration documents the auth setup

-- OAuth providers (Google, Apple) need to be configured in the Supabase dashboard:
-- 1. Go to Authentication > Providers in your Supabase dashboard
-- 2. Enable Google OAuth and configure:
--    - Client ID from Google Cloud Console
--    - Client Secret from Google Cloud Console
--    - Redirect URL: cltr://auth/callback
-- 3. Enable Apple OAuth and configure:
--    - Service ID from Apple Developer Console
--    - Client Secret (JWT)
--    - Redirect URL: cltr://auth/callback

-- Email/password authentication is enabled by default
-- No additional SQL configuration needed

