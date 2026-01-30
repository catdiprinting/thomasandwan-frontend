import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag, Loader2 } from "lucide-react";
import { fetchPost, formatDate, getAuthorName, getCategoryName, stripHtml, type WPPost } from "@/lib/wordpress";

function generateArticleSchema(post: WPPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": stripHtml(post.title.rendered),
    "description": stripHtml(post.excerpt.rendered).substring(0, 160),
    "image": post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://www.thomasandwan.com/wp-content/uploads/2022/03/logo-Thomas-and-Wan.png.webp",
    "author": {
      "@type": "Person",
      "name": getAuthorName(post)
    },
    "publisher": {
      "@type": "LegalService",
      "name": "Thomas & Wan, LLP",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thomasandwan.com/wp-content/uploads/2022/03/logo-Thomas-and-Wan.png.webp"
      }
    },
    "datePublished": post.date,
    "dateModified": post.modified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.thomasandwan.com/blog/${post.slug}`
    },
    "articleSection": getCategoryName(post),
    "keywords": ["medical malpractice", "birth injury", "Houston lawyer", getCategoryName(post)]
  };
}

export default function BlogPostHeadless() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || '';

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['wp-post', slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
  });

  // Inject Article schema and update document title
  useEffect(() => {
    if (post) {
      // Update document title
      document.title = `${stripHtml(post.title.rendered)} | Thomas & Wan`;
      
      // Inject JSON-LD schema
      const existingScript = document.getElementById('article-schema');
      if (existingScript) existingScript.remove();
      
      const script = document.createElement('script');
      script.id = 'article-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(generateArticleSchema(post));
      document.head.appendChild(script);
      
      return () => {
        const script = document.getElementById('article-schema');
        if (script) script.remove();
      };
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navigation />
        <main className="pt-20">
          <div className="flex items-center justify-center py-40">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
            <span className="ml-3 text-slate-600">Loading article...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-40 text-center">
            <h1 className="text-3xl font-serif text-primary mb-4">Article Not Found</h1>
            <p className="text-slate-600 mb-8">The article you're looking for could not be found.</p>
            <Link href="/blog">
              <Button className="bg-secondary hover:bg-secondary/90">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />
      
      <main className="pt-20">
        <section className="bg-primary text-white py-20 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-secondary/5" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <Link href="/blog">
                <Button variant="ghost" className="text-white/80 hover:text-white mb-6 -ml-4">
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog
                </Button>
              </Link>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 uppercase tracking-widest mb-4">
                <span className="text-secondary font-bold flex items-center gap-2">
                  <Tag className="w-4 h-4" /> {getCategoryName(post)}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" /> {getAuthorName(post)}
                </span>
              </div>
              
              <h1 
                className="text-4xl md:text-5xl font-serif leading-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="grid lg:grid-cols-3 gap-12">
              <article className="lg:col-span-2">
                <div 
                  className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
                
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <Link href="/blog">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      <ArrowLeft className="mr-2 w-4 h-4" /> Back to All Articles
                    </Button>
                  </Link>
                </div>
              </article>

              <aside className="lg:col-span-1 space-y-8">
                <div className="bg-primary text-white p-6 text-center sticky top-24">
                  <h3 className="font-serif text-xl mb-3">Need Legal Help?</h3>
                  <p className="text-white/80 mb-4 text-sm">
                    If you believe you have a medical malpractice case, contact us for a free consultation.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-5">
                      Contact Us
                    </Button>
                  </Link>
                  <p className="mt-4 text-white/60 text-sm">
                    Or call us at
                  </p>
                  <a href="tel:713-529-1177" className="text-secondary font-bold text-lg hover:underline">
                    (713) 529-1177
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-[#F9F7F5] py-16 border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl font-serif text-primary mb-4">Do You Have a Medical Malpractice Case?</h2>
            <p className="text-lg text-slate-600 mb-8">
              If you or a loved one has been injured due to medical negligence, we are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:713-529-1177">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-6 px-8 rounded-none">
                  Call (713) 529-1177
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold py-6 px-8 rounded-none">
                  Request Free Case Review
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
