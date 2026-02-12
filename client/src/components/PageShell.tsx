import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary pb-20 md:pb-0">
      <Navigation />
      <main className="pt-20">
        <header className="bg-primary text-white py-18 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 transform origin-top translate-x-1/4" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm">
                  {subtitle ?? "Thomas & Wan"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight">
                {title}
              </h1>
            </div>
          </div>
        </header>
        {children}
      </main>
      <Footer />
    </div>
  );
}
