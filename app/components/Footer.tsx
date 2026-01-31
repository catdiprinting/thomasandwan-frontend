import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-serif mb-4">Thomas & Wan, LLP</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Houston&apos;s trusted medical malpractice attorneys. Women-owned law firm dedicated to fighting for victims of medical negligence.
            </p>
            <p className="text-slate-400 text-sm">
              1710 Sunset Blvd<br />
              Houston, TX 77005<br />
              <a href="tel:+17135291177" className="hover:text-amber-500 transition-colors">(713) 529-1177</a>
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-slate-400 hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link href="/testimonials" className="text-slate-400 hover:text-amber-500 transition-colors">Testimonials</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-amber-500 transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-slate-400 hover:text-amber-500 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Practice Areas</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/practice-areas/birth-injuries" className="text-slate-400 hover:text-amber-500 transition-colors">Birth Injuries</Link></li>
              <li><Link href="/practice-areas/surgical-errors" className="text-slate-400 hover:text-amber-500 transition-colors">Surgical Errors</Link></li>
              <li><Link href="/practice-areas/brain-injuries" className="text-slate-400 hover:text-amber-500 transition-colors">Brain Injuries</Link></li>
              <li><Link href="/practice-areas/misdiagnosis" className="text-slate-400 hover:text-amber-500 transition-colors">Misdiagnosis</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Free Case Evaluation</h4>
            <p className="text-slate-400 text-sm mb-4">
              Contact us today for a free, confidential consultation about your case.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Thomas & Wan, LLP. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
