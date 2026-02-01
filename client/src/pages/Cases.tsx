import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";

const cards = [
  {
    title: "Brain Injuries",
    desc: "We understand the physical, emotional, and financial toll brain injuries can take on individuals and their families.",
  },
  {
    title: "Birth Injuries",
    desc: "When things go wrong due to medical negligence, the consequences can be devastating. We help families protect a child’s future.",
  },
  {
    title: "Surgical Errors",
    desc: "Surgical procedures are meant to improve your health. When errors occur, the results can be catastrophic. We fight for your rights.",
  },
  {
    title: "Medication Errors",
    desc: "Mistakes in medication administration can have severe consequences. Our team seeks justice on your behalf.",
  },
  {
    title: "Misdiagnosis",
    desc: "A misdiagnosis can delay proper treatment and exacerbate health issues. We pursue accountability and compensation.",
  },
  {
    title: "More Complex Harms",
    desc: "Including burns, cerebral palsy, paralysis, hospital-acquired infections, HIE, anesthesia errors, wrong-site surgery, pulmonary embolism, stroke, and failure to diagnose or treat disease.",
  },
];

export default function Cases() {
  return (
    <PageShell title="Cases We Handle" subtitle="Medical Malpractice Focus">
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                Advocating for You and Your Family
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                <p>
                  If you’re in need of legal guidance and support, you’ve come to the right place. Meet the dedicated team at Thomas & Wan, who bring 55 years of experience to the table.
                </p>
                <p>
                  We’ve successfully handled numerous multi-million dollar cases related to serious medical malpractice and wrongful death issues across the nation. We’re not afraid to take on challenging cases, and our commitment to justice is unwavering.
                </p>
              </div>
              <div className="mt-10">
                <a
                  href="https://www.thomasandwan.com/contact-us/"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-none uppercase tracking-widest text-sm"
                  data-testid="link-contact-from-cases"
                >
                  Request a Free Consultation <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                {cards.map((c, i) => (
                  <div
                    key={i}
                    className="bg-[#F9F7F5] border border-gray-100 p-7 hover:shadow-lg transition-shadow"
                    data-testid={`card-case-${i}`}
                  >
                    <h3 className="font-serif text-2xl text-primary mb-3">{c.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-primary text-white p-8 border-t-4 border-secondary">
                <h3 className="font-serif text-2xl mb-3">We handle the following types of cases:</h3>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <a
                    href="https://www.thomasandwan.com/cases-we-handle/birth-injuries/"
                    className="inline-flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 transition-colors"
                    data-testid="link-cases-birth-injuries"
                  >
                    <span className="font-bold">Birth Injuries</span>
                    <ArrowRight className="w-4 h-4 text-secondary" />
                  </a>
                  <a
                    href="https://www.thomasandwan.com/cases-we-handle/complications-of-childbirth/"
                    className="inline-flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 transition-colors"
                    data-testid="link-cases-complications"
                  >
                    <span className="font-bold">Complications of Childbirth</span>
                    <ArrowRight className="w-4 h-4 text-secondary" />
                  </a>
                  <a
                    href="https://www.thomasandwan.com/cases-we-handle/medical-malpractice/"
                    className="inline-flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 transition-colors"
                    data-testid="link-cases-medical-malpractice"
                  >
                    <span className="font-bold">Medical Malpractice</span>
                    <ArrowRight className="w-4 h-4 text-secondary" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary text-white p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Call Us Now For a Free Consultation</h2>
            <p className="text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have the medical records, you can send them to us for a free review with no obligation.
            </p>
            <a
              href="https://www.thomasandwan.com/contact-us/"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm"
              data-testid="link-cases-cta"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
