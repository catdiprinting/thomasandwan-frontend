import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  image?: string;
  schema?: object | object[];
  noindex?: boolean;
}

export default function SEO({ 
  title, 
  description, 
  canonical,
  type = "website",
  image = "/images/logo.webp",
  schema,
  noindex = false,
}: SEOProps) {
  const fullTitle = `${title} | Thomas & Wan Law Firm`;
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const absoluteImage = image?.startsWith("/") ? `${siteUrl}${image}` : image;

  useEffect(() => {
    document.title = fullTitle;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMeta("description", description);
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", type, true);
    updateMeta("og:image", absoluteImage || `${siteUrl}/images/logo.webp`, true);
    updateMeta("og:site_name", "Thomas & Wan Law Firm", true);
    updateMeta("og:locale", "en_US", true);
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", absoluteImage || `${siteUrl}/images/logo.webp`);

    if (canonical) {
      updateMeta("og:url", canonical, true);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    if (noindex) {
      updateMeta("robots", "noindex, nofollow");
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta && robotsMeta.getAttribute("content") === "noindex, nofollow") {
        robotsMeta.remove();
      }
    }

    updateMeta("geo.region", "US-TX");
    updateMeta("geo.placename", "Houston");
    updateMeta("geo.position", "29.723317;-95.401952");
    updateMeta("ICBM", "29.723317, -95.401952");

    const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];
    document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove());
    schemas.forEach((s, i) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-schema", `${i}`);
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove());
    };
  }, [fullTitle, description, canonical, type, absoluteImage, schema, siteUrl, noindex]);

  return null;
}

export const lawFirmSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Thomas & Wan Law Firm",
  "description": "Houston-based medical malpractice law firm representing victims of birth injuries, medical negligence, and hospital malpractice.",
  "url": "https://thomasandwan.com",
  "telephone": "(713) 529-1177",
  "email": "info@thomasandwan.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1710 Sunset Blvd",
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "postalCode": "77005",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 29.723317,
    "longitude": -95.401952
  },
  "areaServed": {
    "@type": "State",
    "name": "Texas"
  },
  "priceRange": "Free Consultation",
  "openingHours": "Mo-Fr 09:00-17:00",
  "sameAs": [],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Legal Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Medical Malpractice"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Birth Injury Cases"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Complications of Childbirth Cases"
        }
      }
    ]
  }
};

export const createFAQSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
});

export const attorneySchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Linda Laurent Thomas",
    "jobTitle": "Partner",
    "worksFor": {
      "@type": "LegalService",
      "name": "Thomas & Wan Law Firm"
    },
    "url": "https://thomasandwan.com/about-thomas-wan-llp",
    "alumniOf": [
      { "@type": "CollegeOrUniversity", "name": "South Texas College of Law" },
      { "@type": "CollegeOrUniversity", "name": "University of Texas at Austin" }
    ],
    "award": ["Multi-Million Dollar Advocates Forum", "Elite Lawyers of America", "H Texas Magazine Top Lawyer"],
    "knowsAbout": ["Medical Malpractice", "Birth Injuries", "Personal Injury Law"]
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Michelle W. Wan",
    "jobTitle": "Partner",
    "worksFor": {
      "@type": "LegalService",
      "name": "Thomas & Wan Law Firm"
    },
    "url": "https://thomasandwan.com/about-thomas-wan-llp",
    "alumniOf": [
      { "@type": "CollegeOrUniversity", "name": "University of Texas School of Law" },
      { "@type": "CollegeOrUniversity", "name": "Rice University" }
    ],
    "award": ["Multi-Million Dollar Advocates Forum", "Texas Monthly SuperLawyer", "Houstonia Magazine Top Lawyer"],
    "knowsAbout": ["Medical Malpractice", "Personal Injury", "Toxic Exposure"]
  }
];

export const createReviewSchema = (reviews: { quote: string; author: string; date?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Thomas & Wan Law Firm",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "bestRating": "5",
    "ratingCount": String(reviews.length)
  },
  "review": reviews.map(r => ({
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": r.author
    },
    ...(r.date ? { "datePublished": r.date } : {}),
    "reviewBody": r.quote
  }))
});

export const createPracticeAreaSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Legal Service",
  "name": name,
  "description": description,
  "url": url,
  "provider": {
    "@type": "LegalService",
    "name": "Thomas & Wan Law Firm",
    "telephone": "(713) 529-1177"
  },
  "areaServed": {
    "@type": "State",
    "name": "Texas"
  }
});
