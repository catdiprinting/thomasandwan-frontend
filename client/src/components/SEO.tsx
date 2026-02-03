import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  image?: string;
  schema?: object;
}

export default function SEO({ 
  title, 
  description, 
  canonical,
  type = "website",
  image = "/images/logo.webp",
  schema
}: SEOProps) {
  const fullTitle = `${title} | Thomas & Wan Law Firm`;
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

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
    updateMeta("og:image", `${siteUrl}${image}`, true);
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    if (schema) {
      let script = document.getElementById("schema-jsonld") as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = "schema-jsonld";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

    return () => {
      const schemaScript = document.getElementById("schema-jsonld");
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [fullTitle, description, canonical, type, image, schema, siteUrl]);

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
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "addressCountry": "US"
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
