import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface TeamSectionProps {
  label?: string;
  heading?: string;
  partner1Name?: string;
  partner1Title?: string;
  partner1Bio?: string;
  partner2Name?: string;
  partner2Title?: string;
  partner2Bio?: string;
}

export default function TeamSection({
  label = "Team Behind This Work",
  heading = "Dedicated to Your Family's Future",
  partner1Name = "Linda Laurent Thomas",
  partner1Title = "Partner",
  partner1Bio = "Since 1987, Linda Laurent Thomas has pursued aggressive legal representation on behalf of injury victims. She specializes in cases involving personal injuries, wrongful death, and medical malpractice.",
  partner2Name = "Michelle W. Wan",
  partner2Title = "Partner",
  partner2Bio = "Michelle W. Wan has worked exclusively representing clients in personal injury matters. Like Thomas, Wan has dedicated her career to fighting on behalf of persons injured by the negligence of others.",
}: TeamSectionProps) {
  return (
    <section className="py-24 bg-[#F9F7F5]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block" data-testid="text-team-label">
            {label}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary" data-testid="text-team-heading">
            {heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start max-w-5xl mx-auto">
          <div className="group">
            <Link href="/about-thomas-wan-llp#linda-thomas">
              <div className="relative mb-8 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
                <img 
                  src="/images/partner-thomas.jpg" 
                  alt={partner1Name}
                  className="w-full aspect-[3/4] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 bg-primary text-white p-4 min-w-[200px] z-20">
                  <h3 className="font-serif text-xl" data-testid="text-team-partner1-name">{partner1Name}</h3>
                  <p className="text-secondary text-sm uppercase tracking-wider" data-testid="text-team-partner1-title">{partner1Title}</p>
                </div>
              </div>
            </Link>
            
            <p className="text-lg text-slate-600 leading-relaxed mb-6 font-light" data-testid="text-team-partner1-bio">
              {partner1Bio}
            </p>
            
            <Link href="/about-thomas-wan-llp#linda-thomas" data-testid="link-profile-thomas">
              <Button variant="link" className="text-primary font-bold uppercase tracking-wide p-0 h-auto hover:text-secondary group-hover:translate-x-2 transition-transform">
                View Profile <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="group">
            <Link href="/about-thomas-wan-llp#michelle-wan">
              <div className="relative mb-8 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
                <img 
                  src="/images/partner-wan.jpg" 
                  alt={partner2Name}
                  className="w-full aspect-[3/4] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 bg-primary text-white p-4 min-w-[200px] z-20">
                  <h3 className="font-serif text-xl" data-testid="text-team-partner2-name">{partner2Name}</h3>
                  <p className="text-secondary text-sm uppercase tracking-wider" data-testid="text-team-partner2-title">{partner2Title}</p>
                </div>
              </div>
            </Link>
            
            <p className="text-lg text-slate-600 leading-relaxed mb-6 font-light" data-testid="text-team-partner2-bio">
              {partner2Bio}
            </p>
            
            <Link href="/about-thomas-wan-llp#michelle-wan" data-testid="link-profile-wan">
              <Button variant="link" className="text-primary font-bold uppercase tracking-wide p-0 h-auto hover:text-secondary group-hover:translate-x-2 transition-transform">
                View Profile <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
