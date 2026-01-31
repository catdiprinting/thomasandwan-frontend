import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Medical Malpractice Attorneys Houston | Thomas & Wan',
  description: 'Experienced medical malpractice attorneys handling surgical errors, misdiagnosis, medication errors, hospital negligence, and more.',
};

const cases = [
  'Surgical Errors',
  'Failure to Diagnose Cancer',
  'Misdiagnosis',
  'Medication Errors',
  'Hospital Negligence',
  'Nursing Home Injuries',
];

const relatedAreas = [
  { id: 'birth-injuries', title: 'Birth Injuries' },
  { id: 'childbirth-complications', title: 'Complications of Childbirth' },
];

export default function MedicalMalpracticePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-20">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <Link href="/practice-areas" className="text-amber-500 hover:text-amber-400 text-sm mb-4 inline-block">
              ← Back to Practice Areas
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Medical Malpractice</h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              Experts estimate that as many as 200,000 people die in any given year in hospitals due to medical errors, poor decision-making, and negligence.
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

              <h2 className="text-2xl font-serif text-slate-900 mb-4">Fighting for Victims of Medical Negligence</h2>
              <div className="prose prose-slate max-w-none">
                <p>
                  Medical malpractice occurs when a healthcare professional deviates from the accepted standard of care, 
                  resulting in injury or death to a patient. These cases are complex and require attorneys who 
                  understand both the law and the medicine involved.
                </p>
                <p>
                  At Thomas & Wan, we focus exclusively on medical malpractice cases. 
                  This specialized focus means we understand the intricacies of these cases 
                  and have built relationships with top medical experts across the country.
                </p>
                <p>
                  We have successfully represented clients against some of the largest hospital systems 
                  and healthcare providers in Texas, recovering millions of dollars for victims of medical negligence.
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
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Free Medical Malpractice Consultation</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              If you believe you or a loved one was a victim of medical malpractice, contact us for a free case evaluation.
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
