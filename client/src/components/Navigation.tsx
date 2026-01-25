import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Practice Areas", href: "/practice-areas" },
    { name: "Our Success", href: "/success" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/95 backdrop-blur-md py-2 border-border shadow-sm"
          : "bg-white py-4 border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <a className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl text-primary font-bold leading-tight tracking-tight">
              Thomas & Wan
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold font-semibold">
              Attorneys at Law
            </span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a
                className={cn(
                  "text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary",
                  location === link.href ? "text-secondary" : "text-primary"
                )}
              >
                {link.name}
              </a>
            </Link>
          ))}
          <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-none px-6">
            <Phone className="w-4 h-4 mr-2" /> (713) 529-1177
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
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-border p-4 shadow-lg flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <a
                className="text-primary font-medium text-lg py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            </Link>
          ))}
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-none mt-2">
            Call Now
          </Button>
        </div>
      )}
    </nav>
  );
}
