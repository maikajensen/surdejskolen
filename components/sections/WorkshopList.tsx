'use client';

import { useEffect, useState } from 'react';
import { Workshop } from '@/types';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, Euro } from 'lucide-react';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';
import { BookingForm } from './BookingForm';

export function WorkshopList() {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [loading, setLoading] = useState(true);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState<Workshop | null>(null);

    async function fetchWorkshops() {
        // setLoading(true); // Don't reset loading on refresh to avoid flicker
        const { data, error } = await supabase
            .from('workshops')
            .select('*')
            .gte('date', new Date().toISOString())
            .order('date', { ascending: true });

        if (error) {
            console.error('Error fetching workshops:', error);
        } else {
            setWorkshops(data || []);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchWorkshops();
    }, []);

    if (loading) {
        return <div className="text-center py-12">Indlæser kommende workshops...</div>;
    }

    if (workshops.length === 0) {
        return <div className="text-center py-12 text-nordic-slate">Ingen planlagte workshops lige nu. Tilmeld dig nyhedsbrevet for at få besked.</div>;
    }

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {workshops.map((workshop) => {
                    const isSoldOut = workshop.slots_taken >= workshop.total_slots;

                    return (
                        <div key={workshop.id} className="bg-white border border-nordic-beige rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                            <h3 className="text-xl font-serif font-bold text-nordic-brown mb-4">
                                {workshop.title || 'Surdejsbagning'}
                            </h3>

                            <div className="space-y-3 mb-6 text-nordic-slate flex-grow">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-nordic-tan" />
                                    <span className="capitalize">
                                        {format(new Date(workshop.date), 'EEEE d. MMMM yyyy', { locale: da })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-nordic-tan" />
                                    <span>
                                        {workshop.time.substring(0, 5)} - {workshop.end_time ? workshop.end_time.substring(0, 5) : '21:00'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">{workshop.price} DKK</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-nordic-beige/30">
                                <span className={`text-sm font-medium ${isSoldOut ? 'text-red-500' : 'text-green-600'}`}>
                                    {isSoldOut ? 'Udsolgt' : `${workshop.total_slots - workshop.slots_taken} pladser tilbage`}
                                </span>
                                <Button
                                    variant={isSoldOut ? 'outline' : 'primary'}
                                    disabled={isSoldOut}
                                    onClick={() => setIsBookingModalOpen(workshop)}
                                >
                                    {isSoldOut ? 'Venteliste' : 'Book Nu'}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isBookingModalOpen && (
                <BookingForm
                    workshop={isBookingModalOpen}
                    onCancel={() => setIsBookingModalOpen(null)}
                    onSuccess={() => {
                        setIsBookingModalOpen(null);
                        alert('Tak for din booking! Du modtager en bekræftelse på mail.');
                        fetchWorkshops(); // Reload data
                    }}
                />
            )}
        </>
    );
}
