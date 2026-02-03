import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    { name: "About", href: "/about" },
    { name: "Cases We Handle", href: "/cases-we-handle" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className={cn("fixed top-0 w-full z-50 transition-all duration-300", scrolled ? "shadow-md" : "")}>
      
      {/* Top Utility Bar */}
      <div className="bg-primary text-white py-2 text-sm border-b border-white/10 hidden md:block">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/contact">
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
                className={cn("w-auto object-contain transition-all duration-300", scrolled ? "h-8" : "h-10 md:h-12")}
              />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={cn(
                    "text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary relative group cursor-pointer",
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
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border p-4 shadow-lg flex flex-col gap-4 animate-in slide-in-from-top-5 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
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
