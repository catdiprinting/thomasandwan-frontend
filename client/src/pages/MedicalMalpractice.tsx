import { ArrowRight, ShieldAlert, Stethoscope, Pill, Activity, Scissors, Scale } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import SEO, { createPracticeAreaSchema } from "@/components/SEO";
import { useWordPressPage } from "@/hooks/useWordPressPage";

const examples = [
  { icon: Scissors, title: "Surgical Errors", desc: "Operating on the wrong part of the body, leaving instruments inside the body, or removing the wrong organ." },
  { icon: Activity, title: "Failure to Diagnose", desc: "Failing to diagnose a disease or injury; ignoring obvious signs of infection, stroke, heart attack, or respiratory arrest." },
  { icon: Pill, title: "Medication Errors", desc: "Giving the wrong medication, overdosing a patient, or severe burns from medications." },
  { icon: Stethoscope, title: "Anesthesia Monitoring", desc: "Failing to monitor anesthesia properly and preventable complications during procedures." },
  { icon: ShieldAlert, title: "Birth-Related Negligence", desc: "Birth injuries such as cerebral palsy, shoulder dystocia, oxygen deprivation, and umbilical cord strangulation." },
  { icon: Scale, title: "Accountability", desc: "Suit against nurses, doctors, medical techs, pharmacists, and other providers whose negligence caused harm." },
];

export default function MedicalMalpractice() {
  const schema = createPracticeAreaSchema(
    "Medical Malpractice Lawyers",
    "Houston medical malpractice attorneys representing victims of surgical errors, misdiagnosis, medication errors, and hospital negligence.",
    "https://thomasandwan.com/cases-we-handle/medical-malpractice"
  );

  const { data: wpPage } = useWordPressPage("medical-malpractice");

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary pb-20 md:pb-0">
      <Navigation />
      <main className="pt-20">
        <header className="bg-primary text-white py-18 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 transform origin-top translate-x-1/4" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm">
                  Cases We Handle
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight">
                {wpPage ? (
                  <span dangerouslySetInnerHTML={{ __html: wpPage.title.rendered }} />
                ) : (
                  "Medical Malpractice"
                )}
              </h1>
            </div>
          </div>
        </header>

        <SEO 
          title="Medical Malpractice Lawyers in Houston"
          description="Thomas & Wan medical malpractice attorneys handle surgical errors, misdiagnosis, medication errors, anesthesia negligence, and hospital malpractice cases. Free consultation."
          canonical="https://thomasandwan.com/cases-we-handle/medical-malpractice"
          schema={schema}
        />

        {wpPage ? (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto wp-content" dangerouslySetInnerHTML={{ __html: wpPage.content.rendered }} />
            </div>
          </section>
        ) : (
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                  <p className="text-lg text-slate-600 leading-relaxed font-light">
                    We have successfully resolved numerous multi-million dollar matters for serious medical malpractice and wrongful death across the nation.
                  </p>
                  <div className="mt-8 bg-[#F9F7F5] border border-gray-100 p-8">
                    <h3 className="font-serif text-2xl text-primary mb-4">Medical negligence can include:</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Claims against negligent hospitals, nurses, doctors, pharmacists, medical technicians, and other providers.
                    </p>
                    <a
                      href="/contact-us"
                      className="mt-8 inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-none uppercase tracking-widest text-sm"
                      data-testid="link-contact-from-medmal"
                    >
                      Free Case Review <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {examples.map((e, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-100 p-7 hover:shadow-lg transition-shadow"
                        data-testid={`card-medmal-${idx}`}
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
            </div>
          </section>
        )}

        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <LeadCaptureForm variant="card" />
            </div>
          </div>
        </section>

        <section className="bg-white py-16 border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-primary text-white p-10 border-t-4 border-secondary">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Call Us Now For a Free Consultation</h2>
              <p className="text-white/80 leading-relaxed mb-8">
                Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have medical records, you can send them to us for a free review with no obligation.
              </p>
              <a
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm"
                data-testid="link-medmal-cta"
              >
                Free Case Review <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
