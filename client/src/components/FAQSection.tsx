import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";

export default function FAQSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
              Common Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground font-light mb-8">
              Navigating medical malpractice claims can be confusing. Here are answers to some of the most common questions our clients ask.
            </p>
            <div className="p-8 bg-primary text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-serif text-2xl mb-4">Still have questions?</h3>
                <p className="mb-6 opacity-80">
                  We are available 24/7 to answer your questions and help you understand your rights.
                </p>
                <button className="bg-secondary text-primary hover:bg-white transition-colors px-6 py-3 font-bold uppercase tracking-wide w-full">
                  Contact Us Now
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-gray-100">
                  <AccordionTrigger className="text-xl font-serif text-primary hover:text-secondary transition-colors py-6 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-slate-600 leading-relaxed font-light pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
