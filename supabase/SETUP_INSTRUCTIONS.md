# Supabase Setup Instructions

To get the application working with your Supabase project, follow these steps to set up the database schema and initial data.

## 1. Open SQL Editor
Go to your Supabase Dashboard ([https://supabase.com/dashboard/project/_/sql/new](https://supabase.com/dashboard/project/_/sql/new)) and confirm "SQL Editor" is open.

## 2. Create Schema (Tables)
Copy the contents of `supabase/schema.sql` and run it in the SQL Editor. 
This will create:
- `workshops` table
- `bookings` table
- `recipes` table
- `products` table
- Row Level Security (RLS) policies

## 3. Seed Initial Data
Copy the contents of `supabase/seed.sql` and run it in the SQL Editor.
This will insert:
- Sample workshops
- Sample recipes
- **Sample products for the shop**

## 4. Update Images (If you have existing data)
If you already have products but they are missing images, run `supabase/UPDATE_IMAGES.sql` in the SQL Editor. 
This will link your existing products to the newly generated local images.

## 6. Create Orders Table
To enable checkout, run `supabase/CREATE_ORDERS_TABLE.sql` in the SQL Editor.
This will create:
- `shop_orders` table
- `shop_order_items` table

(If you encounter RLS errors, run `supabase/FIX_ORDER_POLICIES.sql` to repair permissions).

## 7. Add Recipe Categories
Run `supabase/ADD_RECIPE_CATEGORY.sql` to add the category column to your recipes table.

## 8. Add Workshop End Time
Run `supabase/ADD_WORKSHOP_END_TIME.sql` to add the `end_time` column to your workshops table.

## 9. Verify
After running the scripts, go back to your local application and refresh the page. 
- The `/workshops` page should show upcoming workshops with time ranges (once you update the data).
- The `/butik` page should now show the products instead of the "empty shop" message.
