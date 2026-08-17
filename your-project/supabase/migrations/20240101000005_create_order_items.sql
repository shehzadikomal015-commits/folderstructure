-- Create order_items table for individual items in an order

create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id text references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_price decimal(10,2) not null check (product_price >= 0),
  quantity integer not null check (quantity > 0),
  subtotal decimal(10,2) not null check (subtotal >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index on order_id for fast lookups
create index order_items_order_id_idx on public.order_items(order_id);

-- Create index on product_id for product analytics
create index order_items_product_id_idx on public.order_items(product_id);

-- Enable RLS
alter table public.order_items enable row level security;

-- Create policy for authenticated users to view order items
create policy "Authenticated users can view order items"
  on public.order_items for select
  to authenticated
  using (true);

-- Create policy for admins to manage order items
create policy "Admins can manage order items"
  on public.order_items for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'store_owner')
    )
  );

-- Create policy for customers to view their own order items
create policy "Customers can view own order items"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and (orders.customer_id = auth.uid()
        or orders.customer_email = (select email from public.profiles where id = auth.uid()))
    )
  );
