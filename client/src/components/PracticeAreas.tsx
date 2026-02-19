import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Baby, 
  Brain, 
  ArrowUpRight,
  Scissors,
  Pill,
  Search,
  HelpCircle,
  Phone,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SmartCTA from "./SmartCTA";

const practices = [
  {
    title: "Birth Injuries",
    icon: Baby,
    desc: "Cerebral palsy, hypoxia, shoulder dystocia, and preventable birth trauma.",
    href: "/cases-we-handle/birth-injuries",
  },
  {
    title: "Surgical Errors",
    icon: Scissors,
    desc: "Mistakes during surgery, anesthesia errors, and post-operative negligence.",
    href: "/cases-we-handle/surgical-errors",
  },
  {
    title: "Brain Injuries",
    icon: Brain,
    desc: "Traumatic brain injuries resulting from medical negligence or malpractice.",
    href: "/cases-we-handle/brain-injuries",
  },
  {
    title: "Misdiagnosis",
    icon: Search,
    desc: "Failure to diagnose cancer, heart attacks, strokes, and critical conditions.",
    href: "/cases-we-handle/misdiagnosis",
  },
  {
    title: "Medication Errors",
    icon: Pill,
    desc: "Wrong medications, overdoses, drug interactions, and pharmacy mistakes.",
    href: "/cases-we-handle/medication-errors",
  },
];

function parseSubtext(subtext: string) {
  const lines = subtext.split("\n").map((l) => l.trim()).filter(Boolean);
  const questions: string[] = [];
  const reassurance: string[] = [];
  let context = "";
  let closing = "";

  for (const line of lines) {
    if (line.startsWith("•") || line.startsWith("•")) {
      questions.push(line.replace(/^[•·]\s*/, "").trim());
    } else if (
      line.startsWith("You are not") ||
      line.startsWith("And it was not")
    ) {
      reassurance.push(line);
    } else if (line.startsWith("We talk to")) {
      context = line;
    } else if (line.startsWith("We can help")) {
      closing = line;
    }
  }

  return { questions, reassurance, context, closing };
}

interface PracticeAreasProps {
  label?: string;
  heading?: string;
  subtext?: string;
  ctaHeading?: string;
  ctaText?: string;
  ctaButton?: string;
}

export default function PracticeAreas({
  label = "Our Expertise",
  heading = "Focused Exclusively on Medical Malpractice",
  subtext = "We don't handle car accidents or divorces. Our sole focus is mastering the complex realm of medical malpractice to win for you.",
  ctaHeading = "Do You Have a Case?",
  ctaText = "Get a free review of your medical records by our expert team.",
  ctaButton = "Contact Us Today",
}: PracticeAreasProps) {
  const hasEmotionalContent = subtext.includes("•") || subtext.includes("•");
  const parsed = hasEmotionalContent ? parseSubtext(subtext) : null;

  return (
    <>
      {parsed && parsed.questions.length > 0 && (
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[#1a1f2e]" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-[#1a1f2e]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 md:mb-16"
              >
                <div className="inline-flex items-center gap-2 text-secondary/80 text-sm uppercase tracking-[0.2em] mb-6">
                  <span className="w-8 h-px bg-secondary/50" />
                  {label}
                  <span className="w-8 h-px bg-secondary/50" />
                </div>
                <h2
                  className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight"
                  data-testid="text-practice-heading"
                >
                  {(() => {
                    const parts = heading.split(/(Sent Home Too Soon\??)/i);
                    if (parts.length > 1) {
                      return (
                        <>
                          {parts[0]}
                          <span className="text-secondary">{parts[1]}</span>
                          {parts[2]}
                        </>
                      );
                    }
                    return heading;
                  })()}
                </h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-12 md:mb-16">
                {parsed.questions.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group"
                    data-testid={`card-ignored-question-${index}`}
                  >
                    <div className="flex items-start gap-4 p-5 md:p-6 rounded-lg bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.1] hover:border-secondary/20">
                      <div className="mt-0.5 flex-shrink-0">
                        <HelpCircle className="w-5 h-5 text-secondary/70 group-hover:text-secondary transition-colors" />
                      </div>
                      <p className="text-white/85 text-base md:text-lg leading-relaxed font-light">
                        {question}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-12"
              >
                {parsed.context && (
                  <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                    {parsed.context}
                  </p>
                )}
                <div className="space-y-1 mb-2">
                  {parsed.reassurance.map((line, i) => (
                    <p
                      key={i}
                      className={`font-serif text-xl md:text-2xl italic ${
                        i === parsed.reassurance.length - 1
                          ? "text-secondary"
                          : "text-white"
                      }`}
                      data-testid={`text-ignored-reassurance-${i}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                {parsed.closing && (
                  <p className="text-white/60 text-base mb-6">
                    {parsed.closing}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <SmartCTA
                    mobileText="Call Now — Free Review"
                    desktopText="Free Case Review"
                    className="items-center gap-2 bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-4 rounded-md text-base transition-all duration-300 shadow-lg shadow-secondary/20 hover:shadow-secondary/30"
                    data-testid="button-ignored-cta"
                  />
                  <span className="hidden md:inline-flex items-center gap-2 text-white/70 text-base">
                    <Phone className="w-4 h-4" />
                    (713) 529-1177
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {!parsed && (
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block" data-testid="text-practice-label">
                {label}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6 pb-1" data-testid="text-practice-heading-fallback">
                {heading}
              </h2>
              <p className="text-lg text-muted-foreground font-light" data-testid="text-practice-subtext">
                {subtext}
              </p>
            </div>
          )}

          {parsed && (
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block" data-testid="text-practice-label">
                Cases We Handle
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6 pb-1">
                Focused Exclusively on Medical Malpractice
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                We don't handle car accidents or divorces. Our sole focus is mastering the complex realm of medical malpractice to win for you.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practices.map((area, idx) => (
              <Link key={idx} href={area.href} data-testid={`card-practice-${idx}`}>
                <Card 
                  className="group relative overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white cursor-pointer h-full"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                  
                  <CardHeader className="pt-8 px-8">
                    <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <area.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <CardTitle className="font-serif text-2xl text-primary group-hover:text-secondary transition-colors">
                      {area.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {area.desc}
                    </p>
                    <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Learn More <ArrowUpRight className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            <Link href="/contact-us" data-testid="button-practice-cta">
              <div className="bg-primary p-8 flex flex-col justify-center items-center text-center text-white relative overflow-hidden group cursor-pointer h-full">
                <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <h3 className="font-serif text-3xl mb-4 relative z-10" data-testid="text-practice-cta-heading">{ctaHeading}</h3>
                <p className="mb-8 text-white/80 relative z-10" data-testid="text-practice-cta-text">
                  {ctaText}
                </p>
                <span className="bg-secondary text-primary px-8 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors relative z-10">
                  {ctaButton}
                </span>
              </div>
            </Link>
          </div>

          <div className="text-center mt-10">
            <Link href="/cases-we-handle" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm hover:text-secondary transition-colors" data-testid="link-view-all-cases">
              View All Cases We Handle <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
