import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-nordic-brown text-nordic-beige py-12 px-4 text-center">
            <div className="flex flex-col gap-4 items-center">
                <p className="font-serif">&copy; {new Date().getFullYear()} Surdejskolen. Alle rettigheder forbeholdes.</p>
                <div className="flex gap-6">
                    <a
                        href="https://instagram.com/surdejskolen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-nordic-beige/80 hover:text-nordic-beige transition-colors flex items-center gap-2"
                    >
                        <span>Instagram</span>
                    </a>
                    <a href="mailto:surdejskolen@gmail.com" className="text-nordic-beige/80 hover:text-nordic-beige transition-colors font-medium">
                        surdejskolen@gmail.com
                    </a>
                </div>
            </div>
        </footer>
    );
}
