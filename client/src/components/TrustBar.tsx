import { Star } from "lucide-react";

interface TrustBarProps {
  rating?: string;
  ratingLabel?: string;
  avTitle?: string;
  avSubtitle?: string;
}

export default function TrustBar({
  rating = "5.0",
  ratingLabel = "Google Reviews",
  avTitle = "AV Preeminent®",
  avSubtitle = "Peer Rated for Highest Level of Excellence",
}: TrustBarProps) {
  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-8 gap-6 md:gap-8">
          
          <div className="flex-1 w-full flex justify-center md:justify-start">
             <img 
               src="/images/trust-badges.png" 
               alt="Award Badges: Million Dollar Advocates, Super Lawyers, Top 25 Trial Lawyers" 
               className="h-20 md:h-28 object-contain transition-all duration-500"
             />
          </div>

          <div className="flex items-center gap-8 shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8 mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-end">
             <div className="flex flex-col items-center md:items-end">
               <div className="flex items-center gap-1 mb-1">
                 <span className="font-bold text-primary text-lg" data-testid="text-trust-rating">{rating}</span>
                 <div className="flex text-secondary">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} className="w-4 h-4 fill-current" />
                   ))}
                 </div>
               </div>
               <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold" data-testid="text-trust-rating-label">
                 {ratingLabel}
               </span>
             </div>

             <div className="hidden sm:flex flex-col items-center md:items-end text-right">
                <span className="font-serif font-bold text-primary text-lg leading-none" data-testid="text-trust-av-title">{avTitle}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1" data-testid="text-trust-av-subtitle">
                  {avSubtitle}
                </span>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
