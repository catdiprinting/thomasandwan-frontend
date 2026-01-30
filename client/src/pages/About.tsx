import { motion } from "framer-motion";
import { CheckCircle2, Award, Heart, Scale, GraduationCap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 transform origin-top translate-x-1/4" />
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl "
            >
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                  About Our Firm
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                Compassionate Texas <br/>
                <span className="text-secondary italic">Medical Malpractice</span> Lawyers
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                We Care, and Our Dedication Shines Through. Representing our clients in the pursuit of justice is both an honor and a privilege.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission / Why Choose Us */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-4xl font-serif text-primary mb-6">
                  Empowering Citizens through the Legal System
                </h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                  <p>
                    We firmly believe that juries play a pivotal role in safeguarding the rights of citizens. 
                    In the courtroom, an injured individual stands on equal ground with even the largest hospital corporations.
                  </p>
                  <p>
                    Whether your case can be resolved amicably without the need for a lawsuit or requires a tenacious battle that extends all the way to trial, we’re here to stand by your side. Every client, without exception, deserves the highest standard of legal representation and an equitable opportunity to present their case in court.
                  </p>
                </div>
              </div>

              <div className="bg-[#F9F7F5] p-10 relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-secondary" />
                <h3 className="font-serif text-2xl text-primary mb-8">Why Choose Thomas & Wan</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Heart className="w-6 h-6 text-secondary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-primary text-lg">Unwavering Dedication</h4>
                      <p className="text-slate-600">Our commitment to seeking justice knows no bounds. We ensure our clients receive the compensation they deserve.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-primary text-lg">Advocates for Change</h4>
                      <p className="text-slate-600">We strive to effect meaningful change in the medical industry to prevent future instances of malpractice.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Scale className="w-6 h-6 text-secondary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-primary text-lg">Equal Footing</h4>
                      <p className="text-slate-600">Regardless of the size or influence of the opposing party, we stand ready to fight for your rights.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Award className="w-6 h-6 text-secondary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-primary text-lg">Quality Legal Representation</h4>
                      <p className="text-slate-600">Every client is entitled to top-notch legal representation handled with the utmost care and expertise.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Bios */}
        <section className="py-24 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6 space-y-24">
            
            {/* Linda Thomas */}
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 relative">
                <div className="aspect-[3/4] relative z-10">
                  <img 
                    src="/images/partner-thomas.jpg" 
                    alt="Linda Laurent Thomas" 
                    className="w-full h-full object-cover shadow-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-secondary/20 z-0" />
              </div>
              <div className="lg:col-span-8">
                <h2 className="text-4xl font-serif text-primary mb-2">Linda Laurent Thomas</h2>
                <p className="text-secondary font-bold uppercase tracking-widest text-sm mb-6">Partner | Since 1987</p>
                
                <div className="space-y-6 text-slate-600 leading-relaxed mb-8">
                  <p>
                    Since 1987, Linda Laurent Thomas has pursued aggressive legal representation on behalf of injury victims. 
                    Whether the wrongdoer is a Fortune 500 corporate giant or a reckless driver, Thomas has dedicated her career to fighting for individuals to obtain the maximum amount of damages available under the law.
                  </p>
                  <p>
                    Every case that the firm takes on is handled with the highest level of care and attention. This representation involves all phases of a complex personal injury action: early and thorough factual investigation, retention of expert witnesses, thorough case value assessment, aggressive pre-trial discovery, and proactive negotiations.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-primary flex items-center gap-2 mb-3">
                      <GraduationCap className="w-5 h-5 text-secondary" /> Education
                    </h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      <li>South Texas College of Law (Cum Laude)</li>
                      <li>University of Texas at Austin</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-secondary" /> Recognition
                    </h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      <li>Multi-Million Dollar Advocates Forum</li>
                      <li>Elite Lawyers of America</li>
                      <li>H Texas Magazine Top Lawyer</li>
                    </ul>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground italic border-t border-gray-200 pt-4">
                  Linda enjoys gardening, watercolor painting, photography, travel, and rescuing stray animals.
                </p>
              </div>
            </div>

            {/* Michelle Wan */}
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 lg:order-2 relative">
                <div className="aspect-[3/4] relative z-10">
                  <img 
                    src="/images/partner-wan.jpg" 
                    alt="Michelle W. Wan" 
                    className="w-full h-full object-cover shadow-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-full h-full border-4 border-secondary/20 z-0" />
              </div>
              <div className="lg:col-span-8 lg:order-1">
                <h2 className="text-4xl font-serif text-primary mb-2">Michelle W. Wan</h2>
                <p className="text-secondary font-bold uppercase tracking-widest text-sm mb-6">Partner</p>
                
                <div className="space-y-6 text-slate-600 leading-relaxed mb-8">
                  <p>
                    Michelle W. Wan has worked exclusively representing clients in personal injury matters, handling numerous matters involving toxic exposures, medical negligence, and product defects. 
                    Like Thomas, Wan has dedicated her career to fighting on behalf of persons injured by the negligence of others.
                  </p>
                  <p>
                    Wan and Thomas work as a team in trial. Wan enjoys the ability to stand in front of juries and bring her clients’ side of the story to the light of a courtroom. 
                    As a former law journal editor, she enjoys in-depth legal research and strives for concise and clear writing.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-primary flex items-center gap-2 mb-3">
                      <GraduationCap className="w-5 h-5 text-secondary" /> Education
                    </h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      <li>University of Texas School of Law (2001)</li>
                      <li>Rice University (B.A., National Merit Scholar)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-secondary" /> Recognition
                    </h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      <li>Multi-Million Dollar Advocates Forum</li>
                      <li>Texas Monthly SuperLawyer</li>
                      <li>Houstonia Magazine Top Lawyer</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground italic border-t border-gray-200 pt-4">
                  Michelle enjoys being a mother, cooking, and rescuing stray animals to give to Ms. Thomas.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white py-20 text-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Do You Have a Medical Malpractice Case?</h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Call us today for a free consultation. If you have the medical records, you can send them to us for a free review with no obligation. Remember, strict deadlines apply.
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-10 text-xl rounded-none">
              Call (713) 529-1177
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
