import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Create a separate supabase client for server-side operations (or reuse lib/supabase if environment vars are exposed to server)
// Ideally use @supabase/ssr or createRouteHandlerClient for Next.js App Router auth, 
// but for this MVP using the admin key or just anon key with RLS policies allowing inserts is fine.
// We'll use the environment variables directly.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is missing. RLS policies might block updates.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { workshop_id, customer_name, customer_email, customer_phone } = body;

        if (!workshop_id || !customer_name || !customer_email) {
            return NextResponse.json({ error: 'Mangler påkrævede felter' }, { status: 400 });
        }

        // 1. Check availability
        const { data: workshop, error: workshopError } = await supabase
            .from('workshops')
            .select('date, time, price, total_slots, slots_taken')
            .eq('id', workshop_id)
            .single();

        if (workshopError || !workshop) {
            return NextResponse.json({ error: 'Workshop ikke fundet' }, { status: 404 });
        }

        if (workshop.slots_taken >= workshop.total_slots) {
            // Ideally handle waitlist here
            return NextResponse.json({ error: 'Desværre, workshoppen er udsolgt.' }, { status: 400 });
        }

        // 2. Create booking
        const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .insert([
                {
                    workshop_id,
                    customer_name,
                    customer_email,
                    customer_phone,
                    status: 'confirmed'
                }
            ])
            ;

        if (bookingError) {
            console.error('Booking error:', bookingError);
            return NextResponse.json({ error: 'Kunne ikke oprette booking' }, { status: 500 });
        }

        // 3. Update slots_taken (In a real app, use a database function/trigger for atomicity)
        const { error: updateError } = await supabase
            .from('workshops')
            .update({ slots_taken: workshop.slots_taken + 1 })
            .eq('id', workshop_id);

        if (updateError) {
            // Rollback booking? Or just log/alert admin
            console.error('Failed to update slots:', updateError);
        }

        return NextResponse.json({ success: true, booking });

    } catch (err: any) {
        console.error('API Error:', err);
        return NextResponse.json({ error: 'Server fejl' }, { status: 500 });
    }
}
