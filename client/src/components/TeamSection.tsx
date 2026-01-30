import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/content";

export default function TeamSection() {
  return (
    <section className="py-24 bg-[#F9F7F5]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
            Team Behind This Work
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary">
            Dedicated to Your Family's Future
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start max-w-5xl mx-auto">
          {teamMembers.map((member, idx) => (
            <div key={member.name} className={`group ${idx === 1 ? 'md:mt-16' : ''}`}>
              <div className="relative mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full aspect-[3/4] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 bg-primary text-white p-4 min-w-[200px] z-20">
                  <h3 className="font-serif text-xl">{member.name}</h3>
                  <p className="text-secondary text-sm uppercase tracking-wider">{member.title}</p>
                </div>
              </div>
              
              <p className="text-lg text-slate-600 leading-relaxed mb-6 font-light">
                {member.bio}
              </p>
              
              <Button variant="link" className="text-primary font-bold uppercase tracking-wide p-0 h-auto hover:text-secondary group-hover:translate-x-2 transition-transform">
                View Profile <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
