-- Seed data for products table
-- Run this after the products table is created

insert into public.products (name, slug, description, price, category, image_url, rating, stock, is_active) values
  ('Summer Dress', 'summer-dress', 'Lightweight summer dress perfect for sunny days.', 79.99, 'Clothing', 'https://picsum.photos/seed/summer-dress/400/400', 4.5, 24, true),
  ('Classic Blazer', 'classic-blazer', 'Elegant blazer for formal and casual occasions.', 129.99, 'Clothing', 'https://picsum.photos/seed/classic-blazer/400/400', 4.8, 15, true),
  ('Silk Blouse', 'silk-blouse', 'Premium silk blouse with a comfortable fit.', 59.99, 'Clothing', 'https://picsum.photos/seed/silk-blouse/400/400', 4.3, 30, true),
  ('Denim Jacket', 'denim-jacket', 'Stylish denim jacket for all seasons.', 89.99, 'Clothing', 'https://picsum.photos/seed/denim-jacket/400/400', 4.6, 18, true),
  ('Linen Pants', 'linen-pants', 'Breathable linen pants for everyday comfort.', 49.99, 'Clothing', 'https://picsum.photos/seed/linen-pants/400/400', 4.2, 40, true),
  ('Leather Handbag', 'leather-handbag', 'Genuine leather handbag with spacious compartments.', 149.99, 'Accessories', 'https://picsum.photos/seed/leather-handbag/400/400', 4.9, 10, true),
  ('Running Shoes', 'running-shoes', 'Lightweight running shoes with superior cushioning.', 99.99, 'Footwear', 'https://picsum.photos/seed/running-shoes/400/400', 4.7, 22, true),
  ('Wool Scarf', 'wool-scarf', 'Soft wool scarf to keep you warm.', 29.99, 'Accessories', 'https://picsum.photos/seed/wool-scarf/400/400', 4.4, 50, true)
on conflict (slug) do nothing;
