import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Link } from "wouter";

const blogPosts = [
  {
    id: 1,
    title: "What Causes Shoulder Dystocia?",
    excerpt: "Shoulder dystocia is a serious childbirth complication that occurs when a baby's shoulders become stuck behind the mother's pelvic bone after the head has been delivered. This condition requires immediate medical intervention, as prolonged delays can lead to birth injuries such as nerve damage, fractures, oxygen deprivation, or cerebral palsy.",
    date: "February 1, 2025",
    author: "Michelle Wan",
    category: "Shoulder Dystocia",
    slug: "what-causes-shoulder-dystocia"
  },
  {
    id: 2,
    title: "Can Doctors Be Liable for Cerebral Palsy?",
    excerpt: "Cerebral palsy (CP) is a neurological disorder that affects muscle movement, coordination, and posture. It is caused by brain damage or abnormal brain development, often occurring before, during, or shortly after birth. If medical malpractice contributed to the brain injury that caused CP, the responsible doctor can be held legally accountable.",
    date: "January 21, 2025",
    author: "Michelle Wan",
    category: "Birth Injuries",
    slug: "can-doctors-be-liable-for-cerebral-palsy"
  },
  {
    id: 3,
    title: "Can Delayed Delivery Cause Fetal Acidosis?",
    excerpt: "Fetal acidosis is a serious medical condition that occurs when a baby experiences oxygen deprivation (hypoxia) during labor and delivery, leading to increased acidity in the blood. If left untreated, fetal acidosis can cause severe birth injuries, including hypoxic-ischemic encephalopathy (HIE), cerebral palsy, and organ dysfunction.",
    date: "January 18, 2025",
    author: "Michelle Wan",
    category: "Fetal Acidosis",
    slug: "can-delayed-delivery-cause-fetal-acidosis"
  },
  {
    id: 4,
    title: "What Are the Risk Factors for Fetal Acidosis?",
    excerpt: "Fetal acidosis is a serious condition in which a baby's blood becomes excessively acidic due to inadequate oxygen supply during labor and delivery. Understanding the risk factors can help healthcare providers take preventive measures and ensure timely intervention.",
    date: "January 17, 2025",
    author: "Michelle Wan",
    category: "Fetal Acidosis",
    slug: "risk-factors-for-fetal-acidosis"
  },
  {
    id: 5,
    title: "How Is Fetal Acidosis Treated?",
    excerpt: "Fetal acidosis is a critical condition that occurs when a baby's blood becomes too acidic due to inadequate oxygen supply during labor and delivery. Early detection and proper treatment are essential to prevent long-term complications such as brain damage and cerebral palsy.",
    date: "January 16, 2025",
    author: "Michelle Wan",
    category: "Fetal Acidosis",
    slug: "how-is-fetal-acidosis-treated"
  },
  {
    id: 6,
    title: "How Does Fetal Acidosis Affect the Baby?",
    excerpt: "Fetal acidosis is a critical condition characterized by an increased level of acidity in a baby's blood, often due to oxygen deprivation during labor. Understanding the effects on newborns is crucial for early intervention and prevention of long-term complications.",
    date: "January 16, 2025",
    author: "Linda Thomas",
    category: "Fetal Acidosis",
    slug: "how-does-fetal-acidosis-affect-the-baby"
  },
  {
    id: 7,
    title: "What Are the Signs of Fetal Acidosis?",
    excerpt: "Fetal acidosis is a serious condition that occurs when a baby's blood becomes too acidic due to inadequate oxygen levels during labor. Recognizing the warning signs is critical for healthcare providers to take immediate action and prevent birth injuries.",
    date: "January 15, 2025",
    author: "Michelle Wan",
    category: "Fetal Acidosis",
    slug: "signs-of-fetal-acidosis"
  },
  {
    id: 8,
    title: "Can Hospitals Be Liable for Cerebral Palsy?",
    excerpt: "Cerebral palsy (CP) is a neurological disorder caused by brain damage or abnormal brain development, often occurring before, during, or shortly after birth. When hospital negligence contributes to a preventable brain injury, the hospital may be held legally responsible.",
    date: "January 13, 2025",
    author: "Linda Thomas",
    category: "Birth Injuries",
    slug: "can-hospitals-be-liable-for-cerebral-palsy"
  },
  {
    id: 9,
    title: "What Are the Long Term Effects of Skull Fractures?",
    excerpt: "Skull fractures in newborns are a serious type of birth injury that can occur during delivery due to complications or medical negligence. Understanding the long-term effects is essential for families seeking proper care and potential legal recourse.",
    date: "January 13, 2025",
    author: "Michelle Wan",
    category: "Birth Injuries",
    slug: "long-term-effects-of-skull-fractures"
  },
  {
    id: 10,
    title: "How Is Medical Malpractice Linked to Skull Fractures?",
    excerpt: "Skull fractures in newborns are a serious and often preventable type of birth injury. While some fractures may occur due to natural complications, many result from medical errors during delivery that could have been avoided with proper care.",
    date: "January 12, 2025",
    author: "Linda Thomas",
    category: "Birth Injuries",
    slug: "medical-malpractice-linked-to-skull-fractures"
  },
  {
    id: 11,
    title: "Can Skull Fractures Be Prevented During Delivery?",
    excerpt: "Skull fractures in newborns are among the more serious types of birth injuries that can occur during delivery. While they are relatively rare, understanding how they happen and whether they can be prevented is crucial for expecting parents.",
    date: "January 9, 2025",
    author: "Michelle Wan",
    category: "Birth Injuries",
    slug: "can-skull-fractures-be-prevented-during-delivery"
  },
  {
    id: 12,
    title: "What Are Common Mistakes in Shoulder Dystocia?",
    excerpt: "Shoulder dystocia is a rare but critical childbirth complication that occurs when one or both of a baby's shoulders become lodged behind the mother's pelvic bone. When medical professionals make errors during this emergency, serious injuries can result.",
    date: "January 8, 2025",
    author: "Linda Thomas",
    category: "Shoulder Dystocia",
    slug: "common-mistakes-in-shoulder-dystocia"
  },
  {
    id: 13,
    title: "What Are the Signs of Shoulder Dystocia?",
    excerpt: "Shoulder dystocia is a rare but serious complication that occurs during childbirth when one or both of a baby's shoulders become stuck behind the mother's pelvic bone. Recognizing the signs early is critical for safe delivery.",
    date: "January 6, 2025",
    author: "Michelle Wan",
    category: "Shoulder Dystocia",
    slug: "signs-of-shoulder-dystocia"
  },
  {
    id: 14,
    title: "What Are the Legal Options for Shoulder Dystocia Injuries?",
    excerpt: "Shoulder dystocia is a serious childbirth complication that occurs when a baby's shoulder becomes stuck behind the mother's pelvic bone during delivery. If medical negligence caused or worsened the injury, families may have legal options.",
    date: "January 5, 2025",
    author: "Linda Thomas",
    category: "Shoulder Dystocia",
    slug: "legal-options-for-shoulder-dystocia"
  },
  {
    id: 15,
    title: "How Is Shoulder Dystocia Treated?",
    excerpt: "Shoulder dystocia is a rare but serious childbirth complication that occurs when one or both of a baby's shoulders get stuck behind the mother's pelvic bone. Understanding the treatment options helps families understand what should happen during this emergency.",
    date: "January 4, 2025",
    author: "Michelle Wan",
    category: "Shoulder Dystocia",
    slug: "how-is-shoulder-dystocia-treated"
  }
];

