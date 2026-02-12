import { Phone, FileText } from "lucide-react";
import { Link } from "wouter";

export default function StickyMobileCTA() {
  return (
    <div
      data-testid="sticky-mobile-cta"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
    >
      <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
        <a
          href="tel:713-529-1177"
          data-testid="button-mobile-call"
          className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-3.5 px-4 text-sm uppercase tracking-wider transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <Link href="/contact-us">
          <span
            data-testid="button-mobile-review"
            className="flex items-center justify-center gap-2 border border-secondary text-secondary hover:bg-secondary/10 font-bold py-3.5 px-4 text-sm uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
          >
            <FileText className="w-4 h-4" />
            Free Review
          </span>
        </Link>
      </div>
    </div>
  );
}
