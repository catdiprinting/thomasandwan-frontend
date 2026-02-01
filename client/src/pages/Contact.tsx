import { useMemo, useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2, ShieldCheck, Scale } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const quickTopics = useMemo(
    () => [
      "Surgical Error",
      "Misdiagnosis / Delayed Diagnosis",
      "Birth Injury",
      "Medication Error",
      "Hospital Negligence",
      "Not Sure — I Need Guidance",
    ],
    [],
  );

  return (
    <PageShell title="Contact" subtitle="Free consultation · No fee unless we win">
      <section className="relative py-14 md:py-20 bg-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-serif text-primary leading-tight" data-testid="text-contact-heading">
                    Speak with a medical malpractice attorney.
                  </h2>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light" data-testid="text-contact-subheading">
                    Tell us what happened. We’ll review your situation and explain your options—no obligation.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-xl border border-slate-200/70 bg-white/70 backdrop-blur-sm p-4" data-testid="card-benefit-0">
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <ShieldCheck className="h-4 w-4 text-secondary" />
                        Confidential
                      </div>
                      <div className="text-xs text-slate-600 mt-1">Your details stay private.</div>
                    </div>
                    <div className="rounded-xl border border-slate-200/70 bg-white/70 backdrop-blur-sm p-4" data-testid="card-benefit-1">
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <Scale className="h-4 w-4 text-secondary" />
                        No pressure
                      </div>
                      <div className="text-xs text-slate-600 mt-1">Clear, straightforward guidance.</div>
                    </div>
                    <div className="rounded-xl border border-slate-200/70 bg-white/70 backdrop-blur-sm p-4" data-testid="card-benefit-2">
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                        Free review
                      </div>
                      <div className="text-xs text-slate-600 mt-1">No fee unless we win.</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/70 bg-[#F9F7F5]/70 backdrop-blur-sm p-7 md:p-8 shadow-sm">
                  <h3 className="font-serif text-2xl text-primary mb-6" data-testid="text-office-title">Our Office</h3>
                  <div className="space-y-5">
                    <div className="flex gap-3 items-start">
                      <MapPin className="w-5 h-5 text-secondary mt-1" />
                      <div className="text-slate-600">
                        <div className="font-bold text-primary" data-testid="text-office-name">Thomas & Wan – Medical Malpractice Attorneys</div>
                        <a
                          href="https://maps.app.goo.gl/dZzpBComUgnyvp5f6"
                          className="hover:text-secondary transition-colors"
                          data-testid="link-map"
                        >
                          1710 Sunset Blvd<br />Houston, TX 77005
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Phone className="w-5 h-5 text-secondary" />
                      <a
                        href="tel:713-529-1177"
                        className="font-bold text-primary hover:text-secondary transition-colors"
                        data-testid="link-phone"
                      >
                        (713) 529-1177
                      </a>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Mail className="w-5 h-5 text-secondary" />
                      <a
                        href="mailto:info@thomasandwan.com"
                        className="font-bold text-primary hover:text-secondary transition-colors"
                        data-testid="link-email"
                      >
                        info@thomasandwan.com
                      </a>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Clock className="w-5 h-5 text-secondary" />
                      <div className="text-slate-600" data-testid="text-office-hours">
                        <div className="font-bold text-primary">Hours</div>
                        <div>Mon - Fri: 8:00 AM - 6:00 PM</div>
                        <div>Weekends: By Appointment</div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.thomasandwan.com/"
                  className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-secondary transition-colors"
                  data-testid="link-back-to-main"
                >
                  Visit Main Website <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur-sm p-7 md:p-10 shadow-sm">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif text-primary" data-testid="text-form-title">Send a message</h3>
                    <p className="text-slate-600 mt-2" data-testid="text-form-subtitle">We typically respond the same business day.</p>
                  </div>

                  <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600" data-testid="badge-form-note">
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                    Free consultation
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3" data-testid="text-quick-topics-title">
                    Quick topic (optional)
                  </p>
                  <div className="flex flex-wrap gap-2" data-testid="list-quick-topics">
                    {quickTopics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-secondary/50 hover:bg-secondary/5 transition-colors"
                        data-testid={`button-topic-${t.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <form
                  className="mt-8 space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  data-testid="form-contact"
                >
                  {submitted && (
                    <div
                      className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900 flex items-start gap-3"
                      role="status"
                      data-testid="status-contact-submitted"
                    >
                      <CheckCircle2 className="h-5 w-5 mt-0.5" />
                      <div>
                        <div className="font-semibold">Message received.</div>
                        <div className="text-sm text-emerald-900/80">We’ll get back to you as soon as possible.</div>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold" htmlFor="firstName">
                        First name
                      </label>
                      <Input id="firstName" autoComplete="given-name" data-testid="input-first-name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold" htmlFor="lastName">
                        Last name
                      </label>
                      <Input id="lastName" autoComplete="family-name" data-testid="input-last-name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold" htmlFor="phone">
                      Phone (optional)
                    </label>
                    <Input id="phone" autoComplete="tel" placeholder="(###) ###-####" data-testid="input-phone" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold" htmlFor="email">
                      Email
                    </label>
                    <Input id="email" type="email" autoComplete="email" placeholder="you@email.com" data-testid="input-email" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold" htmlFor="message">
                      What happened?
                    </label>
                    <Textarea id="message" className="min-h-[160px]" placeholder="Share the basics (dates, facility, what went wrong, current condition)…" data-testid="input-message" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl py-6 text-base"
                      data-testid="button-submit-contact"
                    >
                      Send message
                    </Button>
                    <a
                      href="tel:713-529-1177"
                      className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-primary font-bold py-6 text-base transition-colors"
                      data-testid="link-call-now"
                    >
                      Call now
                    </a>
                  </div>

                  <div className="text-xs text-slate-500 leading-relaxed" data-testid="text-form-disclaimer">
                    By submitting, you agree we may contact you about your inquiry. Do not include sensitive personal health information.
                  </div>
                </form>

                <div className="mt-10 rounded-2xl bg-primary text-white p-7 md:p-8 border border-primary/20 shadow-sm">
                  <h4 className="text-2xl md:text-3xl font-serif" data-testid="text-callout-title">Prefer to talk?</h4>
                  <p className="text-white/80 leading-relaxed mt-3" data-testid="text-callout-body">
                    Call for a free consultation—we’ll discuss your options and next steps. If you already have medical records, we can review them.
                  </p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    <a
                      href="tel:713-529-1177"
                      className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-4 rounded-xl uppercase tracking-widest text-xs w-full transition-colors"
                      data-testid="link-call-primary"
                    >
                      Call (713) 529-1177
                    </a>
                    <a
                      href="https://www.thomasandwan.com/contact-us/"
                      className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-4 rounded-xl uppercase tracking-widest text-xs w-full transition-colors"
                      data-testid="link-contact-official"
                    >
                      Official contact page
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
