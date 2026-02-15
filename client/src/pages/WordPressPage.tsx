import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SEO, { createPracticeAreaSchema, lawFirmSchema } from "@/components/SEO";

interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_title?: string;
    og_description?: string;
    canonical?: string;
  };
}

type PageLayout = "homepage" | "page" | "practice-area";

interface WordPressPageProps {
  slugOverride?: string;
  category?: string;
  layout?: PageLayout;
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
}

export default function WordPressPage({
  slugOverride,
  category = "Cases We Handle",
  layout = "practice-area",
  seoTitle,
  seoDescription,
  canonical,
}: WordPressPageProps) {
  const [, params] = useRoute("/cases-we-handle/:slug");
  const slug = slugOverride || params?.slug;

  const [page, setPage] = useState<WPPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchPage() {
      try {
        setLoading(true);
        const response = await fetch(`/api/pages/${slug}`);
        if (!response.ok) {
          throw new Error("Page not found");
        }
        const data = await response.json();
        setPage(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load page");
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navigation />
        <main className={layout === "homepage" ? "" : "pt-32"}>
          <div className="container mx-auto px-4 text-center py-20">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-serif text-primary mb-4">Page Not Found</h1>
            <p className="text-slate-600">The page you're looking for doesn't exist or has been moved.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const finalTitle = seoTitle || page.yoast_head_json?.title || page.title.rendered;
  const finalDescription = seoDescription || page.yoast_head_json?.description ||
    page.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160);
  const finalCanonical = canonical || page.yoast_head_json?.canonical ||
    `https://thomasandwan.com/${page.slug}`;

  const schema = layout === "homepage"
    ? lawFirmSchema
    : createPracticeAreaSchema(page.title.rendered, finalDescription, finalCanonical);

  if (layout === "homepage") {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary pb-20 md:pb-0">
        <SEO
          title={finalTitle}
          description={finalDescription}
          canonical={finalCanonical}
          schema={schema}
        />
        <Navigation />
        <main>
          <div
            className="wp-content wp-homepage"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (layout === "page") {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary pb-20 md:pb-0">
        <SEO
          title={finalTitle}
          description={finalDescription}
          canonical={finalCanonical}
          schema={schema}
        />
        <Navigation />
        <main className="pt-20">
          <section className="bg-primary text-white py-18 md:py-24 relative overflow-x-hidden">
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
                    {category}
                  </span>
                </div>
                <h1
                  className="text-5xl md:text-6xl font-serif mb-8 leading-tight pb-1"
                  dangerouslySetInnerHTML={{ __html: page.title.rendered }}
                />
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div
                className="max-w-4xl mx-auto wp-content"
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
              />
            </div>
          </section>

          <section className="bg-primary text-white py-20">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Free Consultation</h2>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                Call us today for a free consultation. If you have medical records, you can send them to us for a free review with no obligation.
              </p>
              <Link href="/contact-us">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-10 text-xl rounded-none">
                  Free Case Review
                </Button>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <SEO
        title={finalTitle}
        description={finalDescription}
        canonical={finalCanonical}
        schema={schema}
      />
      <Navigation />

      <main className="pt-20">
        <section className="bg-primary text-white py-24 relative overflow-x-hidden">
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
                  {category}
                </span>
              </div>
              <h1
                className="text-5xl md:text-6xl font-serif mb-8 leading-tight pb-1"
                dangerouslySetInnerHTML={{ __html: page.title.rendered }}
              />
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div
              className="max-w-4xl mx-auto wp-content"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
          </div>
        </section>

        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Free Consultation</h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              If you or a loved one has been affected, contact us today for a free, confidential consultation. We're here to help.
            </p>
            <Link href="/contact-us">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-10 text-xl rounded-none">
                Free Case Review
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
