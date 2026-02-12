import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WomenOwnedSection from "@/components/WomenOwnedSection";
import PracticeAreas from "@/components/PracticeAreas";
import TestimonialsAndResults from "@/components/Testimonials";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import SEO, { lawFirmSchema } from "@/components/SEO";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary pb-20 md:pb-0">
      <SEO 
        title="Houston Medical Malpractice Lawyers"
        description="Thomas & Wan is a Houston-based medical malpractice law firm representing victims of birth injuries, medical negligence, and hospital malpractice. Free consultation."
        canonical="https://thomasandwan.com"
        schema={lawFirmSchema}
      />
      <Navigation />
      <main>
        <Hero />
        <TrustBar />
        
        {/* Reordered: Practice Areas first */}
        <PracticeAreas />
        
        <WomenOwnedSection />
        
        {/* New Team Section */}
        <TeamSection />
        
        <TestimonialsAndResults />
        
        {/* Simple Stats Banner */}
        <section className="bg-primary py-16 text-white border-y border-secondary/30">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
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

        {/* New FAQ Section */}
        <FAQSection />

        <BlogSection />

      </main>
      <Footer />
    </div>
  );
}
