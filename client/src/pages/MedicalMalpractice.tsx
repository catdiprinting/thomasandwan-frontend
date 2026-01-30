import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, AlertTriangle, Brain, Activity, HeartPulse } from "lucide-react";
import { Link } from "wouter";

export default function MedicalMalpracticePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary text-white">
          <div className="relative z-10 container mx-auto px-4 md:px-6 py-24 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 max-w-xl"
            >
              <div className="inline-flex items-center gap-2 border-b-2 border-secondary pb-1">
                <Stethoscope className="w-5 h-5 text-secondary" />
                <span className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm">
                  Cases We Handle
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
                Medical Malpractice
              </h1>
              <p className="text-lg md:text-xl text-white/85 font-light leading-relaxed">
                Experts estimate that as many as 200,000 people die in any given year in hospitals due to medical errors, poor decision-making, and negligence.
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
              When you visit a doctor, hospital, or clinic, you trust that the medical professionals caring for you will provide competent, safe treatment. Unfortunately, medical errors are far more common than most people realize. Experts estimate that as many as 200,000 people die in any given year in hospitals due to medical errors, poor decision-making, and negligence.
            </p>
            <p>
              At Thomas & Wan, we have dedicated our careers to holding grossly negligent hospitals, doctors, nurses, and other medical professionals accountable for their actions. We understand the complex medical and legal issues involved in malpractice cases and have the experience to fight for your rights.
            </p>
            <p>
              If you or a loved one has been injured due to medical negligence, we are here to help you seek justice and fair compensation.
            </p>
          </div>
        </section>

        {/* Types of Malpractice */}
        <section className="py-20 bg-[#F9F7F5] border-y border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
              Types of Medical Malpractice We Handle
            </h2>
            <p className="text-slate-700 mb-8 leading-relaxed">
              Our attorneys have extensive experience representing patients and families in a wide range of medical malpractice cases.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-700">
              {[
                "Surgical errors and wrong-site surgery",
                "Anesthesia errors",
                "Medication errors",
                "Misdiagnosis or delayed diagnosis",
                "Failure to treat",
                "Emergency room negligence",
                "Hospital-acquired infections",
                "Nursing home negligence",
                "Radiology and laboratory errors",
                "Cancer misdiagnosis",
                "Stroke misdiagnosis",
                "Heart attack misdiagnosis",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Practice Areas */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <h2 className="text-3xl font-serif text-primary mb-8">Related Practice Areas</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/practice-areas/birth-injuries">
                <a className="group bg-[#F9F7F5] p-8 border-l-4 border-secondary hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-6 h-6 text-secondary" />
                    <h3 className="font-serif text-xl text-primary group-hover:text-secondary transition-colors">Birth Injuries</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    Representing families whose babies were injured during labor and delivery due to medical negligence.
                  </p>
                  <span className="text-secondary font-bold text-sm flex items-center gap-1">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </Link>
              <Link href="/practice-areas/childbirth-complications">
                <a className="group bg-[#F9F7F5] p-8 border-l-4 border-secondary hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <HeartPulse className="w-6 h-6 text-secondary" />
                    <h3 className="font-serif text-xl text-primary group-hover:text-secondary transition-colors">Childbirth Complications</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    Advocating for mothers who suffered injuries during childbirth due to malpractice.
                  </p>
                  <span className="text-secondary font-bold text-sm flex items-center gap-1">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </Link>
              <div className="bg-[#F9F7F5] p-8 border-l-4 border-secondary">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-secondary" />
                  <h3 className="font-serif text-xl text-primary">Brain Injuries</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Representing victims of brain injuries caused by medical negligence, anesthesia errors, and more.
                </p>
                <Link href="/practice-areas">
                  <a className="text-secondary font-bold text-sm flex items-center gap-1">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Surgical Errors */}
        <section className="py-20 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-serif text-primary mb-6">Surgical Errors</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4 font-light">
                Surgical errors are among the most serious forms of medical malpractice. When surgeons, anesthesiologists, or surgical staff make preventable mistakes, the consequences can be devastating and sometimes fatal.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4 font-light">
                We have represented numerous patients who have suffered harm due to surgical negligence, including wrong-site surgery, retained surgical instruments, nerve damage, and post-operative infections.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                Hospitals and surgical teams are required to follow strict safety protocols to prevent surgical errors. When they fail to do so, they must be held accountable.
              </p>
            </div>
            <div className="bg-white p-8 border-l-4 border-secondary shadow-sm">
              <h3 className="font-serif text-2xl text-primary mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-secondary" />
                Common Surgical Errors
              </h3>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li>Wrong-site surgery (operating on wrong body part)</li>
                <li>Wrong-patient surgery</li>
                <li>Retained surgical instruments or sponges</li>
                <li>Anesthesia errors and complications</li>
                <li>Nerve or organ damage during surgery</li>
                <li>Post-operative infections due to unsanitary conditions</li>
                <li>Failure to recognize and treat surgical complications</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Misdiagnosis */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <h2 className="text-3xl font-serif text-primary mb-6">
              Misdiagnosis and Delayed Diagnosis
            </h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4 text-slate-700 leading-relaxed font-light">
                <p>
                  Failure to diagnose a critical condition is one of the most common forms of medical malpractice. Early detection of serious illnesses like cancer, heart disease, and stroke can mean the difference between life and death.
                </p>
                <p>
                  When doctors miss the signs of a serious condition or misinterpret test results, patients may not receive the treatment they need until it is too late. Delayed diagnosis can allow a treatable condition to progress to an advanced, potentially fatal stage.
                </p>
                <p>
                  If you or a loved one suffered harm because a doctor failed to diagnose a serious condition in a timely manner, you may have grounds for a medical malpractice lawsuit.
                </p>
              </div>
              <div className="bg-[#F9F7F5] p-8 border-l-4 border-secondary">
                <h3 className="font-serif text-xl text-primary mb-4">Commonly Misdiagnosed Conditions</h3>
                <ul className="space-y-3 text-slate-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Cancer (especially breast, lung, and colon cancer)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Heart attack and heart disease</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Stroke</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Meningitis and other infections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Appendicitis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span>Pulmonary embolism</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Deadlines */}
        <section className="py-16 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h2 className="text-3xl font-serif text-primary mb-4">
              Important Deadlines Apply
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              In Texas, there are strict deadlines for filing a medical malpractice lawsuit. If you wait too long, you may lose your right to seek compensation. Don't delay in seeking legal advice.
            </p>
            <p className="text-secondary font-bold text-lg">
              Call us today for a free consultation to discuss your legal options.
            </p>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-primary text-white py-24 text-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Call Us Now For a Free Consultation
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Call us today for a free consultation. We will discuss what your legal options are for your medical malpractice case. If you have the medical records, you can send them to us for a free review with no obligation to you.
            </p>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-10 text-xl rounded-none"
            >
              Call Today & Don't Delay
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
