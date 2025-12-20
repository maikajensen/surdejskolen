'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function CartSidebar() {
    const {
        items,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useCart();

    const router = useRouter();

    // Prevent scrolling when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isCartOpen]);

    const handleCheckout = () => {
        setIsCartOpen(false);
        router.push('/checkout');
    };

    const handleStartShopping = () => {
        setIsCartOpen(false);
        router.push('/butik');
    };

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-nordic-white shadow-xl transform transition-transform duration-300 ease-in-out">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-nordic-beige">
                        <h2 className="text-2xl font-serif font-bold text-nordic-brown flex items-center gap-2">
                            <ShoppingBag className="w-6 h-6" />
                            Din Kurv
                        </h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 text-nordic-slate hover:text-nordic-brown transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {items.length === 0 ? (
                            <div className="text-center text-nordic-slate py-12">
                                <p>Din kurv er tom.</p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={handleStartShopping}
                                >
                                    Begynd at handle
                                </Button>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-20 h-20 bg-nordic-beige/20 flex-shrink-0">
                                        {item.image_url && (
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="w-full h-full object-cover mix-blend-multiply"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-medium text-nordic-brown">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-xs text-nordic-slate hover:text-red-500 underline"
                                            >
                                                Fjern
                                            </button>
                                        </div>
                                        <p className="text-sm text-nordic-slate mb-3">{item.price} kr</p>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:bg-nordic-beige/50 rounded-full"
                                            >
                                                <Minus className="w-4 h-4 text-nordic-brown" />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-nordic-beige/50 rounded-full"
                                            >
                                                <Plus className="w-4 h-4 text-nordic-brown" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-6 border-t border-nordic-beige bg-nordic-white">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-nordic-slate">Total (inkl. moms)</span>
                                <span className="text-xl font-serif font-bold text-nordic-brown">
                                    {cartTotal} kr
                                </span>
                            </div>
                            <Button className="w-full" size="lg" onClick={handleCheckout}>
                                Gå til kassen
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
