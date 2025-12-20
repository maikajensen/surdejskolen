-- Add category column to recipes
ALTER TABLE recipes ADD COLUMN category TEXT DEFAULT 'surdej';

-- Add check constraint to ensure only valid categories
ALTER TABLE recipes ADD CONSTRAINT check_category CHECK (category IN ('surdej', 'overskydende', 'grundopskrift'));

-- Update existing recipes if needed (optional)
-- UPDATE recipes SET category = 'surdej' WHERE ...;
