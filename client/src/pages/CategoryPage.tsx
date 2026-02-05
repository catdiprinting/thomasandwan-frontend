import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar, Loader2, Tag } from "lucide-react";
import { Link, useParams } from "wouter";
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

interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface CategoryData {
  category: WPCategory;
  posts: WPPost[];
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

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data, isLoading, error } = useQuery<CategoryData>({
    queryKey: ["category", slug],
    queryFn: async () => {
      const res = await fetch(`/api/categories/${slug}/posts`);
      if (!res.ok) throw new Error("Failed to fetch category");
      return res.json();
    },
    enabled: !!slug,
  });

  const { data: allCategories } = useQuery<WPCategory[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  if (!slug) return null;

  return (
    <PageShell 
      title={data?.category?.name || "Category"} 
      subtitle={data ? `${data.category.count} Article${data.category.count !== 1 ? 's' : ''}` : "Articles"}
    >
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {allCategories && allCategories.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/blog"
                className="px-4 py-2 text-sm font-medium uppercase tracking-wide border border-slate-200 hover:border-secondary hover:text-secondary transition-colors"
                data-testid="link-all-categories"
              >
                All Articles
              </Link>
              {allCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`px-4 py-2 text-sm font-medium uppercase tracking-wide border transition-colors ${
                    cat.slug === slug 
                      ? 'bg-secondary text-white border-secondary' 
                      : 'border-slate-200 hover:border-secondary hover:text-secondary'
                  }`}
                  data-testid={`link-category-${cat.slug}`}
                >
                  <Tag className="w-3 h-3 inline mr-1" />
                  {cat.name} ({cat.count})
                </Link>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-slate-500">
              Unable to load category. Please try again later.
            </div>
          )}

          {data && data.posts.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              {data.posts.map((p, idx) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group"
                  data-testid={`card-category-post-${idx}`}
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

          {data && data.posts.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              No articles found in this category.
            </div>
          )}

          <div className="mt-14 bg-primary text-white p-10 border-t-4 border-secondary">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Need help with a case?</h2>
            <p className="text-white/80 leading-relaxed mb-8">
              If you believe medical negligence played a role in your situation, reach out for a free consultation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm"
              data-testid="link-category-cta"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
