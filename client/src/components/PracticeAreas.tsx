import { Link } from "wouter";
import { 
  Baby, 
  Stethoscope, 
  Brain, 
  Activity, 
  HeartPulse, 
  ArrowUpRight,
  Scissors,
  Pill,
  Search
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  return (
    <section className="py-24 bg-[#F9F7F5]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block" data-testid="text-practice-label">
            {label}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6" data-testid="text-practice-heading">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground font-light" data-testid="text-practice-subtext">
            {subtext}
          </p>
        </div>

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
  );
}
