import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Tag, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { fetchPosts, fetchCategories, formatDate, stripHtml, getAuthorName, getCategoryName, type WPPost, type WPCategory } from "@/lib/wordpress";

const POSTS_PER_PAGE = 12;

export default function BlogHeadless() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: categoriesData } = useQuery({
    queryKey: ['wp-categories'],
    queryFn: fetchCategories,
  });

  const { data: postsData, isLoading, error } = useQuery({
    queryKey: ['wp-posts', currentPage, selectedCategory],
    queryFn: () => fetchPosts(currentPage, POSTS_PER_PAGE, selectedCategory || undefined),
  });

  const categories = categoriesData || [];
  const posts = postsData?.posts || [];
  const totalPages = postsData?.totalPages || 1;
  const total = postsData?.total || 0;

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setCurrentPage(1);
  };

  const selectedCategoryName = categories.find(c => c.id === selectedCategory)?.name;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />
      
      <main className="pt-20">
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-secondary/5" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                  Insights & News
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                Legal Resources for <br/>
                <span className="text-secondary italic">Empowered</span> Decisions
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                Stay informed with {total} articles on medical malpractice law, birth injuries, and patient safety from Thomas & Wan.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              
              <div className="lg:col-span-2">
                {selectedCategory && (
                  <div className="mb-8 flex items-center justify-between">
                    <p className="text-slate-600">
                      Showing articles in <span className="font-bold text-secondary">{selectedCategoryName}</span>
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)} data-testid="clear-filter">
                      Clear Filter
                    </Button>
                  </div>
                )}

                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                    <span className="ml-3 text-slate-600">Loading posts from WordPress...</span>
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <p className="text-red-600">Unable to load posts. Please check your WordPress connection.</p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {posts.map((post: WPPost) => (
                      <article key={post.id} className="group border-b border-gray-100 pb-12 last:border-0" data-testid={`blog-post-${post.id}`}>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground uppercase tracking-widest mb-3">
                          <span 
                            className="text-secondary font-bold flex items-center gap-2 cursor-pointer hover:underline"
                            onClick={() => {
                              const cat = post._embedded?.['wp:term']?.[0]?.[0];
                              if (cat) handleCategoryClick(cat.id);
                            }}
                          >
                            <Tag className="w-4 h-4" /> {getCategoryName(post)}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-2">
                            <User className="w-4 h-4" /> {getAuthorName(post)}
                          </span>
                        </div>
                        
                        <Link href={`/blog/${post.slug}`}>
                          <h2 
                            className="text-2xl font-serif text-primary mb-3 leading-tight group-hover:text-secondary transition-colors cursor-pointer"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                          />
                        </Link>
                        
                        <p className="text-slate-600 leading-relaxed mb-4 font-light">
                          {stripHtml(post.excerpt.rendered).slice(0, 200)}...
                        </p>
                        
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="link" className="text-primary font-bold uppercase tracking-wide p-0 h-auto hover:text-secondary" data-testid={`read-more-${post.id}`}>
                            Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </article>
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-16">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      data-testid="prev-page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={currentPage === page ? "bg-secondary hover:bg-secondary/90" : ""}
                          data-testid={`page-${page}`}
                        >
                          {page}
                        </Button>
                      );
                    })}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      data-testid="next-page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1 space-y-8">
                <div className="bg-[#F9F7F5] p-6 border-t-4 border-secondary">
                  <h3 className="font-serif text-xl text-primary mb-4">Categories</h3>
                  <ul className="space-y-3">
                    {categories.filter(cat => cat.count > 0).map((cat) => (
                      <li 
                        key={cat.id} 
                        className={`flex items-center justify-between group cursor-pointer ${selectedCategory === cat.id ? 'text-secondary' : ''}`}
                        onClick={() => handleCategoryClick(cat.id)}
                        data-testid={`category-${cat.slug}`}
                      >
                        <span className={`group-hover:text-secondary transition-colors ${selectedCategory === cat.id ? 'text-secondary font-bold' : 'text-slate-600'}`}>
                          {cat.name}
                        </span>
                        <span className="text-sm text-muted-foreground">({cat.count})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary text-white p-6 text-center">
                  <h3 className="font-serif text-xl mb-3">Need Legal Help?</h3>
                  <p className="text-white/80 mb-4 text-sm">
                    Contact us today for a free consultation regarding your medical malpractice case.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-5" data-testid="sidebar-contact-button">
                      Contact Us
                    </Button>
                  </Link>
                </div>

                <div className="bg-[#F9F7F5] p-6 border-t-4 border-secondary">
                  <h3 className="font-serif text-lg text-primary mb-3">Free Case Review</h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Call us today for a free consultation. We work on a contingency basis.
                  </p>
                  <a href="tel:713-529-1177" className="text-secondary font-bold text-lg hover:underline">
                    (713) 529-1177
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="bg-[#F9F7F5] py-16 border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl font-serif text-primary mb-4">Do You Have a Medical Malpractice Case?</h2>
            <p className="text-lg text-slate-600 mb-8">
              If you or a loved one has been injured due to medical negligence, we are here to help. Call us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:713-529-1177">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-6 px-8 rounded-none" data-testid="cta-call-button">
                  Call (713) 529-1177
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold py-6 px-8 rounded-none" data-testid="cta-contact-button">
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
