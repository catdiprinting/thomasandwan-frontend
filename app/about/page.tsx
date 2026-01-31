import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'About Our Medical Malpractice Attorneys',
  description: 'Learn about Linda Thomas and Michelle Wan, compassionate Texas medical malpractice lawyers with over 55 years of combined experience fighting for injured families.',
};

const teamMembers = [
  {
    name: 'Linda Laurent Thomas',
    title: 'Founding Partner',
    bio: 'Since 1987, Linda Laurent Thomas has pursued aggressive legal representation on behalf of injury victims in cases involving personal injuries and wrongful death, medical malpractice, automobile accidents and transportation injuries, work related injuries, environmental and pollution injuries, and defective products.',
    fullBio: 'Whether the wrongdoer is a Fortune 500 corporate giant, or a reckless and negligent driver, Thomas has dedicated her career to fighting for individuals to obtain the maximum amount of damages available under the law. Every case that the firm takes on is handled with the highest level of care and attention.',
    credentials: [
      'Life Member, Multi-Million Dollar Advocates Forum',
      'Life Member, Million Dollar Advocates Forum',
      'Member, Elite Lawyers of America',
      'H Texas Magazine Top Lawyer',
      'South Texas College of Law, Cum Laude',
      'University of Texas at Austin',
    ],
  },
  {
    name: 'Michelle W. Wan',
    title: 'Founding Partner',
    bio: 'Michelle W. Wan has worked exclusively representing clients in personal injury matters. She has handled numerous matters involving toxic exposures, medical negligence and product defects. Like Thomas, Wan has dedicated her career to fighting on behalf of persons injured by the negligence, recklessness and carelessness of others.',
    fullBio: 'Wan and Thomas work as a team in trial, and Wan enjoys the ability to stand in front of juries and bring her clients\' side of the story to the light of a courtroom. She is a 2001 graduate of The University of Texas School of Law where she served on the editorial board of the legal journal The Review of Litigation.',
    credentials: [
      'Life Member, Multi-Million Dollar Advocates Forum',
      'Life Member, Million Dollar Advocates Forum',
      'Texas Monthly SuperLawyer',
      'Texas Monthly Rising Star for Medical Malpractice',
      'University of Texas School of Law',
      'Rice University, B.A.',
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-20">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <p className="text-amber-500 font-medium mb-4 uppercase tracking-wider text-sm">About Us</p>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Meet Your Attorneys</h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              Thomas & Wan is a women-owned law firm dedicated to fighting for victims of medical negligence. 
              With over 55 years of combined experience, we bring expertise and compassion to every case.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="space-y-16">
              {teamMembers.map((member, index) => (
                <div key={index} className="grid md:grid-cols-3 gap-8 items-start">
                  <div className="md:col-span-1">
                    <div className="bg-slate-200 rounded-xl aspect-[3/4] flex items-center justify-center">
                      <span className="text-slate-400 text-sm">Photo</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h2 className="text-3xl font-serif text-slate-900 mb-2">{member.name}</h2>
                    <p className="text-amber-600 font-medium mb-4">{member.title}</p>
                    <p className="text-slate-600 leading-relaxed mb-4">{member.bio}</p>
                    <p className="text-slate-600 leading-relaxed mb-6">{member.fullBio}</p>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Credentials & Awards</h3>
                    <ul className="space-y-2">
                      {member.credentials.map((credential, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <span className="text-amber-600 mt-1">•</span>
                          {credential}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Our Commitment to You</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                When you hire Thomas & Wan, you get Linda Thomas and Michelle Wan working directly on your case. 
                We don&apos;t refer cases to other lawyers. We don&apos;t hire other law firms. 
                We handle every case with personal attention and dedication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Free Case Evaluation
                </Link>
                <Link 
                  href="/practice-areas" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-semibold rounded-lg transition-colors"
                >
                  View Practice Areas
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
