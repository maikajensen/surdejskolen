-- Create Shop Orders Table
CREATE TABLE shop_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  customer_zip TEXT NOT NULL,
  phone TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, shipped, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Order Items Table
CREATE TABLE shop_order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES shop_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL, -- Store name in case product is deleted/changed
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE shop_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_order_items ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create an order (public checkout)
CREATE POLICY "Anyone can create a shop order" ON shop_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create order items" ON shop_order_items FOR INSERT WITH CHECK (true);

-- Users can only see their own orders (by email? or just no one for now except admin)
-- For MVP, we might not need read access from the frontend for orders yet, just insert.
-- But let's allow inserting.
