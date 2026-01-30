import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 md:order-1 space-y-8 relative z-10 "
        >
          <div className="inline-block border-b-2 border-secondary pb-1">
            <span className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm">
              Medical Malpractice Attorneys
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-primary leading-[1.1]">
            We Care And <br/>
            <span className="italic text-secondary">It Shows</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-lg leading-relaxed">
            With over 55 years of combined experience in medical malpractice and birth injury cases, 
            Linda Thomas and Michelle Wan are the dedicated attorneys you need to protect your family's rights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-none h-14 px-8 text-base tracking-wide border-0">
              Schedule Free Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-none h-14 px-8 text-base tracking-wide group">
              Learn More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="pt-8 flex items-center gap-6 text-muted-foreground">
             <div className="flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-secondary"></span>
               <span className="text-lg font-medium text-primary">Available 24/7</span>
             </div>
             <div className="flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-secondary"></span>
               <span className="text-lg font-medium text-primary">No Win, No Fee</span>
             </div>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden md:block order-1 md:order-2 relative"
        >
          <div className="relative z-10">
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-secondary/30 z-0 hidden md:block" />
            <div className="aspect-[4/5] overflow-hidden shadow-2xl relative bg-white p-2 border border-gray-100">
               <img 
                 src="/images/partners-hero.jpg" 
                 alt="Linda Thomas and Michelle Wan" 
                 className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
               />
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute top-10 right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
