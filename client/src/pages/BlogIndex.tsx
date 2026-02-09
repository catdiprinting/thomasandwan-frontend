import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar, Loader2 } from "lucide-react";
import { Link } from "wouter";
import PageShell from "@/components/PageShell";

interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  featured_image?: {
    source_url: string;
    alt_text: string;
  };
}

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BlogIndex() {
  const { data: posts, isLoading, error } = useQuery<WPPost[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts?per_page=12&with_media=true");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  return (
    <PageShell title="Blog" subtitle="Latest Articles">
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              Stay informed with our latest articles on medical malpractice, birth injuries, and your legal rights.
            </p>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-slate-500">
              Unable to load articles. Please try again later.
            </div>
          )}

          {posts && posts.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((p, idx) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group"
                  data-testid={`card-blog-${idx}`}
                >
                  <div className="aspect-[16/10] overflow-hidden mb-6 bg-gray-100">
                    {p.featured_image?.source_url ? (
                      <img
                        src={p.featured_image.source_url}
                        alt={p.featured_image.alt_text || p.title.rendered}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-widest mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {formatDate(p.date)}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-serif text-primary mb-3 leading-tight group-hover:text-secondary transition-colors"
                    dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                  />

                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {stripHtml(p.excerpt.rendered)}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide group-hover:text-secondary transition-colors">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-14 bg-primary text-white p-10 border-t-4 border-secondary">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Need help with a case?</h2>
            <p className="text-white/80 leading-relaxed mb-8">
              If you believe medical negligence played a role in your situation, reach out for a free consultation.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm"
              data-testid="link-blog-cta"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
