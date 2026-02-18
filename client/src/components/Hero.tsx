import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface HeroProps {
  label?: string;
  heading?: string;
  text?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
  badge1?: string;
  badge2?: string;
}

export default function Hero({
  label = "Medical Malpractice Attorneys",
  heading = "Hurt by a Doctor or Hospital? We Help Families Get Answers.",
  text = "If you or someone you love was seriously harmed by a doctor or hospital, you have rights. Hospitals have lawyers on day one. You deserve someone fighting for you too.",
  ctaText = "Free Case Review",
  ctaLink = "/contact-us",
  secondaryText = "Learn More",
  secondaryLink = "/cases-we-handle",
  badge1 = "Available 24/7",
  badge2 = "No Win, No Fee",
}: HeroProps) {
  return (
    <section className="relative overflow-x-hidden bg-white pt-28 md:pt-36">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-[5fr_7fr] gap-8 md:gap-10 items-start py-8 md:py-12">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 md:order-1 space-y-4 md:space-y-5 relative z-10"
        >
          <div className="inline-block border-b-2 border-secondary pb-1 mb-2 md:mb-4">
            <span className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm" data-testid="text-hero-label">
              {label}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-primary leading-[1.2] pb-2" data-testid="text-hero-heading">
            {(() => {
              const match = heading.match(/(.*?)(We\s+Help\s+Families\S*)(.*)/i);
              if (match) {
                return (
                  <>
                    {match[1]}<span className="italic text-secondary">{match[2]}</span>{match[3]}
                  </>
                );
              }
              return heading;
            })()}
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground font-light max-w-lg leading-relaxed" data-testid="text-hero-text">
            {text}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href={ctaLink} className="md:hidden w-full sm:w-auto">
              <Button size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-none h-14 px-8 text-base tracking-wide border-0" data-testid="button-hero-cta">
                {ctaText}
              </Button>
            </Link>
            <Link href={ctaLink} className="hidden md:inline-flex w-auto">
              <Button size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-none h-14 px-8 text-base tracking-wide border-0" data-testid="button-hero-cta-desktop">
                {ctaText}
              </Button>
            </Link>
            <Link href={secondaryLink} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-none h-14 px-8 text-base tracking-wide group" data-testid="button-hero-secondary">
                {secondaryText} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="pt-2 md:pt-4 flex items-center gap-6 text-muted-foreground">
             <div className="flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-secondary"></span>
               <span className="text-base font-medium text-primary" data-testid="text-hero-badge1">{badge1}</span>
             </div>
             <div className="flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-secondary"></span>
               <span className="text-base font-medium text-primary" data-testid="text-hero-badge2">{badge2}</span>
             </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="order-1 md:order-2 relative"
        >
          <div className="relative z-10">
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-secondary/30 z-0 hidden md:block" />
            <div className="overflow-hidden shadow-2xl relative bg-white p-2 border border-gray-100">
               <img 
                 src="/images/partners-hero.jpg" 
                 alt="Linda Thomas and Michelle Wan" 
                 className="w-full h-auto object-cover"
                 style={{ margin: "0 -8%", width: "116%", maxWidth: "116%" }}
               />
            </div>
          </div>
          
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute top-10 right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
