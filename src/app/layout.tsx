import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

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
  openGraph: {
    title: 'Codnexa | Strategy, Design & Development Studio',
    description: 'We build high-fidelity digital platforms, brand identities, and software services for ambitious brands.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <body className="noise" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
