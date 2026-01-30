import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Baby, Activity, AlertTriangle } from "lucide-react";

export default function BirthInjuriesPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary text-white">
          <div className="absolute inset-0 opacity-20 mix-blend-soft-light">
            <img
              src="/src/assets/images/birth-injury-hero.jpg"
              alt="Newborn in hospital with medical equipment"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 md:px-6 py-24 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 max-w-xl"
            >
              <div className="inline-flex items-center gap-2 border-b-2 border-secondary pb-1">
                <Baby className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm">
                  Cases We Handle
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
                Birth Injuries
              </h1>
              <p className="text-lg md:text-xl text-white/85 font-light leading-relaxed">
                Sometimes babies are born with undiagnosed birth defects. Sometimes, however, a baby is
                the victim of a preventable birth injury that occurs during labor and delivery.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-none h-12 px-8 font-bold">
                  Call (713) 529-1177
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary rounded-none h-12 px-8 font-bold flex items-center gap-2"
                >
                  Free Case Evaluation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-6 text-lg text-slate-700 leading-relaxed font-light">
            <p>
              Giving birth is one of the most exciting events in a mother&apos;s life. Parents prepare for the big
              day when their new baby is born, and they hope and pray for a healthy child. Sometimes babies are
              born with medical problems that don&apos;t match their parents&apos; expectations.
            </p>
            <p>
              Sometimes it is because the baby is born with an undiagnosed birth defect. Sometimes, however, the
              baby is a victim of a birth injury that occurs during labor and delivery.
            </p>
            <p>
              At Thomas &amp; Wan, our lawyers have represented many Texas families who have suffered injuries to
              their baby as a result of gross negligence and malpractice. We are very familiar with the medicine,
              the law, and the policies of hospitals all across Texas concerning the need for monitoring and
              possible emergency delivery of laboring moms to prevent injuries to babies.
            </p>
            <p>
              Many times these injuries are preventable if hospitals only ensured that safety policies were
              followed by their labor nurses, midwives, and doctors or ensured that competent and trained nurses
              were present.
            </p>
          </div>
        </section>

        {/* Types of birth injuries */}
        <section className="py-20 bg-[#F9F7F5] border-y border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
              Types of Birth Injury Cases We Handle
            </h2>
            <p className="text-slate-700 mb-6 leading-relaxed">
              Thomas &amp; Wan&apos;s medical malpractice attorneys have represented numerous children and parents of
              injured children in birth injury cases and know the specialized medicine and law needed to help
              your family.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-700">
              {[
                "Hypoxic ischemic encephalopathy (HIE)",
                "Cerebral palsy",
                "Forceps / vacuum injuries",
                "Induction problems",
                "Gestational diabetes mismanagement",
                "Preeclampsia mismanagement",
                "Shoulder dystocia / Erb\'s palsy",
                "Fetal heart monitoring problems",
                "Delay in C-section or delay in delivery",
                "Fetal acidosis",
                "Umbilical cord compression",
                "Infection and Group B Strep mismanagement",
                "Intubation problems",
                "Placental abruption",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Birth defects vs negligence */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-serif text-primary mb-6">Birth Defects Versus Birth Negligence</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4 font-light">
                A birth defect is a health problem that affects your baby based on your child&apos;s genetic material
                or DNA. Examples include Down syndrome, a cleft palate, a heart murmur, or other genetic
                conditions.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4 font-light">
                <strong className="font-semibold">A birth defect is generally not medical malpractice.</strong>
                In some cases, birth defects can be caused during pregnancy, such as when pregnant women take
                certain medications and are not properly warned of the risks.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                On the other hand, a birth injury is a medical issue that an infant is born with that is, in most
                cases, completely preventable.
              </p>
            </div>
            <div className="bg-[#F9F7F5] p-8 border-l-4 border-secondary shadow-sm">
              <h3 className="font-serif text-2xl text-primary mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-secondary" />
                Common Causes of Preventable Birth Injuries
              </h3>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li>Pulling and/or twisting the infant improperly during delivery</li>
                <li>Improper use of birth-assisting tools such as forceps or vacuum extraction</li>
                <li>Administering the wrong amount or wrong type of medication during pregnancy or labor</li>
                <li>Failure to monitor the infant properly for distress, including fetal heart rate</li>
                <li>Failure to schedule and perform an emergency C-section when medically necessary</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Case example – HIE */}
        <section className="py-20 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-serif text-primary mb-4">
                Case Example #1: Lack of Oxygen to the Brain During Labor
              </h2>
              <p className="text-slate-700 mb-4 leading-relaxed font-light">
                The lawyers of Thomas &amp; Wan are experienced in representing babies who have suffered lack of
                oxygen to the brain during mom&apos;s labor. Hypoxic Ischemic Encephalopathy (HIE) is a type of brain
                damage that occurs when an infant&apos;s brain doesn&apos;t receive enough oxygen and blood flow.
              </p>
              <p className="text-slate-700 mb-4 leading-relaxed font-light">
                HIE is the leading cause of infant fatalities in the United States and a primary source of severe
                long-term impairments.
              </p>
              <h3 className="font-semibold text-primary mb-2">Symptoms associated with HIE can include:</h3>
              <ul className="space-y-2 text-sm text-slate-700 mb-4">
                <li>Meconium-stained amniotic fluid</li>
                <li>Low heart rate and poor muscle tone</li>
                <li>Weak breathing or no breathing at all</li>
                <li>Bluish or pale skin color</li>
                <li>Excessive acid in the blood</li>
              </ul>
              <p className="text-slate-700 leading-relaxed text-sm font-light">
                Effects of HIE may include developmental delays, epilepsy, cognitive issues, motor skill delays,
                and other neurodevelopmental problems. The true severity often cannot be determined until the
                child reaches three to four years of age.
              </p>
            </div>
            <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-light">
              <h3 className="font-semibold text-primary mb-2">Conditions that can lead to HIE include:</h3>
              <ul className="space-y-2">
                <li>Preeclampsia and pregnancy-induced hypertension</li>
                <li>Fetal distress or excessive bleeding from the placenta</li>
                <li>Very low maternal blood pressure</li>
                <li>Umbilical cord problems or abnormal fetal position</li>
                <li>Prolonged late stages of labor or rupture of the placenta or uterus</li>
              </ul>
              <h3 className="font-semibold text-primary mt-6 mb-2">Postpartum causes of HIE can include:</h3>
              <ul className="space-y-2">
                <li>Severe cardiac or pulmonary disease</li>
                <li>Infections such as sepsis and meningitis</li>
                <li>Severe prematurity</li>
                <li>Low neonatal blood pressure or brain/skull trauma</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Case example – Induction Drugs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <h2 className="text-3xl font-serif text-primary mb-6">
              Case Example #2: Overuse of Induction Drugs During Labor
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4 text-slate-700 leading-relaxed font-light">
                <p>
                  At Thomas & Wan, we have the knowledge to pursue cases involving induced labor against hospitals, nurses, midwives, and doctors. There are several drugs commonly used for inducing labor. When these drugs are used in moderation with proper monitoring, they can be safe and effective.
                </p>
                <p>
                  However, when these drugs are given in high doses or without proper monitoring, they can be very dangerous and life-threatening to both mom and baby.
                </p>
                <p>
                  Overusing induction drugs can cause the mother's contractions to become too frequent and/or too strong, also known as uterine hyperstimulation. This can interrupt blood flow to the baby and deprive the infant of vital oxygen. It can also cause life-threatening conditions in the mother, such as a ruptured uterus.
                </p>
              </div>
              <div className="bg-[#F9F7F5] p-8 border-l-4 border-secondary">
                <h3 className="font-serif text-xl text-primary mb-4">Warning Signs of Improper Induction</h3>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Hospital's failure to follow its induction policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Nurses' failure to monitor laboring moms and babies for hyperstimulation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Doctors insisting on inducing labor when it is not medically appropriate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Emergency C-section becoming necessary due to induction complications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Case example – Gestational Diabetes */}
        <section className="py-20 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <h2 className="text-3xl font-serif text-primary mb-6">
              Case Example #3: Improper Management of Gestational Diabetes
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4 text-slate-700 leading-relaxed font-light">
                <p>
                  Pregnant moms need to take gestational diabetes seriously, and so do doctors and midwives. To prevent birth complications, it is important for doctors to monitor an expectant mother's blood sugar and provide appropriate treatment.
                </p>
                <p>
                  Gestational diabetes typically develops during the later stages of pregnancy and often does not cause any noticeable symptoms. For this reason, it is critical for doctors to be proactive in evaluating your risk for gestational diabetes and providing proper treatment.
                </p>
                <p>
                  The failure to monitor a pregnant mom's blood sugar levels can cause the baby to grow very large, which can be dangerous during a vaginal delivery. A large baby can have problems being delivered, resulting in possible shoulder dystocia, Erb's palsy, subgaleal hemorrhage, and other serious birth injuries.
                </p>
              </div>
              <div className="bg-white p-8 border-l-4 border-secondary shadow-sm">
                <h3 className="font-serif text-xl text-primary mb-4">Complications from Mismanaged Gestational Diabetes</h3>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Excessive birth weight making delivery dangerous</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Early birth and respiratory distress in the newborn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Low blood sugar (hypoglycemia) in baby, leading to seizures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Preeclampsia developing in the mother</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Increased risk of Type 2 diabetes later in life for both mother and baby</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-primary text-white py-24 text-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Legal Help for the Youngest Victims
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              At Thomas &amp; Wan, we have the training, experience, and knowledge to sue grossly negligent
              hospitals, doctors, nurses, and midwives for birth injuries. Please call us today for free&mdash;we are
              here to listen and guide you in the right direction.
            </p>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-10 text-xl rounded-none"
            >
              Call Today & Don&apos;t Delay
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
