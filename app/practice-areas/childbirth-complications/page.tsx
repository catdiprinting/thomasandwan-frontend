import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Childbirth Complications Attorneys | Thomas & Wan',
  description: 'We represent mothers injured due to malpractice during childbirth. Experienced attorneys handling maternal hemorrhage, uterine rupture, and other complications.',
};

const cases = [
  'Maternal Hemorrhage',
  'Uterine Rupture',
  'Preeclampsia Mismanagement',
  'Emergency C-Section Delays',
  'Anesthesia Errors',
];

const relatedAreas = [
  { id: 'birth-injuries', title: 'Birth Injuries' },
  { id: 'medical-malpractice', title: 'Medical Malpractice' },
];

export default function ChildbirthComplicationsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-20">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <Link href="/practice-areas" className="text-amber-500 hover:text-amber-400 text-sm mb-4 inline-block">
              ← Back to Practice Areas
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Complications of Childbirth</h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              We represent mothers who have been injured due to malpractice by a doctor, midwife, nurse or hospital during childbirth.
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

              <h2 className="text-2xl font-serif text-slate-900 mb-4">Protecting Mothers&apos; Rights</h2>
              <div className="prose prose-slate max-w-none">
                <p>
                  Childbirth should be a joyful experience, but when medical professionals fail in their duty of care, 
                  it can become a traumatic event with serious consequences.
                </p>
                <p>
                  Complications during childbirth can be life-threatening if not properly managed. 
                  Medical providers must monitor mothers closely and respond quickly to signs of distress.
                </p>
                <p>
                  If you or a loved one was injured during childbirth due to medical negligence, 
                  Thomas & Wan can help you pursue the compensation you deserve for your injuries, 
                  medical expenses, and emotional trauma.
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
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Free Case Evaluation</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              If you were injured during childbirth, contact us for a free consultation.
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
