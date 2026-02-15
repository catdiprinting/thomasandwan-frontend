import { Link } from "wouter";
import { ArrowRight, Baby, Brain, Scissors, Pill, Search, HeartPulse, Stethoscope } from "lucide-react";

const allPracticeAreas = [
  { title: "Medical Malpractice", href: "/cases-we-handle/medical-malpractice", icon: Stethoscope },
  { title: "Birth Injuries", href: "/cases-we-handle/birth-injuries", icon: Baby },
  { title: "Complications of Childbirth", href: "/cases-we-handle/complications-of-childbirth", icon: HeartPulse },
  { title: "Brain Injuries", href: "/cases-we-handle/brain-injuries", icon: Brain },
  { title: "Surgical Errors", href: "/cases-we-handle/surgical-errors", icon: Scissors },
  { title: "Medication Errors", href: "/cases-we-handle/medication-errors", icon: Pill },
  { title: "Misdiagnosis", href: "/cases-we-handle/misdiagnosis", icon: Search },
];

interface RelatedPracticeAreasProps {
  currentSlug: string;
}

export default function RelatedPracticeAreas({ currentSlug }: RelatedPracticeAreasProps) {
  const currentPath = `/cases-we-handle/${currentSlug}`;
  const related = allPracticeAreas.filter((area) => area.href !== currentPath);

  return (
    <section className="py-16 bg-[#F9F7F5] border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="text-secondary font-bold tracking-widest uppercase text-xs block mb-3">
            Other Cases We Handle
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-primary">
            Related Practice Areas
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {related.map((area) => {
            const Icon = area.icon;
            return (
              <Link
                key={area.href}
                href={area.href}
                className="flex items-center gap-4 bg-white p-5 border border-gray-100 hover:border-secondary/30 hover:shadow-md transition-all group"
                data-testid={`related-link-${area.href.split('/').pop()}`}
              >
                <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors">
                  <Icon className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <span className="font-semibold text-primary group-hover:text-secondary transition-colors text-sm">
                  {area.title}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-secondary ml-auto shrink-0 transition-colors" />
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/cases-we-handle"
            className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:text-secondary transition-colors"
            data-testid="related-link-all-cases"
          >
            View All Cases <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
