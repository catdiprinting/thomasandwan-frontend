import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SEO, { createPracticeAreaSchema } from "@/components/SEO";
import { useWordPressPage } from "@/hooks/useWordPressPage";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export default function ComplicationsOfChildbirth() {
  const { page, loading } = useWordPressPage("complications-of-childbirth");

  const schema = createPracticeAreaSchema(
    "Childbirth Complications Lawyers",
    "Houston attorneys representing mothers injured during pregnancy and childbirth due to medical negligence. Preeclampsia, C-section injuries, postpartum hemorrhage cases.",
    "https://thomasandwan.com/cases-we-handle/complications-of-childbirth"
  );

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary pb-20 md:pb-0">
      <SEO 
        title={page?.title || "Complications of Childbirth Lawyers in Houston"}
        description="Texas attorneys at Thomas & Wan represent mothers who suffered injuries due to medical negligence during pregnancy and childbirth. Free consultation."
        canonical="https://thomasandwan.com/cases-we-handle/complications-of-childbirth"
        schema={schema}
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
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">Cases We Handle</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                {page?.title || "Complications of Childbirth"}
              </h1>
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
                <div className="h-4 bg-gray-200 rounded w-full" />
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

        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <LeadCaptureForm variant="card" />
            </div>
          </div>
        </section>

        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Free Consultation</h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              If you or a loved one has been affected, contact us today for a free, confidential consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:713-529-1177">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-10 text-xl rounded-none">
                  <Phone className="mr-2 h-5 w-5" /> Call (713) 529-1177
                </Button>
              </a>
              <Link href="/contact-us">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold py-8 px-10 text-xl rounded-none">
                  Free Case Review
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
