import { ArrowLeft, Calendar, User } from "lucide-react";
import PageShell from "@/components/PageShell";

export default function BlogPostTemplate() {
  return (
    <PageShell title="Blog Post Template" subtitle="Article Layout">
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <a
              href="https://www.thomasandwan.com/blog/"
              className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:text-secondary transition-colors"
              data-testid="link-back-blog"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </a>

            <div className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</span>
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> Author</span>
            </div>

            <h2 className="mt-6 text-3xl md:text-4xl font-serif text-primary leading-tight">
              Headless Post Title (Template)
            </h2>

            <div className="mt-8 aspect-[16/9] bg-gray-100 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Featured Image Placeholder
              </div>
            </div>

            <div className="mt-10 space-y-6 text-lg text-slate-600 leading-relaxed font-light">
              <p>
                This is a template for how a blog post should look once you hook up your headless content pipeline that outputs HTML.
              </p>
              <p>
                Provide the post title, author, date, categories/tags, featured image, and HTML content. This page will render it in a consistent design.
              </p>
              <h3 className="text-2xl font-serif text-primary">Example Subheading</h3>
              <p>
                Add paragraphs, lists, callouts, and internal links. Keep spacing and readability optimized for long-form legal content.
              </p>
              <ul className="list-disc list-inside">
                <li>Clear headings</li>
                <li>Scannable bullets</li>
                <li>Strong calls-to-action</li>
              </ul>
            </div>

            <div className="mt-14 bg-primary text-white p-10 border-t-4 border-secondary">
              <h3 className="text-2xl md:text-3xl font-serif mb-4">Talk to an attorney</h3>
              <p className="text-white/80 leading-relaxed mb-8">
                If you believe medical negligence played a role in your situation, reach out for a free consultation.
              </p>
              <a
                href="https://www.thomasandwan.com/contact-us/"
                className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm w-full"
                data-testid="link-blogpost-cta"
              >
                Contact Thomas & Wan
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
