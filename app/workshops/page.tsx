import { Navbar } from '@/components/ui/Navbar';
import { WorkshopList } from '@/components/sections/WorkshopList';

export default function WorkshopsPage() {
    return (
        <main className="min-h-screen pt-20 bg-nordic-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-nordic-brown mb-4">
                        Kommende Workshops
                    </h1>
                    <p className="text-lg text-nordic-slate max-w-2xl mx-auto">
                        Lær at mestre surdejsbagning. Vi gennemgår alt fra modning af surdej til formning og bagning.
                    </p>
                </div>

                <WorkshopList />
            </div>
        </main>
    );
}
