import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import PageTransition from '@/components/PageTransition';

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Codnexa | Strategy, Design & Development Studio',
  description: 'Codnexa is a premium strategy, design and development studio. We build high-fidelity digital platforms, brand identities, and software services for ambitious brands.',
  keywords: ['Software Development', 'Design Agency', 'UI/UX Design', 'SaaS', 'Brand Identity', 'Custom Software'],
  icons: {
    icon: [
      { url: '/logo-icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
  openGraph: {
    title: 'Codnexa | Strategy, Design & Development Studio',
    description: 'We build high-fidelity digital platforms, brand identities, and software services for ambitious brands.',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Codnexa Studio',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`light ${cormorantGaramond.variable} ${inter.variable}`}>
      <body className="noise" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
        <ThemeProvider>
          <LanguageProvider>
            <Preloader />
            <CustomCursor />
            <Navbar />
            <main style={{ flex: 1 }}>
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

