-- Enable Row Level Security (RLS) on the products table
-- This ensures that access is controlled by policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone (public/anonymous) to READ (SELECT) products
-- This allows your website visitors to see the products
CREATE POLICY "Public products are viewable by everyone" 
ON products 
FOR SELECT 
USING (true);
