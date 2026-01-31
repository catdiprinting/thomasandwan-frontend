import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Baby, Stethoscope, Brain, Activity, HeartPulse, ArrowUpRight, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Malpractice Lawyers | Birth Injury Attorneys Houston',
  description: 'With over 55 years of combined experience in medical malpractice and birth injury cases, Linda Thomas and Michelle Wan are the dedicated attorneys you need to protect your family\'s rights.',
  openGraph: {
    title: 'Thomas & Wan, LLP | Houston Medical Malpractice Attorneys',
    description: 'Award-winning medical malpractice attorneys. Women-owned law firm specializing in birth injuries, surgical errors, and misdiagnosis.',
  },
};

const practices = [
  { title: "Birth Injuries", icon: Baby, desc: "Cerebral palsy, hypoxia, shoulder dystocia, and preventable birth trauma.", href: "/practice-areas/birth-injuries" },
  { title: "Surgical Errors", icon: Stethoscope, desc: "Mistakes during surgery, anesthesia errors, and post-operative negligence.", href: "/practice-areas/medical-malpractice" },
  { title: "Brain Injuries", icon: Brain, desc: "Traumatic brain injuries resulting from medical negligence or malpractice.", href: "/practice-areas/birth-injuries" },
  { title: "Misdiagnosis", icon: Activity, desc: "Failure to diagnose cancer, heart attacks, strokes, and critical conditions.", href: "/practice-areas/medical-malpractice" },
  { title: "Wrongful Death", icon: HeartPulse, desc: "Seeking justice for the loss of a loved one due to medical carelessness.", href: "/practice-areas/medical-malpractice" },
];

