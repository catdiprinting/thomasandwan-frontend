import { motion } from "framer-motion";
import { AlertTriangle, Baby, Heart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SEO, { createPracticeAreaSchema } from "@/components/SEO";
import { usePracticeAreaData, cms } from "@/hooks/useCmsData";
import PageShell from "@/components/PageShell";
import RelatedPracticeAreas from "@/components/RelatedPracticeAreas";

const birthInjuryTypes = [
  "Hypoxic ischemic encephalopathy",
  "Cerebral palsy",
  "Forceps/vacuum injuries",
  "Induction problems",
  "Gestational Diabetes mismanagement",
  "Preeclampsia mismanagement",
  "Shoulder Dystocia/Erb's palsy",
  "Fetal heart monitoring problems",
  "Delay in C-Section",
  "Delay in delivery",
  "Fetal acidosis",
  "Umbilical cord compression",
  "Infection mismanagement",
  "Group B Strep mismanagement",
  "Intubation problems",
  "Placental abruption"
];

const preventableCauses = [
  "Pulling and/or twisting the infant improperly during the delivery period",
  "Improper handling and use of birth-assisting tools, such as forceps or a vacuum extraction tool",
  "Administering the wrong amount or the wrong type of medication to the mother during pregnancy and during labor",
  "Failure to monitor the infant properly for distress, including failure to regularly monitor fetal heartbeat",
  "Failure to schedule and perform an emergency cesarean surgery (C-section)"
];

const hieSymptoms = [
  "Meconium-stained amniotic fluid",
  "Low heart rate",
  "Poor muscle tone",
  "Weak breathing or no breathing at all",
  "Bluish or pale skin color",
  "Excessive acid in the blood"
];

export default function BirthInjuries() {
  const { data: d } = usePracticeAreaData("birth-injuries");
  const schema = createPracticeAreaSchema(
    "Birth Injury Lawyers",
    "Houston birth injury attorneys representing families whose babies suffered injuries due to medical negligence during labor and delivery. Free consultation.",
    "https://thomasandwan.com/cases-we-handle/birth-injuries"
  );

  return (
    <PageShell title={cms(d, "paTitle", "Birth Injuries")} subtitle="Cases We Handle" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cases We Handle", href: "/cases-we-handle" }, { label: "Birth Injuries" }]}>
      <SEO 
        title="Birth Injury Lawyers in Houston"
        description="Texas birth injury attorneys at Thomas & Wan represent families whose babies were harmed by medical negligence. We handle HIE, cerebral palsy, Erb's palsy cases. Free consultation."
        canonical="https://thomasandwan.com/cases-we-handle/birth-injuries"
        schema={schema}
      />

        {/* Introduction */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {cms(d, "paSidebarText", "Giving birth is one of the most exciting events in a mother's life. Parents prepare for the big day when their new baby is born, and they hope and pray for a healthy baby. At Thomas & Wan, our lawyers have represented many Texas families who have suffered injuries to their baby as a result of gross negligence and malpractice.")}
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  We are very familiar with the medicine, the law and the policies of hospitals all across Texas concerning the need for monitoring and possible emergency delivery of laboring moms to prevent injuries to babies. Many times these injuries are preventable if hospitals only ensured that safety policies were followed by their labor nurses, midwives and doctors.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="/images/birth-injuries.jpg" 
                  alt="Newborn baby receiving care" 
                  className="w-full rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-secondary/20 rounded-lg -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Types of Birth Injuries */}
        <section className="py-20 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-serif text-primary mb-10 text-center">
              Types of Birth Injuries We Handle
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {birthInjuryTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white p-4 border-l-4 border-secondary shadow-sm"
                >
                  <p className="text-primary font-medium">{type}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Birth Defects vs Birth Negligence */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-serif text-primary mb-8">
                Birth Defects Versus Birth Negligence
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-slate-50 p-8 border-t-4 border-slate-400">
                  <h3 className="font-bold text-xl text-primary mb-4">Birth Defects</h3>
                  <p className="text-slate-600 leading-relaxed">
                    A birth defect is a health problem that affects your baby based on your child's genetic material or DNA. Examples include Down's Syndrome, a cleft palate, or heart murmurs. <strong>A birth defect is generally NOT medical malpractice.</strong>
                  </p>
                </div>
                
                <div className="bg-secondary/10 p-8 border-t-4 border-secondary">
                  <h3 className="font-bold text-xl text-primary mb-4">Birth Injuries</h3>
                  <p className="text-slate-600 leading-relaxed">
                    A birth injury is a medical issue that an infant is born with that is, in most cases, <strong>completely preventable</strong>. These are often caused by negligence during labor and delivery.
                  </p>
                </div>
              </div>

              <h3 className="font-bold text-2xl text-primary mb-6">
                Common Causes of Preventable Birth Injuries:
              </h3>
              <div className="space-y-4">
                {preventableCauses.map((cause, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <AlertTriangle className="w-5 h-5 text-secondary shrink-0 mt-1" />
                    <p className="text-slate-600">{cause}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Example: HIE */}
        <section className="py-20 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                      Case Example
                    </span>
                  </div>
                  <h2 className="text-3xl font-serif text-primary mb-6">
                    Lack Of Oxygen To The Brain During Labor
                  </h2>
                  
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Hypoxic Ischemic Encephalopathy (HIE) is a type of brain damage that occurs when an infant's brain doesn't receive enough oxygen. It is a dangerous condition that requires immediate medical intervention. HIE is the leading cause of infant fatalities in the United States, as well as the primary source of severe impairments.
                  </p>

                  <h3 className="font-bold text-xl text-primary mb-4">
                    Symptoms Associated with HIE:
                  </h3>
                  <div className="grid gap-3 mb-8">
                    {hieSymptoms.map((symptom, index) => (
                      <div key={index} className="flex gap-3 items-center bg-white p-3 shadow-sm">
                        <Baby className="w-5 h-5 text-secondary" />
                        <span className="text-slate-600">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="/images/newborn-care.jpg" 
                    alt="Mother holding newborn baby" 
                    className="w-full rounded-lg shadow-xl"
                  />
                  <div className="absolute -bottom-4 -left-4 w-full h-full border-4 border-secondary/20 rounded-lg -z-10" />
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mt-8 max-w-4xl">
                Effects of HIE may include developmental delays, epilepsy, cognitive issues, motor skill development delays, and neurodevelopment delays. The true severity of HIE generally cannot be determined until the baby reaches three to four years of age.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Heart className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif mb-6">{cms(d, "paCtaHeading", "Legal Help for The Youngest Victims")}</h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              {cms(d, "paCtaText", "At Thomas & Wan, we have the training, experience and knowledge to sue grossly negligent hospitals, doctors, nurses and midwives for birth injuries. Please call us today for free—we are here to listen to you.")}
            </p>
            <Link href="/contact-us">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-10 text-xl rounded-none">
                Free Case Review
              </Button>
            </Link>
          </div>
        </section>

        <RelatedPracticeAreas currentSlug="birth-injuries" />
    </PageShell>
  );
}
