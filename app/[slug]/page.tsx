import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchPage, fetchPages, stripHtml, getSeoData } from '@/lib/wordpress';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const revalidate = 60;

const RESERVED_SLUGS = ['blog', 'api', '_next', 'contact', 'about', 'practice-areas', 'testimonials', 'faq'];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  if (RESERVED_SLUGS.includes(slug)) {
    return {};
  }

  const page = await fetchPage(slug);
  
  if (!page) {
    return { title: 'Page Not Found' };
  }

  const seo = getSeoData(page);

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
    },
    alternates: {
      canonical: seo.canonical || `https://www.thomasandwan.com/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const pages = await fetchPages();
  return pages
    .filter(page => !RESERVED_SLUGS.includes(page.slug))
    .map((page) => ({ slug: page.slug }));
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  
  if (RESERVED_SLUGS.includes(slug)) {
    notFound();
  }

  const page = await fetchPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20">
        <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <h1 
              className="text-4xl md:text-5xl font-serif"
              dangerouslySetInnerHTML={{ __html: page.title.rendered }}
            />
          </div>
        </header>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
