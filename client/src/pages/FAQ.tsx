import PageShell from "@/components/PageShell";
import SEO, { createFAQSchema } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePageCms, cms } from "@/hooks/useCmsData";
import ContentLoader from "@/components/ContentLoader";

const faqs = [
  {
    q: "I think I have a legal claim. What do I do now?",
    a: "If you think you have a legal claim, your first step is finding a lawyer to represent you. You can contact Thomas & Wan to discuss your claim by filling out a form or by calling 713.529.1177. A lawyer will evaluate your case.",
  },
  {
    q: "How do I know which lawyer to use?",
    a: "Use an attorney who has experience dealing with your type of claim and a proven track record of success. Ask about experience, how long they’ve practiced, how much time they spend on cases like yours, and whether they will personally handle the case or refer it to another firm.",
  },
  {
    q: "Why should I hire Thomas & Wan?",
    a: "Linda Laurent Thomas and Michelle Wan have extensive experience handling personal injury matters and are routinely asked to handle difficult cases by other law firms. They approach practicing law as a profession, not a factory. They handle cases with personal service and focus on results, keeping you informed of your options.",
  },
  {
    q: "How do I pay for an attorney?",
    a: "Most personal injury firms, including Thomas & Wan, work on a contingency basis. This means you only pay for services if there is a verdict or settlement. If no recovery is made, you pay nothing.",
  },
  {
    q: "Thomas & Wan has taken my case. What now?",
    a: "The first part of the lawsuit process is called discovery. In this phase, both sides gather evidence and information that proves or disproves the claim.",
  },
  {
    q: "What do I have to do during discovery?",
    a: "You may answer written questions (interrogatories) regarding personal information, witnesses, injuries, medical treatment, and other details. Your lawyer or paralegal may request additional information to strengthen the case.",
  },
  {
    q: "What if I have to give a deposition?",
    a: "A deposition is testimony under oath recorded for later use in court. The attorneys will ask questions, and a court reporter records testimony. Your attorney will prepare you and be by your side to ensure the process is fair.",
  },
  {
    q: "What is mediation?",
    a: "Mediation is a meeting with all parties to attempt settlement. A neutral mediator helps communicate between sides. Courts often require mediation before trial.",
  },
  {
    q: "What if my case goes to trial?",
    a: "A judge or jury determines responsibility and damages. If Thomas & Wan wins a settlement or verdict, the fee is taken from that recovery.",
  },
];

export default function FAQ() {
  const { data: d, isLoading } = usePageCms("faq");
  const displayFaqs = d ? Array.from({length: 9}, (_, i) => ({ q: cms(d, `section${i+1}Heading`, faqs[i]?.q || ""), a: cms(d, `paragraph${i+2}`, faqs[i]?.a || "") })).filter(f => f.q) : faqs;
  return (
    <PageShell title={cms(d, "pageHeading", "Frequently Asked Questions")} subtitle="What to Expect" breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}>
      <ContentLoader isLoading={isLoading}>
      <SEO 
        title="Frequently Asked Questions"
        description="Get answers to common questions about medical malpractice claims, attorney fees, the lawsuit process, depositions, mediation, and trial — from Thomas & Wan in Houston, TX."
        canonical="https://thomasandwan.com/faq"
        schema={createFAQSchema(faqs)}
      />
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="bg-[#F9F7F5] border border-gray-100 p-8">
                <h2 className="font-serif text-2xl text-primary mb-4">Clear answers. Real guidance.</h2>
                <p className="text-slate-600 leading-relaxed">
                  {cms(d, "pageIntro", "This page is designed to be easier to scan and more helpful than the typical FAQ. If you don’t see your question here, call us.")}
                </p>
                <a
                  href="tel:713-529-1177"
                  className="mt-8 inline-flex w-full items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-4 rounded-none uppercase tracking-widest text-sm"
                  data-testid="link-faq-contact"
                >
                  Call (713) 529-1177
                </a>
              </div>

              <div className="mt-6 border-t-4 border-secondary bg-primary text-white p-8">
                <div className="text-4xl font-serif text-secondary mb-2">24/7</div>
                <div className="uppercase tracking-widest text-xs text-white/70 font-bold">Available to help</div>
                <div className="mt-4 text-white/80">
                  Call <a className="text-secondary font-bold" href="tel:713-529-1177">713-529-1177</a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {displayFaqs.map((f, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border-b border-gray-100">
                    <AccordionTrigger className="text-left text-xl font-serif text-primary hover:text-secondary transition-colors py-6">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-lg text-slate-600 leading-relaxed font-light pb-6">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-12 bg-primary text-white p-10 border-t-4 border-secondary">
                <h3 className="text-2xl md:text-3xl font-serif mb-4">Call Us Now For a Free Consultation</h3>
                <p className="text-white/80 leading-relaxed mb-8">
                  Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have the medical records, you can send them to us for a free review with no obligation.
                </p>
                <a
                  href="/contact-us"
                  className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm"
                  data-testid="link-faq-cta"
                >
                  Free Case Review
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ContentLoader>
    </PageShell>
  );
}
