import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const casesSubmenu = [
  { name: "All Cases", href: "/cases-we-handle" },
  { name: "Medical Malpractice", href: "/cases-we-handle/medical-malpractice" },
  { name: "Birth Injuries", href: "/cases-we-handle/birth-injuries" },
  { name: "Complications of Childbirth", href: "/cases-we-handle/complications-of-childbirth" },
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
                Free Consultation
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

            {/* Cases We Handle Dropdown */}
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
              
              {/* Dropdown Menu */}
              <div className={cn(
                "absolute top-full left-0 pt-2 transition-all duration-200",
                casesOpen ? "opacity-100 visible" : "opacity-0 invisible"
              )}>
                <div className="bg-white shadow-xl border border-gray-100 min-w-[280px]">
                  {casesSubmenu.map((item, index) => (
                    <Link key={item.name} href={item.href}>
                      <span
                        className={cn(
                          "block px-5 py-3 text-sm font-medium transition-colors cursor-pointer border-l-2",
                          location === item.href 
                            ? "bg-secondary/10 text-secondary border-secondary" 
                            : "text-primary hover:bg-gray-50 hover:text-secondary border-transparent hover:border-secondary"
                        )}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
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
            <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-none px-6">
              Free Case Review
            </Button>
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
                className="text-primary font-medium text-lg py-2 border-b border-gray-100 block cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Home
              </span>
            </Link>
            <Link href="/about-thomas-wan-llp">
              <span
                className="text-primary font-medium text-lg py-2 border-b border-gray-100 block cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                About
              </span>
            </Link>
            
            {/* Mobile Cases Dropdown */}
            <div className="border-b border-gray-100">
              <button
                className="text-primary font-medium text-lg py-2 w-full text-left flex items-center justify-between"
                onClick={() => setMobileSubOpen(!mobileSubOpen)}
              >
                Cases We Handle
                <ChevronDown className={cn("w-5 h-5 transition-transform", mobileSubOpen ? "rotate-180" : "")} />
              </button>
              {mobileSubOpen && (
                <div className="pl-4 pb-2 space-y-1">
                  {casesSubmenu.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span
                        className={cn(
                          "block py-2 text-base cursor-pointer",
                          location === item.href ? "text-secondary font-medium" : "text-slate-600"
                        )}
                        onClick={() => {
                          setIsOpen(false);
                          setMobileSubOpen(false);
                        }}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(2).map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className="text-primary font-medium text-lg py-2 border-b border-gray-100 block cursor-pointer"
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
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-none mt-2">
              Free Consultation
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
