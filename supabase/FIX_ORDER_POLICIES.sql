-- FIX: Drop existing policies to avoid conflicts or incorrect setups
DROP POLICY IF EXISTS "Anyone can create a shop order" ON shop_orders;
DROP POLICY IF EXISTS "Anyone can create order items" ON shop_order_items;

-- Re-enable RLS to be sure
ALTER TABLE shop_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_order_items ENABLE ROW LEVEL SECURITY;

-- Create policies allowing INSERT for EVERYONE (anon/public)
CREATE POLICY "Anyone can create a shop order" 
ON shop_orders 
FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Anyone can create order items" 
ON shop_order_items 
FOR INSERT 
TO public 
WITH CHECK (true);

-- No SELECT policies added for public. 
-- Since we generate IDs client-side, we don't need to read the order back immediately.
-- This keeps customer data secure from public access.
