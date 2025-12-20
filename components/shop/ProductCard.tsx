'use client';

import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="group flex flex-col">
            <div className="relative aspect-square bg-nordic-beige/20 overflow-hidden mb-4">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-cover w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-nordic-tan">
                        Billede mangler
                    </div>
                )}
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-lg font-serif font-bold text-nordic-brown">
                    {product.name}
                </h3>
                <p className="text-nordic-slate font-medium">
                    {product.price} kr
                </p>
                <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        onClick={() => addToCart(product)}
                        variant="primary"
                        className="w-full md:w-auto"
                        size="sm"
                    >
                        Læg i kurv
                    </Button>
                </div>
            </div>
        </div>
    );
}
