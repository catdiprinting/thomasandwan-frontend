import PageShell from "@/components/PageShell";
import SEO from "@/components/SEO";
import { useWordPressPage } from "@/hooks/useWordPressPage";

export default function FAQ() {
  const { page, loading } = useWordPressPage("faq");

  return (
    <PageShell title="Frequently Asked Questions" subtitle="What to Expect">
      <SEO 
        title="Frequently Asked Questions"
        description="Get answers to common questions about medical malpractice claims, attorney fees, the lawsuit process, depositions, mediation, and trial — from Thomas & Wan in Houston, TX."
        canonical="https://thomasandwan.com/faq"
      />

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
    </PageShell>
  );
}
