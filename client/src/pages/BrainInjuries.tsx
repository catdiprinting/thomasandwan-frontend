import { ArrowRight, Brain, Syringe, Scissors, AlertTriangle, Search } from "lucide-react";
import { Link } from "wouter";
import PageShell from "@/components/PageShell";
import SEO, { createPracticeAreaSchema } from "@/components/SEO";

const caseTypes = [
  { icon: Syringe, title: "Anesthesia Errors", desc: "Improper management during anesthesia can lead to brain damage. Oxygen deprivation and improper medication are some of the causes." },
  { icon: Brain, title: "Birth-Related Brain Injury", desc: "Proper care is critical during childbirth. Negligence can result in serious brain injury with lifelong consequences for the child." },
  { icon: Scissors, title: "Surgical Errors", desc: "Wrong site surgery, poor surgical technique, among others can result in traumatic brain injuries." },
  { icon: AlertTriangle, title: "Emergency Room Negligence", desc: "Delays in assessments or treatments in emergency rooms can lead to preventable brain injuries." },
  { icon: Search, title: "Misdiagnosis of Stroke or Tumor", desc: "Incorrect or delayed diagnosis of a condition like stroke or brain tumor can lead to severe brain injuries." },
];

const warningSigns = [
  "Sudden changes in cognitive function or behavior",
  "Long-term or worsening headache",
  "Frequent dizziness or loss of balance",
  "Prolonged periods of unconsciousness",
];

export default function BrainInjuriesPage() {
  const schema = createPracticeAreaSchema(
    "Brain Injury Lawyers",
    "Houston brain injury attorneys at Thomas & Wan represent victims of medical negligence including anesthesia errors, surgical mistakes, and failure to diagnose stroke.",
    "https://thomasandwan.com/cases-we-handle/brain-injuries"
  );

  return (
    <PageShell title="Brain Injuries" subtitle="Cases We Handle">
      <SEO
        title="Brain Injury Lawyers in Houston"
        description="Houston brain injury attorneys at Thomas & Wan represent victims of medical negligence including anesthesia errors, surgical mistakes, and failure to diagnose stroke. Free consultation."
        canonical="https://thomasandwan.com/cases-we-handle/brain-injuries"
        schema={schema}
      />
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                At Thomas & Wan, we are deeply committed to representing individuals and families affected by brain injuries as a result of medical negligence. We understand that brain injuries can be life-altering, affecting every aspect of life. Compassionate, diligent, and thorough — we work to unravel the complex circumstances surrounding the incidents to seek justice for our clients.
              </p>
              <div className="mt-8 bg-[#F9F7F5] border border-gray-100 p-8">
                <h3 className="font-serif text-2xl text-primary mb-4">Brain injury cases we handle:</h3>
                <p className="text-slate-600 leading-relaxed">
                  Claims against negligent hospitals, nurses, doctors, and other providers whose actions caused preventable brain injuries.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-none uppercase tracking-widest text-sm"
                  data-testid="link-contact-from-brain-injuries"
                >
                  Request Free Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                {caseTypes.map((e, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-100 p-7 hover:shadow-lg transition-shadow"
                    data-testid={`card-case-type-${idx}`}
                  >
                    <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center mb-5">
                      <e.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-serif text-2xl text-primary mb-3">{e.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 bg-amber-50 border border-amber-200 p-10 border-l-4 border-l-amber-500">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">Warning Signs of Brain Injury</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {warningSigns.map((sign, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                  <p className="text-slate-600">{sign}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-primary text-white p-10 border-t-4 border-secondary">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Call Us Now For a Free Consultation</h2>
            <p className="text-white/80 leading-relaxed mb-8">
              Call us today for a free consultation—we will discuss what your legal options are for your brain injury case. If you have medical records, you can send them to us for a free review with no obligation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm"
              data-testid="link-brain-injuries-cta"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
