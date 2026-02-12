import { ArrowRight, Pill, AlertTriangle, Beaker, Building2, Activity } from "lucide-react";
import { Link } from "wouter";
import PageShell from "@/components/PageShell";
import SEO, { createPracticeAreaSchema } from "@/components/SEO";

const caseTypes = [
  { icon: Pill, title: "Wrong Medication", desc: "When healthcare providers mistakenly give a patient a drug meant for another patient, or simply the wrong drug." },
  { icon: AlertTriangle, title: "Overdose", desc: "Administering or prescribing an excessive dose of medication, which can cause harmful or potentially lethal effects." },
  { icon: Beaker, title: "Drug Interactions", desc: "The failure to consider how different drugs might interact in a patient's body, potentially leading to adverse effects." },
  { icon: Building2, title: "Pharmacy Errors", desc: "Errors made in the pharmacy, such as dispensing the wrong medication or incorrect dosage instructions." },
  { icon: Activity, title: "Failure to Monitor Side Effects", desc: "Neglecting the responsibility to monitor a patient's reaction to medication, missing crucial signs of adverse side effects." },
];

const warningSigns = [
  "Unexpected or severe side effects after taking a new medication",
  "Your medication looks different from what you usually take",
  "You receive a medication you don't recognize",
  "No changes or improvements after taking prescribed medication",
];

export default function MedicationErrorsPage() {
  const schema = createPracticeAreaSchema(
    "Medication Error Lawyers",
    "Houston medication error attorneys at Thomas & Wan represent patients harmed by wrong medications, overdoses, drug interactions, and pharmacy errors.",
    "https://thomasandwan.com/cases-we-handle/medication-errors"
  );

  return (
    <PageShell title="Medication Errors" subtitle="Cases We Handle">
      <SEO
        title="Medication Error Lawyers in Houston"
        description="Houston medication error attorneys at Thomas & Wan represent patients harmed by wrong medications, overdoses, drug interactions, and pharmacy errors. Free consultation."
        canonical="https://thomasandwan.com/cases-we-handle/medication-errors"
        schema={schema}
      />
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                At Thomas & Wan, we believe in the importance of safe, effective medication practices. Unfortunately, medication errors are common and can lead to severe health consequences. We fight for patients who have been harmed by preventable medication mistakes.
              </p>
              <div className="mt-8 bg-[#F9F7F5] border border-gray-100 p-8">
                <h3 className="font-serif text-2xl text-primary mb-4">Medication error cases we handle:</h3>
                <p className="text-slate-600 leading-relaxed">
                  Claims against negligent doctors, pharmacists, nurses, and hospitals whose medication errors caused preventable patient harm.
                </p>
                <Link
                  href="/contact-us"
                  className="mt-8 inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-none uppercase tracking-widest text-sm"
                  data-testid="link-contact-from-medication-errors"
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
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">Warning Signs of Medication Errors</h2>
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
              Call us today for a free consultation—we will discuss what your legal options are for your medication error case. If you have medical records, you can send them to us for a free review with no obligation.
            </p>
            <a
              href="tel:713-529-1177"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm"
              data-testid="link-medication-errors-cta"
            >
              Call (713) 529-1177 <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
