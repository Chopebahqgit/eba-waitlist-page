import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Eba - Save Up to 35% on Quality Food | Join Waitlist',
  description: 'Rescue surplus meals from Abuja\'s best restaurants at up to 35% off. Save food, save money, and protect the environment. Join the waitlist for early access.',
  keywords: ['food savings', 'surplus food', 'food waste', 'Lagos restaurants', 'Abuja food', 'discount meals', 'Eba Nigeria', 'save money on food'],
  authors: [{ name: 'Eba Technologies' }],
  metadataBase: new URL('https://www.chopeba.com'),
  openGraph: {
    title: 'Eba - Save Up to 35% on Quality Food',
    description: 'Rescue surplus meals from Abuja\'s best restaurants. Great prices. Zero waste.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'Eba',
    images: [
      {
        url: '/eba-logo.png',
        width: 512,
        height: 512,
        alt: 'Eba Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eba - Save Up to 35% on Quality Food',
    description: 'Rescue surplus meals at up to 35% off. Join the waitlist for early access.',
    images: ['/eba-logo.png'],
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
