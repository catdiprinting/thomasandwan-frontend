import { motion } from "framer-motion";
import { AlertCircle, Heart, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SEO, { createPracticeAreaSchema } from "@/components/SEO";
import { usePracticeAreaData, cms } from "@/hooks/useCmsData";

const complications = [
  "Preeclampsia and eclampsia",
  "Obstetrical complications for the mother or obstetrical nurse negligence",
  "C-section injuries",
  "Postpartum hemorrhage",
  "Infections",
  "Prolapsed umbilical cord",
  "Failure to monitor the infant",
  "Vaginal tears",
  "Ruptured uterus",
  "Abruptio placenta",
  "Cephalopelvic disproportion",
  "Delivery trauma or improper resuscitation of the baby",
  "Other pregnancy-related negligence"
];

export default function ComplicationsOfChildbirth() {
  const { data: d } = usePracticeAreaData("complications-of-childbirth");
  const schema = createPracticeAreaSchema(
    "Childbirth Complications Lawyers",
    "Houston attorneys representing mothers injured during pregnancy and childbirth due to medical negligence. Preeclampsia, C-section injuries, postpartum hemorrhage cases.",
    "https://thomasandwan.com/cases-we-handle/complications-of-childbirth"
  );

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <SEO 
        title="Complications of Childbirth Lawyers in Houston"
        description="Texas attorneys at Thomas & Wan represent mothers who suffered injuries due to medical negligence during pregnancy and childbirth. Free consultation."
        canonical="https://thomasandwan.com/cases-we-handle/complications-of-childbirth"
        schema={schema}
      />
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 transform origin-top translate-x-1/4" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                  Cases We Handle
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                {cms(d, "paTitle", "Complications of Childbirth")}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                {cms(d, "paIntro", "At Thomas & Wan, we have helped families dealing with the devastating loss of a mother or serious permanent brain damage due to gross negligence during pregnancy and childbirth.")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {cms(d, "paSidebarText", "For an expectant mother, childbirth is an exciting and nerve-wracking time. Most of the time, doctors, midwives and nurses do an excellent job of keeping mom and baby safe during labor and delivery.")}
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Sometimes, however, medical providers can be grossly negligent in their medical care to the laboring mother. Thomas & Wan represent mothers who have been injured or made ill due to malpractice by a doctor, midwife, nurse or other health care professional during pregnancy, labor and delivery, or after delivery.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="/images/complications-childbirth.jpg" 
                  alt="Pregnant woman receiving medical care" 
                  className="w-full rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-secondary/20 rounded-lg -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Types of Complications */}
        <section className="py-20 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-serif text-primary mb-4 text-center">
              Cases We Handle
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              We represent mothers and families in cases involving:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {complications.map((complication, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-primary font-medium">{complication}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Heart className="w-16 h-16 text-secondary mx-auto mb-6" />
              <h2 className="text-3xl font-serif text-primary mb-6">
                We're Here to Help Your Family
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                At Thomas & Wan, we have helped families dealing with the devastating loss of a mother or serious permanent brain damage due to gross negligence during pregnancy and childbirth. Please contact us today for a free and candid consultation.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">{cms(d, "paCtaHeading", "Call Us Now For a Free Consultation")}</h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              {cms(d, "paCtaText", "Call us today for a free consultation—we will discuss what your legal options are for your medical malpractice case. If you have the medical records, you can send them to us for a free review with no obligation to you. Remember, in Texas there are strict deadlines for filing a medical malpractice lawsuit.")}
            </p>
            <Link href="/contact-us">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-10 text-xl rounded-none">
                Free Case Review
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
