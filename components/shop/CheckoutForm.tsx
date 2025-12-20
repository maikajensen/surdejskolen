'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Check, Loader2 } from 'lucide-react';
import { sendOrderConfirmation } from '@/lib/email';

export function CheckoutForm() {
    const router = useRouter();
    const { items, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_address: '',
        customer_city: '',
        customer_zip: '',
        phone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Generate ID client-side to avoid needing SELECT permissions immediately
            const orderId = crypto.randomUUID();

            // 1. Create Order
            const { error: orderError } = await supabase
                .from('shop_orders')
                .insert([
                    {
                        id: orderId,
                        ...formData,
                        total_amount: cartTotal,
                        status: 'pending'
                    }
                ]); // Removed .select() to prevent RLS read issues

            if (orderError) throw orderError;

            // 2. Create Order Items
            const orderItems = items.map(item => ({
                order_id: orderId, // Use the client-side ID
                product_id: item.id,
                product_name: item.name,
                quantity: item.quantity,
                price_at_purchase: item.price
            }));

            const { error: itemsError } = await supabase
                .from('shop_order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 3. Send Email
            await sendOrderConfirmation(
                { id: orderId, ...formData, total_amount: cartTotal, status: 'pending', created_at: new Date().toISOString() },
                orderItems
            );

            // 4. Success
            clearCart();
            router.push('/checkout/success');

        } catch (err: any) {
            console.error('Checkout error:', err);
            setError(err.message || 'Der opstod en fejl ved oprettelse af ordren.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-nordic-slate mb-4">Din kurv er tom.</p>
                <Button onClick={() => router.push('/butik')}>
                    Gå til butikken
                </Button>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
                <h2 className="text-xl font-serif font-bold text-nordic-brown mb-6">
                    Dine Oplysninger
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-nordic-brown">Navn</label>
                        <Input
                            name="customer_name"
                            required
                            value={formData.customer_name}
                            onChange={handleChange}
                            placeholder="Mette Jensen"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-nordic-brown">Email</label>
                        <Input
                            name="customer_email"
                            type="email"
                            required
                            value={formData.customer_email}
                            onChange={handleChange}
                            placeholder="mail@eksempel.dk"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-nordic-brown">Telefon (valgfri)</label>
                        <Input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+45 12 34 56 78"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-nordic-brown">Adresse</label>
                        <Input
                            name="customer_address"
                            required
                            value={formData.customer_address}
                            onChange={handleChange}
                            placeholder="Surdejstræde 12"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-nordic-brown">Postnr.</label>
                            <Input
                                name="customer_zip"
                                required
                                value={formData.customer_zip}
                                onChange={handleChange}
                                placeholder="1000"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-nordic-brown">By</label>
                            <Input
                                name="customer_city"
                                required
                                value={formData.customer_city}
                                onChange={handleChange}
                                placeholder="København K"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full mt-6"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Behandler...
                            </>
                        ) : (
                            'Godkend Ordre'
                        )}
                    </Button>
                </form>
            </div>

            {/* Order Summary */}
            <div className="bg-nordic-beige/20 p-8 rounded-lg h-fit">
                <h2 className="text-xl font-serif font-bold text-nordic-brown mb-6">
                    Ordreoversigt
                </h2>
                <div className="space-y-4 mb-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-nordic-brown">
                                {item.quantity}x {item.name}
                            </span>
                            <span className="text-nordic-slate font-medium">
                                {item.price * item.quantity} kr
                            </span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-nordic-brown/10 pt-4 flex justify-between items-center">
                    <span className="font-serif font-bold text-lg text-nordic-brown">Total</span>
                    <span className="font-serif font-bold text-lg text-nordic-brown">
                        {cartTotal} kr
                    </span>
                </div>
                <p className="text-xs text-nordic-slate mt-4 text-center">
                    Inkl. moms og afgifter.
                </p>
            </div>
        </div>
    );
}
