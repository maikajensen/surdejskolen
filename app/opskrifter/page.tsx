import { Navbar } from '@/components/ui/Navbar';
import { supabase } from '@/lib/supabase';
import { RecipeTabs } from '@/components/sections/RecipeTabs';

// Revalidate every hour
export const revalidate = 3600;

async function getRecipes() {
    const { data } = await supabase
        .from('recipes')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
    return data || [];
}

export default async function OpskrifterPage() {
    const recipes = await getRecipes();

    return (
        <main className="min-h-screen pt-20 bg-nordic-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-nordic-brown mb-4">
                        Mine Bedste Opskrifter
                    </h1>
                    <p className="text-lg text-nordic-slate max-w-2xl mx-auto">
                        Her deler jeg mine favoritter. Fra det klassiske surdejsbrød til søde sager.
                    </p>
                </div>

                {recipes.length === 0 ? (
                    <div className="text-center py-12 text-nordic-slate">
                        <p>Der er ingen opskrifter endnu. Kør venligst seed-scriptet i Supabase.</p>
                    </div>
                ) : (
                    <RecipeTabs recipes={recipes} />
                )}
            </div>
        </main>
    );
}
