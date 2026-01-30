import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-secondary/5 rounded-full blur-3xl transform translate-x-1/3" />
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl lg:pl-8 xl:pl-16"
            >
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                  Get In Touch
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                Start Your Journey to <br/>
                <span className="text-secondary italic">Justice</span> Today
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                We are available 24/7 to hear your story. Your consultation is free, confidential, and comes with no obligation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Left Column: Info */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-4xl font-serif text-primary mb-6">Contact Us</h2>
                  <p className="text-lg text-slate-600 leading-relaxed font-light">
                    If you believe you or a loved one has been a victim of medical malpractice, do not wait. strict deadlines apply to these cases in Texas. Contact us immediately for a review of your case.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-full shrink-0">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-xl mb-2">Phone</h4>
                      <p className="text-slate-600 mb-1">Available 24/7 for new cases</p>
                      <a href="tel:713-529-1177" className="text-2xl font-serif text-primary hover:text-secondary transition-colors">
                        (713) 529-1177
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-full shrink-0">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-xl mb-2">Office Location</h4>
                      <p className="text-slate-600 leading-relaxed">
                        1710 Sunset Blvd<br/>
                        Houston, TX 77005
                      </p>
                      <a href="#" className="text-sm font-bold uppercase tracking-wide text-secondary hover:text-primary mt-2 inline-block">
                        Get Directions
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-full shrink-0">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-xl mb-2">Email</h4>
                      <p className="text-slate-600 mb-1">For general inquiries</p>
                      <a href="mailto:info@thomasandwan.com" className="text-lg text-primary hover:text-secondary transition-colors">
                        info@thomasandwan.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F9F7F5] p-8 border-l-4 border-secondary">
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-secondary" /> Office Hours
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-slate-600">
                    <div>Monday - Friday</div>
                    <div>8:00 AM - 6:00 PM</div>
                    <div>Saturday - Sunday</div>
                    <div>By Appointment</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="bg-white p-8 md:p-12 shadow-2xl border border-gray-100">
                <h3 className="text-3xl font-serif text-primary mb-8">Free Case Evaluation</h3>
                <ContactForm variant="default" showCaseType={true} />
              </div>

            </div>
          </div>
        </section>

        {/* Map Section Placeholder */}
        <section className="h-[400px] bg-gray-200 flex items-center justify-center">
           <div className="text-center">
             <MapPin className="w-12 h-12 text-secondary mx-auto mb-4" />
             <h3 className="text-2xl font-serif text-primary">Interactive Map Loading...</h3>
             <p className="text-muted-foreground">1710 Sunset Blvd, Houston, TX 77005</p>
           </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
