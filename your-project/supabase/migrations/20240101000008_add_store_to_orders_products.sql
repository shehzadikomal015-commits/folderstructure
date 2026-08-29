-- Add store_id to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS store_id UUID REFERENCES public.stores(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_products_store_id ON public.products(store_id);

-- Add store_id to orders
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS store_id UUID REFERENCES public.stores(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_orders_store_id ON public.orders(store_id);

-- Update place_order to set store_id from stores table
CREATE OR REPLACE FUNCTION public.place_order(
  p_user_id UUID,
  p_shipping_name TEXT,
  p_shipping_email TEXT,
  p_shipping_phone TEXT,
  p_shipping_address TEXT,
  p_items JSONB
)
RETURNS UUID AS $$
DECLARE
  v_order_id UUID;
  v_item JSONB;
  v_product_id UUID;
  v_quantity INTEGER;
  v_product_price NUMERIC(10, 2);
  v_product_stock INTEGER;
  v_total NUMERIC(10, 2) := 0;
  v_store_id UUID;
BEGIN
  SELECT id INTO v_store_id FROM public.stores WHERE user_id = p_user_id LIMIT 1;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_product_id := (v_item->>'product_id')::UUID;
    v_quantity := (v_item->>'quantity')::INTEGER;

    SELECT price, stock INTO v_product_price, v_product_stock
    FROM public.products
    WHERE id = v_product_id;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product % not found', v_product_id;
    END IF;

    IF v_product_stock < v_quantity THEN
      RAISE EXCEPTION 'Insufficient stock for product %', v_product_id;
    END IF;

    v_total := v_total + (v_product_price * v_quantity);
  END LOOP;

  INSERT INTO public.orders (user_id, total_amount, shipping_name, shipping_email, shipping_phone, shipping_address, store_id)
  VALUES (p_user_id, v_total, p_shipping_name, p_shipping_email, p_shipping_phone, p_shipping_address, v_store_id)
  RETURNING id INTO v_order_id;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_product_id := (v_item->>'product_id')::UUID;
    v_quantity := (v_item->>'quantity')::INTEGER;

    SELECT price INTO v_product_price FROM public.products WHERE id = v_product_id;

    INSERT INTO public.order_items (order_id, product_id, quantity, price)
    VALUES (v_order_id, v_product_id, v_quantity, v_product_price);

    UPDATE public.products SET stock = stock - v_quantity WHERE id = v_product_id;
  END LOOP;

  RETURN v_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update get_all_orders to filter by store
CREATE OR REPLACE FUNCTION public.get_all_orders()
RETURNS SETOF public.orders AS $$
DECLARE
  v_user_id UUID;
  v_store_id UUID;
BEGIN
  IF auth.role() != 'authenticated' THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  v_user_id := auth.uid();
  SELECT id INTO v_store_id FROM public.stores WHERE user_id = v_user_id LIMIT 1;

  IF v_store_id IS NULL THEN
    RETURN QUERY SELECT * FROM public.orders WHERE false;
  ELSE
    RETURN QUERY SELECT * FROM public.orders WHERE store_id = v_store_id ORDER BY created_at DESC;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS for products: admins can only manage their own store's products
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage own store products"
  ON public.products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = products.store_id
      AND stores.user_id = auth.uid()
    )
  );

-- Update RLS for orders: admins can only view their own store's orders
DROP POLICY IF EXISTS "Admins can manage orders" ON public.orders;
CREATE POLICY "Admins can manage own store orders"
  ON public.orders FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = orders.store_id
      AND stores.user_id = auth.uid()
    )
  );

-- Update RLS for order_items: admins can view items for their store's orders
DROP POLICY IF EXISTS "Admins can manage order items" ON public.order_items;
CREATE POLICY "Admins can manage own store order items"
  ON public.order_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      JOIN public.stores ON stores.id = orders.store_id
      WHERE orders.id = order_items.order_id
      AND stores.user_id = auth.uid()
    )
  );
