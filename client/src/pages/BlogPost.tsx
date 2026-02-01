import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ArrowLeft, Calendar, Download, Loader2 } from "lucide-react";
import { Link } from "wouter";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";

interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  featured_image?: {
    source_url: string;
    alt_text: string;
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<WPPost>({
    queryKey: ["post", slug],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json();
    },
    enabled: !!slug,
  });

  const handleExportHtml = () => {
    if (slug) {
      window.open(`/api/export/post/${slug}`, "_blank");
    }
  };

  if (isLoading) {
    return (
      <PageShell title="Loading..." subtitle="Article">
        <div className="flex items-center justify-center py-40">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      </PageShell>
    );
  }

  if (error || !post) {
    return (
      <PageShell title="Not Found" subtitle="Article">
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-slate-600 mb-8">This article could not be found.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={post.title.rendered} subtitle="Article">
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:text-secondary transition-colors"
                data-testid="link-back-blog"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExportHtml}
                className="gap-2"
                data-testid="button-export-html"
              >
                <Download className="w-4 h-4" /> Export HTML
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {formatDate(post.date)}
              </span>
            </div>

            <h1
              className="mt-6 text-3xl md:text-4xl font-serif text-primary leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              data-testid="text-post-title"
            />

            {post.featured_image?.source_url && (
              <div className="mt-8 aspect-[16/9] bg-gray-100 overflow-hidden">
                <img
                  src={post.featured_image.source_url}
                  alt={post.featured_image.alt_text || post.title.rendered}
                  className="w-full h-full object-cover"
                  data-testid="img-post-featured"
                />
              </div>
            )}

            <div
              className="mt-10 prose prose-lg prose-slate max-w-none
                prose-headings:font-serif prose-headings:text-primary
                prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              data-testid="content-post-body"
            />

            <div className="mt-14 bg-primary text-white p-10 border-t-4 border-secondary">
              <h3 className="text-2xl md:text-3xl font-serif mb-4">Talk to an attorney</h3>
              <p className="text-white/80 leading-relaxed mb-8">
                If you believe medical negligence played a role in your situation, reach out for a free consultation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm w-full"
                data-testid="link-blogpost-cta"
              >
                Contact Thomas & Wan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
