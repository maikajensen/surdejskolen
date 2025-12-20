import { Navbar } from '@/components/ui/Navbar';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
    return (
        <main className="min-h-screen pt-20 bg-nordic-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-24 text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
                <h1 className="text-4xl font-serif font-bold text-nordic-brown mb-4">
                    Tak for din ordre!
                </h1>
                <p className="text-lg text-nordic-slate mb-8 max-w-lg mx-auto">
                    Vi har modtaget din bestilling og sender en bekræftelse til din email snart.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/butik">
                        <Button variant="outline">
                            Køb mere
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button>
                            Tilbage til forsiden
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
