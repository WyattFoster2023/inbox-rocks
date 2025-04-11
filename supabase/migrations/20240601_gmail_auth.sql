-- Add Gmail-specific fields to auth.users
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS gmail_id TEXT;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS access_token TEXT;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS refresh_token TEXT;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS token_expiry TIMESTAMP WITH TIME ZONE;

-- Create or update the public.users table to mirror auth.users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  gmail_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row-level security but allow all operations for now
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for the users table
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
CREATE POLICY "Users can view their own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
CREATE POLICY "Users can update their own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- Enable realtime for the users table
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
