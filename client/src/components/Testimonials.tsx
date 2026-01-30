import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials, caseResults } from "@/lib/content";

export default function TestimonialsAndResults() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Results Section */}
        <div className="mb-24">
           <div className="text-center mb-12">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
              Proven Track Record
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary">
              Recent Case Results
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {caseResults.map((result, idx) => (
              <div key={idx} className="border-t-4 border-secondary pt-6 group hover:bg-[#F9F7F5] transition-colors p-6">
                <div className="text-4xl font-serif text-primary mb-2 group-hover:scale-105 transition-transform origin-left">
                  {result.amount}
                </div>
                <div className="text-secondary font-bold uppercase tracking-wider text-sm mb-3">
                  {result.type}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="bg-primary/5 absolute inset-0 -skew-y-3 scale-110 transform origin-center -z-10 rounded-3xl" />
          
          <div className="text-center mb-12 pt-10">
            <h2 className="text-3xl md:text-4xl font-serif text-primary">
              Client Testimonials
            </h2>
          </div>

          <div className="max-w-4xl mx-auto pb-10">
            <Carousel opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {testimonials.map((t, idx) => (
                  <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/1 pl-8 pt-8 pb-4">
                     <Card className="border-none shadow-lg bg-white h-full relative overflow-visible">
                        <div className="absolute -top-4 -left-4 bg-secondary text-white p-3 rounded-full shadow-lg">
                           <Quote className="w-6 h-6 fill-current" />
                        </div>
                        <CardContent className="pt-10 pb-8 px-8 flex flex-col h-full items-center text-center">
                           <div className="flex gap-1 mb-6">
                             {[...Array(t.rating)].map((_, i) => (
                               <Star key={i} className="w-5 h-5 text-secondary fill-current" />
                             ))}
                           </div>
                           <p className="text-lg text-slate-600 italic font-serif leading-relaxed mb-6 flex-grow line-clamp-6">
                             "{t.text.substring(0, 300)}..."
                           </p>
                           <div>
                             <div className="font-bold text-primary text-lg">{t.name}</div>
                             <div className="text-sm text-muted-foreground uppercase tracking-widest">{t.label}</div>
                           </div>
                        </CardContent>
                     </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-12 border-primary text-primary hover:bg-primary hover:text-white" />
                <CarouselNext className="-right-12 border-primary text-primary hover:bg-primary hover:text-white" />
              </div>
            </Carousel>
          </div>
        </div>

      </div>
    </section>
  );
}
