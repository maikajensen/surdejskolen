-- Update existing products with the new local images
-- We update by name, assuming the names match what is in the database (based on your screenshot)

UPDATE products 
SET image_url = '/images/products/condi-bucket-3l.png' 
WHERE name ILIKE '%Condi Plastikbøtte med Låg 3 L%';

UPDATE products 
SET image_url = '/images/products/condi-bucket-1.5l.png' 
WHERE name ILIKE '%Condi Plastikbøtte med Låg 1,5 L%';

UPDATE products 
SET image_url = '/images/products/sourdough-flakes.png' 
WHERE name ILIKE '%Surdejsflager%';

UPDATE products 
SET image_url = '/images/products/sourdough-kit.png' 
WHERE name ILIKE '%Surdej Startkit%';

UPDATE products 
SET image_url = '/images/products/sourdough-starter.png' 
WHERE name ILIKE '%Surdej%' AND name NOT ILIKE '%Startkit%' AND name NOT ILIKE '%flager%';

UPDATE products 
SET image_url = '/images/products/thermometer.png' 
WHERE name ILIKE '%Termometer%';
