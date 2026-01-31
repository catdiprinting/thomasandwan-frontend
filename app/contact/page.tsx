import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Contact Us for a Free Consultation',
  description: 'Contact Thomas & Wan for a free consultation about your medical malpractice case. Call (713) 529-1177 or send us a message today.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-20">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              Ready to discuss your case? Contact us for a free, confidential consultation. 
              There&apos;s no obligation, and we don&apos;t charge unless we win.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-serif text-slate-900 mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
                    <a href="tel:+17135291177" className="text-amber-600 hover:text-amber-700 text-lg">
                      (713) 529-1177
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Available 24/7</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                    <a href="mailto:info@thomasandwan.com" className="text-amber-600 hover:text-amber-700">
                      info@thomasandwan.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Office Address</h3>
                    <p className="text-slate-600">
                      1710 Sunset Blvd<br />
                      Houston, TX 77005
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-slate-50 rounded-xl">
                  <h3 className="font-semibold text-slate-900 mb-3">No Win, No Fee</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We work on a contingency basis. This means you only pay if we win your case. 
                    If no recovery is made, you pay nothing.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif text-slate-900 mb-6">Send a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                      How Can We Help? *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Please describe your situation..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Submit for Free Case Review
                  </button>
                  <p className="text-xs text-slate-500 text-center">
                    By submitting, you agree to our privacy policy. Your information is confidential.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="text-center">
              <h2 className="text-2xl font-serif text-slate-900 mb-4">Not Sure If You Have a Case?</h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Review our practice areas or read our FAQ to learn more about medical malpractice claims.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/practice-areas" 
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-medium rounded-lg transition-colors"
                >
                  View Practice Areas
                </Link>
                <Link 
                  href="/faq" 
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-medium rounded-lg transition-colors"
                >
                  Read FAQ
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
