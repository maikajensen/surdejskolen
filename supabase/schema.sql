-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Workshops Table
CREATE TABLE workshops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  time TIME NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  total_slots INTEGER NOT NULL DEFAULT 12,
  slots_taken INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workshop_id UUID REFERENCES workshops(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed, waitlist, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recipes Table
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content JSONB, -- Rich text content or structured steps/ingredients
  image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies (Simplified for MVP)
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Public read access for Workshops and Published Recipes
CREATE POLICY "Public workshops are viewable by everyone" ON workshops FOR SELECT USING (true);
CREATE POLICY "Public recipes are viewable by everyone" ON recipes FOR SELECT USING (published = true);

-- Bookings can be created by anyone (public)
CREATE POLICY "Anyone can create a booking" ON bookings FOR INSERT WITH CHECK (true);

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public products are viewable by everyone" ON products FOR SELECT USING (true);

-- Admin policies (TODO: Add stricter auth checks later)
-- For now, we assume service role or authenticated admin will manage these.
