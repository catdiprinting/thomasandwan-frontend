import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, Quote, MessageSquare } from "lucide-react";

const testimonials = [
  {
    name: "Alyssa",
    text: "I had a hard time coming to the terms with what happened to my baby at birth..and as I was looking thru and for a Medical Mal Practice attorney and her face was so welcoming I loved what I read and how long she has been an attorney. our first meet and greet I was anxious and emotional and she had a comfortable vibe in her tone of voice..her concern about what’s happened..and her smile… I instantly relaxed and what helped me thru my childbirth complications was she said it wasn't my fault."
  },
  {
    name: "Lisa A",
    text: "Thomas & Wan did a great job representing me and my family against the owner of our apartment complex. We have just moved in when our daughter was shot in the head by a stray bullet while she was sleeping in her bed. It was a miracle she survived. The lawyers at Thomas & Wan went to work right away and through research found out that there had been five murders at that complex the year before. They also found out that the complex didn’t hire security to patrol at night. They were aggressive and fought hard for us."
  },
  {
    name: "Lauren",
    text: "After being abandoned by my original lawyer who was greedy for money, Linda was a TRUE answer to my prayers. She is after JUSTICE, not money. She has spent COUNTLESS hours researching my case and asking just the right questions. She has the heart of a saint; she really cares about her clients and it shows. I have emailed her outside of our visits asking for updates or just addressing concerns I have, and she answers right away. I also have been very anxious and stressed with my case."
  },
  {
    name: "Rogelio L",
    text: "Linda and Michelle represented me when I was hurt at a refinery. I had tried using a different lawyer, but he never returned my calls or talked to me. Linda and Michelle did a good job and they care about your case."
  },
  {
    name: "Stephanie S",
    text: "Thomas & Wan represented my baby who was seriously harmed by nurses at a hospital who did not know what they were doing. Linda and Michelle were able to guide us through what to do in getting help for my baby for the rest of his life."
  },
  {
    name: "Houston Chronicle",
    date: "July 5, 2018",
    text: "After a heart transplant in August 2016, Ernest “Chris” Keys can’t talk or walk. The Houston hospital is under pressure for the quality of its once-renowned heart program. Now it is being sued by Mr. Keys’s family."
  }
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-y-12 transform origin-bottom translate-x-1/4" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                  Client Stories
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                Voices of <br/>
                <span className="text-secondary italic">Justice & Hope</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                Don't just take our word for it. Read what our clients have to say about their experience working with Thomas & Wan to secure their family's future.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-secondary fill-current" />
                  ))}
                </div>
              </div>
              <h2 className="text-4xl font-serif text-primary mb-6">Trusted by Families Across Texas</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                We measure our success not just in verdicts won, but in the lives we've helped rebuild. 
                Our clients come to us during the most difficult times of their lives, and we are honored to stand by their side.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-24 bg-[#F9F7F5]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 relative group border-t-4 border-secondary">
                  <Quote className="w-10 h-10 text-secondary/20 absolute top-8 right-8" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-secondary fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-lg text-slate-600 leading-relaxed mb-8 font-light italic relative z-10">
                    "{t.text}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary font-serif font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-primary font-serif text-lg">{t.name}</div>
                      {t.date && <div className="text-xs text-muted-foreground uppercase tracking-widest">{t.date}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review Platforms */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-serif text-2xl text-primary mb-12">See More Reviews On</h3>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               <div className="flex items-center gap-2">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="h-8 w-8" />
                 <span className="font-bold text-xl text-slate-600">Google Reviews</span>
               </div>
               {/* Since we don't have real logos for other platforms handy, we'll use text representations for mockup */}
               <div className="flex items-center gap-2">
                 <MessageSquare className="h-8 w-8 text-[#0077B5]" />
                 <span className="font-bold text-xl text-slate-600">Avvo</span>
               </div>
               <div className="flex items-center gap-2">
                 <Star className="h-8 w-8 text-[#f4c41e] fill-current" />
                 <span className="font-bold text-xl text-slate-600">SuperLawyers</span>
               </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-white py-24 text-center">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Let Us Fight for Your Family Too</h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              If you or a loved one has suffered due to medical negligence, we are here to listen.
              Contact us today for a free, confidential consultation.
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-8 px-10 text-xl rounded-none">
              Share Your Story With Us
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
