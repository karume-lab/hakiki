import type { Metadata } from "next";

export const metadataConfig: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Hakiki | Tracking Political Finance in Kenya",
    template: "%s | Hakiki",
  },
  description:
    "Hakiki is an independent transparency tool for tracking Kenyan political finance, campaign spending, and candidate declarations.",
  keywords: [
    "Hakiki",
    "Kenya Politics",
    "Political Finance",
    "Transparency Kenya",
    "Campaign Spending",
    "IEBC",
    "ORPP",
    "Corruption Tracking",
    "Citizen Reporting",
    "Kenya Elections",
  ],
  authors: [
    {
      name: "Transparency International Kenya",
      url: "https://www.tikenya.org",
    },
  ],
  creator: "Transparency International Kenya",
  publisher: "Transparency International Kenya",

  openGraph: {
    title: "Hakiki | Tracking Political Finance in Kenya",
    description:
      "Monitor political finance, campaign declarations, and party spending in Kenya. An independent tool by Transparency International Kenya.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Hakiki",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hakiki | Tracking Political Finance in Kenya",
    description:
      "Independent transparency tool for Kenyan political finance and campaign spending.",
    creator: "@TIKenya",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },

  category: "technology",
};

const SEOConfig = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hakiki",
    alternateName: "Hakiki Political Finance Tracker",
    url: process.env.NEXT_PUBLIC_APP_URL,
    description: "Independent transparency tool for tracking Kenyan political finance.",
    author: {
      "@type": "Organization",
      name: "Transparency International Kenya",
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
};

export default SEOConfig;
