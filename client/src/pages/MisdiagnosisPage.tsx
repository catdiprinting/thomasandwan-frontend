import { ArrowRight, Search, Heart, Brain, ShieldAlert, Clock, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import PageShell from "@/components/PageShell";
import SEO, { createPracticeAreaSchema } from "@/components/SEO";

const caseTypes = [
  { icon: Search, title: "Failure to Diagnose Cancer", desc: "Missing the symptoms and indicators that point to a cancer diagnosis, delaying critical treatment." },
  { icon: Heart, title: "Misdiagnosed Heart Attack", desc: "Misinterpreting the signs of a heart attack, potentially leading to severe damage or even death." },
  { icon: Brain, title: "Misdiagnosed Stroke", desc: "Failure to recognize and properly diagnose stroke symptoms which may seriously worsen the patient's condition." },
  { icon: ShieldAlert, title: "Misdiagnosed Infection", desc: "Misidentifying or ignoring signs of an infection, leading to delayed treatment and possible complications." },
  { icon: Clock, title: "Delayed Diagnosis", desc: "General delays in identifying a disease or condition, prolonging the patient's discomfort and causing preventable damage." },
];

const warningSigns = [
  "Symptoms persist or worsen despite following a treatment plan",
  "A diagnosis was made without comprehensive testing",
  "Your healthcare provider dismisses your concerns or symptoms",
  "A second opinion significantly differs from your original diagnosis",
];

export default function MisdiagnosisPage() {
  const schema = createPracticeAreaSchema(
    "Misdiagnosis Lawyers",
    "Houston misdiagnosis attorneys at Thomas & Wan represent patients harmed by failure to diagnose cancer, heart attack, stroke, and delayed diagnosis.",
    "https://thomasandwan.com/cases-we-handle/misdiagnosis"
  );

  return (
    <PageShell title="Misdiagnosis" subtitle="Cases We Handle">
      <SEO
        title="Misdiagnosis Lawyers in Houston"
        description="Houston misdiagnosis attorneys at Thomas & Wan represent patients harmed by failure to diagnose cancer, heart attack, stroke, and delayed diagnosis. Free consultation."
        canonical="https://thomasandwan.com/cases-we-handle/misdiagnosis"
        schema={schema}
      />
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                Navigating the medical landscape can be daunting, more so when you're faced with the potential of a misdiagnosis. At Thomas & Wan, we understand the gravity of these situations and are committed to helping victims of misdiagnosis understand their rights and pursue justice.
              </p>
              <div className="mt-8 bg-[#F9F7F5] border border-gray-100 p-8">
                <h3 className="font-serif text-2xl text-primary mb-4">Misdiagnosis cases we handle:</h3>
                <p className="text-slate-600 leading-relaxed">
                  Claims against negligent doctors, specialists, and hospitals whose diagnostic failures caused preventable patient harm.
                </p>
                <Link
                  href="/contact-us"
                  className="mt-8 inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-none uppercase tracking-widest text-sm"
                  data-testid="link-contact-from-misdiagnosis"
                >
                  Free Case Review <ArrowRight className="w-4 h-4" />
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
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">Warning Signs of Misdiagnosis</h2>
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
              Call us today for a free consultation—we will discuss what your legal options are for your misdiagnosis case. If you have medical records, you can send them to us for a free review with no obligation.
            </p>
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm"
              data-testid="link-misdiagnosis-cta"
            >
              Free Case Review <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