const caseResults = [
  { amount: "$6.5 Million", type: "Birth Injury Settlement", description: "Settlement for a child who suffered brain damage due to delayed delivery." },
  { amount: "$2.1 Million", type: "Surgical Error", description: "Verdict for a patient who suffered permanent nerve damage during routine surgery." },
  { amount: "$4.8 Million", type: "Wrongful Death", description: "Settlement for a family who lost a loved one due to misdiagnosis of a heart condition." },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Thomas & Wan, LLP",
  "description": "Houston medical malpractice attorneys specializing in birth injuries and medical negligence",
  "url": "https://www.thomasandwan.com",
  "telephone": "+1-713-529-1177",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1710 Sunset Blvd",
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "postalCode": "77005",
    "addressCountry": "US"
  },
  "areaServed": "Texas",
  "priceRange": "Free Consultation"
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main>
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-8 relative z-10">
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
                Linda Thomas and Michelle Wan are the dedicated attorneys you need to protect your family&apos;s rights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/contact" 
                  className="bg-secondary hover:bg-secondary/90 text-white h-14 px-8 text-base tracking-wide flex items-center justify-center font-bold"
                >
                  Schedule Free Consultation
                </Link>
                <Link 
                  href="/about" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white h-14 px-8 text-base tracking-wide flex items-center justify-center font-bold group transition-colors"
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
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
            </div>

            <div className="hidden md:block order-1 md:order-2 relative">
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
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute top-10 right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-8">
              <div className="flex-1 w-full flex justify-center md:justify-start">
                 <img 
                   src="/images/trust-badges.png" 
                   alt="Award Badges: Million Dollar Advocates, Super Lawyers, Top 25 Trial Lawyers" 
                   className="h-24 md:h-32 object-contain transition-all duration-500"
                 />
              </div>
              <div className="flex items-center gap-8 shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8 mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-end">
                 <div className="flex flex-col items-center md:items-end">
                   <div className="flex items-center gap-1 mb-1">
                     <span className="font-bold text-primary text-lg">5.0</span>
                     <div className="flex text-secondary">
                       {[...Array(5)].map((_, i) => (
                         <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                       ))}
                     </div>
                   </div>
                   <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                     Google Reviews
                   </span>
                 </div>
                 <div className="hidden sm:flex flex-col items-center md:items-end text-right">
                    <span className="font-serif font-bold text-primary text-lg leading-none">AV Preeminent®</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">
                      Peer Rated for Highest Level of Excellence
                    </span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
                Our Expertise
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">
                Focused Exclusively on <br/>
                <span className="italic font-alt text-secondary">Medical Malpractice</span>
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                We don&apos;t handle car accidents or divorces. Our sole focus is mastering the 
                complex realm of medical malpractice to win for you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {practices.map((area, idx) => (
                <Link 
                  key={idx} 
                  href={area.href}
                  className="group relative overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white block"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  
                  <div className="pt-8 px-8">
                    <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                      <area.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-serif text-2xl text-primary group-hover:text-secondary transition-colors">
                      {area.title}
                    </h3>
                  </div>
                  <div className="px-8 pb-8 pt-4">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {area.desc}
                    </p>
                    <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Learn More <ArrowUpRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
              
              <div className="bg-primary p-8 flex flex-col justify-center items-center text-center text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <h3 className="font-serif text-3xl mb-4 relative z-10">Do You Have a Case?</h3>
                <p className="mb-8 text-white/80 relative z-10">
                  Get a free review of your medical records by our expert team.
                </p>
                <Link 
                  href="/contact"
                  className="bg-secondary text-primary px-8 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors relative z-10"
                >
                  Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="grid lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-5 relative">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="mt-12">
                     <div className="bg-[#F9F7F5] p-2 shadow-lg rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                        <img 
                          src="/images/partner-thomas.jpg" 
                          alt="Linda Thomas" 
                          className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="pt-3 pb-1 text-center font-serif text-lg text-primary">Linda Thomas</div>
                     </div>
                   </div>

                   <div>
                     <div className="bg-[#F9F7F5] p-2 shadow-lg rotate-[2deg] hover:rotate-0 transition-transform duration-500">
                        <img 
                          src="/images/partner-wan.jpg" 
                          alt="Michelle Wan" 
                          className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="pt-3 pb-1 text-center font-serif text-lg text-primary">Michelle Wan</div>
                     </div>
                   </div>
                 </div>
                 
                 <div className="md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 bg-primary text-white p-6 md:p-8 max-w-xs w-full shadow-xl z-20 text-center mt-8 md:mt-0 mx-auto relative">
                    <span className="text-4xl text-secondary font-serif leading-none">&ldquo;</span>
                    <p className="font-serif italic text-lg md:text-xl leading-relaxed mb-4">
                      We don&apos;t refer cases out. When you hire Thomas & Wan, you get Thomas & Wan.
                    </p>
                    <div className="w-12 h-1 bg-secondary mx-auto mb-2"></div>
                 </div>
              </div>

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
                    We don&apos;t just see a case; we see a mother, a child, a family that has been wronged.
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

        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="text-center mb-12">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
                Proven Track Record
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary">
                Recent Case Results
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {caseResults.map((result, idx) => (
                <div key={idx} className="border-t-4 border-secondary pt-6 group hover:bg-[#F9F7F5] transition-colors p-6">
                  <div className="text-4xl font-serif text-primary mb-2 group-hover:scale-105 transition-transform origin-left">
                    {result.amount}
                  </div>
                  <div className="text-secondary font-bold uppercase tracking-wider text-sm mb-3">
                    {result.type}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {result.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-white border-y border-secondary/30">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-4">
              <div className="text-5xl md:text-6xl font-serif text-secondary mb-2">55+</div>
              <div className="text-sm uppercase tracking-widest opacity-80">Years Combined Experience</div>
            </div>
            <div className="p-4">
              <div className="text-5xl md:text-6xl font-serif text-secondary mb-2">$50M+</div>
              <div className="text-sm uppercase tracking-widest opacity-80">Recovered for Clients</div>
            </div>
            <div className="p-4">
              <div className="text-5xl md:text-6xl font-serif text-secondary mb-2">100%</div>
              <div className="text-sm uppercase tracking-widest opacity-80">Medical Malpractice Focus</div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-primary">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Read testimonials from families we&apos;ve helped through difficult medical malpractice cases.
            </p>
            <Link 
              href="/testimonials" 
              className="inline-flex items-center justify-center px-8 py-4 bg-secondary hover:bg-secondary/90 text-white font-bold transition-colors"
            >
              Read Client Testimonials
            </Link>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-primary">Latest from Our Blog</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stay informed with legal insights on medical malpractice and birth injury cases.
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary hover:bg-primary hover:text-white text-primary font-bold transition-colors"
            >
              Visit Our Blog
            </Link>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Discuss Your Case?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Contact us today for a free, confidential consultation. There&apos;s no obligation, and we don&apos;t charge unless we win your case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary hover:bg-secondary/90 text-white font-bold transition-colors"
              >
                Free Case Evaluation
              </Link>
              <a 
                href="tel:+17135291177" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-bold transition-colors"
              >
                Call (713) 529-1177
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
