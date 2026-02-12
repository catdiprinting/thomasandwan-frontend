import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I have a case?",
    answer: "The first step is for us to help you get a copy of all your medical records. Then we work with our team of expert doctors and nurses to review the records to let us know if you have a case."
  },
  {
    question: "What kind of help can my family receive?",
    answer: "If we feel you have a case, we will have our team of experts determine how much money it will take to pay for the past medical bills and future quality medical care for you or your loved one for the rest of his or her life."
  },
  {
    question: "How much do you charge?",
    answer: "We work on a contingency basis. This means that you only pay a percentage for our services if we win a verdict or settlement for your family. If no recovery is made, you pay nothing."
  },
  {
    question: "Why should we hire you?",
    answer: "There are very few attorneys in Texas who specialize in medical malpractice, and those are the only kind of cases we do. Linda Thomas and Michelle Wan have over 60 years of combined experience. If we take your case, we work on your case ourselves; we don’t “flip” it to another firm."
  }
];

export default function FAQSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
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
