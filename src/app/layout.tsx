import React from 'react'
import './globals.css'

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Bini Cooperations',
  alternateName: 'Bini',
  url: 'https://binicooperations.dpdns.org',
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bini Cooperations',
  url: 'https://binicooperations.dpdns.org',
  logo: 'https://binicooperations.dpdns.org/logo.svg',
  email: 'binicooperations@gmail.com',
  sameAs: [
    'https://www.linkedin.com/company/bini-cooperation/',
    'https://github.com/Binidu01',
  ],
}

export const document = {
  head: (
    <>
      <title>Bini Cooperations</title>
      <meta
        name="description"
        content="Bini Cooperations designs and builds custom software, web applications, business systems, and digital products around real operational needs."
      />
      <meta name="theme-color" content="#000000" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href="https://binicooperations.dpdns.org" />

      <link rel="manifest" href="/site.webmanifest" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Bini Cooperations" />
      <meta property="og:url" content="https://binicooperations.dpdns.org" />
      <meta property="og:title" content="Bini Cooperations" />
      <meta
        property="og:description"
        content="Bini Cooperations designs and builds custom software, web applications, business systems, and digital products around real operational needs."
      />
      <meta property="og:image" content="https://binicooperations.dpdns.org/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Bini Cooperations" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@binidu01" />
      <meta name="twitter:title" content="Bini Cooperations" />
      <meta
        name="twitter:description"
        content="Bini Cooperations designs and builds custom software, web applications, business systems, and digital products around real operational needs."
      />
      <meta name="twitter:image" content="https://binicooperations.dpdns.org/og-image.png" />
      <meta name="twitter:image:alt" content="Bini Cooperations" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
    </>
  ),
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal?: React.ReactNode
}) {
  return (
    <React.Fragment>
      {children}
      {modal}
    </React.Fragment>
  )
}