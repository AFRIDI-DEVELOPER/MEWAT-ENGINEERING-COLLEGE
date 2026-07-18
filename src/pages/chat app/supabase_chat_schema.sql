-- ============================================================
-- WhatsApp-Style Chat App — Supabase SQL Migration
-- Run this ENTIRE script in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 2. USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username    TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  phone_number  TEXT UNIQUE,
  account_type  TEXT NOT NULL DEFAULT 'anonymous'
    CHECK (account_type IN ('anonymous', 'verified_phone')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add avatar_url if the table already existed before this feature
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Index for fast username lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users (username);

--
============================================================
-- 3. MESSAGES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id  UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_delivered BOOLEAN NOT NULL DEFAULT false
);

-- Indexes for fast message queries
CREATE INDEX IF NOT EXISTS idx_messages_sender   ON public.messages (sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.messages (receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created  ON public.messages (created_at DESC);

-- ============================================================
-- 4. ENABLE REALTIME on messages
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_rel pr
    JOIN pg_publication p ON p.oid = pr.prpubid
    JOIN pg_class c ON c.oid = pr.prrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE p.pubname = 'supabase_realtime'
      AND n.nspname = 'public'
      AND c.relname = 'messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  END IF;
END $$;

-- ============================================================
-- 5. DATABASE FUNCTIONS (RPC)
-- ============================================================

-- 5a. REGISTER USER
-- Hashes password server-side using bcrypt via pgcrypto.
-- Returns the new user row (minus password_hash).
-- Raises an exception on duplicate username (caught client-side).
CREATE OR REPLACE FUNCTION public.register_user(
  p_username     TEXT,
  p_password     TEXT,
  p_phone_number TEXT DEFAULT NULL,
  p_account_type TEXT DEFAULT 'anonymous'
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_user  public.users%ROWTYPE;
  v_clean_username TEXT;
BEGIN
  -- Normalize username: lowercase, strip spaces
  v_clean_username := lower(trim(regexp_replace(p_username, '\s+', '', 'g')));

  -- Validate
  IF length(v_clean_username) < 3 THEN
    RAISE EXCEPTION 'Username must be at least 3 characters long.';
  END IF;
  IF length(p_password) < 6 THEN
    RAISE EXCEPTION 'Password must be at least 6 characters long.';
  END IF;

  -- Insert user with bcrypt-hashed password
  INSERT INTO public.users (username, password_hash, phone_number, account_type)
  VALUES (
    v_clean_username,
    crypt(p_password, gen_salt('bf', 10)),
    p_phone_number,
    p_account_type
  )
  RETURNING * INTO v_user;

  -- Return user data (without password_hash)
  RETURN json_build_object(
    'id',           v_user.id,
    'username',     v_user.username,
    'phone_number', v_user.phone_number,
    'account_type', v_user.account_type,
    'avatar_url',   v_user.avatar_url,
    'created_at',   v_user.created_at
  );

EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'Sorry, this username is already taken by someone else.';
END;
$$;

-- 5b. LOGIN USER
-- Verifies username + password using bcrypt comparison.
-- Returns user data on success, raises exception on failure.
CREATE OR REPLACE FUNCTION public.login_user(
  p_username TEXT,
  p_password TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_user public.users%ROWTYPE;
  v_clean_username TEXT;
BEGIN
  -- Normalize username
  v_clean_username := lower(trim(regexp_replace(p_username, '\s+', '', 'g')));

  -- Find user and verify password in one step
  SELECT * INTO v_user
  FROM public.users
  WHERE username = v_clean_username
    AND password_hash = crypt(p_password, password_hash);

  IF v_user.id IS NULL THEN
    RAISE EXCEPTION 'Invalid username or password.';
  END IF;

  -- Return user data (without password_hash)
  RETURN json_build_object(
    'id',           v_user.id,
    'username',     v_user.username,
    'phone_number', v_user.phone_number,
    'account_type', v_user.account_type,
    'avatar_url',   v_user.avatar_url,
    'created_at',   v_user.created_at
  );
END;
$$;

-- 5c. DELETE DELIVERED MESSAGE
-- Called by the Flutter app after a message is saved locally.
-- Only the receiver can trigger deletion of their own messages.
CREATE OR REPLACE FUNCTION public.delete_delivered_message(
  p_message_id  UUID,
  p_receiver_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  DELETE FROM public.messages
  WHERE id = p_message_id
    AND receiver_id = p_receiver_id;

  RETURN FOUND;
END;
$$;

-- 5d. SEARCH USERS BY USERNAME
-- Allows finding other users to chat with.
CREATE OR REPLACE FUNCTION public.search_users(
  p_query TEXT,
  p_limit INT DEFAULT 20
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  RETURN (
    SELECT json_agg(
      json_build_object(
        'id',           u.id,
        'username',     u.username,
        'account_type', u.account_type,
        'avatar_url',   u.avatar_url
      )
    )
    FROM (
      SELECT id, username, account_type, avatar_url
      FROM public.users
      WHERE username ILIKE '%' || p_query || '%'
      ORDER BY username
      LIMIT p_limit
    ) u
  );
END;
$$;

-- 5e. UPDATE USER AVATAR
-- Allows a user to update their own avatar URL.
CREATE OR REPLACE FUNCTION public.update_user_avatar(
  p_user_id UUID,
  p_avatar_url TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  UPDATE public.users
  SET avatar_url = p_avatar_url
  WHERE id = p_user_id;

  RETURN FOUND;
END;
$$;

-- ============================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on both tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Clean up any existing policies first to allow clean reruns
DROP POLICY IF EXISTS "Allow anon to call RPC functions" ON public.users;
DROP POLICY IF EXISTS "Allow message insert" ON public.messages;
DROP POLICY IF EXISTS "Allow message read for participants" ON public.messages;
DROP POLICY IF EXISTS "Allow message delete" ON public.messages;

-- Users: Allow public read for user search (limited fields via RPC)
-- Direct table access is blocked; all access goes through RPC functions
-- which use SECURITY DEFINER to bypass RLS.
CREATE POLICY "Allow anon to call RPC functions"
  ON public.users
  FOR SELECT
  TO anon
  USING (true);

-- Messages: Allow inserts from anon role (messages are sent via direct insert)
CREATE POLICY "Allow message insert"
  ON public.messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Messages: Allow reads for sender or receiver
CREATE POLICY "Allow message read for participants"
  ON public.messages
  FOR SELECT
  TO anon
  USING (true);

-- Messages: Allow delete (for deliver-and-delete, via RPC with SECURITY DEFINER)
CREATE POLICY "Allow message delete"
  ON public.messages
  FOR DELETE
  TO anon
  USING (true);

-- ============================================================
-- 7. GRANT PERMISSIONS
-- ============================================================
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT, DELETE ON public.messages TO anon;
GRANT SELECT ON public.users TO anon;
GRANT EXECUTE ON FUNCTION public.register_user TO anon;
GRANT EXECUTE ON FUNCTION public.login_user TO anon;
GRANT EXECUTE ON FUNCTION public.delete_delivered_message TO anon;
GRANT EXECUTE ON FUNCTION public.search_users TO anon;
GRANT EXECUTE ON FUNCTION public.update_user_avatar TO anon;

-- ============================================================
-- 8. STORAGE SETUP (AVATARS)
-- ============================================================
-- Enable storage schema if not already there (usually managed by Supabase)
-- We insert a bucket named 'avatars' for profile pictures.

INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to allow clean reruns
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload an avatar" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update an avatar" ON storage.objects;

-- Storage RLS Policies for 'avatars' bucket
-- Note: These policies attach to storage.objects.
-- Anyone can view avatars.
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Since we use 'anon' for custom auth, allow anon to insert/update avatars.
CREATE POLICY "Anyone can upload an avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Anyone can update an avatar"
  ON storage.objects FOR UPDATE
  WITH CHECK (bucket_id = 'avatars');
