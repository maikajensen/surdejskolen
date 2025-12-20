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
  title: "Surdejskolen - Lær at bage fantastisk brød",
  description: "Workshops i surdejsbagning, opskrifter og mere.",
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
