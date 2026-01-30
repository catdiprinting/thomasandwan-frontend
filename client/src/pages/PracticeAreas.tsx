import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Baby, Stethoscope, Brain, Activity, HeartPulse } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const practices = [
  {
    title: "Birth Injuries",
    icon: Baby,
    desc: "Birth injuries turn a moment of joy into a lifetime of challenges. We handle cases involving cerebral palsy, hypoxia, shoulder dystocia, and other preventable injuries caused by medical negligence during labor and delivery.",
    details: [
      "Cerebral Palsy",
      "Erb's Palsy",
      "Hypoxic Ischemic Encephalopathy (HIE)",
      "Shoulder Dystocia",
      "Failure to Perform C-Section"
    ]
  },
  {
    title: "Surgical Errors",
    icon: Stethoscope,
    desc: "When surgeons, anesthesiologists, or nurses make preventable mistakes in the operating room, the consequences can be fatal. We fight for patients harmed by surgical negligence.",
    details: [
      "Wrong Site Surgery",
      "Anesthesia Errors",
      "Retained Surgical Instruments",
      "Post-Operative Infections",
      "Nerve Damage"
    ]
  },
  {
    title: "Brain Injuries",
    icon: Brain,
    desc: "Traumatic brain injuries resulting from medical negligence require lifetime care. We help families secure the financial resources needed for long-term rehabilitation and support.",
    details: [
      "Anoxic Brain Injury",
      "Traumatic Brain Injury (TBI)",
      "Stroke Misdiagnosis",
      "Undiagnosed Aneurysms",
      "Medication Errors affecting the Brain"
    ]
  },
  {
    title: "Misdiagnosis",
    icon: Activity,
    desc: "Failure to diagnose a critical condition is one of the most common forms of medical malpractice. Early detection saves lives, and when doctors miss the signs, we hold them accountable.",
    details: [
      "Cancer Misdiagnosis",
      "Heart Attack Misdiagnosis",
      "Stroke Misdiagnosis",
      "Meningitis Misdiagnosis",
      "Sepsis Misdiagnosis"
    ]
  },
  {
    title: "Wrongful Death",
    icon: HeartPulse,
    desc: "Losing a loved one due to medical carelessness is a tragedy no family should endure. We provide compassionate yet aggressive representation for families seeking justice for wrongful death.",
    details: [
      "Fatal Medication Errors",
      "Surgical Fatalities",
      "Failure to Rescue",
      "Emergency Room Negligence",
      "Fatal Misdiagnosis"
    ]
  }
];

export default function PracticeAreasPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-secondary/5 skew-x-12 transform origin-bottom -translate-x-1/4" />
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl lg:pl-8 xl:pl-16"
            >
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                  Our Expertise
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                Specializing in Complex <br/>
                <span className="text-secondary italic">Medical Malpractice</span> Cases
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                We don't handle car accidents or divorces. Our sole focus is mastering the complex realm of medical malpractice to win for you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-serif text-primary mb-6">Why Specialization Matters</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light mb-8">
                Medical malpractice law is highly technical and requires a deep understanding of both medicine and the legal system. 
                General practice attorneys often lack the specific resources and knowledge needed to challenge large hospitals and insurance companies.
                At Thomas & Wan, we have dedicated our entire careers to this specific field.
              </p>
            </div>
          </div>
        </section>

        {/* Practice Areas Grid */}
        <section className="py-24 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="space-y-24">
              {practices.map((area, idx) => (
                <div key={idx} id={area.title.toLowerCase().replace(/\s+/g, '-')} className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center text-secondary">
                        <area.icon className="w-8 h-8" />
                      </div>
                      <h2 className="text-4xl font-serif text-primary">{area.title}</h2>
                    </div>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                      {area.desc}
                    </p>
                    <div className="bg-white p-8 border-l-4 border-secondary shadow-sm">
                      <h4 className="font-bold text-primary mb-4 uppercase tracking-wide text-sm">Common Cases We Handle</h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {area.details.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-600">
                            <ArrowRight className="w-4 h-4 text-secondary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={idx % 2 === 1 ? 'lg:col-start-1' : ''}>
                    {/* Placeholder for practice area specific image - creating a styled colored block for now */}
                    <div className="aspect-[4/3] bg-white p-4 shadow-xl rotate-1 relative group">
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-muted-foreground/30 font-serif italic text-2xl">
                          {area.title} Representation
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-white py-24 text-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Not Sure If You Have a Case?</h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Medical malpractice cases are complex. Let our team review your medical records to determine if negligence occurred.
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-10 text-xl rounded-none">
              Request Free Case Review
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
