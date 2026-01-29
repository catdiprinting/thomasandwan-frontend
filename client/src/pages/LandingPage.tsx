import { Phone, Calendar, DollarSign, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header with Logo and Phone */}
      <header className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="/">
            <img 
              src="https://www.thomasandwan.com/wp-content/uploads/2022/03/logo-Thomas-and-Wan.png.webp" 
              alt="Thomas & Wan - Medical Malpractice Lawyers" 
              className="h-16 md:h-20 object-contain"
            />
          </a>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-600">Call Us 24/7</p>
              <a 
                href="tel:7135291177" 
                className="text-2xl font-bold hover:opacity-80 transition-opacity"
                style={{ color: '#F48400' }}
              >
                (713) 529-1177
              </a>
            </div>
            <a href="tel:7135291177" className="md:hidden">
              <Button 
                size="sm" 
                className="rounded-full"
                style={{ backgroundColor: '#F48400' }}
              >
                <Phone className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with Form */}
      <section 
        className="relative min-h-[600px] flex items-stretch"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://www.thomasandwan.com/wp-content/uploads/2025/08/Birth-Injury.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: '53% 65%'
        }}
      >
        <div className="container mx-auto px-4 py-12 grid lg:grid-cols-5 gap-8 items-center">
          {/* Left Content - 3 cols */}
          <div className="lg:col-span-3 space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
              We Sue Doctors &amp; Hospitals for Birth Injuries
            </h1>
            
            <div className="bg-gradient-to-br from-white/95 to-gray-200/90 p-6 rounded shadow-lg">
              <p className="text-gray-800 text-lg leading-relaxed mb-4">
                One mistake in the delivery room can change a child's life forever. We hold hospitals and doctors accountable for birth injuries like brain damage, cerebral palsy, and shoulder dystocia. We've gone up against Memorial Hermann, Methodist, St. Luke's, Baylor, HCA, and more. Attorneys Linda Thomas and Michelle Wan handle every case personally.
              </p>
              <p className="text-gray-800 text-lg">
                No referrals. No handoffs. Just experienced Texas lawyers fighting for your family.<br/>
                <strong>Let's get your child the justice they deserve.</strong>
              </p>
            </div>
            
            <a href="tel:7135291177">
              <Button 
                className="text-xl font-semibold py-6 px-10 rounded"
                style={{ backgroundColor: '#F48400' }}
              >
                Speak with a Lawyer Today.
              </Button>
            </a>
          </div>
          
          {/* Right Form - 2 cols */}
          <div className="lg:col-span-2 bg-white/95 p-8 rounded shadow-xl">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Free Case Evaluation</h3>
            <p className="text-center text-gray-600 mb-6">Our Lawyers are Here to Help You Today</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name: *</label>
                <input type="text" className="w-full border border-gray-300 px-4 py-3 rounded-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email: *</label>
                <input type="email" className="w-full border border-gray-300 px-4 py-3 rounded-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone:</label>
                <input type="tel" className="w-full border border-gray-300 px-4 py-3 rounded-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
                <input type="text" className="w-full border border-gray-300 px-4 py-3 rounded-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your case: *</label>
                <textarea className="w-full border border-gray-300 px-4 py-3 rounded-none h-24" required></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#F48400' }}>What Does 2 + 3 =</label>
                <input type="text" className="w-full border border-gray-300 px-4 py-3 rounded-none" />
              </div>
              <Button 
                type="submit" 
                className="w-full py-4 text-lg font-semibold rounded-none border-2 border-gray-800 bg-white text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
              >
                Get Free Case Evaluation
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        {[
          { icon: Calendar, title: "Flexible", subtitle: "Appointments", bg: "#d97500" },
          { icon: DollarSign, title: "Affordable", subtitle: "Legal Fees", bg: "#F48400" },
          { icon: Users, title: "Highly Experienced", subtitle: "Legal Team", bg: "#F69118" },
          { icon: Clock, title: "A Simple Process", subtitle: "That Respects Your Time", bg: "#d97500" },
        ].map((feature, i) => (
          <div 
            key={i} 
            className="py-12 px-4 text-center text-white"
            style={{ backgroundColor: feature.bg }}
          >
            <img 
              src={`https://www.thomasandwan.com/wp-content/uploads/2022/04/icon-${i === 0 ? 'Flexible-Appointments' : i === 1 ? 'Affordable-Legal-Fess' : i === 2 ? 'Legal-Team' : 'Respect-Your-Time'}.png`}
              alt={feature.title}
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />
            <p className="text-xl font-semibold leading-tight">
              {feature.title}<br/>{feature.subtitle}
            </p>
          </div>
        ))}
      </section>

      {/* 55 Years Experience Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 
              className="text-4xl font-bold mb-6 uppercase tracking-wide"
              style={{ color: '#F48400', fontFamily: 'Oswald, sans-serif' }}
            >
              55 YEARS OF COMBINED EXPERIENCE
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              With over 55 years of combined experience in medical malpractice, Linda Thomas and Michelle Wan are the lawyers you need to fight for your family's rights. At Thomas &amp; Wan, we have handled cases for birth injuries, injuries to moms delivering babies, brain injuries from surgery, lack of oxygen during hospital procedures, failure to diagnose cancer, misdiagnosing cancer, spinal cord injuries from injections, removing the wrong organs in the body, delays in diagnosing heart problems, delays in diagnosing stroke, delays in nursing care, failure to diagnose blood clots, wrongful death, permanent paralysis, loss of limbs, failure to monitor patients, giving the wrong medications in hospitals, medication allergies, surgical mishaps, nursing home injuries and death, doctor misconduct, brain injuries from anesthesia, nursing neglect, hospital system failures, and defective drugs and medical equipment. We know medical malpractice.
            </p>
            <a href="/about">
              <Button style={{ backgroundColor: '#F48400' }} className="text-lg px-8 py-4">
                Find Out More
              </Button>
            </a>
          </div>
          <div className="aspect-video">
            <iframe 
              className="w-full h-full rounded shadow-lg"
              src="https://www.youtube.com/embed/-euZ2nhzoD0"
              title="Houston Medical Malpractice Attorneys - Thomas & Wan"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Did You Know Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Did You Know…?
          </h2>
          
          {/* Facts */}
          {[
            {
              num: 1,
              title: "Medical malpractice is the third leading cause of death in the United States.",
              text: "According to the Journal of the American Medical Association, malpractice comes in behind cancer and heart disease when it comes to the number of deaths in this country.",
              img: "img-did-you-know1.gif",
              imgFirst: true
            },
            {
              num: 2,
              title: "Medical negligence causes between 65,000 and 200,000 deaths each year.",
              text: "According to the Civil Justice Resource Group, there are between 65,000 and 200,000 medical negligence-related deaths each year. As a point of reference, there are 46,000 car accident-related deaths reported in the United States annually.",
              img: "img-did-you-know2.gif",
              imgFirst: false
            },
            {
              num: 3,
              title: "For every four injuries or deaths caused by medical malpractice, only one is recorded in medical records.",
              text: "This means that there are actually about four times as many deaths and injuries each year than are listed above.",
              img: "img-did-you-know3.gif",
              imgFirst: true
            },
            {
              num: 4,
              title: "Diagnostic errors are the most frequent type of medical malpractice case.",
              text: "33 percent of malpractice suits are related to diagnosis. Surgical malpractice follows closely behind, comprising 24 percent of malpractice cases. Treatment errors make up 18 percent, and obstetric cases make up 11 percent.",
              img: "img-did-you-know4.gif",
              imgFirst: false
            },
            {
              num: 5,
              title: "According to a CONSUMER REPORTS MARCH 2016 ANALYSIS: Less than 5 percent of U.S. doctors are responsible for 50% of medical malpractice lawsuits.",
              text: "This means that the same few doctors are repeatedly making serious and life-threatening mistakes. Fortunately, a medical malpractice lawsuit can prevent others from receiving similar dangerous treatment.",
              img: "img-did-you-know5.gif",
              imgFirst: true
            }
          ].map((fact, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-8 items-center py-8 ${i > 0 ? 'border-t border-gray-200' : ''}`}>
              {fact.imgFirst ? (
                <>
                  <img 
                    src={`https://www.thomasandwan.com/wp-content/uploads/2022/04/${fact.img}`}
                    alt={`Fact ${fact.num}`}
                    className="w-full max-w-sm mx-auto"
                  />
                  <div>
                    <p className="text-lg font-bold mb-2">{fact.num}. {fact.title}</p>
                    <p className="text-gray-700">{fact.text}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="md:order-1">
                    <p className="text-lg font-bold mb-2">{fact.num}. {fact.title}</p>
                    <p className="text-gray-700">{fact.text}</p>
                  </div>
                  <img 
                    src={`https://www.thomasandwan.com/wp-content/uploads/2022/04/${fact.img}`}
                    alt={`Fact ${fact.num}`}
                    className="w-full max-w-sm mx-auto md:order-2"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Call &amp; Speak with a Lawyer Today
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            If you are unable to travel to our office, we can visit you at the hospital, home or other convenient location at no cost to you.
          </p>
          <a href="tel:8335294222">
            <Button 
              className="text-3xl font-bold py-6 px-12 rounded"
              style={{ backgroundColor: '#F48400' }}
            >
              833-529-4222
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
