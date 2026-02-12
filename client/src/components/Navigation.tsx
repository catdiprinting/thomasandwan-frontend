import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Stethoscope, Baby, HeartPulse, Brain, Scissors, Pill, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const casesSubmenu = [
  { name: "Medical Malpractice", href: "/cases-we-handle/medical-malpractice", icon: Stethoscope, desc: "Negligent care by doctors and hospitals" },
  { name: "Birth Injuries", href: "/cases-we-handle/birth-injuries", icon: Baby, desc: "Injuries during labor and delivery" },
  { name: "Complications of Childbirth", href: "/cases-we-handle/complications-of-childbirth", icon: HeartPulse, desc: "Preventable maternal and infant harm" },
  { name: "Brain Injuries", href: "/cases-we-handle/brain-injuries", icon: Brain, desc: "Traumatic and acquired brain damage" },
  { name: "Surgical Errors", href: "/cases-we-handle/surgical-errors", icon: Scissors, desc: "Wrong-site, retained instruments, and more" },
  { name: "Medication Errors", href: "/cases-we-handle/medication-errors", icon: Pill, desc: "Dosage mistakes and drug interactions" },
  { name: "Misdiagnosis", href: "/cases-we-handle/misdiagnosis", icon: Search, desc: "Delayed, missed, or incorrect diagnoses" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [casesOpen, setCasesOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-thomas-wan-llp" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact-us" },
  ];

  const isCasesActive = location.startsWith("/cases-we-handle");

  return (
    <div className={cn("fixed top-0 w-full z-50 transition-all duration-300", scrolled ? "shadow-md" : "")}>
      
      {/* Mobile Utility Bar */}
      <div className="bg-primary text-white py-2 text-sm border-b border-white/10 md:hidden">
        <div className="container mx-auto px-4 flex justify-center">
          <a href="tel:713-529-1177" className="flex items-center gap-2 font-bold text-base">
            <Phone className="w-5 h-5 text-secondary" />
            <span>(713) 529-1177</span>
          </a>
        </div>
      </div>

      {/* Desktop Utility Bar */}
      <div className="bg-primary text-white py-2 text-sm border-b border-white/10 hidden md:block">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/contact-us">
              <span className="bg-secondary hover:bg-secondary/90 text-white font-bold px-4 py-1.5 uppercase tracking-wider text-xs cursor-pointer transition-colors">
                Free Case Review
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
               <MapPin className="w-3 h-3 text-secondary" />
               <span className="tracking-wide">Houston, TX</span>
             </div>
             <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
               <Mail className="w-3 h-3 text-secondary" />
               <a href="mailto:info@thomasandwan.com" className="tracking-wide hover:text-secondary transition-colors">info@thomasandwan.com</a>
             </div>
             <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
               <Phone className="w-3 h-3 text-secondary" />
               <a href="tel:713-529-1177" className="tracking-wide hover:text-secondary transition-colors">(713) 529-1177</a>
             </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={cn(
          "bg-white transition-all duration-300 border-b border-gray-100",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/">
            <span className="flex items-center gap-2 cursor-pointer">
              <img 
                src="/images/logo.webp" 
                alt="Thomas & Wan" 
                className="w-auto h-10 md:h-12 object-contain"
              />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Home and About */}
            {navLinks.slice(0, 2).map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={cn(
                    "text-base font-medium tracking-wide uppercase transition-colors hover:text-secondary relative group cursor-pointer",
                    location === link.href ? "text-secondary" : "text-primary"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                    location === link.href ? "scale-x-100" : ""
                  )} />
                </span>
              </Link>
            ))}

            {/* Cases We Handle Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setCasesOpen(true)}
              onMouseLeave={() => setCasesOpen(false)}
            >
              <Link href="/cases-we-handle">
                <span
                  className={cn(
                    "text-base font-medium tracking-wide uppercase transition-colors hover:text-secondary relative group cursor-pointer flex items-center gap-1",
                    isCasesActive ? "text-secondary" : "text-primary"
                  )}
                >
                  Cases We Handle
                  <ChevronDown className={cn("w-4 h-4 transition-transform", casesOpen ? "rotate-180" : "")} />
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                    isCasesActive ? "scale-x-100" : ""
                  )} />
                </span>
              </Link>
              
              {/* Mega Menu Panel */}
              <div className={cn(
                "absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-200 w-screen",
                casesOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
              )}>
                <div className="bg-white shadow-2xl border-t-4 border-secondary">
                  <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-12 gap-8">
                      <div className="col-span-9">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Practice Areas</h3>
                          <Link href="/cases-we-handle">
                            <span className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-secondary/80 cursor-pointer flex items-center gap-1">
                              View All Cases <ArrowRight className="w-3 h-3" />
                            </span>
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-1">
                          {casesSubmenu.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link key={item.name} href={item.href}>
                                <span
                                  className={cn(
                                    "flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer group",
                                    location === item.href
                                      ? "bg-secondary/10"
                                      : "hover:bg-slate-50"
                                  )}
                                  onClick={() => setCasesOpen(false)}
                                >
                                  <span className={cn(
                                    "mt-0.5 p-2 rounded-lg shrink-0 transition-colors",
                                    location === item.href
                                      ? "bg-secondary text-white"
                                      : "bg-primary/5 text-primary group-hover:bg-secondary/10 group-hover:text-secondary"
                                  )}>
                                    <Icon className="w-4 h-4" />
                                  </span>
                                  <span>
                                    <span className={cn(
                                      "block text-sm font-semibold transition-colors",
                                      location === item.href ? "text-secondary" : "text-primary group-hover:text-secondary"
                                    )}>
                                      {item.name}
                                    </span>
                                    <span className="block text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</span>
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      <div className="col-span-3 border-l border-gray-100 pl-8">
                        <div className="bg-primary rounded-xl p-6 text-white h-full flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif text-lg mb-2">Need Legal Help?</h4>
                            <p className="text-white/70 text-sm leading-relaxed">
                              Get a free case review from our experienced medical malpractice attorneys.
                            </p>
                          </div>
                          <div className="mt-4 space-y-2">
                            <a
                              href="tel:713-529-1177"
                              className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-lg transition-colors w-full"
                            >
                              <Phone className="w-3.5 h-3.5" /> (713) 529-1177
                            </a>
                            <Link href="/contact-us">
                              <span
                                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-lg transition-colors w-full cursor-pointer"
                                onClick={() => setCasesOpen(false)}
                              >
                                Free Consultation
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rest of nav links */}
            {navLinks.slice(2).map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={cn(
                    "text-base font-medium tracking-wide uppercase transition-colors hover:text-secondary relative group cursor-pointer",
                    location === link.href ? "text-secondary" : "text-primary"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                    location === link.href ? "scale-x-100" : ""
                  )} />
                </span>
              </Link>
            ))}
            <Link href="/contact-us">
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-none px-6">
                Free Case Review
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border p-4 shadow-lg flex flex-col gap-2 animate-in slide-in-from-top-5 max-h-[80vh] overflow-y-auto">
            <Link href="/">
              <span
                className="text-primary font-medium text-lg py-3 border-b border-gray-100 block cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Home
              </span>
            </Link>
            <Link href="/about-thomas-wan-llp">
              <span
                className="text-primary font-medium text-lg py-3 border-b border-gray-100 block cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                About
              </span>
            </Link>
            
            {/* Mobile Cases Dropdown */}
            <div className="border-b border-gray-100">
              <button
                className="text-primary font-medium text-lg py-3 w-full text-left flex items-center justify-between"
                onClick={() => setMobileSubOpen(!mobileSubOpen)}
              >
                Cases We Handle
                <ChevronDown className={cn("w-5 h-5 transition-transform", mobileSubOpen ? "rotate-180" : "")} />
              </button>
              {mobileSubOpen && (
                <div className="pb-3 space-y-0.5">
                  <Link href="/cases-we-handle">
                    <span
                      className={cn(
                        "flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold cursor-pointer",
                        location === "/cases-we-handle" ? "text-secondary bg-secondary/10" : "text-primary"
                      )}
                      onClick={() => { setIsOpen(false); setMobileSubOpen(false); }}
                    >
                      <ArrowRight className="w-4 h-4 text-secondary" /> View All Cases
                    </span>
                  </Link>
                  {casesSubmenu.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.name} href={item.href}>
                        <span
                          className={cn(
                            "flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer",
                            location === item.href ? "bg-secondary/10" : ""
                          )}
                          onClick={() => { setIsOpen(false); setMobileSubOpen(false); }}
                        >
                          <span className={cn(
                            "p-1.5 rounded-md shrink-0",
                            location === item.href ? "bg-secondary text-white" : "bg-primary/5 text-primary"
                          )}>
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <span>
                            <span className={cn(
                              "block text-sm font-medium",
                              location === item.href ? "text-secondary" : "text-primary"
                            )}>{item.name}</span>
                            <span className="block text-xs text-slate-500">{item.desc}</span>
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {navLinks.slice(2).map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className="text-primary font-medium text-lg py-3 border-b border-gray-100 block cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </span>
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-2">
               <a href="tel:713-529-1177" className="flex items-center gap-2 text-primary font-medium text-lg">
                 <Phone className="w-5 h-5 text-secondary" /> (713) 529-1177
               </a>
               <a href="mailto:info@thomasandwan.com" className="flex items-center gap-2 text-primary font-medium text-lg">
                 <Mail className="w-5 h-5 text-secondary" /> info@thomasandwan.com
               </a>
            </div>
            <Link href="/contact-us" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-none mt-2">
                Free Consultation
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
