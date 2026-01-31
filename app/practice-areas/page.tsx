import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Medical Malpractice Practice Areas',
  description: 'We specialize in birth injuries, complications of childbirth, and medical malpractice cases. Our sole focus is the complex realm of medical negligence.',
};

const practiceAreas = [
  {
    id: 'birth-injuries',
    title: 'Birth Injuries',
    shortDesc: 'Whether your child has cerebral palsy, hypoxia, shoulder dystocia, brain injury or another birth injury as a result of malpractice, we have the expertise and experience to help.',
    cases: [
      'Cerebral Palsy',
      'Hypoxia',
      'Shoulder Dystocia',
      'Brain Injury',
      'Brachial Plexus Injuries',
      'HIE (Hypoxic Ischemic Encephalopathy)',
    ],
  },
  {
    id: 'childbirth-complications',
    title: 'Complications of Childbirth',
    shortDesc: 'We represent mothers who have been injured due to malpractice by a doctor, midwife, nurse or hospital during childbirth.',
    cases: [
      'Maternal Hemorrhage',
      'Uterine Rupture',
      'Preeclampsia Mismanagement',
      'Emergency C-Section Delays',
      'Anesthesia Errors',
    ],
  },
  {
    id: 'medical-malpractice',
    title: 'Medical Malpractice',
    shortDesc: 'Experts estimate that as many as 200,000 people die in any given year in hospitals due to medical errors, poor decision-making, and negligence.',
    cases: [
      'Surgical Errors',
      'Failure to Diagnose Cancer',
      'Misdiagnosis',
      'Medication Errors',
      'Hospital Negligence',
      'Nursing Home Injuries',
    ],
  },
];

export default function PracticeAreasPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-20">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Practice Areas</h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              We focus exclusively on medical malpractice cases. Our sole focus on this complex area of law 
              means we bring specialized expertise to every client we represent.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="space-y-12">
              {practiceAreas.map((area) => (
                <div key={area.id} className="border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mb-4">
                    <Link href={`/practice-areas/${area.id}`} className="hover:text-amber-600 transition-colors">
                      {area.title}
                    </Link>
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6">{area.shortDesc}</p>
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Cases We Handle</h3>
                    <div className="flex flex-wrap gap-2">
                      {area.cases.map((caseType, index) => (
                        <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                          {caseType}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link 
                    href={`/practice-areas/${area.id}`}
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Learn More About {area.title} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Think You Have a Case?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Contact us for a free consultation. We&apos;ll evaluate your situation and explain your legal options.
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
