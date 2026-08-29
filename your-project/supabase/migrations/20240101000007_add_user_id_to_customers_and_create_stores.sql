-- Add user_id to customers table
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON public.customers(user_id);

-- Create stores table
CREATE TABLE IF NOT EXISTS public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  currency TEXT DEFAULT '£',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Create index on user_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_stores_user_id ON public.stores(user_id);

-- Enable RLS
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Create policy for admins/store owners to view their own store
CREATE POLICY "Users can view own store"
  ON public.stores FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for admins/store owners to insert their own store
CREATE POLICY "Users can insert own store"
  ON public.stores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy for admins/store owners to update their own store
CREATE POLICY "Users can update own store"
  ON public.stores FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for public to view active stores
CREATE POLICY "Public can view active stores"
  ON public.stores FOR SELECT
  USING (is_active = true);

-- Create trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS stores_updated_at_trigger ON public.stores;
CREATE TRIGGER stores_updated_at_trigger
  BEFORE UPDATE ON public.stores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
