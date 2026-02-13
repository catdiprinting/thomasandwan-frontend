import PageShell from "@/components/PageShell";
import SEO from "@/components/SEO";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useWordPressPage } from "@/hooks/useWordPressPage";

export default function Cases() {
  const { page, loading } = useWordPressPage("cases-we-handle");

  return (
    <PageShell title="Cases We Handle" subtitle="Medical Malpractice Focus">
      <SEO 
        title="Cases We Handle"
        description="Thomas & Wan handles medical malpractice, birth injuries, brain injuries, surgical errors, medication errors, misdiagnosis, and more. Free case review in Houston, TX."
        canonical="https://thomasandwan.com/cases-we-handle"
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

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <LeadCaptureForm variant="card" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
