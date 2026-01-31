import { Metadata } from 'next';
import Link from 'next/link';
import { fetchPosts, fetchCategories, formatDate, stripHtml, getAuthorName, getCategoryName, getFeaturedImage } from '@/lib/wordpress';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Legal Blog',
  description: 'Legal resources and articles on medical malpractice, birth injuries, and patient safety from Houston\'s leading medical malpractice attorneys.',
  openGraph: {
    title: 'Legal Blog | Thomas & Wan, LLP',
    description: 'Legal resources and articles on medical malpractice, birth injuries, and patient safety.',
  },
};

interface Props {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const categoryId = params.category ? parseInt(params.category) : undefined;
  
  const [{ posts, total, totalPages }, categories] = await Promise.all([
    fetchPosts(page, 12, categoryId),
    fetchCategories(),
  ]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Thomas & Wan Legal Blog",
    "description": "Legal resources and articles on medical malpractice, birth injuries, and patient safety.",
    "url": "https://www.thomasandwan.com/blog",
    "publisher": {
      "@type": "LegalService",
      "name": "Thomas & Wan, LLP",
      "url": "https://www.thomasandwan.com",
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <main className="pt-20">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Legal Blog</h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              Resources and insights on medical malpractice law from Houston&apos;s trusted attorneys.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            {categories.length > 0 && (
              <div className="mb-12">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/blog"
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      !categoryId
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All Posts
                  </Link>
                  {categories.filter(c => c.count > 0).map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.id}`}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        categoryId === category.id
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {category.name} ({category.count})
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {posts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => {
                    const featuredImage = getFeaturedImage(post);
                    return (
                      <article key={post.id} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                        {featuredImage && (
                          <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
                            <img
                              src={featuredImage}
                              alt={stripHtml(post.title.rendered)}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span>{getCategoryName(post)}</span>
                          </div>
                          <h2 className="text-xl font-serif mb-3">
                            <Link 
                              href={`/blog/${post.slug}`}
                              className="text-slate-900 hover:text-amber-600 transition-colors"
                              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                            />
                          </h2>
                          <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            {stripHtml(post.excerpt.rendered).substring(0, 150)}...
                          </p>
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                          >
                            Read More →
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <nav className="mt-12 flex justify-center gap-2">
                    {page > 1 && (
                      <Link
                        href={`/blog?page=${page - 1}${categoryId ? `&category=${categoryId}` : ''}`}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        Previous
                      </Link>
                    )}
                    <span className="px-4 py-2 text-slate-600">
                      Page {page} of {totalPages}
                    </span>
                    {page < totalPages && (
                      <Link
                        href={`/blog?page=${page + 1}${categoryId ? `&category=${categoryId}` : ''}`}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        Next
                      </Link>
                    )}
                  </nav>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-600 text-lg">No posts found.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
