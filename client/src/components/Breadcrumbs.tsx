import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href ? { "item": `https://thomasandwan.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="py-3 bg-gray-900 border-b border-white/15">
        <div className="container mx-auto px-4 md:px-6">
          <ol className="flex items-center gap-1.5 text-xs text-white/60 flex-wrap" data-testid="breadcrumbs">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="w-3 h-3 text-white/30" />}
                {item.href && index < items.length - 1 ? (
                  <Link href={item.href} className="hover:text-secondary transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white/90 font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
