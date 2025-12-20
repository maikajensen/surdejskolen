import { Navbar } from '@/components/ui/Navbar';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';

// Revalidate every hour
export const revalidate = 3600;

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getRecipe(slug: string) {
    const { data } = await supabase
        .from('recipes')
        .select('*')
        .eq('slug', slug)
        .single();
    return data;
}

export default async function RecipePage({ params }: PageProps) {
    const { slug } = await params;

    const recipe = await getRecipe(slug);

    if (!recipe) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-20 bg-nordic-white">
            <Navbar />

            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-nordic-brown mb-6 leading-tight">
                        {recipe.title}
                    </h1>
                    <div className="text-nordic-slate flex items-center justify-center gap-4 text-sm uppercase tracking-wide">
                        <span>By Maika</span>
                        <span>•</span>
                        <span>{format(new Date(recipe.created_at), 'd. MMMM yyyy', { locale: da })}</span>
                    </div>
                </header>

                {recipe.image_url && (
                    <div className="w-full aspect-video relative mb-12 rounded-sm overflow-hidden shadow-sm">
                        <img
                            src={recipe.image_url}
                            alt={recipe.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}

                <div
                    className="prose prose-stone prose-lg max-w-none text-nordic-slate prose-headings:font-serif prose-headings:text-nordic-brown prose-a:text-nordic-brown"
                    dangerouslySetInnerHTML={{ __html: recipe.content }} // Using dangerouslySetInnerHTML for custom HTML content
                />

                <div className="mt-16 pt-8 border-t border-nordic-beige text-center">
                    <a href="/opskrifter" className="text-nordic-brown font-medium hover:underline">
                        ← Tilbage til alle opskrifter
                    </a>
                </div>
            </article>
        </main>
    );
}
