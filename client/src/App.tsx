import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import WordPressPage from "@/pages/WordPressPage";
import Contact from "@/pages/Contact";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import AuthorPage from "@/pages/AuthorPage";
import CategoryPage from "@/pages/CategoryPage";
import ContentAssistant from "@/pages/ContentAssistant";
import NotFound from "@/pages/not-found";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import FloatingWidget from "@/components/FloatingWidget";

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => (
          <WordPressPage
            slugOverride="home"
            layout="homepage"
            seoTitle="Houston Medical Malpractice Lawyers"
            seoDescription="Thomas & Wan is a Houston-based medical malpractice law firm representing victims of birth injuries, medical negligence, and hospital malpractice. Free consultation."
            canonical="https://thomasandwan.com"
          />
        )}
      </Route>
      <Route path="/about-thomas-wan-llp">
        {() => (
          <WordPressPage
            slugOverride="about-thomas-wan-llp"
            layout="page"
            category="About Our Firm"
            seoTitle="About Our Attorneys"
            seoDescription="Meet Linda Thomas and Michelle Wan — Houston medical malpractice attorneys with over 60 years of combined experience. Women-owned firm dedicated to justice for families."
            canonical="https://thomasandwan.com/about-thomas-wan-llp"
          />
        )}
      </Route>
      <Route path="/cases-we-handle">
        {() => (
          <WordPressPage
            slugOverride="cases-we-handle"
            layout="page"
            category="Medical Malpractice Focus"
            seoTitle="Cases We Handle"
            seoDescription="Thomas & Wan handles medical malpractice, birth injuries, brain injuries, surgical errors, medication errors, misdiagnosis, and more. Free case review in Houston, TX."
            canonical="https://thomasandwan.com/cases-we-handle"
          />
        )}
      </Route>
      <Route path="/cases-we-handle/medical-malpractice">
        {() => <WordPressPage slugOverride="medical-malpractice" category="Cases We Handle" />}
      </Route>
      <Route path="/cases-we-handle/birth-injuries">
        {() => <WordPressPage slugOverride="birth-injuries" category="Cases We Handle" />}
      </Route>
      <Route path="/cases-we-handle/complications-of-childbirth">
        {() => <WordPressPage slugOverride="complications-of-childbirth" category="Cases We Handle" />}
      </Route>
      <Route path="/cases-we-handle/brain-injuries">
        {() => <WordPressPage slugOverride="brain-injuries" category="Cases We Handle" />}
      </Route>
      <Route path="/cases-we-handle/surgical-errors">
        {() => <WordPressPage slugOverride="surgical-errors" category="Cases We Handle" />}
      </Route>
      <Route path="/cases-we-handle/medication-errors">
        {() => <WordPressPage slugOverride="medication-errors" category="Cases We Handle" />}
      </Route>
      <Route path="/cases-we-handle/misdiagnosis">
        {() => <WordPressPage slugOverride="misdiagnosis" category="Cases We Handle" />}
      </Route>
      <Route path="/testimonials">
        {() => (
          <WordPressPage
            slugOverride="testimonials"
            layout="page"
            category="Client Stories"
            seoTitle="Client Testimonials"
            seoDescription="Read what our clients say about Thomas & Wan. Real reviews from families we've represented in medical malpractice, birth injury, and negligence cases in Houston, TX."
            canonical="https://thomasandwan.com/testimonials"
          />
        )}
      </Route>
      <Route path="/faq">
        {() => (
          <WordPressPage
            slugOverride="faq"
            layout="page"
            category="What to Expect"
            seoTitle="Frequently Asked Questions"
            seoDescription="Get answers to common questions about medical malpractice claims, attorney fees, the lawsuit process, depositions, mediation, and trial — from Thomas & Wan in Houston, TX."
            canonical="https://thomasandwan.com/faq"
          />
        )}
      </Route>
      <Route path="/contact-us" component={Contact} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/author/:slug" component={AuthorPage} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/content-assistant" component={ContentAssistant} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
      <StickyMobileCTA />
      <FloatingWidget />
    </QueryClientProvider>
  );
}

export default App;
