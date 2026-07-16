
import type {Metadata} from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'PGAS | Shri Padmavati Grameen Abhivruddhi Sansthe',
  description: 'Empowering rural Karnataka through sustainable community development, education, and health awareness in Athani, Belagavi.',
  openGraph: {
    title: 'PGAS | Helping Hands • Empowering Rural Communities',
    description: 'Registered NGO committed to education and rural development in Karnataka.',
    url: 'https://pgas.org.in',
    siteName: 'PGAS NGO',
    images: [
      {
        url: 'https://drive.google.com/uc?export=view&id=1CrPqY4-6cK30VHR6VgdkrPKlyBlMnIXF',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Shri Padmavati Grameen Abhivruddhi Sansthe",
    "alternateName": "PGAS",
    "url": "https://pgas.org.in",
    "logo": "https://drive.google.com/uc?export=view&id=1CrPqY4-6cK30VHR6VgdkrPKlyBlMnIXF",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Akkol Tot, Awarakhod",
      "addressLocality": "Athani",
      "addressRegion": "Karnataka",
      "postalCode": "591304",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-96323-78928",
      "contactType": "customer service",
      "email": "bharamun@gmail.com"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-serif antialiased selection:bg-secondary/30 scroll-smooth">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
