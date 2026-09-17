import type { Metadata } from "next";
import "@fontsource-variable/cormorant-garamond/wght.css";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://omugaservices.com"),
  title: "Omuga Services — Luxury Stays, Concierge & Property Brokerage",
  description:
    "Omuga Services curates East Africa's finest hotels, Airbnb stays, safari lodges and cottages, delivers bespoke lifestyle concierge — airport pickups, private chefs, chauffeurs — and brokers luxury villas, land and verified properties.",
  keywords: [
    "luxury stays Uganda",
    "Airbnb booking Kampala",
    "safari lodges",
    "concierge services East Africa",
    "luxury property brokerage",
    "villas for sale Uganda",
    "Omuga Services",
  ],
  openGraph: {
    title: "Omuga Services — Luxury, Curated for East Africa",
    description:
      "Hotels & Airbnb booking, bespoke lifestyle concierge, and luxury property brokerage across Uganda and Kenya.",
    type: "website",
    images: ["/images/residence-ivory.jpg"],
  },
  verification: {
    google: "DYifwrhajRBlZbVH4ym0HG87TaX30ARoJrTKomx-JjA",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
