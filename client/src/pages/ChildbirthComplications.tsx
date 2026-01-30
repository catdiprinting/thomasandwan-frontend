import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, AlertTriangle, Activity, Stethoscope } from "lucide-react";
import { Link } from "wouter";

export default function ChildbirthComplicationsPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary text-white">
          <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 py-24 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 max-w-xl "
            >
              <div className="inline-flex items-center gap-2 border-b-2 border-secondary pb-1">
                <Heart className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm">
                  Cases We Handle
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
                Complications of Childbirth
              </h1>
              <p className="text-lg md:text-xl text-white/85 font-light leading-relaxed">
                We represent mothers who have been injured due to malpractice by a doctor, midwife, nurse, or hospital during childbirth.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-none h-12 px-8 font-bold">
                  Call (713) 529-1177
                </Button>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary rounded-none h-12 px-8 font-bold flex items-center gap-2"
                  >
                    Free Case Evaluation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 max-w-5xl space-y-6 text-lg text-slate-700 leading-relaxed font-light">
            <p>
              Childbirth should be a joyous occasion, but when medical professionals fail to provide proper care, mothers can suffer serious, life-altering injuries. At Thomas & Wan, we understand the physical and emotional trauma that can result from complications during childbirth.
            </p>
            <p>
              Our experienced attorneys have represented numerous Texas mothers who have suffered injuries due to gross negligence during labor and delivery. We are well-versed in the complex medical and legal issues surrounding childbirth complications.
            </p>
            <p>
              When hospitals, doctors, midwives, and nurses fail to follow proper protocols or ignore warning signs, the consequences can be devastating. We are here to help you seek justice and compensation for your injuries.
            </p>
          </div>
        </section>

        {/* Types of Complications */}
        <section className="py-20 bg-[#F9F7F5] border-y border-gray-100">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
              Childbirth Complications We Handle
            </h2>
            <p className="text-slate-700 mb-8 leading-relaxed">
              Our attorneys have extensive experience representing mothers who have suffered various complications during childbirth due to medical negligence.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-700">
              {[
                "Preeclampsia and eclampsia complications",
                "Hemorrhaging during or after delivery",
                "Uterine rupture",
                "Placental abruption",
                "Amniotic fluid embolism",
                "Emergency hysterectomy",
                "Severe vaginal tears",
                "Infections and sepsis",
                "Blood clots and pulmonary embolism",
                "Anesthesia errors",
                "C-section complications",
                "Postpartum hemorrhage",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When Negligence Occurs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 max-w-6xl grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-serif text-primary mb-6">When Medical Negligence Leads to Complications</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4 font-light">
                Many childbirth complications are preventable when medical professionals provide proper care and follow established protocols. Negligence can occur at any stage of labor and delivery.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4 font-light">
                Medical professionals have a duty to monitor both mother and baby throughout labor, recognize warning signs of complications, and take appropriate action to prevent harm.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                When they fail in this duty, mothers can suffer serious injuries that affect their health, their ability to care for their child, and their quality of life.
              </p>
            </div>
            <div className="bg-[#F9F7F5] p-8 border-l-4 border-secondary shadow-sm">
              <h3 className="font-serif text-2xl text-primary mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-secondary" />
                Common Forms of Negligence
              </h3>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li>Failure to monitor vital signs and fetal heart rate</li>
                <li>Delayed response to signs of distress</li>
                <li>Improper use of delivery instruments</li>
                <li>Failure to perform timely C-section when necessary</li>
                <li>Improper administration of medications</li>
                <li>Inadequate postpartum monitoring</li>
                <li>Failure to treat postpartum hemorrhage promptly</li>
                <li>Ignoring patient complaints and concerns</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Preeclampsia Section */}
        <section className="py-20 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 max-w-6xl">
            <h2 className="text-3xl font-serif text-primary mb-6">
              Preeclampsia and Maternal Injury
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4 text-slate-700 leading-relaxed font-light">
                <p>
                  Preeclampsia is a serious condition characterized by high blood pressure and protein in the urine during pregnancy. When not properly monitored and managed, it can lead to life-threatening complications for both mother and baby.
                </p>
                <p>
                  Medical professionals have a duty to screen for preeclampsia, monitor at-risk patients closely, and take appropriate action when symptoms appear. Failure to do so can result in eclampsia (seizures), stroke, organ damage, and even death.
                </p>
                <p>
                  If you or a loved one suffered complications from improperly managed preeclampsia, you may have a medical malpractice claim.
                </p>
              </div>
              <div className="bg-white p-8 border-l-4 border-secondary shadow-sm">
                <h3 className="font-serif text-xl text-primary mb-4">Warning Signs of Preeclampsia</h3>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Severe headaches that don't respond to treatment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Vision changes including blurred vision or light sensitivity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Upper abdominal pain, especially on the right side</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Sudden swelling in face and hands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Difficulty breathing or shortness of breath</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Hemorrhage Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 max-w-6xl">
            <h2 className="text-3xl font-serif text-primary mb-6">
              Postpartum Hemorrhage
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4 text-slate-700 leading-relaxed font-light">
                <p>
                  Postpartum hemorrhage is severe bleeding after childbirth and is one of the leading causes of maternal death worldwide. When identified and treated promptly, most cases of postpartum hemorrhage can be managed successfully.
                </p>
                <p>
                  Medical professionals must be vigilant for signs of excessive bleeding and respond quickly with appropriate interventions. Failure to recognize or properly treat postpartum hemorrhage can lead to shock, organ failure, emergency hysterectomy, and death.
                </p>
                <p>
                  If you experienced a postpartum hemorrhage that was not properly managed, resulting in serious injury, you may have a valid malpractice claim.
                </p>
              </div>
              <div className="bg-[#F9F7F5] p-8 border-l-4 border-secondary">
                <h3 className="font-serif text-xl text-primary mb-4">Risk Factors for Hemorrhage</h3>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Prolonged labor or rapid labor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Multiple pregnancies or large baby</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Placenta previa or placental abruption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Use of forceps or vacuum during delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>C-section or previous uterine surgery</span>
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
              Advocating for Mothers
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              At Thomas & Wan, we understand the physical and emotional toll that childbirth complications can take on mothers and their families. We are dedicated to helping you seek justice and compensation for your injuries.
            </p>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-10 text-xl rounded-none"
            >
              Call (713) 529-1177
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
