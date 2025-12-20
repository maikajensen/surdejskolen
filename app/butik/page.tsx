import { Navbar } from '@/components/ui/Navbar';
import { supabase } from '@/lib/supabase';
import { ProductCard } from '@/components/shop/ProductCard';

// Revalidate every hour
export const revalidate = 3600;

async function getProducts() {
    const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
    return data || [];
}

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <main className="min-h-screen pt-20 bg-nordic-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-nordic-brown mb-4">
                        Butik
                    </h1>
                    <p className="text-lg text-nordic-slate max-w-2xl mx-auto">
                        Kvalitetsudstyr til din surdejsbagning. Udvalgt med kærlighed til håndværket.
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12 text-nordic-slate">
                        <p>Der er ingen produkter i butikken endnu. Kør venligst seed-scriptet.</p>
                    </div>
                ) : (
                    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
