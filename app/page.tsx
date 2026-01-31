import Link from 'next/link';
import { fetchPage, stripHtml } from '@/lib/wordpress';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export const revalidate = 300;

export default async function HomePage() {
  const homePage = await fetchPage('home');
  
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 md:py-32">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
                Houston&apos;s Trusted Medical Malpractice Attorneys
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                Award-winning, women-owned law firm fighting for victims of medical negligence. 
                We&apos;ve recovered millions for families affected by birth injuries, surgical errors, and misdiagnosis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Free Case Evaluation
                </Link>
                <Link 
                  href="/about" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors"
                >
                  Meet Our Attorneys
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">Practice Areas</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              We focus exclusively on medical malpractice cases, bringing specialized expertise to every client we represent.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Birth Injuries', href: '/practice-areas/birth-injuries', description: 'Representing families affected by preventable birth injuries including cerebral palsy and brachial plexus injuries.' },
                { title: 'Surgical Errors', href: '/practice-areas/surgical-errors', description: 'Holding surgeons accountable for wrong-site surgery, retained instruments, and surgical negligence.' },
                { title: 'Brain Injuries', href: '/practice-areas/brain-injuries', description: 'Fighting for victims of brain damage caused by medical negligence and delayed treatment.' },
                { title: 'Misdiagnosis', href: '/practice-areas/misdiagnosis', description: 'Seeking justice for patients harmed by delayed diagnosis, missed diagnosis, or wrong diagnosis.' },
              ].map((area) => (
                <Link key={area.href} href={area.href} className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-serif text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">{area.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{area.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Why Choose Thomas & Wan?</h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-4xl font-serif text-amber-600 mb-2">30+</div>
                  <div className="text-slate-600">Years Combined Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-amber-600 mb-2">$100M+</div>
                  <div className="text-slate-600">Recovered for Clients</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-amber-600 mb-2">100%</div>
                  <div className="text-slate-600">Medical Malpractice Focus</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {homePage && (
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: homePage.content.rendered }}
              />
            </div>
          </section>
        )}

        <section className="py-16 md:py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Discuss Your Case?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Contact us today for a free, confidential consultation. There&apos;s no obligation, and we don&apos;t charge unless we win your case.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
            >
              Get Your Free Case Evaluation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
