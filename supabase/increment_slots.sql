-- Function to safe increment slots
-- This avoids RLS issues by running as SECURITY DEFINER (admin privileges)
-- And ensures atomicity better than read-then-update in client code
+
create or replace function increment_slots(row_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update workshops
  set slots_taken = slots_taken + 1
  where id = row_id;
end;
$$;
