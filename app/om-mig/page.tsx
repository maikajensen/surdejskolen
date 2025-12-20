
import { Navbar } from '@/components/ui/Navbar';
import Image from 'next/image';

export default function OmMigPage() {
    return (
        <main className="min-h-screen pt-20 bg-nordic-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-md">
                        <Image
                            src="/images/prof.jpg"
                            alt="Maika - Surdejsbager"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-nordic-brown">
                            Om Mig
                        </h1>
                        <h2 className="text-xl text-nordic-tan font-medium">
                            Velkommen til min surdejsverden
                        </h2>

                        <div className="space-y-4 text-nordic-slate text-lg leading-relaxed">
                            <p>
                                Jeg hedder Maika, og jeg har bagt med surdej i flere år.
                                Det der startede som en nysgerrighed, udviklede sig hurtigt til en passion
                                og en livsstil.
                            </p>
                            <p>
                                Surdej er for mig magisk. Det er simple ingredienser – mel, vand og salt –
                                der gennem tid, temperatur og teknik forvandles til det mest velsmagende
                                og nærende brød.
                            </p>
                            <p>
                                I Surdejskolen vil jeg gerne dele min viden og erfaring med dig,
                                så du kan bage brød af høj kvalitet i dit eget køkken.
                                Vi går i dybden med teknikkerne, men holder det nede på jorden.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
