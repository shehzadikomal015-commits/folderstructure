-- Create orders table for customer orders

create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded');
create type public.fulfillment_status as enum ('processing', 'shipped', 'delivered', 'cancelled');

create table public.orders (
  id text primary key,
  customer_id uuid references public.customers(id) on delete set null,
  customer_email text not null,
  customer_name text not null,
  product_count integer default 0 check (product_count >= 0),
  total decimal(10,2) not null check (total >= 0),
  payment_status payment_status default 'pending' not null,
  fulfillment_status fulfillment_status default 'processing' not null,
  shipping_address jsonb,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index on customer_id for fast lookups
create index orders_customer_id_idx on public.orders(customer_id);

-- Create index on payment_status for filtering
create index orders_payment_status_idx on public.orders(payment_status);

-- Create index on fulfillment_status for filtering
create index orders_fulfillment_status_idx on public.orders(fulfillment_status);

-- Create index on created_at for sorting
create index orders_created_at_idx on public.orders(created_at desc);

-- Enable RLS
alter table public.orders enable row level security;

-- Create policy for authenticated users to view orders
create policy "Authenticated users can view orders"
  on public.orders for select
  to authenticated
  using (true);

-- Create policy for admins to manage orders
create policy "Admins can manage orders"
  on public.orders for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'store_owner')
    )
  );

-- Create policy for customers to view their own orders
create policy "Customers can view own orders"
  on public.orders for select
  to authenticated
  using (
    customer_id = auth.uid()
    or customer_email = (select email from public.profiles where id = auth.uid())
  );

-- Create trigger to auto-update updated_at
create trigger orders_updated_at_trigger
  before update on public.orders
  for each row execute function public.update_updated_at_column();

-- Create function to generate order ID
create or replace function public.generate_order_id()
returns text as $$
begin
  return 'ORD-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(floor(random() * 10000)::text, 4, '0');
end;
$$ language plpgsql;
