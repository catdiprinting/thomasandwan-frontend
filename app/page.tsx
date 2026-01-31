import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Medical Malpractice Lawyers | Birth Injury Attorneys Houston',
  description: 'With over 55 years of combined experience in medical malpractice and birth injury cases, Linda Thomas and Michelle Wan are the dedicated attorneys you need to protect your family\'s rights.',
  openGraph: {
    title: 'Thomas & Wan, LLP | Houston Medical Malpractice Attorneys',
    description: 'Award-winning medical malpractice attorneys. Women-owned law firm specializing in birth injuries, surgical errors, and misdiagnosis.',
  },
};

const practiceAreas = [
  {
    id: 'birth-injuries',
    title: 'Birth Injuries',
    description: 'Whether your child has cerebral palsy, hypoxia, shoulder dystocia, brain injury or another birth injury as a result of malpractice, we have the expertise and experience to help.',
  },
  {
    id: 'childbirth-complications',
    title: 'Complications of Childbirth',
    description: 'We represent mothers who have been injured due to malpractice by a doctor, midwife, nurse or hospital during childbirth.',
  },
  {
    id: 'medical-malpractice',
    title: 'Medical Malpractice',
    description: 'Experts estimate that as many as 200,000 people die in any given year in hospitals due to medical errors, poor decision-making, and negligence.',
  },
];

const differentiators = [
  {
    title: '55 Years of Combined Experience',
    description: 'With over 55 years of combined experience in medical malpractice, Linda Thomas and Michelle Wan are the lawyers you need to fight for your family\'s rights.',
  },
  {
    title: 'We Use Top Quality Experts',
    description: 'We only hire top quality experts from Harvard, Johns Hopkins, Yale, Texas Children\'s Hospital, and other prestigious institutions.',
  },
  {
    title: 'We Work On Your Case Ourselves',
    description: 'Linda Thomas and Michelle Wan work directly on each and every case themselves. No referrals to other lawyers.',
  },
  {
    title: 'Success Against Hospitals All Over Texas',
    description: 'We have successfully resolved cases for millions of dollars in birth injuries and catastrophic permanent injuries.',
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Thomas & Wan, LLP",
  "description": "Houston medical malpractice attorneys specializing in birth injuries and medical negligence",
  "url": "https://www.thomasandwan.com",
  "telephone": "+1-713-529-1177",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1710 Sunset Blvd",
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "postalCode": "77005",
    "addressCountry": "US"
  },
  "areaServed": "Texas",
  "priceRange": "Free Consultation"
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main>
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="max-w-4xl">
              <p className="text-amber-500 font-medium mb-4 uppercase tracking-wider text-sm">Women-Owned Law Firm</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
                We Care And It Shows
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                With over 55 years of combined experience in medical malpractice and birth injury cases, Linda Thomas and Michelle Wan are the dedicated attorneys you need to protect your family&apos;s rights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors text-center"
                >
                  Free Case Evaluation
                </Link>
                <Link 
                  href="/about" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors text-center"
                >
                  Meet Our Attorneys
                </Link>
              </div>
              <div className="flex gap-6 mt-8 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Available 24/7
                </span>
                <span>No Win, No Fee</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Practice Areas</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We focus exclusively on medical malpractice cases, bringing specialized expertise to every client we represent.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {practiceAreas.map((area) => (
                <Link 
                  key={area.id} 
                  href={`/practice-areas/${area.id}`}
                  className="group block p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-100"
                >
                  <h3 className="text-xl font-serif text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{area.description}</p>
                  <span className="text-amber-600 font-medium text-sm group-hover:underline">Learn More →</span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link 
                href="/practice-areas" 
                className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
              >
                View All Practice Areas →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Why Choose Thomas & Wan?</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((item, index) => (
                <div key={index} className="p-6 border border-slate-200 rounded-xl">
                  <h3 className="text-xl font-serif text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-4">
                <div className="text-5xl md:text-6xl font-serif text-amber-500 mb-2">55+</div>
                <div className="text-sm uppercase tracking-widest opacity-80">Years Combined Experience</div>
              </div>
              <div className="p-4">
                <div className="text-5xl md:text-6xl font-serif text-amber-500 mb-2">$50M+</div>
                <div className="text-sm uppercase tracking-widest opacity-80">Recovered for Clients</div>
              </div>
              <div className="p-4">
                <div className="text-5xl md:text-6xl font-serif text-amber-500 mb-2">100%</div>
                <div className="text-sm uppercase tracking-widest opacity-80">Medical Malpractice Focus</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">What Our Clients Say</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Read testimonials from families we&apos;ve helped through difficult medical malpractice cases.
            </p>
            <Link 
              href="/testimonials" 
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
            >
              Read Client Testimonials
            </Link>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Latest from Our Blog</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Stay informed with legal insights on medical malpractice and birth injury cases.
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-semibold rounded-lg transition-colors"
            >
              Visit Our Blog
            </Link>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Discuss Your Case?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Contact us today for a free, confidential consultation. There&apos;s no obligation, and we don&apos;t charge unless we win your case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
              >
                Free Case Evaluation
              </Link>
              <a 
                href="tel:+17135291177" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors"
              >
                Call (713) 529-1177
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
