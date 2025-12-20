import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

// Placeholder standard export for now, will be updated as sections are built
export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center bg-nordic-beige overflow-hidden">
        {/* Background Image Placeholder - using a nice gradient/color for now if image missing */}
        <div className="absolute inset-0 z-0 bg-nordic-tan/30">
          {/* Ideally use next/image here with fill */}
          {/* <Image src="/hero-bread.jpg" alt="Surdejsbrød" fill className="object-cover opacity-80" priority /> */}
          <div className="absolute inset-0 bg-[url('/hero-bread.jpg')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-nordic-white/90 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-serif text-nordic-brown font-bold mb-6 tracking-tight drop-shadow-sm">
            Lær at bage det perfekte surdejsbrød
          </h1>
          <p className="text-xl md:text-2xl text-nordic-slate mb-8 font-light leading-relaxed max-w-2xl mx-auto">
            Kom med i køkkenet og mærk dejen mellem hænderne. Vi lærer dig teknikken bag det luftige brød med den sprøde skorpe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/workshops">
              <Button size="lg">Book en Workshop</Button>
            </Link>
            <Link href="/opskrifter">
              <Button variant="outline" size="lg" className="bg-white/50 backdrop-blur-sm border-nordic-brown">
                Se Opskrifter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="om-mig" className="py-24 px-4 bg-nordic-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 relative aspect-[3/4] md:aspect-square w-full max-w-md bg-nordic-beige rounded-sm overflow-hidden shadow-lg rotate-1 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/maika-profile.jpg"
              alt="Maika Jensen"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-serif text-nordic-brown font-bold">Om Surdejskolen</h2>
            <p className="text-lg text-nordic-slate leading-relaxed">
              Jeg startede Surdejskolen med en simpel passion: at dele glæden ved at bage sit eget brød. Der er noget magisk i at se vand, mel og salt forvandle sig til et gyldent, duftende brød.
            </p>
            <p className="text-lg text-nordic-slate leading-relaxed">
              På mine workshops går vi i dybden med surdejens biologi, foldeteknikker og bagning, så du kan gå hjem og genskabe magien i dit eget køkken.
            </p>
            <div className="pt-4">
              <p className="font-serif text-xl italic text-nordic-brown">- Velkommen i køkkenet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Placeholder in Page for MVP preview, move to layout/component later */}

    </main>
  );
}
