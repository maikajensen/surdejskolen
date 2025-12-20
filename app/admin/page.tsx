'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Navbar } from '@/components/ui/Navbar';

export default function AdminPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const recipe = {
            title,
            slug,
            description: formData.get('description'),
            content: formData.get('content'),
            image_url: formData.get('image_url'),
            published: formData.get('published') === 'on',
        };

        const { error } = await supabase.from('recipes').insert([recipe]);

        if (error) {
            setMessage('Fejl: ' + error.message);
        } else {
            setMessage('Opskrift oprettet succesfuldt!');
            (event.target as HTMLFormElement).reset();
        }
        setLoading(false);
    }

    return (
        <main className="min-h-screen pt-20 bg-nordic-white">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-serif text-nordic-brown mb-8">Admin: Tilføj Opskrift</h1>

                {message && (
                    <div className={`p-4 mb-6 rounded-sm ${message.startsWith('Fejl') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 rounded-sm shadow-sm border border-nordic-beige">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-nordic-slate">Titel</label>
                        <Input name="title" required placeholder="F.eks. Surdejsbrød" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-nordic-slate">Beskrivelse (Kort)</label>
                        <textarea
                            name="description"
                            required
                            className="flex w-full rounded-sm border border-nordic-beige bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-nordic-slate/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-nordic-brown min-h-[100px]"
                            placeholder="En kort teaser..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-nordic-slate">Billede URL</label>
                        <Input name="image_url" placeholder="https://..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-nordic-slate">Indhold (HTML tilladt)</label>
                        <textarea
                            name="content"
                            required
                            className="flex w-full rounded-sm border border-nordic-beige bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-nordic-slate/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-nordic-brown min-h-[300px] font-mono"
                            placeholder="<h2>Ingredienser</h2>..."
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="published" id="published" className="h-4 w-4 rounded border-nordic-beige text-nordic-brown focus:ring-nordic-brown" />
                        <label htmlFor="published" className="text-sm font-medium text-nordic-slate">Publicer med det samme</label>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? 'Gemmer...' : 'Opret Opskrift'}
                    </Button>
                </form>
            </div>
        </main>
    );
}
