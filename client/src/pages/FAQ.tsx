import { useState } from "react";
import { ChevronDown, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs, siteInfo } from "@/lib/content";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
          <div className="max-w-3xl lg:pl-8 xl:pl-16">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
              Get Answers
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/80 font-light leading-relaxed">
              Learn more about the legal process and how Thomas & Wan can help you get the justice you deserve.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
          <div className="grid lg:grid-cols-3 gap-12 lg:pl-8 xl:pl-16">
            {/* FAQ Accordion */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 bg-white overflow-hidden"
                    data-testid={`faq-item-${idx}`}
                  >
                    <button
                      className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                      data-testid={`faq-toggle-${idx}`}
                    >
                      <span className="text-lg font-serif text-primary pr-4 flex-1">
                        Q: {faq.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-secondary transition-transform shrink-0 mt-1",
                          openIndex === idx ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "px-6 overflow-hidden transition-all duration-300",
                        openIndex === idx ? "pb-6 max-h-96" : "max-h-0"
                      )}
                    >
                      <p className="text-slate-600 leading-relaxed">
                        <span className="font-bold text-primary">A:</span> {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-primary text-white p-8 mb-6">
                  <h3 className="font-serif text-2xl mb-4">Still Have Questions?</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    We're here to help. Contact us for a free consultation to discuss your case.
                  </p>
                  <div className="space-y-4 mb-6">
                    <a 
                      href={`tel:${siteInfo.phone.replace(/[^0-9]/g, '')}`}
                      className="flex items-center gap-3 text-white hover:text-secondary transition-colors"
                    >
                      <Phone className="w-5 h-5 text-secondary" />
                      <span className="font-medium">{siteInfo.phone}</span>
                    </a>
                    <a 
                      href={`mailto:${siteInfo.email}`}
                      className="flex items-center gap-3 text-white hover:text-secondary transition-colors"
                    >
                      <Mail className="w-5 h-5 text-secondary" />
                      <span className="font-medium">{siteInfo.email}</span>
                    </a>
                  </div>
                  <a href="/contact">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-none py-3 h-auto">
                      Free Case Review
                    </Button>
                  </a>
                </div>

                <div className="bg-[#F9F7F5] p-8">
                  <h4 className="font-serif text-xl text-primary mb-4">Remember</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    In Texas, there are strict deadlines for filing a medical malpractice lawsuit. 
                    Don't wait—call today to discuss your legal options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
            Call Us Now For a Free Consultation
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case.
          </p>
          <a href={`tel:${siteInfo.phone.replace(/[^0-9]/g, '')}`}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-none h-14 px-10 text-lg">
              Call {siteInfo.phone}
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
