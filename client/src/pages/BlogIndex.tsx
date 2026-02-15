import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowLeft, Calendar, Loader2, BookOpen, Search, Scale } from "lucide-react";
import { Link } from "wouter";
import PageShell from "@/components/PageShell";
import SEO from "@/components/SEO";

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

const POSTS_PER_PAGE = 12;

export default function BlogIndex() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isFetching } = useQuery<{ posts: WPPost[]; totalPages: number }>({
    queryKey: ["posts", page],
    queryFn: async () => {
      const res = await fetch(`/api/posts?per_page=${POSTS_PER_PAGE}&page=${page}&with_media=true`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const posts = await res.json();
      const totalHeader = res.headers.get("X-WP-TotalPages");
      const totalPages = totalHeader ? parseInt(totalHeader, 10) : Math.ceil(100 / POSTS_PER_PAGE);
      return { posts, totalPages };
    },
    placeholderData: (prev) => prev,
  });

  const posts = data?.posts;
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageShell title="Resource Center" subtitle="Knowledge & Insights" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}>
      <SEO 
        title="Medical Malpractice Blog"
        description="Expert articles on medical malpractice law, birth injuries, surgical errors, and patient rights from Houston attorneys Linda Thomas and Michelle Wan."
        canonical="https://thomasandwan.com/blog"
      />
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mb-14">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6" data-testid="text-resource-heading">
              Your Medical Malpractice Resource Center
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-light mb-6" data-testid="text-resource-intro">
              Understanding your rights after a medical injury can feel overwhelming. Our Resource Center is here to help. Written by the attorneys at Thomas & Wan, these articles break down complex legal and medical topics into clear, actionable information you can use.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 bg-[#F9F7F5] rounded-lg" data-testid="card-resource-feature-0">
                <BookOpen className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-bold text-primary text-sm">In-Depth Guides</div>
                  <div className="text-xs text-slate-600 mt-1">Detailed explanations of medical malpractice law, your rights, and what to expect.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#F9F7F5] rounded-lg" data-testid="card-resource-feature-1">
                <Search className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-bold text-primary text-sm">Case Insights</div>
                  <div className="text-xs text-slate-600 mt-1">Learn about common medical errors, birth injuries, and how cases are evaluated.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#F9F7F5] rounded-lg" data-testid="card-resource-feature-2">
                <Scale className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-bold text-primary text-sm">Know Your Rights</div>
                  <div className="text-xs text-slate-600 mt-1">Understand statutes of limitations, compensation types, and the legal process.</div>
                </div>
              </div>
            </div>
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
            <>
              <div className={`grid md:grid-cols-3 gap-8 transition-opacity duration-300 ${isFetching ? "opacity-60" : "opacity-100"}`}>
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

              {totalPages > 1 && (
                <div className="mt-14 flex items-center justify-center gap-2" data-testid="pagination">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 text-primary font-bold uppercase tracking-wider text-xs hover:border-secondary hover:text-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    data-testid="button-prev-page"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                      .reduce<(number | string)[]>((acc, p, i, arr) => {
                        if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((item, i) =>
                        typeof item === "string" ? (
                          <span key={`ellipsis-${i}`} className="px-2 text-slate-400">...</span>
                        ) : (
                          <button
                            key={item}
                            onClick={() => handlePageChange(item)}
                            className={`w-10 h-10 flex items-center justify-center text-sm font-bold transition-colors ${
                              item === page
                                ? "bg-primary text-white"
                                : "border border-slate-200 text-primary hover:border-secondary hover:text-secondary"
                            }`}
                            data-testid={`button-page-${item}`}
                          >
                            {item}
                          </button>
                        )
                      )}
                  </div>

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                    className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 text-primary font-bold uppercase tracking-wider text-xs hover:border-secondary hover:text-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    data-testid="button-next-page"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
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
              Free Case Review
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
