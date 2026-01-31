import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Client Testimonials',
  description: 'Read what our clients say about their experience working with Thomas & Wan. Real testimonials from families we\'ve helped through medical malpractice cases.',
};

const testimonials = [
  {
    name: 'Alyssa',
    label: 'Birth Injury Client',
    text: 'I had a hard time coming to the terms with what happened to my baby at birth..and as I was looking thru and for a Medical Mal Practice attorney and her face was so welcoming I loved what I read and how long she has been an attorney. our first meet and greet I was anxious and emotional and she had a comfortable vibe in her tone of voice..her concern about what\'s happened..and her smile… I instantly relaxed and what helped me thru my childbirth complications was she said it wasn\'t my fault and gave me a hug I cried on her shoulder and it was such an amazing feeling..she understood what I was talking about… Linda Thomas, you are an amazing woman and I thank god for the opportunity of meeting a woman like yourself.',
  },
  {
    name: 'Lisa A',
    label: 'Premises Liability Client',
    text: 'Thomas & Wan did a great job representing me and my family against the owner of our apartment complex. We have just moved in when our daughter was shot in the head by a stray bullet while she was sleeping in her bed. It was a miracle she survived. The lawyers at Thomas & Wan went to work right away and through research found out that there had been five murders at that complex the year before. They were able to settle the case without even having to go to trial.',
  },
  {
    name: 'Lauren',
    label: 'Medical Malpractice Client',
    text: 'After being abandoned by my original lawyer who was greedy for money, Linda was a TRUE answer to my prayers. She is after JUSTICE, not money. She has spent COUNTLESS hours researching my case and asking just the right questions. She has the heart of a saint; she really cares about her clients and it shows. If you want a piece of Heaven on Earth in your corner, GET LINDA!! She will fight for YOU, WITH you!',
  },
  {
    name: 'Rogelio L',
    label: 'Refinery Injury Client',
    text: 'Linda and Michelle represented me when I was hurt at a refinery. I had tried using a different lawyer, but he never returned my calls or talked to me. Linda and Michelle did a good job and they care about your case.',
  },
  {
    name: 'Stephanie S',
    label: 'Birth Injury Client',
    text: 'Thomas & Wan represented my baby who was seriously harmed by nurses at a hospital who did not know what they were doing. Linda and Michelle were able to guide us through what to do in getting help for my baby for the rest of his life.',
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-20">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Client Testimonials</h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              Read what our clients have to say about their experience working with Thomas & Wan.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-500">★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Share Your Story?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              If you or a loved one has been affected by medical malpractice, we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
              >
                Free Case Evaluation
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-semibold rounded-lg transition-colors"
              >
                Meet Our Attorneys
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
