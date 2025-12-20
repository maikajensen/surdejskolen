'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Workshop } from '@/types';

interface BookingFormProps {
    workshop: Workshop;
    onCancel: () => void;
    onSuccess: () => void;
}

export function BookingForm({ workshop, onCancel, onSuccess }: BookingFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const data = {
            workshop_id: workshop.id,
            customer_name: formData.get('name'),
            customer_email: formData.get('email'),
            customer_phone: formData.get('phone'),
        };

        try {
            // 1. Submit Booking to Database
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const resData = await response.json();
                throw new Error(resData.error || 'Noget gik galt ved booking.');
            }

            // 2. Call onSuccess (updates UI, closes modal)
            onSuccess();

            // 3. Send Email via EmailJS (Client Side)
            try {
                const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
                const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
                const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

                if (!publicKey || !serviceId || !templateId) {
                    console.warn('Missing EmailJS keys in .env.local');
                    alert('Note: Email configuration is missing. Booking is saved, but no email was sent.');
                    return;
                }

                await emailjs.send(
                    serviceId,
                    templateId,
                    {
                        // Template variables matching the screenshot:
                        email: data.customer_email,
                        name: data.customer_name,
                        title: workshop.title || `Surdejs Workshop d. ${workshop.date} kl. ${workshop.time}`,

                        // Extra data (optional, but good for admin email if re-using same params)
                        customer_phone: data.customer_phone,
                        workshop_price: workshop.price,
                        admin_email: 'maikalindkvistjensen@gmail.com'
                    },
                    publicKey
                );

                alert('Booking bekræftet! En email er sendt til dig.');
                console.log('Confirmation email sent');

            } catch (emailErr: any) {
                console.error('Failed to send email:', emailErr);
                alert('Booking bekræftet, men email kunne ikke sendes: ' + (emailErr.text || emailErr.message || 'Ukendt fejl'));
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-nordic-white rounded-sm shadow-lg max-w-md w-full p-6 space-y-4">
                <h2 className="text-2xl font-serif font-bold text-nordic-brown">
                    {workshop.title || 'Book Plads'}
                </h2>
                <p className="text-nordic-slate">
                    Dato: {workshop.date} <br />
                    Tid: {workshop.time}
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-sm text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-nordic-slate">Navn</label>
                        <Input id="name" name="name" required placeholder="Dit fulde navn" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-nordic-slate">Email</label>
                        <Input id="email" name="email" type="email" required placeholder="din@email.dk" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-nordic-slate">Telefonnummer</label>
                        <Input id="phone" name="phone" type="tel" required placeholder="12 34 56 78" />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
                            Annuller
                        </Button>
                        <Button type="submit" disabled={loading} className="flex-1">
                            {loading ? 'Booker...' : 'Bekræft Booking'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
