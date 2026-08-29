import React from 'react';
import './globals.css';

export const metadata = {
  title      : 'Bini Cooperations',
  description: 'Bini Cooperations builds software that solves real problems and helps businesses move forward.',
  keywords   : ['Custom Software', 'Digital Products', 'Web Applications', 'Business Systems', 'Product Design', 'Software Engineering'],
  themeColor : '#00CFFF',
  manifest   : '/site.webmanifest',
  openGraph: {
    title      : 'Bini Cooperations',
    description: 'Bini Cooperations builds software that solves real problems and helps businesses move forward.',
    images     : [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card   : 'summary_large_image',
    title  : 'Bini Cooperations',
    creator: '@binidu01',
    images : ['/og-image.png'],
  },
  icons: {
    icon : [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
