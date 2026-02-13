import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useWordPressPage } from "@/hooks/useWordPressPage";

export default function Testimonials() {
  const { page, loading } = useWordPressPage("testimonials");

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary pb-20 md:pb-0">
      <SEO 
        title="Client Testimonials"
        description="Read what our clients say about Thomas & Wan. Real reviews from families we've represented in medical malpractice, birth injury, and negligence cases in Houston, TX."
        canonical="https://thomasandwan.com/testimonials"
      />
      <Navigation />
      
      <main className="pt-20">
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 transform origin-top translate-x-1/4" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                  Client Stories
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                Voices of <br/>
                <span className="text-secondary italic">Justice & Hope</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                Don't just take our word for it. Read what our clients have to say about their experience working with Thomas & Wan.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            {loading ? (
              <div className="max-w-4xl mx-auto animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-6 bg-gray-200 rounded w-2/3 mt-8" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
              </div>
            ) : page?.content ? (
              <div className="max-w-4xl mx-auto wp-content" dangerouslySetInnerHTML={{ __html: page.content }} />
            ) : (
              <div className="max-w-4xl mx-auto wp-content">
                <p>Content is being updated. Please check back shortly.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