const categories = [
  "Birth Injuries",
  "Fetal Acidosis",
  "Shoulder Dystocia",
  "HIE",
  "Legal Information",
  "Medical Malpractice"
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
                Stay informed with the latest updates on medical malpractice law, birth injuries, and patient safety from Thomas & Wan.
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
                  <article key={post.id} className="group border-b border-gray-100 pb-16 last:border-0" data-testid={`blog-post-${post.id}`}>
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
                    
                    <Button variant="link" className="text-primary font-bold uppercase tracking-wide p-0 h-auto hover:text-secondary group-hover:translate-x-2 transition-transform" data-testid={`read-more-${post.id}`}>
                      Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </article>
                ))}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-12">
                <div className="bg-[#F9F7F5] p-8 border-t-4 border-secondary">
                  <h3 className="font-serif text-2xl text-primary mb-6">Categories</h3>
                  <ul className="space-y-4">
                    {categories.map((cat, i) => (
                      <li key={i} className="flex items-center justify-between group cursor-pointer" data-testid={`category-${cat.toLowerCase().replace(/\s+/g, '-')}`}>
                        <span className="text-slate-600 group-hover:text-primary transition-colors">{cat}</span>
                        <ArrowRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#F9F7F5] p-8 border-t-4 border-secondary">
                  <h3 className="font-serif text-2xl text-primary mb-6">Recent Posts</h3>
                  <ul className="space-y-4">
                    {blogPosts.slice(0, 5).map((post) => (
                      <li key={post.id} className="border-b border-gray-200 pb-4 last:border-0">
                        <p className="text-primary font-medium hover:text-secondary transition-colors cursor-pointer text-sm leading-snug">
                          {post.title}
                        </p>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary text-white p-8 text-center">
                  <h3 className="font-serif text-2xl mb-4">Need Legal Help?</h3>
                  <p className="text-white/80 mb-6">
                    Contact us today for a free consultation regarding your medical malpractice case.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-6" data-testid="sidebar-contact-button">
                      Contact Us
                    </Button>
                  </Link>
                </div>

                <div className="bg-[#F9F7F5] p-8 border-t-4 border-secondary">
                  <h3 className="font-serif text-xl text-primary mb-4">Free Case Review</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Call us today for a free consultation. We will discuss what your legal options are for your medical malpractice case.
                  </p>
                  <p className="text-secondary font-bold text-lg">
                    (713) 529-1177
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#F9F7F5] py-16 border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl font-serif text-primary mb-4">Do You Have a Medical Malpractice Case?</h2>
            <p className="text-lg text-slate-600 mb-8">
              If you or a loved one has been injured due to medical negligence, we are here to help. Call us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-6 px-8 rounded-none" data-testid="cta-call-button">
                Call (713) 529-1177
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold py-6 px-8 rounded-none" data-testid="cta-contact-button">
                  Request Free Case Review
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
