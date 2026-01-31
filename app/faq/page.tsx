import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about medical malpractice cases, the legal process, and working with Thomas & Wan.',
};

const faqs = [
  {
    question: 'I think I have a legal claim. What do I do now?',
    answer: 'If you think you have a legal claim, your first step is finding a lawyer to represent you. You can contact Thomas & Wan to discuss your claim by filling out our contact form or by calling us at (713) 529-1177. A lawyer will evaluate your case.',
  },
  {
    question: 'How do I know which lawyer to use?',
    answer: 'When you\'re filing a lawsuit, you want to use an attorney who has experience dealing with your type of claim and a proven track record of success. Ask your attorney what kind of experience they have, how long they have been practicing, how much time they spend on cases like yours, and any other questions you may have.',
  },
  {
    question: 'Why should I hire Thomas & Wan?',
    answer: 'Linda Laurent Thomas and Michelle Wan have over 55 years of combined experience in handling personal injury cases across the nation. They are routinely asked to handle legal issues and difficult cases by other law firms. Ms. Thomas and Ms. Wan approach practicing law as a profession, not a factory where a client\'s case is \'flipped\' or referred to another law firm.',
  },
  {
    question: 'How do I pay for an attorney?',
    answer: 'Most personal injury firms, including Thomas & Wan, work on a contingency basis. This means that you only pay for our services if we win a verdict or settlement for you. If no recovery is made, you pay nothing.',
  },
  {
    question: 'Thomas & Wan has taken my case. What now?',
    answer: 'The first part of the lawsuit process is called \'discovery.\' In this phase, the lawyers for the plaintiff (you) and the defendant (the person or company you are suing) try to discover what evidence exists and how this evidence proves or disproves your claim.',
  },
  {
    question: 'What do I have to do during discovery?',
    answer: 'As your lawyers, we have to get as much information from you as possible to prove your case. The lawyers for each side will supply each other with written questions regarding your personal information, the names and addresses of witnesses, your injuries and medical treatment, and the experts each side intends to call.',
  },
  {
    question: 'What if I have to give a deposition?',
    answer: 'A deposition is testimony given under oath that is recorded for use in court at a later date. During your deposition, Thomas & Wan will ask the defendant questions, and the defendant\'s lawyer will ask you questions. We will prepare you for your deposition so you will be familiar with the process.',
  },
  {
    question: 'What is mediation?',
    answer: 'Mediation is a meeting with all of the parties in the case. The goal of mediation is to settle your lawsuit. A mediator, generally a retired judge or lawyer who is a neutral person, acts as a communicator between the parties.',
  },
  {
    question: 'What if my case goes to trial?',
    answer: 'If your case goes to trial, a judge or jury will determine whether the defendant is responsible for financially compensating you for your injuries or not and what amount the defendant is responsible for. If Thomas & Wan wins a settlement or verdict for you, we will take our fee from there.',
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="pt-20">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              Find answers to common questions about the legal process and working with Thomas & Wan.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl p-6">
                    <h2 className="text-lg font-serif text-slate-900 mb-3">{faq.question}</h2>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Still Have Questions?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Contact us for a free consultation. We&apos;re happy to answer any questions about your case.
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
