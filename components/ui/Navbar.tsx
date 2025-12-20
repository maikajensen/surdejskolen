'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Wheat, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { cartCount, setIsCartOpen } = useCart();

    const navLinks = [
        { href: '/', label: 'Forside' },
        { href: '/workshops', label: 'Workshops' },
        { href: '/opskrifter', label: 'Opskrifter' },
        { href: '/tips', label: 'Tips' },
        { href: '/butik', label: 'Butik' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-nordic-white/95 backdrop-blur-sm border-b border-nordic-beige">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Wheat className="h-8 w-8 text-nordic-brown" />
                            <span className="font-serif text-2xl font-bold text-nordic-brown">
                                Surdejskolen
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-sans text-nordic-slate hover:text-nordic-brown transition-colors font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative text-nordic-slate hover:text-nordic-brown transition-colors p-2"
                        >
                            <ShoppingBag className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 h-4 w-4 bg-nordic-brown text-nordic-white text-[10px] flex items-center justify-center rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <Link
                            href="/workshops"
                            className="px-5 py-2.5 bg-nordic-brown text-nordic-white rounded-sm hover:bg-nordic-brown/90 transition shadow-sm font-medium"
                        >
                            Book Workshop
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative text-nordic-slate hover:text-nordic-brown transition-colors p-2"
                        >
                            <ShoppingBag className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 h-4 w-4 bg-nordic-brown text-nordic-white text-[10px] flex items-center justify-center rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-nordic-slate hover:text-nordic-brown p-2"
                        >
                            <span className="sr-only">Åbn menu</span>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-nordic-white border-b border-nordic-beige">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-3 py-2 text-base font-medium text-nordic-slate hover:text-nordic-brown hover:bg-nordic-beige/30 rounded-md"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/workshops"
                            className="block w-full text-center mt-4 px-5 py-3 bg-nordic-brown text-nordic-white rounded-sm font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Book Workshop
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
