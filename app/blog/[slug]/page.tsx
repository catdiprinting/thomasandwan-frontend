import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchPost, fetchPosts, formatDate, stripHtml, getAuthorName, getCategoryName, getFeaturedImage, getSeoData } from '@/lib/wordpress';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  const seo = getSeoData(post);
  const featuredImage = getFeaturedImage(post);

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: featuredImage ? [{ url: featuredImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: featuredImage ? [featuredImage] : undefined,
    },
    alternates: {
      canonical: seo.canonical || `https://www.thomasandwan.com/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const { posts } = await fetchPosts(1, 50);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthorName(post);
  const category = getCategoryName(post);
  const featuredImage = getFeaturedImage(post);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": stripHtml(post.title.rendered),
    "description": stripHtml(post.excerpt.rendered).substring(0, 160),
    "image": featuredImage || "https://www.thomasandwan.com/logo.png",
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "LegalService",
      "name": "Thomas & Wan, LLP",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thomasandwan.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.modified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.thomasandwan.com/blog/${slug}`
    },
    "articleSection": category,
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="pt-20">
        <article>
          <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <Link href="/blog" className="hover:text-white transition-colors">
                    ← Back to Blog
                  </Link>
                  <span>•</span>
                  <span>{category}</span>
                </div>
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="flex items-center gap-6 text-slate-300">
                  <span>By {author}</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
              </div>
            </div>
          </header>

          {featuredImage && (
            <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 -mt-8">
              <img
                src={featuredImage}
                alt={stripHtml(post.title.rendered)}
                className="w-full max-w-4xl rounded-xl shadow-lg"
              />
            </div>
          )}

          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 py-12 md:py-16">
            <div className="max-w-4xl">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />

              <hr className="my-12 border-slate-200" />

              <div className="bg-slate-50 rounded-xl p-8 text-center">
                <h2 className="text-2xl font-serif mb-4">Need Legal Help?</h2>
                <p className="text-slate-600 mb-6">
                  If you or a loved one has been affected by medical malpractice, contact us for a free consultation.
                </p>
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Free Case Evaluation
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
