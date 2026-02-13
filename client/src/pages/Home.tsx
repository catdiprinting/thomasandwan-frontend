import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import SEO, { lawFirmSchema } from "@/components/SEO";
import { useWordPressPage } from "@/hooks/useWordPressPage";

export default function Home() {
  const { page, loading } = useWordPressPage("home");

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

        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <LeadCaptureForm variant="card" />
            </div>
          </div>
        </section>

        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
