import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeContext';
import { I18nProvider } from '@/lib/i18n/i18n-context';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  manifest: '/manifest.json',
  keywords: [
    'nexora tools',
    'all in one utility',
    'pdf tools',
    'pdf merge',
    'image to pdf',
    'pdf to jpg',
    'compress pdf',
    'word counter',
    'case converter',
    'json formatter',
    'base64 encode',
    'unix timestamp',
    'color converter',
    'sha256 hash generator',
    'password generator',
    'image converter',
    'ocr image to text',
    'mb to kb',
    'unit converter',
    'pdf editor',
    'barcode generator',
    'qr code generator',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#026fc7" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased selection:bg-brand-500 selection:text-white">
        <ThemeProvider>
          <I18nProvider>
            <Header />
            <main className="flex-1 pb-16 xl:pb-0">{children}</main>
            <Footer />
            <MobileNav />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
