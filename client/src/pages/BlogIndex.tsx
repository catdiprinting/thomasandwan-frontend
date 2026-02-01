import { ArrowRight, Calendar } from "lucide-react";
import PageShell from "@/components/PageShell";

const posts = [
  {
    title: "What Causes Shoulder Dystocia?",
    date: "01 Feb, 2025",
    href: "https://www.thomasandwan.com/what-causes-shoulder-dystocia/",
    image: "https://www.thomasandwan.com/wp-content/uploads/2025/01/What-Causes-Shoulder-Dystocia-355x270.jpg",
    excerpt:
      "Shoulder dystocia is a serious childbirth complication that occurs when a baby’s shoulders become stuck behind the mother’s pelvic bone...",
  },
  {
    title: "Can Doctors Be Liable for Cerebral Palsy?",
    date: "21 Jan, 2025",
    href: "https://www.thomasandwan.com/can-doctors-be-liable-for-cerebral-palsy/",
    image: "https://www.thomasandwan.com/wp-content/uploads/2025/01/Can-Doctors-Be-Liable-for-Cerebral-Palsy-355x270.jpg",
    excerpt:
      "Cerebral palsy (CP) is a neurological disorder that affects muscle movement, coordination, and posture...",
  },
  {
    title: "Can Delayed Delivery Cause Fetal Acidosis?",
    date: "18 Jan, 2025",
    href: "https://www.thomasandwan.com/can-delayed-delivery-cause-fetal-acidosis/",
    image: "https://www.thomasandwan.com/wp-content/uploads/2025/01/Can-Delayed-Delivery-Cause-Fetal-Acidosis-355x270.jpg",
    excerpt:
      "Fetal acidosis is a serious medical condition that occurs when a baby experiences oxygen deprivation (hypoxia) during labor and delivery...",
  },
];

export default function BlogIndex() {
  return (
    <PageShell title="Blog" subtitle="Latest Articles">
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              This is a design template for the blog index. Articles link to the official Thomas & Wan blog pages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((p, idx) => (
              <a
                key={idx}
                href={p.href}
                className="group"
                data-testid={`card-blog-${idx}`}
              >
                <div className="aspect-[16/10] overflow-hidden mb-6 bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-widest mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {p.date}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-primary mb-3 leading-tight group-hover:text-secondary transition-colors">
                  {p.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed line-clamp-3">{p.excerpt}</p>

                <div className="mt-5 inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide group-hover:text-secondary transition-colors">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-14 bg-primary text-white p-10 border-t-4 border-secondary">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Want to read more?</h2>
            <p className="text-white/80 leading-relaxed mb-8">
              Visit the official blog to browse the full archive of posts.
            </p>
            <a
              href="https://www.thomasandwan.com/blog/"
              className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white font-bold px-10 py-4 rounded-none uppercase tracking-widest text-sm"
              data-testid="link-blog-official"
            >
              Go to Official Blog
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
