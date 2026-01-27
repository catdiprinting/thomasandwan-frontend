import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const practiceAreaSubmenu = [
  { name: "Birth Injuries", href: "/practice-areas/birth-injuries" },
  { name: "Childbirth Complications", href: "/practice-areas/childbirth-complications" },
  { name: "Medical Malpractice", href: "/practice-areas/medical-malpractice" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [practiceAreasOpen, setPracticeAreasOpen] = useState(false);
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
    { name: "Testimonials", href: "/testimonials" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <div className={cn("fixed top-0 w-full z-50 transition-all duration-300", scrolled ? "shadow-md" : "")}>
      
      {/* Top Utility Bar */}
      <div className="bg-primary text-white py-2 text-sm border-b border-white/10 hidden md:block">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
               <Mail className="w-3 h-3 text-secondary" />
               <a href="mailto:info@thomasandwan.com" className="tracking-wide hover:text-secondary transition-colors">info@thomasandwan.com</a>
             </div>
             <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
               <Phone className="w-3 h-3 text-secondary" />
               <a href="tel:713-529-1177" className="tracking-wide hover:text-secondary transition-colors">(713) 529-1177</a>
             </div>
             <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
               <MapPin className="w-3 h-3 text-secondary" />
               <span className="tracking-wide">Houston, TX</span>
             </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about">
              <a className="hover:text-secondary transition-colors uppercase tracking-wider text-xs font-bold">About Us</a>
            </Link>
            <Link href="/contact">
              <a className="hover:text-secondary transition-colors uppercase tracking-wider text-xs font-bold">Contact</a>
            </Link>
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
            <a className="flex items-center gap-2">
              <img 
                src="/images/logo.webp" 
                alt="Thomas & Wan" 
                className={cn("w-auto object-contain transition-all duration-300", scrolled ? "h-8" : "h-10 md:h-12")}
              />
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/">
              <a
                className={cn(
                  "text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary relative group",
                  location === "/" ? "text-secondary" : "text-primary"
                )}
              >
                Home
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                  location === "/" ? "scale-x-100" : ""
                )} />
              </a>
            </Link>

            {/* Practice Areas Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setPracticeAreasOpen(true)}
              onMouseLeave={() => setPracticeAreasOpen(false)}
            >
              <Link href="/practice-areas">
                <a
                  className={cn(
                    "text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary relative flex items-center gap-1",
                    location.startsWith("/practice-areas") ? "text-secondary" : "text-primary"
                  )}
                >
                  Practice Areas
                  <ChevronDown className={cn("w-4 h-4 transition-transform", practiceAreasOpen ? "rotate-180" : "")} />
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                    location.startsWith("/practice-areas") ? "scale-x-100" : ""
                  )} />
                </a>
              </Link>
              
              {/* Dropdown Menu */}
              <div className={cn(
                "absolute top-full left-0 pt-2 min-w-[200px] transition-all duration-200",
                practiceAreasOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              )}>
                <div className="bg-white shadow-lg border border-gray-100 py-2">
                  {practiceAreaSubmenu.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={cn(
                          "block px-4 py-3 text-sm font-medium hover:bg-gray-50 hover:text-secondary transition-colors",
                          location === item.href ? "text-secondary bg-gray-50" : "text-primary"
                        )}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  className={cn(
                    "text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary relative group",
                    location === link.href ? "text-secondary" : "text-primary"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                    location === link.href ? "scale-x-100" : ""
                  )} />
                </a>
              </Link>
            ))}
            <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-none px-6">
              Free Case Review
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border p-4 shadow-lg flex flex-col gap-4 animate-in slide-in-from-top-5 max-h-[80vh] overflow-y-auto">
            <Link href="/">
              <a
                className="text-primary font-medium text-lg py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
            </Link>
            
            {/* Practice Areas with submenu on mobile */}
            <div className="border-b border-gray-100">
              <button
                className="text-primary font-medium text-lg py-2 w-full text-left flex items-center justify-between"
                onClick={() => setPracticeAreasOpen(!practiceAreasOpen)}
              >
                Practice Areas
                <ChevronDown className={cn("w-5 h-5 transition-transform", practiceAreasOpen ? "rotate-180" : "")} />
              </button>
              {practiceAreasOpen && (
                <div className="pl-4 pb-2">
                  <Link href="/practice-areas">
                    <a
                      className="block text-primary/80 font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      All Practice Areas
                    </a>
                  </Link>
                  {practiceAreaSubmenu.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className="block text-primary/80 font-medium py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  className="text-primary font-medium text-lg py-2 border-b border-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </Link>
            ))}
            <Link href="/about">
              <a className="text-primary font-medium text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
                About Us
              </a>
            </Link>
            <Link href="/contact">
              <a className="text-primary font-medium text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
                Contact
              </a>
            </Link>
            <div className="flex flex-col gap-2 mt-2">
               <a href="tel:713-529-1177" className="flex items-center gap-2 text-primary font-medium text-lg">
                 <Phone className="w-5 h-5 text-secondary" /> (713) 529-1177
               </a>
               <a href="mailto:info@thomasandwan.com" className="flex items-center gap-2 text-primary font-medium text-lg">
                 <Mail className="w-5 h-5 text-secondary" /> info@thomasandwan.com
               </a>
            </div>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold rounded-none mt-2">
              Call Now
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
