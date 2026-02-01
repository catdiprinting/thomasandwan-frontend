import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <PageShell title="Contact Us" subtitle="Free Consultation">
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-serif text-primary mb-4">Contact us today for a free consultation with an attorney.</h2>
                  <p className="text-lg text-slate-600 leading-relaxed font-light">
                    There is no obligation and you are not required to pay any fees or expenses unless we settle or obtain a verdict.
                  </p>
                </div>

                <div className="bg-[#F9F7F5] border border-gray-100 p-8">
                  <h3 className="font-serif text-2xl text-primary mb-6">Our Office</h3>
                  <div className="space-y-5">
                    <div className="flex gap-3 items-start">
                      <MapPin className="w-5 h-5 text-secondary mt-1" />
                      <div className="text-slate-600">
                        <div className="font-bold text-primary">Thomas & Wan – Medical Malpractice Attorneys</div>
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
                      <a href="tel:713-529-1177" className="font-bold text-primary hover:text-secondary transition-colors" data-testid="link-phone">
                        713 529 1177
                      </a>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Mail className="w-5 h-5 text-secondary" />
                      <a href="mailto:info@thomasandwan.com" className="font-bold text-primary hover:text-secondary transition-colors" data-testid="link-email">
                        info@thomasandwan.com
                      </a>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Clock className="w-5 h-5 text-secondary" />
                      <div className="text-slate-600">
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
              <div className="border border-gray-100 p-10">
                <h3 className="text-2xl font-serif text-primary mb-2">Send a Message</h3>
                <p className="text-slate-600 mb-8">We’ll respond as soon as possible.</p>

                <form className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">First Name</label>
                      <Input data-testid="input-first-name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Last Name</label>
                      <Input data-testid="input-last-name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Email</label>
                    <Input type="email" data-testid="input-email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Message</label>
                    <Textarea className="min-h-[160px]" data-testid="input-message" />
                  </div>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-none py-7 text-lg" data-testid="button-submit-contact">
                    Send Message
                  </Button>
                </form>

                <div className="mt-10 bg-primary text-white p-8 border-t-4 border-secondary">
                  <h4 className="text-2xl font-serif mb-3">Call Us Now For a Free Consultation</h4>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have the medical records, you can send them to us for a free review with no obligation.
                  </p>
                  <a
                    href="https://www.thomasandwan.com/contact-us/"
                    className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm w-full"
                    data-testid="link-contact-official"
                  >
                    Go to Official Contact Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
