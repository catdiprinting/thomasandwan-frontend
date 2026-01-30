import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "wouter";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Birth Injury Claims in Texas",
    excerpt: "Birth injuries can be devastating for families. Learn about your rights and the legal process for seeking justice in Texas.",
    date: "January 15, 2026",
    category: "Birth Injury",
    image: "https://images.unsplash.com/photo-1519823551278-64ac927accc9?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "The Impact of Surgical Errors on Patient Safety",
    excerpt: "Surgical errors are more common than you might think. We discuss the most frequent types of surgical mistakes and how to prevent them.",
    date: "December 28, 2025",
    category: "Surgical Errors",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Misdiagnosis: When Doctors Miss the Signs",
    excerpt: "Failure to diagnose a serious condition can have life-altering consequences. Here's what you need to know about medical misdiagnosis cases.",
    date: "November 12, 2025",
    category: "Medical Malpractice",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600"
  }
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">
              Latest Insights
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary">
              Legal Resources & News
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center text-primary font-bold uppercase tracking-wide hover:text-secondary transition-colors group"
          >
            View All Articles 
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden mb-6 bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest mb-3">
                <span className="text-secondary font-bold">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
              </div>
              
              <h3 className="text-2xl font-serif text-primary mb-3 leading-tight group-hover:text-secondary transition-colors">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
