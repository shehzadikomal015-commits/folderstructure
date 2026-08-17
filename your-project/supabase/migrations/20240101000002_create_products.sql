-- Create products table for the store catalog

create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price decimal(10,2) not null check (price >= 0),
  category text not null,
  image_url text,
  rating decimal(3,2) default 0 check (rating >= 0 and rating <= 5),
  stock integer default 0 check (stock >= 0),
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index on slug for fast lookups
create index products_slug_idx on public.products(slug);

-- Create index on category for filtering
create index products_category_idx on public.products(category);

-- Create index on is_active for filtering active products
create index products_active_idx on public.products(is_active);

-- Enable RLS
alter table public.products enable row level security;

-- Create policy for public to view active products
create policy "Public can view active products"
  on public.products for select
  using (is_active = true);

-- Create policy for admins to manage products
create policy "Admins can manage products"
  on public.products for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role in ('admin', 'store_owner')
    )
  );

-- Create function to generate slug from product name
create or replace function public.generate_product_slug()
returns trigger as $$
begin
  if new.slug is null or new.slug = '' then
    new.slug := lower(regexp_replace(new.name, '[^a-z0-9]+', '-', 'g'));
    new.slug := regexp_replace(new.slug, '^-|-$', '', 'g');
  end if;
  return new;
end;
$$ language plpgsql;

-- Create trigger to auto-generate slug
create trigger products_slug_trigger
  before insert or update on public.products
  for each row execute function public.generate_product_slug();

-- Create function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to auto-update updated_at
create trigger products_updated_at_trigger
  before update on public.products
  for each row execute function public.update_updated_at_column();
