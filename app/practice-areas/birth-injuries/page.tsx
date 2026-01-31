import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Birth Injury Attorneys Houston | Thomas & Wan',
  description: 'Experienced birth injury attorneys representing families affected by cerebral palsy, hypoxia, shoulder dystocia, and other birth-related injuries caused by medical negligence.',
};

const cases = [
  'Cerebral Palsy',
  'Hypoxia',
  'Shoulder Dystocia',
  'Brain Injury',
  'Brachial Plexus Injuries',
  'HIE (Hypoxic Ischemic Encephalopathy)',
];

const relatedAreas = [
  { id: 'childbirth-complications', title: 'Complications of Childbirth' },
  { id: 'medical-malpractice', title: 'Medical Malpractice' },
];

export default function BirthInjuriesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-20">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <Link href="/practice-areas" className="text-amber-500 hover:text-amber-400 text-sm mb-4 inline-block">
              ← Back to Practice Areas
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Birth Injuries</h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              Whether your child has cerebral palsy, hypoxia, shoulder dystocia, brain injury or another birth injury as a result of malpractice, we have the expertise and experience to help.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif text-slate-900 mb-6">Cases We Handle</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {cases.map((caseType, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                    <span className="text-amber-600">•</span>
                    <span className="text-slate-700">{caseType}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-serif text-slate-900 mb-4">Understanding Birth Injuries</h2>
              <div className="prose prose-slate max-w-none">
                <p>
                  Birth injuries can have devastating, lifelong consequences for both children and their families. 
                  These injuries often result from medical negligence during pregnancy, labor, or delivery.
                </p>
                <p>
                  When doctors, nurses, or hospital staff fail to properly monitor the mother and baby, 
                  respond to signs of fetal distress, or perform timely interventions, the results can be catastrophic.
                </p>
                <p>
                  At Thomas & Wan, we understand the emotional and financial burden that birth injuries place on families. 
                  We work tirelessly to hold negligent healthcare providers accountable and secure the compensation 
                  your family needs for ongoing medical care, therapy, and support.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <h2 className="text-xl font-serif text-slate-900 mb-6">Related Practice Areas</h2>
            <div className="flex flex-wrap gap-4">
              {relatedAreas.map((area) => (
                <Link 
                  key={area.id}
                  href={`/practice-areas/${area.id}`}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-amber-500 hover:text-amber-600 transition-colors"
                >
                  {area.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Free Birth Injury Case Evaluation</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              If your child suffered a birth injury, contact us for a free consultation. We can help you understand your legal options.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
            >
              Free Case Evaluation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
