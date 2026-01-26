import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Scale, Gavel } from "lucide-react";

const caseResults = [
  { amount: "$6.5 Million", type: "Birth Injury Settlement", desc: "Settlement for a child who suffered severe brain damage (HIE) due to delayed C-section delivery." },
  { amount: "$4.8 Million", type: "Wrongful Death", desc: "Settlement for the family of a mother who passed away due to failure to diagnose a heart condition." },
  { amount: "$2.1 Million", type: "Surgical Error Verdict", desc: "Jury verdict for a patient who suffered permanent nerve damage during a routine spinal surgery." },
  { amount: "$1.5 Million", type: "Misdiagnosis", desc: "Settlement for failure to diagnose breast cancer in a timely manner, reducing chance of survival." },
  { amount: "$3.2 Million", type: "Anesthesia Error", desc: "Settlement for a patient who suffered brain injury due to improper anesthesia administration." },
  { amount: "$950,000", type: "Medication Error", desc: "Settlement for a patient given the wrong dosage of medication leading to kidney failure." },
  { amount: "$5.0 Million", type: "Birth Injury Verdict", desc: "Jury verdict against a hospital for shoulder dystocia resulting in permanent arm paralysis." },
  { amount: "Confidential", type: "Emergency Room Negligence", desc: "Substantial settlement for failure to treat a stroke in the ER within the critical time window." }
];

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 skew-y-12 transform origin-top translate-x-1/4" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                  Our Track Record
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                Proven Results in <br/>
                <span className="text-secondary italic">High-Stakes</span> Cases
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                We have successfully recovered millions for our clients. While every case is unique, our dedication to winning for our clients never wavers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro Stats */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center divide-x-0 md:divide-x divide-gray-100">
              <div className="p-4">
                <Trophy className="w-12 h-12 text-secondary mx-auto mb-4" />
                <div className="text-4xl font-serif text-primary mb-2">$50M+</div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground">Recovered for Clients</div>
              </div>
              <div className="p-4">
                <Scale className="w-12 h-12 text-secondary mx-auto mb-4" />
                <div className="text-4xl font-serif text-primary mb-2">55+</div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground">Years Combined Experience</div>
              </div>
              <div className="p-4">
                <Gavel className="w-12 h-12 text-secondary mx-auto mb-4" />
                <div className="text-4xl font-serif text-primary mb-2">100%</div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground">Medical Malpractice Focus</div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Grid */}
        <section className="py-24 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {caseResults.map((result, idx) => (
                <div key={idx} className="bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-secondary group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl md:text-4xl font-serif text-primary group-hover:scale-105 transition-transform origin-left">
                      {result.amount}
                    </h3>
                  </div>
                  <div className="text-secondary font-bold uppercase tracking-wider text-sm mb-4">
                    {result.type}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {result.desc}
                  </p>
                </div>
              ))}
            </div>
            
            <p className="text-center text-muted-foreground mt-16 italic text-sm max-w-2xl mx-auto">
              *Past results do not guarantee future outcomes. Each case is unique and must be evaluated on its own merits. 
              The amounts listed represent gross settlements or verdicts before deduction of attorney fees and expenses.
            </p>
          </div>
        </section>

        {/* Testimonials Link */}
        <section className="bg-white py-24">
           <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl font-serif text-primary mb-8">Hear From Our Clients</h2>
             <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
               The numbers tell one part of the story, but the lives we've changed tell the rest.
             </p>
             <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg rounded-none">
               Read Client Testimonials
             </Button>
           </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
