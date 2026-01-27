import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import About from "@/pages/About";
import PracticeAreasPage from "@/pages/PracticeAreas";
import BirthInjuriesPage from "@/pages/BirthInjuries";
import ChildbirthComplicationsPage from "@/pages/ChildbirthComplications";
import MedicalMalpracticePage from "@/pages/MedicalMalpractice";
import TestimonialsPage from "@/pages/Testimonials";
import BlogPage from "@/pages/Blog";
import BlogHeadless from "@/pages/BlogHeadless";
import BlogPostHeadless from "@/pages/BlogPostHeadless";
import ContactPage from "@/pages/Contact";
import NotFound from "@/pages/not-found";

const USE_HEADLESS_WP = import.meta.env.VITE_USE_HEADLESS_WP === 'true';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} /> 
      <Route path="/practice-areas" component={PracticeAreasPage} />
      <Route path="/practice-areas/birth-injuries" component={BirthInjuriesPage} />
      <Route path="/practice-areas/childbirth-complications" component={ChildbirthComplicationsPage} />
      <Route path="/practice-areas/medical-malpractice" component={MedicalMalpracticePage} />
      <Route path="/testimonials" component={TestimonialsPage} />
      <Route path="/success" component={TestimonialsPage} />
      <Route path="/blog" component={USE_HEADLESS_WP ? BlogHeadless : BlogPage} />
      <Route path="/blog/:slug" component={BlogPostHeadless} />
      <Route path="/contact" component={ContactPage} />
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
