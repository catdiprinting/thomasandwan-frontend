import { Phone, Check, Award, Users, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdWordsLanding() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section 
        className="relative min-h-[600px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://www.thomasandwan.com/wp-content/uploads/2025/08/Birth-Injury.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: '53% 65%'
        }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              We Sue Doctors & Hospitals for Birth Injuries
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              One mistake in the delivery room can change a child's life forever. We hold hospitals and doctors accountable for birth injuries like brain damage, cerebral palsy, and shoulder dystocia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="tel:7135291177">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 rounded-full font-bold"
                  style={{ backgroundColor: '#F48400' }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (713) 529-1177
                </Button>
              </a>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 rounded-full font-bold border-white text-white hover:bg-white hover:text-gray-900"
              >
                Free Case Review
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 text-white/80 text-sm">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> No Fee Unless We Win</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> 55+ Years Experience</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Women-Owned Firm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-4" style={{ backgroundColor: '#F48400' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white font-medium">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>AV Preeminent Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              <span>Board Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Thousands of Families Helped</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: '#1F2937' }}>
            Why Families Choose Thomas & Wan
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#FFF3E6' }}>
                <Scale className="w-8 h-8" style={{ color: '#F48400' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1F2937' }}>We Take On Big Hospitals</h3>
              <p className="text-gray-600">We've gone up against Memorial Hermann, Methodist, St. Luke's, Baylor, HCA, and more.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#FFF3E6' }}>
                <Users className="w-8 h-8" style={{ color: '#F48400' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1F2937' }}>Personal Attention</h3>
              <p className="text-gray-600">Attorneys Linda Thomas and Michelle Wan handle every case personally. No referrals. No handoffs.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#FFF3E6' }}>
                <Award className="w-8 h-8" style={{ color: '#F48400' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1F2937' }}>Proven Track Record</h3>
              <p className="text-gray-600">Over 55 years of combined experience fighting for birth injury victims in Texas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Birth Injuries We Handle */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: '#1F2937' }}>
            Birth Injuries We Handle
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            If your child suffered any of these injuries due to medical negligence, you may have a case.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              "Cerebral Palsy",
              "Brain Damage",
              "Erb's Palsy",
              "Shoulder Dystocia",
              "Brachial Plexus Injuries",
              "Hypoxic Ischemic Encephalopathy",
              "Facial Paralysis",
              "Spinal Cord Injuries"
            ].map((injury, i) => (
              <div 
                key={i}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#F48400' }} />
                <span className="font-medium" style={{ color: '#1F2937' }}>{injury}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16" style={{ backgroundColor: '#1F2937' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Your Free Case Review
            </h2>
            <p className="text-white/80 mb-8">
              Find out if you have a case. We'll review your situation at no cost and with no obligation.
            </p>
            
            <form className="bg-white rounded-lg p-8 text-left">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Full Name"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="(555) 555-5555"
                    data-testid="input-phone"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="your@email.com"
                  data-testid="input-email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tell Us About Your Case</label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  rows={4}
                  placeholder="Briefly describe what happened..."
                  data-testid="input-message"
                ></textarea>
              </div>
              <Button 
                type="submit"
                className="w-full py-6 text-lg font-bold rounded-lg"
                style={{ backgroundColor: '#F48400' }}
                data-testid="button-submit"
              >
                Get My Free Case Review
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Your information is confidential. No fee unless we win your case.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-8 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80 mb-2">Ready to talk? Call us now:</p>
          <a 
            href="tel:7135291177" 
            className="text-3xl font-bold hover:opacity-80 transition-opacity"
            style={{ color: '#F48400' }}
          >
            (713) 529-1177
          </a>
          <p className="text-white/60 text-sm mt-4">
            Thomas & Wan LLP | Houston Medical Malpractice Lawyers
          </p>
        </div>
      </section>
    </div>
  );
}
