import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Link } from "wouter";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Birth Injury Claims in Texas",
    excerpt: "Birth injuries can be devastating for families. Learn about your rights and the legal process for seeking justice in Texas. We explain the difference between birth defects and birth injuries.",
    date: "January 15, 2026",
    author: "Michelle Wan",
    category: "Birth Injury",
    image: "https://images.unsplash.com/photo-1519823551278-64ac927accc9?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "The Impact of Surgical Errors on Patient Safety",
    excerpt: "Surgical errors are more common than you might think. We discuss the most frequent types of surgical mistakes, including wrong-site surgery and retained instruments, and how to prevent them.",
    date: "December 28, 2025",
    author: "Linda Thomas",
    category: "Surgical Errors",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Misdiagnosis: When Doctors Miss the Signs",
    excerpt: "Failure to diagnose a serious condition can have life-altering consequences. Here's what you need to know about medical misdiagnosis cases involving cancer, heart attacks, and strokes.",
    date: "November 12, 2025",
    author: "Michelle Wan",
    category: "Medical Malpractice",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    title: "Texas Medical Malpractice Caps Explained",
    excerpt: "Texas law places caps on non-economic damages in medical malpractice cases. We break down what these caps mean for your potential settlement and how they apply to your case.",
    date: "October 05, 2025",
    author: "Linda Thomas",
    category: "Legal News",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 5,
    title: "The Role of Expert Witnesses in Malpractice Trials",
    excerpt: "Expert witnesses are crucial in proving negligence. Learn how we select top medical experts from across the country to testify on your behalf and build a winning case.",
    date: "September 22, 2025",
    author: "Michelle Wan",
    category: "Litigation Strategy",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=600"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-secondary/5" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                  Insights & News
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                Legal Resources for <br/>
                <span className="text-secondary italic">Empowered</span> Decisions
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                Stay informed with the latest updates on medical malpractice law, patient safety, and firm news from Thomas & Wan.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts List */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-16">
                {blogPosts.map((post) => (
                  <div key={post.id} className="group border-b border-gray-100 pb-16 last:border-0">
                    <div className="aspect-[16/9] overflow-hidden mb-8 bg-gray-100 relative">
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-10" />
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground uppercase tracking-widest mb-4">
                      <span className="text-secondary font-bold flex items-center gap-2">
                        <Tag className="w-4 h-4" /> {post.category}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {post.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" /> {post.author}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl font-serif text-primary mb-4 leading-tight group-hover:text-secondary transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                    
                    <p className="text-lg text-slate-600 leading-relaxed mb-6 font-light">
                      {post.excerpt}
                    </p>
                    
                    <Button variant="link" className="text-primary font-bold uppercase tracking-wide p-0 h-auto hover:text-secondary group-hover:translate-x-2 transition-transform">
                      Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-12">
                <div className="bg-[#F9F7F5] p-8 border-t-4 border-secondary">
                  <h3 className="font-serif text-2xl text-primary mb-6">Categories</h3>
                  <ul className="space-y-4">
                    {["Birth Injury", "Surgical Errors", "Medical Malpractice", "Wrongful Death", "Patient Safety", "Legal News"].map((cat, i) => (
                      <li key={i} className="flex items-center justify-between group cursor-pointer">
                        <span className="text-slate-600 group-hover:text-primary transition-colors">{cat}</span>
                        <ArrowRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary text-white p-8 text-center">
                  <h3 className="font-serif text-2xl mb-4">Need Legal Help?</h3>
                  <p className="text-white/80 mb-6">
                    Contact us today for a free consultation regarding your case.
                  </p>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-6">
                    Contact Us
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
