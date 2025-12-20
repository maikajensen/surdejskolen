
-- Insert Dummy Workshops
INSERT INTO workshops (date, time, price, total_slots, slots_taken) VALUES
('2025-06-22', '13:00:00', 795.00, 12, 12), -- Sold out
('2026-02-06', '10:00:00', 795.00, 10, 0),
('2026-02-18', '18:00:00', 795.00, 10, 2)
ON CONFLICT DO NOTHING;

-- Insert Dummy Recipes
-- Note: 'content' is stored as a JSON string containing HTML
INSERT INTO recipes (title, slug, content, image_url, published) VALUES
(
  'Verdens Bedste Surdejsbrød', 
  'verdens-bedste-surdejsbrod', 
  '"<h2>Ingredienser</h2><ul><li>400g Hvedemel</li><li>100g Ølandshvede</li><li>350g Vand</li><li>100g Surdej</li><li>12g Salt</li></ul><h2>Fremgangsmåde</h2><p>Her er en detaljeret beskrivelse af hvordan du bager dette fantastiske brød.</p><p>1. Bland vand og mel (autolyse) i 1 time.</p><p>2. Tilsæt surdej og ælt.</p><p>3. Tilsæt salt og ælt videre.</p><p>4. Fold dejen hver halve time i 3 timer.</p><p>5. Form brødet og sæt på køl til næste dag.</p><p>6. Bag ved 250 grader i 35 minutter.</p>"', -- JSON string
  'https://images.unsplash.com/photo-1589367920955-ced4d9417f69?q=80&w=2674&auto=format&fit=crop',
  true
),
(
  'Bløde Surdejsboller', 
  'bloede-surdejsboller', 
  '"<h2>Ingredienser</h2><ul><li>500g Hvedemel</li><li>350g Vand</li><li>100g Surdej</li><li>12g Salt</li><li>20g Honning</li></ul><h2>Fremgangsmåde</h2><p>Bland det hele og lad det hæve...</p>"',
  'images/brod_med_ost.JPEG', 
  true
),
(
  'Rugbrød med Kerner', 
  'rugbrod-med-kerner', 
  '"<h2>Ingredienser</h2><ul><li>300g Rugmel</li><li>200g Kerner</li><li>Surdej</li></ul><p>En klassiker til frokostbordet.</p>"',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop', 
  true
)
ON CONFLICT DO NOTHING;

-- Insert Dummy Products
INSERT INTO products (name, description, price, image_url) VALUES
('Hævespand', 'Firkantet bøtte til hævning af dej. Gennemsigtig så du kan se boblerne.', 129.00, 'https://images.unsplash.com/photo-1586794157771-6c23ce081d09?q=80&w=2000&auto=format&fit=crop'),
('Dejskraber', 'Fleksibel dejskraber som gør det nemt at få dejen ud af skålen.', 49.00, 'https://images.unsplash.com/photo-1590408507421-4ea993f3b92f?q=80&w=1500&auto=format&fit=crop'),
('Bagestål', 'Få sprøde bunde med dette 6mm bagestål. Passer i en almindelig ovn.', 499.00, 'https://images.unsplash.com/photo-1576618148400-f54bed99fcf8?q=80&w=1500&auto=format&fit=crop'),
('Surdejsglas', 'Det perfekte glas til din surdej. Inkluderer elastik til markering.', 89.00, 'https://images.unsplash.com/photo-1627993072225-b4618721c5b8?q=80&w=1500&auto=format&fit=crop')
ON CONFLICT DO NOTHING;
