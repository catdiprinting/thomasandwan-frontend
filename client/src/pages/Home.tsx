import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WomenOwnedSection from "@/components/WomenOwnedSection";
import PracticeAreas from "@/components/PracticeAreas";
import TestimonialsAndResults from "@/components/Testimonials";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

import SEO, { lawFirmSchema } from "@/components/SEO";
import ContentLoader from "@/components/ContentLoader";
import { useHomepageData, cms } from "@/hooks/useCmsData";

export default function Home() {
  const { data: d, isLoading } = useHomepageData();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary pb-20 md:pb-0">
      <SEO 
        title="Houston Medical Malpractice Lawyers"
        description="Thomas & Wan is a Houston-based medical malpractice law firm representing victims of birth injuries, medical negligence, and hospital malpractice. Free consultation."
        canonical="https://thomasandwan.com"
        schema={lawFirmSchema}
      />
      <Navigation />
      <main>
        <ContentLoader isLoading={isLoading}>
        <Hero
          label={cms(d, "heroLabel", "Medical Malpractice Attorneys")}
          heading={cms(d, "heroHeading", "Hurt by a Doctor or Hospital? We Help Families Get Answers.")}
          text={cms(d, "heroText", "If you or someone you love was seriously harmed by a doctor or hospital, you have rights. Hospitals have lawyers on day one. You deserve someone fighting for you too.")}
          ctaText={cms(d, "heroCtaText", "Free Case Review")}
          ctaLink={cms(d, "heroCtaLink", "/contact-us")}
          secondaryText={cms(d, "heroSecondaryText", "Learn More")}
          secondaryLink={cms(d, "heroSecondaryLink", "/cases-we-handle")}
          badge1={cms(d, "heroBadge1", "Available 24/7")}
          badge2={cms(d, "heroBadge2", "No Win, No Fee")}
        />
        <TrustBar
          rating={cms(d, "trustRating", "5.0")}
          ratingLabel={cms(d, "trustRatingLabel", "Google Reviews")}
          avTitle={cms(d, "trustAvTitle", "AV Preeminent®")}
          avSubtitle={cms(d, "trustAvSubtitle", "Peer Rated for Highest Level of Excellence")}
        />
        
        <PracticeAreas
          label={cms(d, "practiceLabel", "Our Expertise")}
          heading={cms(d, "practiceHeading", "Focused Exclusively on Medical Malpractice")}
          subtext={cms(d, "practiceSubtext", "We don't handle car accidents or divorces. Our sole focus is mastering the complex realm of medical malpractice to win for you.")}
          ctaHeading={cms(d, "practiceCtaHeading", "Do You Have a Case?")}
          ctaText={cms(d, "practiceCtaText", "Get a free review of your medical records by our expert team.")}
          ctaButton={cms(d, "practiceCtaButton", "Contact Us Today")}
        />
        
        <WomenOwnedSection
          label={cms(d, "aboutLabel", "Why Choose Us")}
          heading={cms(d, "aboutHeading", "When You Hire Us, You Work with Us.")}
          text1={cms(d, "aboutText1", "At Thomas & Wan, you will work directly with Linda Thomas and Michelle Wan. We do not pass your case to junior associates. We do not refer cases out to other attorneys. We prepare every case as if it will go to trial.")}
          text2={cms(d, "aboutText2", "With over 60 years of combined experience, we have held major Texas hospitals accountable over and over again.")}
          quote={cms(d, "aboutQuote", "We don't refer cases out. When you hire Thomas & Wan, you get Thomas & Wan.")}
        />
        
        <TeamSection
          label={cms(d, "teamLabel", "Team Behind This Work")}
          heading={cms(d, "teamHeading", "Dedicated to Your Family's Future")}
          partner1Name={cms(d, "team1Name", "Linda Laurent Thomas")}
          partner1Title={cms(d, "team1Title", "Partner")}
          partner1Bio={cms(d, "team1Bio", "Since 1987, Linda Laurent Thomas has pursued aggressive legal representation on behalf of injury victims. She specializes in cases involving personal injuries, wrongful death, and medical malpractice.")}
          partner2Name={cms(d, "team2Name", "Michelle W. Wan")}
          partner2Title={cms(d, "team2Title", "Partner")}
          partner2Bio={cms(d, "team2Bio", "Michelle W. Wan has worked exclusively representing clients in personal injury matters. Like Thomas, Wan has dedicated her career to fighting on behalf of persons injured by the negligence of others.")}
        />
        
        <TestimonialsAndResults
          resultsLabel={cms(d, "resultsLabel", "Proven Track Record")}
          resultsHeading={cms(d, "resultsHeading", "Recent Case Results")}
          results={[
            {
              amount: cms(d, "result1Amount", "$6.5 Million"),
              type: cms(d, "result1Type", "Birth Injury Settlement"),
              desc: cms(d, "result1Desc", "Settlement for a child who suffered brain damage due to delayed delivery."),
            },
            {
              amount: cms(d, "result2Amount", "$2.1 Million"),
              type: cms(d, "result2Type", "Surgical Error"),
              desc: cms(d, "result2Desc", "Verdict for a patient who suffered permanent nerve damage during routine surgery."),
            },
            {
              amount: cms(d, "result3Amount", "$4.8 Million"),
              type: cms(d, "result3Type", "Wrongful Death"),
              desc: cms(d, "result3Desc", "Settlement for a family who lost a mother due to misdiagnosis of heart condition."),
            },
          ]}
        />

        <section className="bg-primary py-16 text-white border-y border-secondary/30">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-4">
              <div className="text-5xl md:text-6xl font-serif text-secondary mb-2" data-testid="text-stat-1-number">{cms(d, "stat1Number", "60+")}</div>
              <div className="text-sm uppercase tracking-widest opacity-80" data-testid="text-stat-1-label">{cms(d, "stat1Label", "Years Combined Experience")}</div>
            </div>
            <div className="p-4">
              <div className="text-5xl md:text-6xl font-serif text-secondary mb-2" data-testid="text-stat-2-number">{cms(d, "stat2Number", "$50M+")}</div>
              <div className="text-sm uppercase tracking-widest opacity-80" data-testid="text-stat-2-label">{cms(d, "stat2Label", "Recovered for Clients")}</div>
            </div>
            <div className="p-4">
              <div className="text-5xl md:text-6xl font-serif text-secondary mb-2" data-testid="text-stat-3-number">{cms(d, "stat3Number", "100%")}</div>
              <div className="text-sm uppercase tracking-widest opacity-80" data-testid="text-stat-3-label">{cms(d, "stat3Label", "Medical Malpractice Focus")}</div>
            </div>
          </div>
        </section>

        <FAQSection
          label={cms(d, "faqLabel", "Common Questions")}
          heading={cms(d, "faqHeading", "Frequently Asked Questions")}
          subtext={cms(d, "faqSubtext", "Navigating medical malpractice claims can be confusing. Here are answers to some of the most common questions our clients ask.")}
        />
        </ContentLoader>

        <BlogSection />

      </main>
      <Footer />
    </div>
  );
}
