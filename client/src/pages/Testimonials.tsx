import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SEO, { createReviewSchema } from "@/components/SEO";
import { useWordPressPage } from "@/hooks/useWordPressPage";

const testimonials = [
  {
    quote: "After a heart transplant in August 2016, Ernest \"Chris\" Keys can't talk or walk. The Houston hospital is under pressure for the quality of its once-renowned heart program. Now it is being sued by Mr. Keys's family.",
    author: "Houston Chronicle",
    initial: "H",
    date: "July 5, 2018"
  },
  {
    quote: "Thomas & Wan represented my baby who was seriously harmed by nurses at a hospital who did not know what they were doing. Linda and Michelle were able to guide us through what to do in getting help for my baby for the rest of his life.",
    author: "Stephanie S",
    initial: "S"
  },
  {
    quote: "Linda and Michelle represented me when I was hurt at a refinery. I had tried using a different lawyer, but he never returned my calls or talked to me. Linda and Michelle did a good job and they care about your case.",
    author: "Rogelio L",
    initial: "R"
  },
  {
    quote: "After being abandoned by my original lawyer who was greedy for money, Linda was a TRUE answer to my prayers. She is after JUSTICE, not money. She has spent COUNTLESS hours researching my case and asking just the right questions. She has the heart of a saint; she really cares about her clients and it shows. I have emailed her outside of our visits asking for updates or just addressing concerns I have, and she answers right away. I also have been very anxious and stressed with my case.",
    author: "Lauren",
    initial: "L"
  },
  {
    quote: "Thomas & Wan did a great job representing me and my family against the owner of our apartment complex. We have just moved in when our daughter was shot in the head by a stray bullet while she was sleeping in her bed. It was a miracle she survived. The lawyers at Thomas & Wan went to work right away and through research found out that there had been five murders at that complex the year before. They also found out that the complex didn't hire security to patrol at night. They were aggressive and fought hard for us.",
    author: "Lisa A",
    initial: "L"
  },
  {
    quote: "I had a hard time coming to the terms with what happened to my baby at birth..and as I was looking thru and for a Medical Mal Practice attorney and her face was so welcoming I loved what I read and how long she has been an attorney. our first meet and greet I was anxious and emotional and she had a comfortable vibe in her tone of voice..her concern about what's happened..and her smile… I instantly relaxed and what helped me thru my childbirth complications was she said it wasn't my fault.",
    author: "Alyssa",
    initial: "A"
  }
];

export default function Testimonials() {
  const { data: wpPage } = useWordPressPage("testimonials");

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <SEO 
        title="Client Testimonials"
        description="Read what our clients say about Thomas & Wan. Real reviews from families we've represented in medical malpractice, birth injury, and negligence cases in Houston, TX."
        canonical="https://thomasandwan.com/testimonials"
        schema={createReviewSchema(testimonials)}
      />
      <Navigation />
      
      <main className="pt-20">
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
                  Client Stories
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                {wpPage ? (
                  <span dangerouslySetInnerHTML={{ __html: wpPage.title.rendered }} />
                ) : (
                  <>Voices of <br/><span className="text-secondary italic">Justice & Hope</span></>
                )}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                Don't just take our word for it. Read what our clients have to say about their experience working with Thomas & Wan.
              </p>
            </motion.div>
          </div>
        </section>

        {wpPage ? (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto wp-content" dangerouslySetInnerHTML={{ __html: wpPage.content.rendered }} />
            </div>
          </section>
        ) : (
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-[#F9F7F5] p-8 relative"
                  >
                    <div className="absolute top-6 right-6">
                      <Quote className="w-10 h-10 text-secondary/20" />
                    </div>
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                      ))}
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed mb-6 text-lg italic">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-serif text-xl">
                        {testimonial.initial}
                      </div>
                      <div>
                        <p className="font-bold text-primary">{testimonial.author}</p>
                        {testimonial.date && (
                          <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Let Us Fight for Your Family Too</h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              If you or a loved one has suffered due to medical negligence, we are here to listen. Contact us today for a free, confidential consultation.
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
