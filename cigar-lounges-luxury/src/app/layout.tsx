import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { playfairDisplay, inter, cormorantGaramond } from './fonts';
import { OrganizationStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData';
import { AnalyticsProviderWrapper } from '@/components/providers/AnalyticsProviderWrapper';

export const metadata: Metadata = {
  title: {
    default: "Cigar Aficionado Select | Three Legendary Destinations, One Exceptional Standard",
    template: "%s | Cigar Aficionado Select"
  },
  description: "Discover New York's most prestigious cigar destinations. Davidoff's dual Manhattan locations and Barclay Rex's Wall Street institution offer unparalleled collections, exclusive experiences, and over 200 years of combined heritage.",
  keywords: [
    "Davidoff Madison Avenue flagship",
    "Davidoff 6th Avenue downtown",
    "Barclay Rex Wall Street since 1910",
    "luxury cigars Manhattan",
    "premium cigar experience NYC",
    "Swiss cigar excellence",
    "pre-embargo Cuban collection",
    "cigar aficionado select partners",
    "New York cigar heritage",
    "Wall Street tobacconist",
    "Madison Avenue luxury cigars",
    "private humidor lockers",
    "custom cigar blending",
    "exclusive cigar releases"
  ],
  authors: [{ name: "Cigar Aficionado" }],
  creator: "Cigar Aficionado",
  publisher: "Cigar Aficionado",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bestcigarlounges.cigaraficionado.com",
    siteName: "Cigar Aficionado Select",
    title: "Cigar Aficionado Select | Davidoff & Barclay Rex Premium Experiences",
    description: "Experience luxury cigar lounges featuring Davidoff of Geneva and Barclay Rex. Premium cigars, fine spirits, and sophisticated ambiance in Manhattan.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cigar Aficionado Select - Davidoff & Barclay Rex Premium Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cigar Aficionado Select | Davidoff & Barclay Rex Premium Experiences",
    description: "Experience luxury cigar lounges featuring Davidoff of Geneva and Barclay Rex. Premium cigars, fine spirits, and sophisticated ambiance in Manhattan.",
    images: ["/images/og-image.jpg"],
    creator: "@cigaraficionado",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://bestcigarlounges.cigaraficionado.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/_next/static/media/playfair-display.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Critical CSS inline */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
              .font-display { font-family: ${playfairDisplay.style.fontFamily}, serif; }
              .font-body { font-family: ${inter.style.fontFamily}, system-ui, sans-serif; }
              .font-accent { font-family: ${cormorantGaramond.style.fontFamily}, serif; }
            `,
          }}
        />
        <OrganizationStructuredData />
        <BreadcrumbStructuredData />
      </head>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${cormorantGaramond.variable} antialiased`}
      >
        <AnalyticsProviderWrapper>
          {children}
        </AnalyticsProviderWrapper>
        <Analytics />
      </body>
    </html>
  );
}
