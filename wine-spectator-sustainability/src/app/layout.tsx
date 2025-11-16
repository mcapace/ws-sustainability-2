import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { campaignDisplay, campaignBody, campaignAccent } from './fonts';
import { OrganizationStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData';
import { AnalyticsProviderWrapper } from '@/components/providers/AnalyticsProviderWrapper';

export const metadata: Metadata = {
  title: {
    default: 'Wine Spectator Sustainability | Stewardship in Every Pour',
    template: '%s | Wine Spectator Sustainability',
  },
  description:
    'Explore six visionary wineries transforming climate ambition into remarkable wine—curated by Wine Spectator for the 2025 Sustainability campaign.',
  keywords: [
    'Wine Spectator sustainability',
    'regenerative vineyards',
    'climate positive wineries',
    'sustainable sparkling wine',
    'blue carbon wine initiatives',
    'renewable energy winery',
    'biodiversity in vineyards',
    'responsible winemaking',
    'wine ESG storytelling',
  ],
  authors: [{ name: 'Wine Spectator' }],
  creator: 'Wine Spectator',
  publisher: 'Wine Spectator',
  icons: {
    icon: '/Sustainability/Logos/WS%20Favicon.jpg',
    shortcut: '/Sustainability/Logos/WS%20Favicon.jpg',
    apple: '/Sustainability/Logos/WS%20Favicon.jpg',
  },
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
    type: 'website',
    locale: 'en_US',
    url: 'https://campaign.winespectator.com/sustainability',
    siteName: 'Wine Spectator Sustainability',
    title: 'Wine Spectator Sustainability | Stewardship in Every Pour',
    description:
      'Discover regenerative, coastal, and community-driven pillars behind Wine Spectator\'s sustainability cohort.',
    images: [
      {
        url: '/images/hero/sustainability-collection-hero.jpeg',
        width: 1200,
        height: 630,
        alt: 'Wine Spectator Sustainability hero imagery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wine Spectator Sustainability | Stewardship in Every Pour',
    description:
      'Six wineries, three pillars, one playbook for climate-forward storytelling curated by Wine Spectator.',
    images: ['/images/hero/sustainability-collection-hero.jpeg'],
    creator: '@WineSpectator',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  alternates: {
    canonical: 'https://campaign.winespectator.com/sustainability',
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
        {/* Critical CSS inline */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html { font-family: ${campaignBody.style.fontFamily}, system-ui, sans-serif; }
              .font-display { font-family: ${campaignDisplay.style.fontFamily}, serif; }
              .font-body { font-family: ${campaignBody.style.fontFamily}, system-ui, sans-serif; }
              .font-accent { font-family: ${campaignAccent.style.fontFamily}, sans-serif; }
            `,
          }}
        />
        <OrganizationStructuredData />
        <BreadcrumbStructuredData />

        {/* Google Publisher Tag header script */}
        <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossOrigin="anonymous"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.googletag = window.googletag || { cmd: [] };
              googletag.cmd.push(function () {
                // Top leaderboard (desktop/tablet 728x90, mobile 300x50)
                googletag
                  .defineSlot('/4054/WS_Sustainability_2025', [[728, 90], [300, 50]], 'div-gpt-ad-top')
                  .addService(googletag.pubads());

                // Mid-page rectangle (all: 300x250)
                googletag
                  .defineSlot('/4054/WS_Sustainability_2025', [[300, 250]], 'div-gpt-ad-mid')
                  .addService(googletag.pubads());

                // Bottom leaderboard (desktop/tablet 728x90, mobile 300x50)
                googletag
                  .defineSlot('/4054/WS_Sustainability_2025', [[728, 90], [300, 50]], 'div-gpt-ad-bottom')
                  .addService(googletag.pubads());

                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            `,
          }}
        />
      </head>
      <body
        className={`${campaignDisplay.variable} ${campaignBody.variable} ${campaignAccent.variable} antialiased bg-[#EEF3EA] text-[#143024]`}
      >
        <AnalyticsProviderWrapper>
          {children}
        </AnalyticsProviderWrapper>
        <Analytics />
      </body>
    </html>
  );
}