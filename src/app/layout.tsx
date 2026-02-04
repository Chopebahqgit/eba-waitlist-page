import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'EBA - Save Up to 70% on Quality Food | Join Waitlist',
  description: 'Rescue surplus meals from Lagos & Abuja\'s best restaurants at up to 70% off. Save food, save money, and protect the environment. Join the waitlist for early access.',
  keywords: ['food savings', 'surplus food', 'food waste', 'Lagos restaurants', 'Abuja food', 'discount meals', 'EBA Nigeria', 'save money on food'],
  authors: [{ name: 'EBA Technologies' }],
  openGraph: {
    title: 'EBA - Save Up to 70% on Quality Food',
    description: 'Rescue surplus meals from Lagos & Abuja\'s best restaurants. Great prices. Zero waste.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'EBA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EBA - Save Up to 70% on Quality Food',
    description: 'Rescue surplus meals at up to 70% off. Join the waitlist for early access.',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  themeColor: '#FF6B00',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
