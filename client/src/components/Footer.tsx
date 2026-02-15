import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";

const practiceAreaLinks = [
  { name: "Medical Malpractice", href: "/cases-we-handle/medical-malpractice" },
  { name: "Birth Injuries", href: "/cases-we-handle/birth-injuries" },
  { name: "Brain Injuries", href: "/cases-we-handle/brain-injuries" },
  { name: "Surgical Errors", href: "/cases-we-handle/surgical-errors" },
  { name: "Medication Errors", href: "/cases-we-handle/medication-errors" },
  { name: "Misdiagnosis", href: "/cases-we-handle/misdiagnosis" },
  { name: "Complications of Childbirth", href: "/cases-we-handle/complications-of-childbirth" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About the Firm", href: "/about-thomas-wan-llp" },
  { name: "Cases We Handle", href: "/cases-we-handle" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-28 md:pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          <div className="space-y-6">
            <div>
              <img
                src="/images/logo.webp"
                alt="Thomas & Wan LLP - Houston Medical Malpractice Lawyers"
                className="h-12 md:h-14 w-auto object-contain mb-4 invert brightness-0 grayscale opacity-90"
              />
              <p className="text-secondary font-alt text-xl italic">Attorneys at Law</p>
            </div>
            <p className="text-white/80 leading-relaxed text-sm">
              Thomas & Wan is a Houston-based, women-owned medical malpractice law firm with over 60 years of combined experience. We work on a contingency basis — you only pay if we win.
            </p>
          </div>

          <div>
            <h4 className="text-secondary font-bold uppercase tracking-widest text-xs mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              {practiceAreaLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-secondary transition-colors text-sm" data-testid={`footer-link-${link.href.split('/').pop()}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-secondary font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-secondary transition-colors text-sm" data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-secondary font-bold uppercase tracking-widest text-xs mb-6">Contact Us</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <a href="tel:713-529-1177" className="text-white hover:text-secondary transition-colors font-bold" data-testid="footer-phone">
                    (713) 529-1177
                  </a>
                  <p className="text-white/50 text-xs mt-1">Available 24/7 for emergencies</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <a href="mailto:info@thomasandwan.com" className="text-white/70 hover:text-secondary transition-colors text-sm" data-testid="footer-email">
                  info@thomasandwan.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="text-white/70 text-sm">
                  <p>1710 Sunset Blvd</p>
                  <p>Houston, TX 77005</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="text-white/70 text-sm">
                  <p>Mon – Fri: 8:00 AM – 6:00 PM</p>
                  <p>Weekends: By Appointment</p>
                </div>
              </div>
            </div>

            <Link href="/contact-us" className="inline-block w-full text-center bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 uppercase tracking-widest text-xs transition-colors mt-4" data-testid="footer-cta">
              Free Case Review
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50 gap-4">
          <p>&copy; {new Date().getFullYear()} Thomas & Wan, LLP. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="/sitemap.xml" className="hover:text-white transition-colors">Site Map</a>
            <span className="text-white/30">|</span>
            <span>Houston Medical Malpractice Lawyers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
