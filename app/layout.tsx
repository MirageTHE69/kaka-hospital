import type { Metadata, Viewport } from "next";
import { Montserrat, Public_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { departments } from "@/content/departments";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { JsonLd } from "@/components/JsonLd";
import { hospitalSchema } from "@/lib/schema";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "KK Hospital Vadodara | Orthopedic & Multispeciality Hospital",
    template: "%s | KK Multispeciality Hospital, Vadodara",
  },
  description:
    "KK Hospital Vadodara is a trusted orthopedic and multispeciality hospital offering joint replacement, fracture care, spine treatment, gynecology, internal medicine, diagnostics and emergency care.",
  applicationName: site.name,
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#0F2A3F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const menuDepartments = departments.map(({ slug, name, art, summary }) => ({ slug, name, art, summary }));
  return (
    <html lang="en-IN" className={`${montserrat.variable} ${publicSans.variable}`}>
      <body>
        <JsonLd data={hospitalSchema()} />
        <BookingProvider>
          <SiteHeader departments={menuDepartments} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
          <WhatsAppFloat />
        </BookingProvider>
      </body>
    </html>
  );
}
