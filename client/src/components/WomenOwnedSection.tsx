import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface WomenOwnedSectionProps {
  label?: string;
  heading?: string;
  text1?: string;
  text2?: string;
  quote?: string;
}

export default function WomenOwnedSection({
  label = "Why Choose Us",
  heading = "When You Hire Us, You Work with Us.",
  text1 = "At Thomas & Wan, you will work directly with Linda Thomas and Michelle Wan. We do not pass your case to junior associates. We do not refer cases out to other attorneys. We prepare every case as if it will go to trial.",
  text2 = "With over 60 years of combined experience, we have held major Texas hospitals accountable over and over again.",
  quote = "We don't refer cases out. When you hire Thomas & Wan, you get Thomas & Wan.",
}: WomenOwnedSectionProps) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5 relative">
             <div className="grid grid-cols-2 gap-4">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="mt-12"
               >
                 <div className="bg-[#F9F7F5] p-2 shadow-lg rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
                    <img 
                      src="/images/partner-thomas.jpg" 
                      alt="Linda Thomas" 
                      className="w-full aspect-[3/4] object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="pt-3 pb-1 text-center font-serif text-lg text-primary">Linda Thomas</div>
                 </div>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
               >
                 <div className="bg-[#F9F7F5] p-2 shadow-lg rotate-[2deg] transition-transform hover:rotate-0 duration-500">
                    <img 
                      src="/images/partner-wan.jpg" 
                      alt="Michelle Wan" 
                      className="w-full aspect-[3/4] object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="pt-3 pb-1 text-center font-serif text-lg text-primary">Michelle Wan</div>
                 </div>
               </motion.div>
             </div>
             
             <div className="md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 bg-primary text-white p-6 md:p-8 max-w-xs w-full shadow-xl z-20 text-center mt-8 md:mt-0 mx-auto relative">
                <span className="text-4xl text-secondary font-serif leading-none">"</span>
                <p className="font-serif italic text-lg md:text-xl leading-relaxed mb-4" data-testid="text-about-quote">
                  {quote}
                </p>
                <div className="w-12 h-1 bg-secondary mx-auto mb-2"></div>
             </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4" data-testid="text-about-label">
              {label}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8" data-testid="text-about-heading">
              {heading}
            </h2>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
              <p data-testid="text-about-text1">{text1}</p>
              <p data-testid="text-about-text2">{text2}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              <div className="flex gap-4">
                 <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                 <div>
                   <h4 className="font-bold text-primary mb-1">Direct Representation</h4>
                   <p className="text-sm text-slate-500">You work directly with the partners, not junior associates.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                 <div>
                   <h4 className="font-bold text-primary mb-1">Medical Expertise</h4>
                   <p className="text-sm text-slate-500">We hire top experts from Harvard, Yale, and premier institutions.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                 <div>
                   <h4 className="font-bold text-primary mb-1">Compassionate Advocacy</h4>
                   <p className="text-sm text-slate-500">We fight aggressively in court while treating you with care.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                 <div>
                   <h4 className="font-bold text-primary mb-1">Proven Results</h4>
                   <p className="text-sm text-slate-500">Millions recovered for birth injuries and wrongful death.</p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
