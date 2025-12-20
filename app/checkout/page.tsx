import { Navbar } from '@/components/ui/Navbar';
import { CheckoutForm } from '@/components/shop/CheckoutForm';

export default function CheckoutPage() {
    return (
        <main className="min-h-screen pt-20 bg-nordic-white">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-nordic-brown mb-12 text-center">
                    Kassen
                </h1>
                <CheckoutForm />
            </div>
        </main>
    );
}
