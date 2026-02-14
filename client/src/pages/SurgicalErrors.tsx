import { ArrowRight, Syringe, Users, MapPin, Wrench, ShieldAlert, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import PageShell from "@/components/PageShell";
import SEO, { createPracticeAreaSchema } from "@/components/SEO";
import { usePracticeAreaData, cms } from "@/hooks/useCmsData";

const caseTypes = [
  { icon: Syringe, title: "Anesthesia Complications", desc: "These can range from incorrect dosages to failure in monitoring vital signs, leading to serious patient harm." },
  { icon: Users, title: "Wrong Patient Surgery", desc: "A horrifying but real mistake where surgery is performed on the wrong patient." },
  { icon: MapPin, title: "Wrong Site Surgery", desc: "Operating on the wrong part of the patient's body, a preventable error with devastating consequences." },
  { icon: Wrench, title: "Retained Surgical Instruments", desc: "Postoperative complications arise when surgical tools are unintentionally left inside the patient's body." },
  { icon: ShieldAlert, title: "Post-Surgical Infections", desc: "Poor hygiene standards and negligent post-operative care can lead to dangerous infections." },
];

const warningSigns = [
  "Unexpected and severe pain post-surgery",
  "Alarming changes at the site of surgery",
  "Symptoms or illness unconnected to known surgical risks",
  "Lack of improvement or worsening condition post-surgery",
];

export default function SurgicalErrorsPage() {
  const { data: d } = usePracticeAreaData("surgical-errors");
  const schema = createPracticeAreaSchema(
    "Surgical Error Lawyers",
    "Houston surgical error attorneys at Thomas & Wan handle wrong-site surgery, retained instruments, anesthesia complications, and post-surgical infection cases.",
    "https://thomasandwan.com/cases-we-handle/surgical-errors"
  );

  return (
    <PageShell title={cms(d, "paTitle", "Surgical Errors")} subtitle="Cases We Handle">
      <SEO
        title="Surgical Error Lawyers in Houston"
        description="Houston surgical error attorneys at Thomas & Wan handle wrong-site surgery, retained instruments, anesthesia complications, and post-surgical infection cases. Free consultation."
        canonical="https://thomasandwan.com/cases-we-handle/surgical-errors"
        schema={schema}
      />
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {cms(d, "paIntro", "Surgical procedures carry inherent risks. However, preventable errors due to the negligence of healthcare providers can lead to grave consequences for patients. At Thomas & Wan, we strive to hold these professionals accountable for their actions.")}
              </p>
              <div className="mt-8 bg-[#F9F7F5] border border-gray-100 p-8">
                <h3 className="font-serif text-2xl text-primary mb-4">{cms(d, "paSidebarHeading", "Surgical error cases we handle:")}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {cms(d, "paSidebarText", "Claims against negligent surgeons, anesthesiologists, nurses, and hospitals whose errors caused preventable surgical harm.")}
                </p>
                <Link
                  href="/contact-us"
                  className="mt-8 inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-none uppercase tracking-widest text-sm"
                  data-testid="link-contact-from-surgical-errors"
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
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">Warning Signs After Surgery</h2>
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
            <h2 className="text-3xl md:text-4xl font-serif mb-4">{cms(d, "paCtaHeading", "Call Us Now For a Free Consultation")}</h2>
            <p className="text-white/80 leading-relaxed mb-8">
              {cms(d, "paCtaText", "Call us today for a free consultation—we will discuss what your legal options are for your surgical error case. If you have medical records, you can send them to us for a free review with no obligation.")}
            </p>
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm"
              data-testid="link-surgical-errors-cta"
            >
              Free Case Review <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
