import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/shop/CartSidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Surdejskolen - Lær at bage fantastisk brød",
    template: "%s | Surdejskolen",
  },
  description: "Deltag i vores workshops og lær kunsten at bage det perfekte surdejsbrød. Vi tilbyder kurser, opskrifter og faglige tips til din bagning.",
  keywords: ["surdej", "bagekursus", "brød", "surdejsbrød", "workshop", "bage", "opskrifter", "surdejskolen"],
  authors: [{ name: "Maika Jensen" }],
  creator: "Maika Jensen",
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://surdejskolen.dk",
    title: "Surdejskolen - Lær at bage fantastisk brød",
    description: "Workshops i surdejsbagning, opskrifter og mere.",
    siteName: "Surdejskolen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surdejskolen",
    description: "Lær at bage det perfekte surdejsbrød",
    creator: "@surdejskolen",
  },
  verification: {
    google: "5_XPKc6PvjVNe8uoZZN4LNGTVADTQ-Uji43CzP1UbUo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased bg-nordic-white text-nordic-slate`}
      >
        <CartProvider>
          {children}
          <CartSidebar />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
