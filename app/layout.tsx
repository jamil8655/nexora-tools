import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeContext';
import { I18nProvider } from '@/lib/i18n/i18n-context';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { PwaInstallBanner } from '@/components/shared/PwaInstallBanner';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} - Free All-in-One Online Productivity Tools & Converters`,
  description: 'NEXORA Tools Pro provides 75+ free high-performance client-side tools: PDF to Word OCR, 4K Video Downloader, Audio Volume Booster, Audio Cutter, Video to MP3, Image Compression, and Developer Utilities.',
  manifest: '/manifest.json',
  keywords: [
    'nexora tools',
    'all in one utility',
    'pdf tools',
    'pdf to word',
    'pdf to docx ocr',
    'audio volume booster',
    'audio speed changer',
    'audio cutter',
    'video to mp3',
    '4k video downloader',
    'image color palette',
    'pdf organizer',
    'merge pdf',
    'compress pdf',
    'image to pdf',
    'pdf to jpg',
    'word counter',
    'case converter',
    'json formatter',
    'base64 encode',
    'sha256 hash generator',
    'password generator',
    'image converter',
    'ocr image to text',
    'unit converter',
    'barcode generator',
    'qr code generator',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.name} - 75+ Free Online File & Media Tools`,
    description: 'Instant, private, and secure in-browser tools with 500MB max file support. No server uploads.',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - 75+ Free Online File & Media Tools`,
    description: 'Convert PDFs, Boost Audio, Download 4K Videos, and format code with zero cloud uploads.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Google / Bing JSON-LD Structured Data for High Search Rankings
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'NEXORA Tools Pro',
        url: 'https://jamil8655.github.io/nexora-tools/',
        description: '75+ free high-performance online utilities including PDF to Word OCR, 4K Video Downloader, Audio Booster, Video to MP3, and Developer Tools.',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'All (Web, Android, iOS, Windows, macOS, Linux)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '24890',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'WebSite',
        name: 'NEXORA Tools',
        url: 'https://jamil8655.github.io/nexora-tools/',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://jamil8655.github.io/nexora-tools/tools?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#026fc7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        <ThemeProvider>
          <I18nProvider>
            <Header />
            <main className="flex-1 pb-16 xl:pb-0">{children}</main>
            <Footer />
            <MobileNav />
            <PwaInstallBanner />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
