import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function WomenOwnedSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left Column: Images */}
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
             
             {/* Quote Box */}
             <div className="md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 bg-primary text-white p-6 md:p-8 max-w-xs w-full shadow-xl z-20 text-center mt-8 md:mt-0 mx-auto relative">
                <span className="text-4xl text-secondary font-serif leading-none">"</span>
                <p className="font-serif italic text-lg md:text-xl leading-relaxed mb-4">
                  We don't refer cases out. When you hire Thomas & Wan, you get Thomas & Wan.
                </p>
                <div className="w-12 h-1 bg-secondary mx-auto mb-2"></div>
             </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8">
              A Women-Owned Firm <br/>
              <span className="text-muted-foreground italic font-alt">Fighting for Families</span>
            </h2>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
              <p>
                At Thomas & Wan, we bring a unique perspective to medical malpractice law. 
                As a women-owned firm, we understand the deep emotional toll that medical negligence takes on families.
                We don't just see a case; we see a mother, a child, a family that has been wronged.
              </p>
              <p>
                With over 55 years of combined experience, we have successfully resolved cases for millions of dollars 
                against major hospitals throughout Texas. But what truly sets us apart is our personal commitment.
              </p>
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
