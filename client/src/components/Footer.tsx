import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-28 md:pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 mb-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <img 
                src="/images/logo.webp" 
                alt="Thomas & Wan" 
                className="h-12 md:h-14 w-auto object-contain mb-4 invert brightness-0 grayscale opacity-90"
              />
              <p className="text-secondary font-alt text-xl italic">Attorneys at Law</p>
            </div>
            
            <p className="text-white/80 max-w-md leading-relaxed">
              We work on a contingency basis. This means you only pay a percentage 
              for our services if we win a verdict or settlement for your family.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-secondary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Phone</h4>
                  <p className="text-white/70">713-529-1177</p>
                  <p className="text-white/50 text-sm">Available 24/7 for emergencies</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-secondary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Office</h4>
                  <p className="text-white/70">
                    1710 Sunset Blvd<br/>
                    Houston, TX 77005
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-secondary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Hours</h4>
                  <p className="text-white/70">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-white/70">Weekends: By Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-serif mb-6">Request Free Consultation</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-xs uppercase tracking-widest text-secondary font-bold">First Name</label>
                   <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-secondary" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs uppercase tracking-widest text-secondary font-bold">Last Name</label>
                   <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-secondary" />
                </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-secondary font-bold">Email</label>
                 <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-secondary" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs uppercase tracking-widest text-secondary font-bold">Message</label>
                 <Textarea className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus-visible:ring-secondary min-h-[120px]" />
              </div>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-6 text-lg">
                Free Case Review
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>© {new Date().getFullYear()} Thomas & Wan, LLP. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
            <a href="#" className="hover:text-white transition-colors">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
