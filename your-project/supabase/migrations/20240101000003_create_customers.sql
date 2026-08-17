-- Create customers table for store customers

create table public.customers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  full_name text not null,
  phone text,
  avatar_url text,
  total_orders integer default 0 check (total_orders >= 0),
  total_spent decimal(10,2) default 0 check (total_spent >= 0),
  last_order_at timestamp with time zone,
  status text default 'active' check (status in ('active', 'inactive', 'vip')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index on email for fast lookups
create index customers_email_idx on public.customers(email);

-- Create index on status for filtering
create index customers_status_idx on public.customers(status);

-- Enable RLS
alter table public.customers enable row level security;

-- Create policy for authenticated users to view customers
create policy "Authenticated users can view customers"
  on public.customers for select
  to authenticated
  using (true);

-- Create policy for admins to manage customers
create policy "Admins can manage customers"
  on public.customers for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'store_owner')
    )
  );

-- Create trigger to auto-update updated_at
create trigger customers_updated_at_trigger
  before update on public.customers
  for each row execute function public.update_updated_at_column();
