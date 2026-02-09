import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Cases from "@/pages/Cases";
import MedicalMalpractice from "@/pages/MedicalMalpractice";
import BirthInjuries from "@/pages/BirthInjuries";
import ComplicationsOfChildbirth from "@/pages/ComplicationsOfChildbirth";
import FAQ from "@/pages/FAQ";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import AuthorPage from "@/pages/AuthorPage";
import CategoryPage from "@/pages/CategoryPage";
import ContentAssistant from "@/pages/ContentAssistant";
import BrainInjuriesPage from "@/pages/BrainInjuries";
import SurgicalErrorsPage from "@/pages/SurgicalErrors";
import MedicationErrorsPage from "@/pages/MedicationErrors";
import MisdiagnosisPage from "@/pages/MisdiagnosisPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about-thomas-wan-llp" component={About} />
      <Route path="/cases-we-handle" component={Cases} />
      <Route path="/cases-we-handle/medical-malpractice" component={MedicalMalpractice} />
      <Route path="/cases-we-handle/birth-injuries" component={BirthInjuries} />
      <Route path="/cases-we-handle/complications-of-childbirth" component={ComplicationsOfChildbirth} />
      <Route path="/cases-we-handle/brain-injuries" component={BrainInjuriesPage} />
      <Route path="/cases-we-handle/surgical-errors" component={SurgicalErrorsPage} />
      <Route path="/cases-we-handle/medication-errors" component={MedicationErrorsPage} />
      <Route path="/cases-we-handle/misdiagnosis" component={MisdiagnosisPage} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/faq" component={FAQ} />
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
    </QueryClientProvider>
  );
}

export default App;
