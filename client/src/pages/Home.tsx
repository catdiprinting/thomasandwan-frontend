import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WomenOwnedSection from "@/components/WomenOwnedSection";
import PracticeAreas from "@/components/PracticeAreas";
import TestimonialsAndResults from "@/components/Testimonials";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />
      <main>
        <Hero />
        <WomenOwnedSection />
        <PracticeAreas />
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

        <BlogSection />

      </main>
      <Footer />
    </div>
  );
}
