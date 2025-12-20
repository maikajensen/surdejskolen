'use client';

import { useState } from 'react';
import { Recipe } from '@/types';
import Link from 'next/link';
import { cn } from '@/components/ui/Button'; // Assuming cn exists or I'll just use template literals if not

// Simple Tab Button Component
function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={`
                px-6 py-3 text-lg font-serif font-medium transition-all duration-300 border-b-2
                ${active
                    ? 'border-nordic-brown text-nordic-brown'
                    : 'border-transparent text-nordic-slate hover:text-nordic-brown hover:border-nordic-beige'
                }
            `}
        >
            {children}
        </button>
    );
}

interface RecipeTabsProps {
    recipes: Recipe[];
}

export function RecipeTabs({ recipes }: RecipeTabsProps) {
    // Default tab 'grundopskrift' (since it is first)
    const [activeTab, setActiveTab] = useState<'surdej' | 'overskydende' | 'grundopskrift'>('grundopskrift');

    // Filter recipes. We treat null/undefined category as 'surdej' for legacy support
    const filteredRecipes = recipes.filter(recipe => {
        const cat = recipe.category || 'surdej';
        return cat === activeTab;
    });

    return (
        <div className="space-y-8">
            {/* Tabs Navigation */}
            <div className="flex justify-center space-x-4 border-b border-nordic-beige/30 mb-8 overflow-x-auto">
                <TabButton
                    active={activeTab === 'grundopskrift'}
                    onClick={() => setActiveTab('grundopskrift')}
                >
                    Grundopskrift
                </TabButton>
                <TabButton
                    active={activeTab === 'surdej'}
                    onClick={() => setActiveTab('surdej')}
                >
                    Surdej
                </TabButton>
                <TabButton
                    active={activeTab === 'overskydende'}
                    onClick={() => setActiveTab('overskydende')}
                >
                    Overskydende Surdej
                </TabButton>
            </div>

            {/* Recipe Grid */}
            {filteredRecipes.length === 0 ? (
                <div className="text-center py-12 text-nordic-slate bg-nordic-beige/10 rounded-sm">
                    <p>Der er ingen opskrifter i denne kategori endnu.</p>
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredRecipes.map((recipe) => (
                        <Link href={`/opskrifter/${recipe.slug}`} key={recipe.id} className="group cursor-pointer">
                            <div className="bg-white rounded-sm overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border border-nordic-beige h-full flex flex-col">
                                <div className="aspect-[4/3] relative bg-nordic-beige overflow-hidden">
                                    {recipe.image_url ? (
                                        <img
                                            src={recipe.image_url}
                                            alt={recipe.title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-nordic-tan">Billede mangler</div>
                                    )}
                                </div>
                                <div className="p-6 flex-grow">
                                    <h3 className="text-xl font-serif font-bold text-nordic-brown mb-2 group-hover:text-nordic-brown/80">
                                        {recipe.title}
                                    </h3>
                                    <p className="text-nordic-slate line-clamp-3 text-sm leading-relaxed">
                                        {recipe.description}
                                    </p>
                                    <div className="mt-4 text-sm font-medium text-nordic-brown underline decoration-1 underline-offset-4">
                                        Læs opskrift
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
