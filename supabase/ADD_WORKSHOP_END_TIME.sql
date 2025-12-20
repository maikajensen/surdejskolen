-- Add end_time column to workshops
ALTER TABLE workshops ADD COLUMN end_time TIME;

-- (Optional) Update existing workshops to have a default end time if needed
-- UPDATE workshops SET end_time = '21:00:00' WHERE end_time IS NULL;
