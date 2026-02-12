import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ArrowLeft, Calendar, Loader2, Phone, List, User, Tag } from "lucide-react";
import { Link } from "wouter";
import PageShell from "@/components/PageShell";
import SEO from "@/components/SEO";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useEffect, useState } from "react";

interface WPCategory {
  id: number;
  name: string;
  slug: string;
}

interface WPAuthor {
  id: number;
  name: string;
  slug: string;
}

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
  author_info?: WPAuthor;
  post_categories?: WPCategory[];
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function extractTOC(html: string): TOCItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings = doc.querySelectorAll("h2, h3");
  const toc: TOCItem[] = [];
  
  headings.forEach((heading, index) => {
    const id = `heading-${index}`;
    const text = heading.textContent || "";
    const level = heading.tagName === "H2" ? 2 : 3;
    if (text.trim()) {
      toc.push({ id, text, level });
    }
  });
  
  return toc;
}

function processContent(html: string): string {
  let processed = html;
  processed = processed.replace(/href="https?:\/\/wp\.thomasandwan\.com\//g, 'href="/blog/');
  processed = processed.replace(/href="https?:\/\/thomasandwan\.com\/test\//g, 'href="/blog/');
  processed = processed.replace(/<li>\s*<\/li>/g, '');
  processed = processed.replace(
    /(<h2[^>]*>[\s\S]*?<\/h2>)\s*(<p>[\s\S]*?<\/p>)/g,
    (match, heading, firstPara) => {
      const text = firstPara.replace(/<[^>]*>/g, "").trim();
      return `${heading}\n<div class="key-point"><p>${text}</p></div>`;
    }
  );
  return processed;
}

function addIdsToHeadings(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings = doc.querySelectorAll("h2, h3");
  
  headings.forEach((heading, index) => {
    heading.id = `heading-${index}`;
  });
  
  return doc.body.innerHTML;
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const [activeHeading, setActiveHeading] = useState<string>("");

  const { data: post, isLoading, error } = useQuery<WPPost>({
    queryKey: ["post", slug],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      return res.json();
    },
    enabled: !!slug,
  });

  const toc = post ? extractTOC(post.content.rendered) : [];
  const contentWithIds = post ? addIdsToHeadings(processContent(post.content.rendered)) : "";

  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
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
      <SEO 
        title={post.title.rendered.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#8211;/g, '–').replace(/&lt;/g, '<').replace(/&gt;/g, '>')}
        description={post.excerpt.rendered.replace(/<[^>]*>/g, '').trim().slice(0, 160)}
        canonical={`https://thomasandwan.com/blog/${post.slug}`}
        type="article"
        image={post.featured_image?.source_url}
      />
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:text-secondary transition-colors"
              data-testid="link-back-blog"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            <div>
              <div className="flex flex-wrap gap-4 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {formatDate(post.date)}
                </span>
                {post.author_info && (
                  <Link 
                    href={`/author/${post.author_info.slug}`}
                    className="flex items-center gap-1 hover:text-secondary transition-colors"
                    data-testid="link-post-author"
                  >
                    <User className="w-3 h-3" /> {post.author_info.name}
                  </Link>
                )}
              </div>
              
              {post.post_categories && post.post_categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.post_categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      className="inline-flex items-center gap-1 bg-secondary/10 text-secondary px-3 py-1 text-xs font-medium uppercase tracking-wide hover:bg-secondary hover:text-white transition-colors"
                      data-testid={`link-post-category-${cat.slug}`}
                    >
                      <Tag className="w-3 h-3" /> {cat.name}
                    </Link>
                  ))}
                </div>
              )}

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
                className="mt-10 wp-content max-w-none"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
                data-testid="content-post-body"
              />

              <div className="mt-14 bg-primary text-white p-10 border-t-4 border-secondary">
                <h3 className="text-2xl md:text-3xl font-serif mb-4">Talk to an attorney</h3>
                <p className="text-white/80 leading-relaxed mb-8">
                  If you believe medical negligence played a role in your situation, reach out for a free consultation.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm w-full"
                  data-testid="link-blogpost-cta"
                >
                  Contact Thomas & Wan
                </Link>
              </div>
            </div>

            <aside className="hidden lg:block mt-[120px]">
              <div className="sticky top-32 space-y-6">
                <LeadCaptureForm variant="sidebar" />

                {toc.length > 0 && (
                  <div className="bg-gray-50 border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <List className="w-5 h-5 text-secondary" />
                      <h4 className="font-bold text-primary uppercase tracking-wide text-sm">Table of Contents</h4>
                    </div>
                    <nav className="space-y-2">
                      {toc.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`block text-left w-full text-sm transition-colors ${
                            item.level === 3 ? "pl-4" : ""
                          } ${
                            activeHeading === item.id
                              ? "text-secondary font-medium"
                              : "text-slate-600 hover:text-primary"
                          }`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}

                <div className="bg-primary text-white p-6">
                  <h4 className="font-bold uppercase tracking-wide text-sm mb-3">Free Consultation</h4>
                  <p className="text-white/80 text-sm mb-4">
                    Have questions about your case? We're here to help.
                  </p>
                  <a
                    href="tel:713-529-1177"
                    className="flex items-center gap-2 text-secondary font-bold text-lg mb-4"
                  >
                    <Phone className="w-5 h-5" /> (713) 529-1177
                  </a>
                  <Link
                    href="/contact-us"
                    className="block text-center bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-4 text-sm uppercase tracking-wide"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="border border-gray-100 p-6">
                  <h4 className="font-bold text-primary uppercase tracking-wide text-sm mb-3">Quick Links</h4>
                  <nav className="space-y-2">
                    <Link href="/cases-we-handle" className="block text-sm text-slate-600 hover:text-secondary transition-colors">
                      Cases We Handle
                    </Link>
                    <Link href="/about-thomas-wan-llp" className="block text-sm text-slate-600 hover:text-secondary transition-colors">
                      About Our Firm
                    </Link>
                    <Link href="/testimonials" className="block text-sm text-slate-600 hover:text-secondary transition-colors">
                      Client Testimonials
                    </Link>
                    <Link href="/faq" className="block text-sm text-slate-600 hover:text-secondary transition-colors">
                      FAQ
                    </Link>
                  </nav>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
