import { Navbar } from '@/components/ui/Navbar';

export default function TipsPage() {
    return (
        <main className="min-h-screen pt-20 bg-nordic-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-nordic-brown mb-8 text-center">
                    Tips & Tricks
                </h1>
                <p className="text-lg text-nordic-slate text-center max-w-2xl mx-auto">
                    Her vil der snart komme gode råd til din surdej, bageteknikker og meget mere.
                </p>
            </div>
        </main>
    );
}
