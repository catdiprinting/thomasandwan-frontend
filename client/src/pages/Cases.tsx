import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import PageShell from "@/components/PageShell";
import SEO from "@/components/SEO";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const cards = [
  {
    title: "Brain Injuries",
    desc: "We understand the physical, emotional, and financial toll brain injuries can take on individuals and their families.",
    href: "/cases-we-handle/brain-injuries",
  },
  {
    title: "Birth Injuries",
    desc: "When things go wrong due to medical negligence, the consequences can be devastating. We help families protect a child's future.",
    href: "/cases-we-handle/birth-injuries",
  },
  {
    title: "Surgical Errors",
    desc: "Surgical procedures are meant to improve your health. When errors occur, the results can be catastrophic. We fight for your rights.",
    href: "/cases-we-handle/surgical-errors",
  },
  {
    title: "Medication Errors",
    desc: "Mistakes in medication administration can have severe consequences. Our team seeks justice on your behalf.",
    href: "/cases-we-handle/medication-errors",
  },
  {
    title: "Misdiagnosis",
    desc: "A misdiagnosis can delay proper treatment and exacerbate health issues. We pursue accountability and compensation.",
    href: "/cases-we-handle/misdiagnosis",
  },
  {
    title: "More Complex Harms",
    desc: "Including burns, cerebral palsy, paralysis, hospital-acquired infections, HIE, anesthesia errors, wrong-site surgery, pulmonary embolism, stroke, and failure to diagnose or treat disease.",
    href: "/cases-we-handle/medical-malpractice",
  },
];

const caseLinks = [
  { title: "Birth Injuries", href: "/cases-we-handle/birth-injuries" },
  { title: "Complications of Childbirth", href: "/cases-we-handle/complications-of-childbirth" },
  { title: "Medical Malpractice", href: "/cases-we-handle/medical-malpractice" },
  { title: "Brain Injuries", href: "/cases-we-handle/brain-injuries" },
  { title: "Surgical Errors", href: "/cases-we-handle/surgical-errors" },
  { title: "Medication Errors", href: "/cases-we-handle/medication-errors" },
  { title: "Misdiagnosis", href: "/cases-we-handle/misdiagnosis" },
];

export default function Cases() {
  return (
    <PageShell title="Cases We Handle" subtitle="Medical Malpractice Focus">
      <SEO 
        title="Cases We Handle"
        description="Thomas & Wan handles medical malpractice, birth injuries, brain injuries, surgical errors, medication errors, misdiagnosis, and more. Free case review in Houston, TX."
        canonical="https://thomasandwan.com/cases-we-handle"
      />
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                Advocating for You and Your Family
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                <p>
                  If you're in need of legal guidance and support, you've come to the right place. Meet the dedicated team at Thomas & Wan, who bring 55 years of experience to the table.
                </p>
                <p>
                  We've successfully handled numerous multi-million dollar cases related to serious medical malpractice and wrongful death issues across the nation. We're not afraid to take on challenging cases, and our commitment to justice is unwavering.
                </p>
              </div>
              <div className="mt-10">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-none uppercase tracking-widest text-sm"
                  data-testid="link-contact-from-cases"
                >
                  Free Case Review <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                {cards.map((c, i) => (
                  <Link
                    key={i}
                    href={c.href}
                    className="block bg-[#F9F7F5] border border-gray-100 p-7 hover:shadow-lg hover:border-secondary/30 transition-all group"
                    data-testid={`card-case-${i}`}
                  >
                    <h3 className="font-serif text-2xl text-primary mb-3 group-hover:text-secondary transition-colors">{c.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{c.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-secondary font-bold text-sm uppercase tracking-wide">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-10 bg-primary text-white p-8 border-t-4 border-secondary">
                <h3 className="font-serif text-2xl mb-3">We handle the following types of cases:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                  {caseLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="inline-flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 transition-colors"
                      data-testid={`link-cases-${link.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="font-bold text-sm">{link.title}</span>
                      <ArrowRight className="w-4 h-4 text-secondary flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <LeadCaptureForm variant="card" />
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
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm"
              data-testid="link-cases-cta"
            >
              Free Case Review <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
