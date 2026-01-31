'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
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
  const pathname = usePathname();

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
      
      <div className="bg-primary text-white py-2 text-sm border-b border-white/10 hidden md:block">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 flex justify-between items-center">
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
            <Link
              href="/about"
              className="hover:text-secondary transition-colors uppercase tracking-wider text-xs font-bold"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-secondary transition-colors uppercase tracking-wider text-xs font-bold"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      <nav
        className={cn(
          "bg-white transition-all duration-300 border-b border-gray-100",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 lg:ml-8 xl:ml-16">
            <img 
              src="/images/logo.webp" 
              alt="Thomas & Wan" 
              className={cn("w-auto object-contain transition-all duration-300", scrolled ? "h-8" : "h-10 md:h-12")}
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary relative group",
                pathname === "/" ? "text-secondary" : "text-primary"
              )}
            >
              Home
              <span className={cn(
                "absolute -bottom-1 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                pathname === "/" ? "scale-x-100" : ""
              )} />
            </Link>

            <div 
              className="relative group"
              onMouseEnter={() => setPracticeAreasOpen(true)}
              onMouseLeave={() => setPracticeAreasOpen(false)}
            >
              <Link
                href="/practice-areas"
                className={cn(
                  "text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary relative flex items-center gap-1",
                  pathname.startsWith("/practice-areas") ? "text-secondary" : "text-primary"
                )}
              >
                Practice Areas
                <ChevronDown className={cn("w-4 h-4 transition-transform", practiceAreasOpen ? "rotate-180" : "")} />
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                  pathname.startsWith("/practice-areas") ? "scale-x-100" : ""
                )} />
              </Link>
              
              <div className={cn(
                "absolute top-full left-0 pt-2 min-w-[200px] transition-all duration-200",
                practiceAreasOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              )}>
                <div className="bg-white shadow-lg border border-gray-100 py-2">
                  {practiceAreaSubmenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-sm font-medium hover:bg-gray-50 hover:text-secondary transition-colors",
                        pathname === item.href ? "text-secondary bg-gray-50" : "text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary relative group",
                  pathname === link.href ? "text-secondary" : "text-primary"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-0.5 bg-secondary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                  pathname === link.href ? "scale-x-100" : ""
                )} />
              </Link>
            ))}
            <Link 
              href="/contact"
              className="bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-2 transition-colors"
            >
              Free Case Review
            </Link>
          </div>

          <button
            className="md:hidden text-primary p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border p-4 shadow-lg flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
            <Link
              href="/"
              className="text-primary font-medium text-lg py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
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
                  <Link
                    href="/practice-areas"
                    className="block text-primary/80 font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    All Practice Areas
                  </Link>
                  {practiceAreaSubmenu.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-primary/80 font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary font-medium text-lg py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/about"
              className="text-primary font-medium text-lg py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-primary font-medium text-lg py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 mt-2">
               <a href="tel:713-529-1177" className="flex items-center gap-2 text-primary font-medium text-lg">
                 <Phone className="w-5 h-5 text-secondary" /> (713) 529-1177
               </a>
               <a href="mailto:info@thomasandwan.com" className="flex items-center gap-2 text-primary font-medium text-lg">
                 <Mail className="w-5 h-5 text-secondary" /> info@thomasandwan.com
               </a>
            </div>
            <Link 
              href="/contact" 
              onClick={() => setIsOpen(false)}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold mt-2 py-3 text-center"
            >
              Free Case Review
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
